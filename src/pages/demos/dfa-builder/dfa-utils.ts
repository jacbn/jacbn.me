import partition from "lodash/partition";

export const ITEM_TYPE = "DFA_STATE";
export const STATE_DIAMETER = 52;
export const STATE_RADIUS = STATE_DIAMETER / 2;

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export type BuilderMode = "states" | "transitions" | "delete";

export interface DfaState {
    id: string;
    x: number;
    y: number;
    isStart?: boolean;
    isAccepting?: boolean;
}

export interface StateTransition {
    id: string;
    from: string;
    to: string;
    symbol: string;
}

export interface DragStateItem {
    id: string;
    x: number;
    y: number;
}

export interface StateTransitionDisplay {
    transition: StateTransition;
    path: string;
    labelX: number;
    labelY: number;
}

export interface DfaNodeProps {
    state: DfaState;
    mode: BuilderMode;
    isPendingSource: boolean;
    onClick?: (stateId: string) => void;
    onDoubleClick?: (stateId: string) => void;
}

export enum KleeneTreeNode {
    OR = "OR",
    CONCAT = "CONCAT",
    STAR = "STAR",
    NODE = "NODE",
}

export type KleeneTree<T> = {
    op: KleeneTreeNode.OR;
    children: KleeneTree<T>[];
} | {
    op: KleeneTreeNode.CONCAT;
    children: KleeneTree<T>[];
} | {
    op: KleeneTreeNode.STAR;
    children: KleeneTree<T>;
} | {
    op: KleeneTreeNode.NODE;
    value: T | "ε" | "∅";
}

const isEqualKleeneTree = <T>(a: KleeneTree<T>, b: KleeneTree<T>): boolean => {
    // compare two kleene trees, ignoring the order of children for OR nodes
    if (a.op !== b.op) return false;
    if (a.op === KleeneTreeNode.NODE && b.op === KleeneTreeNode.NODE) {
        return a.value === b.value;
    }
    if (a.op === KleeneTreeNode.STAR && b.op === KleeneTreeNode.STAR) {
        return isEqualKleeneTree(a.children, b.children);
    }
    if (a.op === KleeneTreeNode.CONCAT && b.op === KleeneTreeNode.CONCAT) {
        if (a.children.length !== b.children.length) return false;
        for (let i = 0; i < a.children.length; i++) {
            if (!isEqualKleeneTree(a.children[i], b.children[i])) return false;
        }
        return true;
    }
    if ((a.op === KleeneTreeNode.OR && b.op === KleeneTreeNode.OR)) {
        if (a.children.length !== b.children.length) return false;
        const aChildren = [...a.children];
        const bChildren = [...b.children];
        for (const child of aChildren) {
            const index = bChildren.findIndex(bChild => isEqualKleeneTree(child, bChild));
            if (index === -1) return false;
            bChildren.splice(index, 1);
        }
        return true;
    }
    return false;
}

const commonPrefixSubtree = <T>(a: KleeneTree<T>, b: KleeneTree<T>): KleeneTree<T> | null => {
    if (a.op !== b.op) {
        if (a.op === KleeneTreeNode.NODE && b.op === KleeneTreeNode.CONCAT) {
            return commonPrefixSubtree(a, b.children[0]);
        } else if (a.op === KleeneTreeNode.CONCAT && b.op === KleeneTreeNode.NODE) {
            return commonPrefixSubtree(a.children[0], b);
        }
        return null;
    }
    if (a.op === KleeneTreeNode.NODE && b.op === KleeneTreeNode.NODE) {
        return a.value === b.value ? a : null;
    } else if (a.op === KleeneTreeNode.STAR && b.op === KleeneTreeNode.STAR) {
        return commonPrefixSubtree(a.children, b.children);
    } else {
        const typedA = a as (KleeneTree<T> & { children: KleeneTree<T>[] });
        const typedB = b as (KleeneTree<T> & { children: KleeneTree<T>[] });
        const acc = { op: typedA.op, children: [] as KleeneTree<T>[]};
        for (const childA of typedA.children) {
            for (const childB of typedB.children) {
                if (isEqualKleeneTree(childA, childB)) {
                    acc.children.push(childA);
                } else {
                    return (acc.children.length > 0 ? acc as KleeneTree<T> : null);
                }
            }
        }
    }
    return null;
};

