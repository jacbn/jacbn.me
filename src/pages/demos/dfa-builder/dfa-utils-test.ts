import { KleeneTree, KleeneTreeNode, simplifyKleeneTree, stringifyKleeneTree } from "./dfa-utils";

const testKleeneTree = <T>(tree: KleeneTree<T>, expected: string) => {
    const result = stringifyKleeneTree(simplifyKleeneTree(tree));
    if (result !== expected) {
        console.error(`[TEST] Test failed: expected "${expected}", got "${result}"`);
    } else {
        console.log(`[TEST] Test passed: "${result}"`);
    }
}

// AA(A)*|AA => AA(A)*
testKleeneTree(
    { 
        op: KleeneTreeNode.OR, 
        children: [
            { op: KleeneTreeNode.CONCAT, children: [{ op: KleeneTreeNode.NODE, value: "A" }, { op: KleeneTreeNode.NODE, value: "A" }] },
            { op: KleeneTreeNode.CONCAT, children: [{ op: KleeneTreeNode.NODE, value: "A" }, { op: KleeneTreeNode.NODE, value: "A" }, { op: KleeneTreeNode.STAR, child: { op: KleeneTreeNode.NODE, value: "A" } }] }
        ]
    },
    "AA(A)*"
);

testKleeneTree(
    {
        op: KleeneTreeNode.CONCAT,
        children: [
            { op: KleeneTreeNode.NODE, value: "A" },
            {
                op: KleeneTreeNode.OR,
                children: [
                    {
                        op: KleeneTreeNode.CONCAT,
                        children: [
                            { op: KleeneTreeNode.NODE, value: "A" },
                            {
                                op: KleeneTreeNode.STAR,
                                child: {
                                    op: KleeneTreeNode.CONCAT,
                                    children: [
                                        { op: KleeneTreeNode.NODE, value: "A" },
                                        { op: KleeneTreeNode.NODE, value: "A" }
                                    ]
                                }
                            },
                            { op: KleeneTreeNode.NODE,value: "A" }
                        ]
                    },
                    { op: KleeneTreeNode.NODE, value: "ε" }
                ]
            }
        ]
    }, "A(AA)*"
)

