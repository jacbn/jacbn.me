class animatedImage {
    constructor({hoverId, imageId, srcStatic, srcAnimated}) {
        this.hoverId = hoverId;
        this.imageId = imageId;
        this.srcStatic = srcStatic;
        this.srcAnimated = srcAnimated;
    }

    enable() {
        window.$(this.imageId).attr("src", this.srcAnimated);
    }

    disable() {
        window.$(this.imageId).attr("src", this.srcStatic);
    }
}

export function animationOnLoad(images) {
    window.$ = window.jQuery = require('jquery'); // eslint-disable-line

    images.forEach(i => {
        const image = new animatedImage(i);
        window.$(image.hoverId).on("mouseenter", () => {image.enable();});
        window.$(image.hoverId).on("mouseleave", () => {image.disable();});
    });
}

