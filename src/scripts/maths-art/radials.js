import * as bc from '../modules/basicCanvas.js';

var canvas;
var ctx;
var speedSlider;
var circlesOptionsDiv;
var circlesOptionsDivInitial;
var canvasColour;
var pathColour;
var constructionColour;
var pointerColour = "#f00";
var activeScripts = 0;

var circleRadii = [0]; // pointer
var circleSpeeds = [4];
var circleOffsets = [0];
var angleConversion = 2.0 * Math.PI / 360.0;
var path = [];
var pathComplete = false;
var globalPhase = 0;
var baseSpeed = 0.5;
var speedsHcf = 1;
var rollType = 0;

var offsetsEnabled = false;

export function runRadials() {

    initialiseDOMElements();

    // with preloading caching content, it's possible for this to run twice without a full page reload.
    // so, we'll need to manually reset everything to its initial state ourselves.

    window.$("[id^=circleOptions]").remove(); // remove all circle options html elements

    circleRadii = [0];
    circleSpeeds = [4];
    circleOffsets = [0];
    path = [];
    pathComplete = false;
    globalPhase = 0;
    baseSpeed = parseFloat(speedSlider.value)/10.0;
    speedsHcf = 1;
    rollType = 0;
    
    addCircle(80, 0, 0, true); // add back the initial circle and the pointer
    reset();
    if (activeScripts == 0) {
        activeScripts++; // in theory there is a race condition here, but it would require soft resetting page (e.g. via colour scheme) twice before it's even loaded, which would be quite impressive honestly
        render();
    }
}

function initialiseDOMElements() {
    // window.$ = window.jQuery = require('jquery'); // eslint-disable-line -- imported via CDN in html
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, -1, canvas.width/2, canvas.height/2);

    pathColour = getComputedStyle(document.documentElement).getPropertyValue('--canvas-primary');
    constructionColour = getComputedStyle(document.documentElement).getPropertyValue('--canvas-secondary');
    canvasColour = getComputedStyle(document.documentElement).getPropertyValue('--canvas-background');

    speedSlider = document.getElementById("speedSlider");
    speedSlider.oninput = function(event) {
        reset(event.target.value/10.0);
    };
    window.$(document).ready(function() {
        window.$('#addCircle').click(function () {addCircle();});
        window.$('#removeCircle').click(function () {removeCircle();});
        window.$('#changeRollType').click(function() {changeRollType();});
        window.$('#unlockButton').click(function() {addExamples(); window.$('#unlockButton').attr("disabled", true);});
        window.$('#toggleOffsets').click(function() {toggleOffsets();});
        window.$('#offsetUnit').change(function(event) {toggleOffsetUnit(event.target.value);});
        window.$('#examples').val('empty');
        window.$('#examples').change(function(event) {setExample(event.target.value);});
    });
    circlesOptionsDiv = window.$('#circlesOptions');
    circlesOptionsDivInitial = circlesOptionsDiv.html();
}

function reset(speed=baseSpeed, exampleName='empty') {
    path = [];
    pathComplete = false;
    globalPhase = 0;
    baseSpeed = speed;

    window.$('#examples').val(exampleName);

    //recalculate hcf (needed to only draw the path once)
    const arr = circleSpeeds.filter(x => x != 0).map(x => Math.abs(x));
    speedsHcf = (arr.length > 0) ? hcf(arr) : 1;
    clearCanvas();
}

function clearCanvas() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = canvasColour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, -1, canvas.width/2, canvas.height/2);
}

