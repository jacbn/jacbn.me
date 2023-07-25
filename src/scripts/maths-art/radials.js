import * as bc from '../modules/basicCanvas.js'

var canvas;
var ctx;
var speedSlider;
var circlesOptionsDiv;
var circlesOptionsDivInitial;

var circleRadii = [0]; // pointer
var circleSpeeds = [4];
var path = [];
var pathComplete = false;
var angle = 0;
var baseSpeed = 0.5;
var speedsHcf = 1;
var rollType = 0;

export function runRadials() {

    initialiseDOMElements();

    // with preloading caching content, it's possible for this to run twice without a full page reload.
    // so, we'll need to manually reset everything to its initial state ourselves.

    circleRadii = [0];
    circleSpeeds = [4];
    path = [];
    pathComplete = false;
    angle = 0;
    baseSpeed = parseInt(speedSlider.value)/10;
    speedsHcf = 1;
    rollType = 0;
    
    $("[id^=circleOptions]").remove(); // remove all circle options html elements
    addCircle(80, 0, true); // add back the initial circle and the pointer
    reset();
    render();
}

function initialiseDOMElements() {
    window.$ = window.jQuery = require('jquery')
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.width = ctx.canvas.height = Math.min(window.innerWidth/1.5, window.innerHeight/1.5);
    ctx.setTransform(1, 0, 0, -1, canvas.width/2, canvas.height/2);

    speedSlider = document.getElementById("speedSlider");
    speedSlider.oninput = function(event) {
        reset(event.target.value/10);
    };
    $(document).ready(function() {
        $('#addCircle').click(function () {addCircle()});
        $('#removeCircle').click(function () {removeCircle()});
        $('#changeRollType').click(function() {changeRollType()});
        $('#unlockButton').click(function() {addExamples(); $('#unlockButton').attr("disabled", true)});
        $('#examples').val('empty');
        $('#examples').change(function(event) {setExample(event.target.value)});
    })
    circlesOptionsDiv = $('#circlesOptions');
    circlesOptionsDivInitial = circlesOptionsDiv.html();
}

function reset(speed=baseSpeed, exampleName='empty') {
    path = [];
    pathComplete = false;
    angle = 0;
    baseSpeed = speed;

    $('#examples').val(exampleName);

    //recalculate hcf (needed to only draw the path once)
    const arr = circleSpeeds.filter(x => x != 0).map(x => Math.abs(x));
    speedsHcf = (arr.length > 0) ? hcf(arr) : 1;
    clearCanvas();
}

function clearCanvas() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(21, 24, 26)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, -1, canvas.width/2, canvas.height/2);
}

function render() {
    clearCanvas();
    var tx = 0;
    var ty = 0;
    var prevR = circleRadii[0];
    bc.drawCircle(ctx, tx, ty, prevR, "#666");

    for (var i = 1; i < circleRadii.length; i++) {
        tx += (prevR+circleRadii[i]*rollType) * Math.sin(angle*baseSpeed*circleSpeeds[i]);
        ty += (prevR+circleRadii[i]*rollType) * Math.cos(angle*baseSpeed*circleSpeeds[i]);
        bc.drawCircle(ctx, tx, ty, circleRadii[i], "#666");
        if (!pathComplete && i == circleRadii.length - 1) {
            path.push([tx, ty]);
        }
        prevR = circleRadii[i];
    }
    angle += Math.PI/180; // the angle, uncorrected for speed;
    // the "true" pointer angle is angle * simulation speed * pointer speed:
    //console.log(angle*baseSpeed*circleSpeeds[circleSpeeds.length-1]);
    
    if (angle*baseSpeed > 2*Math.PI / speedsHcf) {
        angle = 0;
        pathComplete = true;
        path.push(path[0]);
    }
    bc.drawShape(ctx, path, false);
    bc.drawCircle(ctx, tx, ty, 2, "#f00", true);
    requestAnimationFrame(render);
}

function addCircle(rad=40, spe=2, initial=false) {
    const ptrRad = circleRadii.pop();
    const ptrSpe = circleSpeeds.pop();
    circleRadii.push(rad, ptrRad);
    circleSpeeds.push(spe, ptrSpe);
    reset();
    
    const li = $('<li>').prop('id', 'circleOptions' + circleRadii.length).addClass('radialsListEntry');

    
    if (initial) {
        li.append(makeSizeInput(circleRadii.length - 2), makeEmptySpace('0')); // -1 for 0-indexing, -1 for the pointer
        circlesOptionsDiv.append(li);
    } else {
        li.append(makeSizeInput(circleRadii.length - 2), makeSpeedInput(circleRadii.length - 2));
        $('#circleOptionsPtr').replaceWith(li);
    } 

    makePointerOptions();
}

function makePointerOptions() {
    const ptr = $('<li>').prop('id', 'circleOptionsPtr').addClass('radialsListEntry');
    ptr.append(makeEmptySpace('Pointer'), makeSpeedInput(circleRadii.length - 1));
    circlesOptionsDiv.append(ptr);
}

function makeSizeInput(index) {
    return $('<input>').addClass('radialsNumericalInput').prop('type', 'number').prop('value', circleRadii[index]).prop('min', 0).prop('max', 100).prop('step', 10).on('input', function(event) {
        circleRadii[index] = parseInt(event.target.value);
        reset();
    });
}

function makeSpeedInput(index) {
    return $('<input>').addClass('radialsNumericalInput').prop('type', 'number').prop('value', circleSpeeds[index]).prop('min', -10).prop('max', 10).prop('step', 1).on('input', function(event) {
        circleSpeeds[index] = parseInt(event.target.value);
        reset();
    });
}

function makeEmptySpace(value) {
    return $('<input>').addClass('radialsEmptyInput').prop('value', value).attr("disabled", true);
}

function removeCircle() {
    if (circleRadii.length > 2) {
        const ptrSpe = circleSpeeds.pop();
        const ptrRad = circleRadii.pop();
        circleSpeeds.pop();
        circleRadii.pop();
        circleRadii.push(ptrRad);
        circleSpeeds.push(ptrSpe);

        // removing a circle changes the index of the pointer in the circleSpeeds array, so remake to update
        $('#circleOptionsPtr').remove();
        makePointerOptions();
        $('#circleOptions' + (circleRadii.length+1)).remove();

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
    switch (example) {
        case "3clover":
            circleRadii = [0];
            circleSpeeds = [4];
            addCircle(80, 0, true)
            addCircle(20, 1);
            changeRollType(1, true);
            break;
        case "triangle":
            circleRadii = [0];
            circleSpeeds = [4];
            addCircle(80, 0, true)
            addCircle(20, -2);
            changeRollType(1, true);
            break;
        case "club":
            circleRadii = [0];
            circleSpeeds = [8];
            addCircle(70, 0, true);
            addCircle(60, -2);
            addCircle(40, 6);
            changeRollType(0, true);
            break;
        case "powersOfTwo":
            circleRadii = [0];
            circleSpeeds = [128];
            addCircle(128, 0, true);
            addCircle(64, 1);
            addCircle(32, 2);
            addCircle(16, 4);
            addCircle(8, 8);
            addCircle(4, 16);
            addCircle(2, 32);
            addCircle(1, 64);
            changeRollType(0, true);
            break;
        case "pentagon":
            circleRadii = [0];
            circleSpeeds = [16];
            addCircle(80, 0, true);
            addCircle(40, 6);
            addCircle(20, 11);
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
    $('.hidden').attr('hidden', false);
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
