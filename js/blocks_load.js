var loadImage = function () {
	var thiss = this;
	var canvas = document.querySelector("#outputCanvas");
	var context = canvas.getContext('2d');
	var img = new Image();
	var url = null;
	if (this.options) {
		url = this.options['url'];
	}
	img.src = url ? url : "img/rmc.jpg";
	var maxWidth = 320;
	var maxHeight = 240;
	
	img.onload = function() {
		var newSize = resize(img, maxWidth, maxHeight);
		context.drawImage(img, 0, 0, newSize[0], newSize[1]);
		VB.interpreter.dictionary["canvas"] = canvas;
		
		thiss.executeNext();
	};	
};

var loadVideo = function () {
	var thiss = this;
	var canvas = document.querySelector("#outputCanvas");
	var context = canvas.getContext('2d');
	var video = document.getElementById("inputVideo");
	
	var def = "img/fox.mp4";
	
	if (video.src.indexOf(def) == -1) {
		video.src = def;
	}
	
	if (video.paused) {
		video.play();
	}
	
	context.drawImage(video, 0, 0, canvas.width, canvas.height);
	VB.interpreter.dictionary["canvas"] = canvas;
	thiss.executeNext();
};

var loadWebcam = function () {
	var thiss = this;
	var canvas = document.querySelector("#outputCanvas");
	var context = canvas.getContext('2d');
	var video = document.getElementById("inputVideoCam");
	if (navigator.getUserMedia) {	
		if(video.paused) video.play();
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		VB.interpreter.dictionary["canvas"] = canvas;
		thiss.executeNext();
	} else {
		console.error("Can't access webcam...");
	}
};
