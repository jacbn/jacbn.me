class animatedGif {
    constructor(titleId, src_static, src_animated) {
        this.titleId = titleId;
        this.src_static = src_static;
        this.src_animated = src_animated;
    }

    getCardID() {
        return `#card${this.titleId}`;
    }

    getGifID() {
        return `#gridImage${this.titleId}`;
    }

    enable() {
        console.log("enabled")
        $(this.getGifID()).attr("src", this.src_animated);
    }

    disable() {
        console.log("disabled")
        $(this.getGifID()).attr("src", this.src_static);
    }
}

const images = [new animatedGif(
    "YawningDetection",
    '/assets/home/logo-yawnn-static.png',
    '/assets/home/logo-yawnn.gif'
)];


export function animationOnLoad() {
    window.$ = window.jQuery = require('jquery')
    images.forEach(image => {
        $(image.getCardID()).on("mouseenter", () => {image.enable()});
        console.log(image.getCardID())
        $(image.getCardID()).on("mouseleave", () => {image.disable()});
    });
}