const removePrefix = <T>(tree: KleeneTree<T>, prefix: KleeneTree<T>): KleeneTree<T> => {
    if (isEqualKleeneTree(tree, prefix)) {
        return { op: KleeneTreeNode.NODE, value: "ε" };
    }

    if (tree.op === KleeneTreeNode.OR || tree.op === KleeneTreeNode.CONCAT) {
        if (prefix.op === KleeneTreeNode.NODE) {
            if (tree.children.length > 0 && tree.children[0].op === KleeneTreeNode.NODE && tree.children[0].value === prefix.value) {
                return { op: tree.op, children: tree.children.slice(1) };
            } else if (tree.children.length > 0 && tree.children[0].op === KleeneTreeNode.CONCAT) {
                return removePrefix({ op: tree.op, children: tree.children[0].children }, prefix);
            }
        } else if (prefix.op === KleeneTreeNode.CONCAT) {
            if (tree.children.length >= prefix.children.length) {
                const newChildren = tree.children.slice(prefix.children.length);
                return { op: tree.op, children: newChildren };
            }
        }
    }

    return tree;
}

const isEpsilonLike = <T>(tree: KleeneTree<T>): boolean => {
    return tree.op === KleeneTreeNode.STAR || tree.op === KleeneTreeNode.NODE && tree.value === "ε";
};

