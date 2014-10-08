/*jslint browser: true, ass: true, plusplus: true, white: true */
"use strict";
var clock=document.getElementById("clock");
var sec=0, min=0, hour=0;
var tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];



function tick() {
    sec++;
    if(sec >= 60) {
        sec = 0;
        min++;
        if(min >= 60) {
            min = 0;
            hour++;
        }
    }
    function clockFormat() {
        var curTime;
        if(hour === 0) {
            curTime = "00";
        }
        else if(hour < 9) {
            curTime = "0" + hour;
        }
        else {
            curTime = hour;
        }

        curTime += ":";
        if(min < 9) {
            curTime += "0" + min;
        }
        else if(min === 0) {
            curTime += "00";
        }
        else {
            curTime += min;
        }

        curTime += ":";
        if(sec < 9) {
            curTime += "0" + sec;
        }
        else if(sec === 0) {
            curTime += "00";
        }
        else {
            curTime += sec;
        }

        return curTime;
    }
    clock.innerHTML = clockFormat();
    repeat();
}
function repeat() {
    setTimeout(tick, 1000);
}
repeat();
function shuffle(list) {
    var i, randInt;
    function getRandInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    Array.prototype.swap = function (a, b) {   
        var temp = this[a];
        this[a] = this[b];
        this[b] = temp;
        return this;
    }
    for (i = list.length - 1; i >= 1; i--) {
        randInt = getRandInt(0, i);
        list.swap(randInt, i);
    }
    return list;
}
tiles = shuffle(tiles);
//alert(tiles);
