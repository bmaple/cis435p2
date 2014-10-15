/*jslint browser: true, ass: true, plusplus: true, white: true */
"use strict";
var clock=document.getElementById("clock");
var counter=document.getElementById("moves");
var easyTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, " ", 15];
var tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, " ", 15];
var gameBoard = document.getElementById("gameBoard");
var move = 0;
var newMove = document.createTextNode(move);

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
//to check adj spaces on board check adj nodes and children of adj parents in same space as one to be checked
function newGame()
{
    move = 0;
    newMove = document.createTextNode(move);
    counter.removeChild(counter.firstChild);
    counter.appendChild(newMove);
    gameBoard.removeChild(gameBoard.firstChild);
    tiles = shuffle(tiles);
    buildGameBoard(gameBoard, tiles);
}
function easyGame()
{
    move = 0;
    newMove = document.createTextNode(move);
    counter.removeChild(counter.firstChild);
    counter.appendChild(newMove);
    gameBoard.removeChild(gameBoard.firstChild);
    tiles = easyTiles.slice(0);
    buildGameBoard(gameBoard, tiles);
}
function optionsButtons()
{
    var content = document.getElementById("foreground");
    var startAgain = document.createElement("p"),
        simpleGame = document.createElement("p"),
        again = document.createTextNode("Start Over"),
        easy = document.createTextNode("Easy Mode");

    startAgain.setAttribute("onclick", "newGame()");
    simpleGame.setAttribute("onclick", "easyGame()");
    startAgain.appendChild(again);
    simpleGame.appendChild(easy);
    content.appendChild(startAgain);
    content.appendChild(simpleGame);
}
function buildGameBoard(gameBoard, tileSpaces) {
    var row, cell, tbody,
        x, y,
        listElement = 0,
        text;
    tbody = document.createElement("tbody");
    for(x = 0; x < 4; x++) {
        row = document.createElement("tr");
        for(y = 0; y < 4; y++) {
            cell = document.createElement("td"); 
            cell.setAttribute("onclick", "checkAdj(this)");
            text = document.createTextNode(tileSpaces[listElement]);
            cell.appendChild(text);
            listElement++;
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    gameBoard.appendChild(tbody);
}
function anotherMove()
{
    move++;
    newMove = document.createTextNode(move);
    counter.removeChild(counter.firstChild);
    counter.appendChild(newMove);
}
function checkAdj(tableCell) {
    var colNum = tableCell.cellIndex,
        parNode = tableCell.parentNode,
        numNodes = parNode.cells.length;
    function swap(a, b) {
        anotherMove();
        var temp = a.innerHTML;
        a.innerHTML = b.innerHTML;
        b.innerHTML = temp;
    }//change to not null later maybe
    function checkWin() {
        var curBoardState;
        function gatherCells()
        {
            var i, x,
                curState = new Array();
            for(i = 0; i < gameBoard.firstChild.childNodes.length; i++) {
                for(x = 0; x < gameBoard.firstChild.childNodes[i].childNodes.length; x++) {
                    curState.push(gameBoard.firstChild.childNodes[i].childNodes[x].innerHTML);
                }
            }
            return curState;
        }
        curBoardState = gatherCells();
        function iterateThrough(startPos, curBoardState){
            var win = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                i;
            for(i = 0; i < win.length; i++) {
                if(win[i] != curBoardState[startPos]){
                    return false;
                }
                startPos++; 
            }
            return true;
        }
        function youWin(){
            alert("you win!");
            //prompt
            var again = confirm("Do you want to play again?");
            if(again) {
                newGame();
            }
        }

        if(curBoardState[0] === " ") {
            if(iterateThrough(1, curBoardState)) {
                youWin();
                return true;
            }
        }
        else if(curBoardState[curBoardState.length -1] === " ") {
            if(iterateThrough(0, curBoardState)) {
                youWin();
                return true;
            }
        }
        else{
            return false;
        }
        return;
    }
    if(tableCell.cellIndex >= 1 && tableCell.previousSibling.innerHTML === " ") {
        swap(tableCell, tableCell.previousSibling);
        checkWin();
        return;
    }
    if(tableCell.cellIndex < numNodes - 1 && tableCell.nextSibling.innerHTML === " ") {
        swap(tableCell, tableCell.nextSibling);
        checkWin();
        return;
    }
    if(parNode.previousSibling !== null && parNode.previousSibling.childNodes[colNum].innerHTML === " ") {
        swap(tableCell, parNode.previousSibling.childNodes[colNum]);
        checkWin();
        return;
    }
    if(parNode.nextSibling !== null && parNode.nextSibling.childNodes[colNum].innerHTML === " ") {
        swap(tableCell, parNode.nextSibling.childNodes[colNum]);
        checkWin();
        return;
    }
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

//repeat();
//tiles = shuffle(tiles);
buildGameBoard(gameBoard, tiles);
optionsButtons();
counter.appendChild(newMove);
//alert(document.getElementById("gameBoard").rows[0].cells.length);//get num cols
//alert(document.getElementById("gameBoard").rows[2].cells.item(1).innerHTML);//get inside of second cell of row 1
//alert(document.getElementById("gameBoard").rows[2].cells.item(1).cellIndex);//get index of cell
//checkAdj();