export const simplifyKleeneTree = <T>(tree: KleeneTree<T> | null): KleeneTree<T> => {
    if (tree === null) return { op: KleeneTreeNode.NODE, value: "∅" };

    switch (tree.op) {
        case KleeneTreeNode.OR: {
            // simplify is run once at the start for each child. we must also run it:
            // - *around* the result of a simplification rule if that rule can involve deletion of children (e.g. OR-3); this is to prevent singletons
            const treeChildren = tree.children.map(simplifyKleeneTree);


            // rule OR-1 (singleton). concat([x]) => node(x)
            if (treeChildren.length === 1) {
                return treeChildren[0];
            }

            // rule OR-2 (flatten). x|(y|z) => x|y|z
            let hasFlattened = false;
            const flattenedChildren = treeChildren.flatMap(child => {
                if (child.op === KleeneTreeNode.OR) {
                    hasFlattened = true;
                    return child.children;
                }
                return [child];
            });
            if (hasFlattened) {
                return simplifyKleeneTree({ op: KleeneTreeNode.OR, children: flattenedChildren });
            }


            // rule OR-3 (duplicates). x|..|x => x
            const uniqueChildren = treeChildren.filter((child, index, self) => {
                return index === self.findIndex(c => isEqualKleeneTree(c, child));
            });
            if (uniqueChildren.length !== treeChildren.length) {
                console.log("(OR-3) simplifying OR with duplicates:", stringifyKleeneTree(tree));
                return simplifyKleeneTree({ op: KleeneTreeNode.OR, children: uniqueChildren });
            }

            // rule OR-4 (common prefix). ax|ay|az => a(x|y|z).
            const commonPrefix = treeChildren.slice(1).reduce((acc, child) => {
                if (!acc) return null;
                return commonPrefixSubtree(acc, child);
            }, treeChildren[0] as KleeneTree<T> | null);

            if (treeChildren.length >= 2 && commonPrefix) {
                console.log("(OR-4) found common prefix between children:", stringifyKleeneTree(commonPrefix), treeChildren);
                const newChildren = treeChildren.map(child => removePrefix(child, commonPrefix));
                console.log("(....) new children after removing common prefix:", newChildren.map(stringifyKleeneTree));
                return simplifyKleeneTree({ 
                    op: KleeneTreeNode.CONCAT, 
                    children: ([
                        commonPrefix,
                        { op: KleeneTreeNode.OR, children: newChildren as KleeneTree<T>[] }
                    ] as KleeneTree<T>[]).map(simplifyKleeneTree)
                });
            }


            // rule OR-5 (star pairs). x*x|..|ε-like => x*|..|ε-like
            // bare in mind x can be multiple letters and the star can be anywhere in the concat (e.g. A(AA)*A|ε => (AA)*|ε)
            const [starPairChildren, otherChildren] = partition(treeChildren, (
                child => child.op === KleeneTreeNode.CONCAT 
                      && child.children.filter(gc => gc.op === KleeneTreeNode.STAR).length === 1
                      && isEqualKleeneTree(
                            simplifyKleeneTree(child.children.find(gc => gc.op === KleeneTreeNode.STAR)!.children),
                            simplifyKleeneTree({ op: KleeneTreeNode.CONCAT, children: child.children.filter(gc => gc.op !== KleeneTreeNode.STAR) })
                      )
            ));
            const anyChildCanBeEmpty = treeChildren.some(isEpsilonLike);

            if (anyChildCanBeEmpty && starPairChildren.length > 0) {
                console.log("(OR-5) simplifying OR with star pairs:", stringifyKleeneTree(tree));
                return simplifyKleeneTree({
                    op: KleeneTreeNode.OR,
                    children: [
                        ...starPairChildren.map(child => (child as KleeneTree<T> & { children: KleeneTree<T>[] }).children.find(gc => gc.op === KleeneTreeNode.STAR)!),
                        ...otherChildren,
                    ].map(simplifyKleeneTree)
                });
            }

            // rule OR-6 (star or epsilon). x*|ε => x*
            if (treeChildren.some(child => child.op === KleeneTreeNode.NODE && child.value === "ε") && treeChildren.some(child => child.op === KleeneTreeNode.STAR)) {
                console.log("(OR-6) simplifying OR with star and epsilon:", stringifyKleeneTree(tree));
                return simplifyKleeneTree({
                    op: KleeneTreeNode.OR,
                    children: treeChildren.filter(child => child.op !== KleeneTreeNode.NODE || child.value !== "ε")
                });
            }

            return { op: KleeneTreeNode.OR, children: treeChildren };
        }
        case KleeneTreeNode.CONCAT: {
            const treeChildren = tree.children.map(simplifyKleeneTree);

            // rule CONCAT-1 (singleton). concat([x]) => x
            if (treeChildren.length === 1) {
                return treeChildren[0];
            }

            // rule CONCAT-2 (flatten). x(yz) => xyz
            const flattenedConcatChildren = treeChildren.flatMap(child => {
                if (child.op === KleeneTreeNode.CONCAT) {
                    return child.children;
                }
                return [child];
            });
            if (flattenedConcatChildren.length !== treeChildren.length) {
                return simplifyKleeneTree({ op: KleeneTreeNode.CONCAT, children: flattenedConcatChildren.map(simplifyKleeneTree) });
            }

            // rule CONCAT-3 (epsilon-1). xε => x
            const concatChildren = treeChildren.filter(child => !(child.op === KleeneTreeNode.NODE && child.value === "ε"));
            if (concatChildren.length === 0) {
                return { op: KleeneTreeNode.NODE, value: "ε" };
            }
            if (concatChildren.length !== treeChildren.length) {
                console.log("(CONCAT-3) simplifying concat with epsilon:", stringifyKleeneTree(tree));
                return simplifyKleeneTree({ op: KleeneTreeNode.CONCAT, children: concatChildren });
            }

            // rule CONCAT-4 (star absorption). x*(x|ε) => x*
            const isStarAbsorbingPair = (a: KleeneTree<T>, b: KleeneTree<T>): boolean => {
                const starChild = [a, b].find(child => child.op === KleeneTreeNode.STAR);
                const orChild = [a, b].find(child => child.op === KleeneTreeNode.OR);
                return !!(
                    starChild 
                    && orChild
                    && orChild.children.some(child => child.op === KleeneTreeNode.NODE && child.value === "ε") 
                    && orChild.children.some(child => isEqualKleeneTree(child, starChild.children))
                );
            };

            for (let i = 0; i < treeChildren.length - 1; i++) {
                if (isStarAbsorbingPair(treeChildren[i], treeChildren[i + 1])) {
                    console.log("(CONCAT-4) simplifying x*(x|ε) to x*", stringifyKleeneTree(tree));
                    const starChild = [treeChildren[i], treeChildren[i + 1]].find(child => child.op === KleeneTreeNode.STAR)!;
                    const newChildren = treeChildren;
                    newChildren.splice(i, 2, starChild);
                    return simplifyKleeneTree({
                        op: tree.op,
                        children: newChildren.map(simplifyKleeneTree)
                    });
                }
            }

            return { op: KleeneTreeNode.CONCAT, children: treeChildren };
        }
        case KleeneTreeNode.STAR: {
            const treeChildren = simplifyKleeneTree(tree.children);

            // rule STAR-1 (epsilon). ε* => ε
            if (treeChildren.op === KleeneTreeNode.NODE && treeChildren.value === "ε") {
                console.log("(STAR-1) simplifying ε* to ε", stringifyKleeneTree(tree));
                return { op: KleeneTreeNode.NODE, value: "ε" };
            }

            // rule STAR-2 (epsilon-or). (x|ε)* => x* 
            if (treeChildren.op === KleeneTreeNode.OR && treeChildren.children.some(child => child.op === KleeneTreeNode.NODE && child.value === "ε")) {
                const newChildren = treeChildren.children.filter(child => !(child.op === KleeneTreeNode.NODE && child.value === "ε"));
                console.log("(STAR-2) simplifying (x|ε)* to x*", stringifyKleeneTree(tree));
                if (newChildren.length === 0) {
                    return { op: KleeneTreeNode.NODE, value: "ε" };
                }
                return simplifyKleeneTree({ op: KleeneTreeNode.STAR, children: { op: KleeneTreeNode.OR, children: newChildren } });
            }

            return { op: KleeneTreeNode.STAR, children: treeChildren };
        }
        case KleeneTreeNode.NODE:
            return tree;
    }
};

