class animatedImage {
    constructor({hoverId, imageId, srcStatic, srcAnimated}) {
        this.hoverId = hoverId;
        this.imageId = imageId;
        this.srcStatic = srcStatic;
        this.srcAnimated = srcAnimated;
    }

    enable() {
        $(this.imageId).attr("src", this.srcAnimated);
    }

    disable() {
        $(this.imageId).attr("src", this.srcStatic);
    }
}

export function animationOnLoad(images) {
    window.$ = window.jQuery = require('jquery')

    images.forEach(i => {
        const image = new animatedImage(i);
        $(image.hoverId).on("mouseenter", () => {image.enable()});
        $(image.hoverId).on("mouseleave", () => {image.disable()});
    });
}