function render() {
    clearCanvas();
    var centreX = 0;
    var centreY = 0;
    var dx;
    var dy;
    var prevR = circleRadii[0];
    bc.drawCircle(ctx, centreX, centreY, prevR, constructionColour);

    /* The basic idea here is to calculate the position of each circle, starting from the base, in turn;
    for example, the centre of the second circle is the radius of the first circle away from its centre,
    with a rotation given by how far through one cycle we are (globalPhase) multiplied by the speed of 
    the second circle. */

    for (var i = 1; i < circleRadii.length; i++) {
        const prevX = centreX;
        const prevY = centreY;
        // calculate the position of the centre of the next circle, assuming no offset
        dx = (prevR + circleRadii[i] * rollType) * Math.sin(globalPhase * baseSpeed * circleSpeeds[i]);
        dy = (prevR + circleRadii[i] * rollType) * Math.cos(globalPhase * baseSpeed * circleSpeeds[i]);
        // apply offset rotation to dx and dy, then add back the previous circle's centre
        if (offsetsEnabled) {
            const offset = -circleOffsets[i] * angleConversion;
            const sinOffset = Math.sin(offset);
            const cosOffset = Math.cos(offset);
            centreX = dx * cosOffset - dy * sinOffset + prevX;
            centreY = dx * sinOffset + dy * cosOffset + prevY;
        } else {
            centreX = dx + prevX;
            centreY = dy + prevY;
        }

        bc.drawCircle(ctx, centreX, centreY, circleRadii[i], constructionColour);
        if (!pathComplete && i == circleRadii.length - 1) {
            path.push([centreX, centreY]);
        }
        prevR = circleRadii[i];
    }
    globalPhase += Math.PI/180;
    
    /* We don't want to keep drawing lines if the shape is already complete. This is usually at 
    globalPhase = 2pi, but if the shape happens to complete before this, we'll be redrawing lines. 
    So how do we know if the shape is complete? 
    
    Have a look at the first challenge! :) It'll help explain the next line. */

    if (globalPhase*baseSpeed > 2*Math.PI / speedsHcf) {
        globalPhase = 0;
        pathComplete = true;
        path.push(path[0]);
    }
    bc.drawShape(ctx, path, false, pathColour);
    bc.drawCircle(ctx, centreX, centreY, 2, pointerColour, true);
    if (activeScripts <= 1) {
        /* stops the script if we're not currently on the radials page.
        without this, multiple functions can be running simultaneously. */
        requestAnimationFrame(render);
    }
}

function addCircle(rad=40, spe=2, off=0, initial=false) {
    const ptrRad = circleRadii.pop();
    const ptrSpe = circleSpeeds.pop();
    const ptrOff = circleOffsets.pop();
    circleRadii.push(rad, ptrRad);
    circleSpeeds.push(spe, ptrSpe);
    circleOffsets.push(off, ptrOff);
    reset();
    
    const li = window.$('<li>').prop('id', 'circleOptions' + circleRadii.length).css('display', 'flex').css('justify-content', 'space-around').css('align-items', 'center');

    
    if (initial) {
        li.append(makeSizeInput(circleRadii.length - 2), makeEmptySpace('0'), makeEmptySpace('0', true)); // -1 for 0-indexing, -1 for the pointer
        circlesOptionsDiv.append(li);
    } else {
        const index = circleRadii.length - 2;
        li.append(makeSizeInput(index), makeSpeedInput(index), makeOffsetInput(index));
        window.$('#circleOptionsPtr').replaceWith(li);
    } 

    makePointerOptions();
}

function makePointerOptions() {
    const ptr = window.$('<li>').prop('id', 'circleOptionsPtr').css('display', 'flex').css('justify-content', 'space-around').css('align-items', 'center');
    ptr.append(makeEmptySpace('Pointer'), makeSpeedInput(circleRadii.length - 1), makeOffsetInput(circleRadii.length - 1));
    circlesOptionsDiv.append(ptr);
}

function makeSizeInput(index) {
    return window.$('<input>').css('width', '8em').prop('type', 'number').prop('value', circleRadii[index]).prop('min', 0).prop('max', 100).prop('step', 10).on('input', function(event) {
        circleRadii[index] = parseFloat(event.target.value);
        reset();
    });
}

function makeSpeedInput(index) {
    return window.$('<input>').css('width', '8em').prop('type', 'number').prop('value', circleSpeeds[index]).prop('min', -10).prop('max', 10).prop('step', 1).on('input', function(event) {
        circleSpeeds[index] = parseFloat(event.target.value);
        reset();
    });
}

function makeOffsetInput(index) {
    return window.$('<input>').css('width', '8em').addClass('offsetHidden').prop('hidden', !offsetsEnabled).prop('type', 'number').prop('value', 0).prop('min', 0).prop('max', 360).prop('step', 5).on('input', function(event) {
        circleOffsets[index] = parseFloat(event.target.value);
        reset();
    });
}

