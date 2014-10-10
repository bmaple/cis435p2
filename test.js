/*jslint browser: true, ass: true, plusplus: true, white: true */
"use strict";
var clock=document.getElementById("clock");
var sec=0, min=0, hour=0;
var tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "];
var gameBoard = document.getElementById("gameBoard");

//to check adj spaces on board check adj nodes and children of adj parents in same space as one to be checked
function buildGameBoard(gameBoard, tileSpaces) {
    var row;
    var cell;
    var x, y;
    var listElement = 0;
    var text;
    for(x = 0; x < 4; x++) {
        row = document.createElement("tr");
        for(y = 0; y < 4; y++) {
            cell = document.createElement("td"); 
            text = document.createTextNode(tileSpaces[listElement]);
            cell.appendChild(text);
            listElement++;
            row.appendChild(cell);
        }
        gameBoard.appendChild(row);
    }
}
function checkAdj(gameBoard)
{

alert(document.getElementById("gameBoard").rows[1].cells.item(1).innerHTML);//get inside of second cell of row 1
//alert(document.getElementById("gameBoard").rows[1].cells.item(1).cellIndex);//get index of cell

alert(document.getElementById("gameBoard").rows[0].cells.item(0).previousSibling.innerHTML) // check left WON'T WORK IF IT DOESN'T EXIST
alert(document.getElementById("gameBoard").rows[1].cells.item(1).nextSibling.innerHTML) //check right
alert(document.getElementById("gameBoard").rows[1].cells.item(1).parentNode.nextSibling.cells.item(1).innerHTML); // check down
alert(document.getElementById("gameBoard").rows[1].cells.item(1).parentNode.previousSibling.cells.item(1).innerHTML);// check up
}

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
buildGameBoard(gameBoard, tiles);
//alert(document.getElementById("gameBoard").rows[0].cells.length);//get num cols
//alert(document.getElementById("gameBoard").rows[2].cells.item(1).innerHTML);//get inside of second cell of row 1
//alert(document.getElementById("gameBoard").rows[2].cells.item(1).cellIndex);//get index of cell
checkAdj(gameBoard);