export const generateRegexTree = (states: DfaState[], transitions: StateTransition[]): KleeneTree<string> | null => {
    // kleene's algorithm
    const R : Record<number, Record<number, Record<number, KleeneTree<string> | null>>> = {};

    for (let k = -1; k < states.length; k++) {
        R[k] = {};
        for (let i = 0; i < states.length; i++) {
            R[k][i] = {};
            for (let j = 0; j < states.length; j++) {
                if (k === -1) {
                    const direct = transitions.find(t => t.from === states[i].id && t.to === states[j].id);
                    if (direct && i === j) {
                        R[k][i][j] = OR(FROM_STR(direct.symbol), NODE("ε"));
                    } else if (direct) {
                        R[k][i][j] = FROM_STR(direct.symbol);
                    } else if (i === j) {
                        R[k][i][j] = NODE("ε");
                    } else {
                        R[k][i][j] = null;
                    }
                } else {
                    R[k][i][j] = OR(CONCAT(R[k - 1][i][k], STAR(R[k - 1][k][k]), R[k - 1][k][j]), R[k - 1][i][j]);
                }
            }
        }
    }
    
    const startStates = states.filter(s => s.isStart);
    const acceptStates = states.filter(s => s.isAccepting);

    return OR(...startStates.flatMap(start => {
        return acceptStates.flatMap(accept => {
            return R[states.length - 1][states.indexOf(start)][states.indexOf(accept)];
        })
    }))
};

const OR = (...trees: (KleeneTree<string> | null)[]): KleeneTree<string> | null => {
    if (trees.every(t => t === null)) return null;
    return { op: KleeneTreeNode.OR, children: trees.filter(t => !!t) };
};

const CONCAT = (...trees: (KleeneTree<string> | null)[]): KleeneTree<string> | null => {
    if (trees.some(t => t === null)) return null;
    return { op: KleeneTreeNode.CONCAT, children: trees.filter(t => !!t) };
};

const STAR = (a: KleeneTree<string> | null): KleeneTree<string> | null => {
    if (a === null) return null;
    return { op: KleeneTreeNode.STAR, children: a };
};

const NODE = (value: string): KleeneTree<string> => ({ op: KleeneTreeNode.NODE, value });
const FROM_STR = (value: string): KleeneTree<string> | null => {
    if (value.includes(',')) {
        return OR(...value.split(',').map(v => NODE(v)));
    }
    return NODE(value);
};

export const stringifyKleeneTree = <T>(tree: KleeneTree<T> | null): string => {
    if (tree === null) return "∅";
    switch (tree.op) {
        case KleeneTreeNode.NODE:
            return `${tree.value}`;
        case KleeneTreeNode.STAR:
            return `(${stringifyKleeneTree(tree.children)})*`;
        case KleeneTreeNode.CONCAT:
            return tree.children.map(stringifyKleeneTree).join("");
        case KleeneTreeNode.OR:
            return `(${tree.children.map(stringifyKleeneTree).join("|")})`;
    }
};
