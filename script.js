var audio = new Audio('alarm.mp3');
var beepedAlready = false;
var prevDistance=240000;
var hostMode=false;
var ausrc=["x","alarm.mp3","hint.mp3","glass.mp3","chime.mp3"];
//MAIN LOOP
var x = setInterval(function() {

  var d = new Date();
  var temp = d.getTime();
  if(hostMode) temp-=5000;
  temp%=240000;
  var distance = 240000 - temp;
	
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  var milliseconds = Math.floor(distance % 1000 / 10);
  
  var hh,mm,ss,msms;
  

  if(minutes<10) mm='0'+minutes;
  else mm=minutes;
  if(seconds<10) ss='0'+seconds;
  else ss=seconds;
  if(milliseconds<10) msms='0'+milliseconds;
  else msms=milliseconds;
  
  document.getElementById("timer").innerHTML =mm + ":" + ss + ":"+ msms;
  
   if(distance > prevDistance && beepedAlready==false){
		beepedAlready = true;
		audio.play();	   
   }
   
   if(distance>239500) beepedAlready=false;

}, 50);
//MAIN LOOP

function clickme(){
	document.getElementById('clickme').style.display='none';
}

function changeVolume(val){
	changeIcon(val);
	audio.volume=val/100;
}

function changeIcon(val){
	document.getElementById("s1").style.display = "none";
	document.getElementById("s2").style.display = "none";
	document.getElementById("s3").style.display = "none";
	document.getElementById("sX").style.display = "none";

		if(val==0) document.getElementById("sX").style.display = "inline";
		else if(val>0 && val<=30) document.getElementById("s1").style.display = "inline";
		else if(val>30 && val<=70) document.getElementById("s2").style.display = "inline";
		else if(val>70) document.getElementById("s3").style.display = "inline";
}

function hostChange(c){
	hostMode=c.checked;
}

function changeSound(sel){
	audio.src=ausrc[sel];
	audio.load();
	audio.play();
}