function makeEmptySpace(value, isOffset=false) {
    if (isOffset) {
        return window.$('<input>').css('width', '8em').addClass('offsetHidden').attr('hidden', true).attr('disabled', true).prop('value', value);
    }
    return window.$('<input>').css('width', '8em').prop('value', value).attr('disabled', true);
}

function removeCircle() {
    if (circleRadii.length > 2) {
        const ptrSpe = circleSpeeds.pop();
        const ptrRad = circleRadii.pop();
        const ptrOff = circleOffsets.pop();
        circleSpeeds.pop();
        circleRadii.pop();
        circleOffsets.pop();
        circleRadii.push(ptrRad);
        circleSpeeds.push(ptrSpe);
        circleOffsets.push(ptrOff);

        // removing a circle changes the index of the pointer in the circleSpeeds array, so remake to update
        window.$('#circleOptionsPtr').remove();
        makePointerOptions();
        window.$('#circleOptions' + (circleRadii.length+1)).remove();

        reset();
    }
}

function changeRollType(val=rollType, force=false) {
    if (!force && val == rollType) {
        rollType = (rollType + 2) % 3 - 1;
    } else {
        rollType = val;
    }
    reset();
}

function setExample(example) {
    circlesOptionsDiv.html(circlesOptionsDivInitial);
    if (offsetsEnabled) {
        toggleOffsets();
        window.$('#toggleOffsets').prop('checked', false);
    }
    switch (example) {
        case "3clover":
            circleRadii = [0];
            circleSpeeds = [4];
            addCircle(80, 0, 0, true);
            addCircle(20, 1, 0);
            changeRollType(1, true);
            break;
        case "triangle":
            circleRadii = [0];
            circleSpeeds = [4];
            addCircle(80, 0, 0, true);
            addCircle(20, -2, 0);
            changeRollType(1, true);
            break;
        case "club":
            circleRadii = [0];
            circleSpeeds = [8];
            addCircle(70, 0, 0, true);
            addCircle(60, -2, 0);
            addCircle(40, 6, 0);
            changeRollType(0, true);
            break;
        case "powersOfTwo":
            circleRadii = [0];
            circleSpeeds = [128];
            addCircle(128, 0, 0, true);
            addCircle(64, 1, 0);
            addCircle(32, 2, 0);
            addCircle(16, 4, 0);
            addCircle(8, 8, 0);
            addCircle(4, 16, 0);
            addCircle(2, 32, 0);
            addCircle(1, 64, 0);
            changeRollType(0, true);
            break;
        case "pentagon":
            circleRadii = [0];
            circleSpeeds = [16];
            addCircle(80, 0, 0, true);
            addCircle(40, 6, 0);
            addCircle(20, 11, 0);
            changeRollType(0, true);
            break;
        case "8-flower":
            circleRadii = [0];
            circleSpeeds = [25];
            addCircle(80, 0, 0, true);
            addCircle(40, 1, 0);
            addCircle(30, -7, 0);
            changeRollType(0, true);
            break;
    }
    reset(baseSpeed, example);
}

function hcf(arr) {
    return arr.reduce(function(a,b) {
        if (!b) return a;
        return hcf([b, a % b]);
    });
}

function addExamples() {
    window.$('.symmetryHidden').attr('hidden', false);
}

function toggleOffsets() {
    window.$('.offsetHidden').attr('hidden', offsetsEnabled);
    window.$('.offsetDisabled').attr('disabled', offsetsEnabled);
    offsetsEnabled = !offsetsEnabled;
    reset();
}

function toggleOffsetUnit(value) {
    if (value == "degrees") {
        angleConversion = 2.0 * Math.PI / 360.0;
    } else {
        angleConversion = 1.0;
    }
    reset();
}

/*
cool ones:

heart:
    80 100 13
       -6 -4  6

5-side flower:
    80 40
       -3  2

3-leaf clover:
    80 20
       2  8

triangle:
80 20
-2 4

club:
    70 60 40
       -2  6  8

self-similar:
    128  64  32  16  8   4   2   1
         1   2   4   8   16  32  64 128
*/
