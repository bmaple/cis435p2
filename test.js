/*jslint browser: true, ass: true, plusplus: true, white: true */
var clock=document.getElementById("clock");
var sec=0, min=0, hour=0;

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
	function clockFormat()
	{
		var curTime;
		if(hour == 0)
			curTime = "00";
		else if(hour < 9)
			curTime = "0" + hour;
		else 
			curTime = hour;

			curTime += ":";
		if(min < 9)
			curTime += "0" + min;
		else if(min== 0)
			curTime += "00";
		else 
			curTime += min;
			
			curTime += ":";
		if(sec < 9)
			curTime += "0" + sec;
		else if(sec == 0)
			curTime += "00";
		else 
			curTime += sec;
			
		return curTime;
	}
	clock.innerHTML = clockFormat();
	repeat();
}
function repeat() {
	setTimeout(tick, 1000);
}
repeat();
