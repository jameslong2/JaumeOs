import * as THREE from 'three';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('black');
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 2000);
const renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true });
renderer.setSize(window.innerWidth, window.innerHeight);
window.onresize = function () {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
};
var canvas = document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 0.6;
controls.minDistance = 0.6;
controls.maxPolarAngle = 1.6;
controls.minPolarAngle = 1.4;
controls.maxAzimuthAngle = 0.1;
controls.minAzimuthAngle = -0.1;
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.enablePan = false;
controls.target = new THREE.Vector3(0.22, 3.3, 0.5);
//
var activeScreen = "OS";
var inputMat = new THREE.MeshStandardMaterial();
inputMat.emmisiveColor = new THREE.Color("white");
inputMat.opacity = 0;
inputMat.transparent = true;
var inputPASS = new THREE.Mesh(new THREE.BoxGeometry(0.37, 0.12, 0.05), inputMat);
inputPASS.name = "password";
scene.add(inputPASS);
inputPASS.position.y += 3.36;
inputPASS.position.x += 0.317;

var inputAbout = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.05), inputMat);
inputAbout.name = "about";
scene.add(inputAbout);
inputAbout.position.y += 3.587;
inputAbout.position.x += 0.147;

var inputProyects = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.05), inputMat);
inputProyects.name = "proyects";
scene.add(inputProyects);
inputProyects.position.y += 3.587;
inputProyects.position.x += 0.425;

var inputJobs = new THREE.Mesh(new THREE.BoxGeometry(0.47, 0.2, 0.05), inputMat);
inputJobs.name = "jobs";
scene.add(inputJobs);
inputJobs.position.y += 3.367;
inputJobs.position.x += 0.285;

var inputDown = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.07, 0.03), inputMat);
inputDown.name = "down";
scene.add(inputDown);
inputDown.position.y += 3.377;
inputDown.position.x += 0.164;
inputDown.position.z -= 0.04;

var inputUp = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.07, 0.03), inputMat);
inputUp.name = "up";
scene.add(inputUp);
inputUp.position.y += 3.377;
inputUp.position.x += 0.405;
inputUp.position.z -= 0.04;

var inputSelect = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.07, 0.03), inputMat);
inputSelect.name = "select";
scene.add(inputSelect);
inputSelect.position.y += 3.3;
inputSelect.position.x += 0.405;
inputSelect.position.z -= 0.04;

var inputBack = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.07, 0.03), inputMat);
inputBack.name = "back";
scene.add(inputBack);
inputBack.position.y += 3.3;
inputBack.position.x += 0.164;
inputBack.position.z -= 0.04;
//
var pantalla = undefined;
var canvas = document.getElementById("pantalla");
canvas.width *= 4;
canvas.height *= 6;
var ctx = canvas.getContext("2d");
osScreen();
var pantallaTex = new THREE.CanvasTexture(canvas);
pantallaTex.needsUpdate = true;
var loadingText = document.getElementById("loadingTxt");
const loader = new GLTFLoader();
loader.load(
	'./assets/computer/outputFinal.glb',
	function (gltf) {
		scene.add(gltf.scene);
		scene.traverse(
			function (obj) {
				//console.log(obj);
				if (obj.name === "Scene") {
					pantalla = obj.children[5];
					pantalla.material.map = pantallaTex;
					pantalla.material.emissiveMap = pantallaTex;
				}
			}
		);
		loadingText.style.display = "none";
	},
	function (xhr) {
		loadingText.innerText = "Loading " + Math.trunc(xhr.loaded / xhr.total * 100) + "%";
		//console.log((xhr.loaded / xhr.total * 100) + '% loaded');

	},
	function (error) {

		//console.log('An error happened');

	}
);
//

//
requestAnimationFrame(Update);
function Update() {
	requestAnimationFrame(Update);
	controls.update();
	pantallaTex.needsUpdate = true;
	renderer.render(scene, camera);
}
var focusInput;
const raycaster = new THREE.Raycaster();
var downOffset = 1;
var selectedProject = 0;
var actualTop = 0;
var downOffsetJobs = 1;
var selectedProjectJobs = 0;
var actualTopJobs = 0;
var videoPlaying = false;
var listProjects = [
	["Multiplayer Asteroids", "./VideosWeb/1.mp4"],
	["Rtype Game", "./VideosWeb/2.mp4"],
	["VR Billiard", "./VideosWeb/3.mp4"],
	["2D Shooter", "./VideosWeb/4.mp4"],
	["Tower Defense Game", "./VideosWeb/5.mp4"],
	["Circular Tetris", "./VideosWeb/6.mp4"],
	["Ball Game(Play Store)", "./VideosWeb/7.mp4"],
	["Lightspeed(Play Store)", "./VideosWeb/8.mp4"],
	["Terminal Pacman", "./VideosWeb/9.mp4"],
	["3D 2048", "./VideosWeb/10.mp4"],
	["Java Card Game", "./VideosWeb/11.mp4"],
	["Java 2048", "./VideosWeb/12.mp4"],
	["Java Casino Roulette", "./VideosWeb/13.mp4"]

];
var listJobs = [
	["Tetravol(April 2023 - July 2023)", "https://www.tetravol.com/"]
];
document.onclick = function (e) {

	raycaster.setFromCamera(new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1,
		(e.clientY / window.innerHeight) * -2 + 1), camera);
	var result = raycaster.intersectObjects([inputPASS, inputAbout, inputJobs, inputProyects, inputDown, inputUp, inputBack, inputSelect]);
	for (var i = 0; i < result.length; i++) {
		var breakFor = false;
		switch (result[i].object.name) {
			case "password":
				if (activeScreen === "OS") {
					document.getElementById("pwd").focus();
					focusInput = setTimeout(blinkCursor, 1000);
					activeScreen = "OS";
					breakFor = true;
				}
				break;
			case "about":
				if (activeScreen === "menu") {
					aboutMeScreen();
					activeScreen = "aboutMe";
					breakFor = true;
				}
				break;
			case "proyects":
				if (activeScreen === "menu") {
					breakFor = true;
					activeScreen = "proyects";
					projectsScreen();
				}
				break;
			case "jobs":
				if (activeScreen === "menu") {
					activeScreen = "jobs";
					jobsScreen();
					breakFor = true;
				}
				break;
			case "up":
				if (downOffset > 1 && videoPlaying == false && activeScreen === "proyects") {
					downOffset--;
					selectedProject--;
					if (actualTop >= 1) {
						actualTop--;
					}
					projectsScreen();
					breakFor = true;
				} else if (downOffset > 1 && videoPlaying == false && activeScreen === "jobs") {
					downOffsetJobs--;
					selectedProjectJobs--;
					if (actualTopJobs >= 1) {
						actualTopJobs--;
					}
					jobsScreen();
					breakFor = true;
				}
				break;
			case "down":
				if (downOffset < listProjects.length && videoPlaying == false && activeScreen === "proyects") {
					downOffset++;
					if (activeScreen === "proyects") {
						selectedProject++;
						if (selectedProject >= 5) {
							actualTop++;
						}
						projectsScreen();
						breakFor = true;
					}
				} else if (downOffsetJobs < listJobs.length && videoPlaying == false && activeScreen === "jobs") {
					downOffsetJobs++;
					selectedProjectJobs++;
					if (selectedProjectJobs >= 5) {
						actualTopJobs++;
					}
					jobsScreen();
					breakFor = true;
				}
				break;
			case "select":
				if (activeScreen === "proyects") {
					document.getElementById('video').src = listProjects[selectedProject][1];
					videoPlaying = true;
					document.getElementById('video').play();
				} else if (activeScreen === "jobs") {
					window.open(listJobs[selectedProjectJobs][1], '_blank').focus();
				}
				break;
			case "back":
				if (activeScreen === "proyects" && videoPlaying == true) {
					clearTimeout(focusInput);
					document.getElementById('video').pause();
					projectsScreen();
					breakFor = true;
					videoPlaying = false;
				} else if (activeScreen === "jobs" && videoPlaying == true) {
					breakFor = true;
					videoPlaying = false;
				} else {
					loadMainScreen();
					activeScreen = "menu";
					breakFor = true;
				}
				break;

		}
		if (breakFor)
			break;
	}
}
var actualY = 200;

function projectsScreen() {
	actualY = 200;
	ctx.fillStyle = "#030303";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font = "50px text";
	ctx.fillStyle = "#00ff00";
	ctx.textAlign = "left";
	for (var i = actualTop; i < listProjects.length; i++) {
		ctx.fillStyle = "#00ff00";
		if (i === selectedProject) {
			ctx.fillRect(125, actualY - 50, 900, 75);
			ctx.fillStyle = "#030303";
		}
		ctx.fillText(listProjects[i][0], 150, actualY);
		actualY += 80;
	}
	elementsUI(550);
}
function jobsScreen() {
	actualY = 200;
	ctx.fillStyle = "#030303";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font = "50px text";
	ctx.fillStyle = "#00ff00";
	ctx.textAlign = "left";
	for (var i = actualTopJobs; i < listJobs.length; i++) {
		ctx.fillStyle = "#00ff00";
		if (i === selectedProjectJobs) {
			ctx.fillRect(125, actualY - 50, 900, 75);
			ctx.fillStyle = "#030303";
		}
		ctx.fillText(listJobs[i][0], 150, actualY);
		actualY += 80;
	}
	elementsUI(550);
}
function elementsUI(y) {
	var down = document.getElementsByClassName("iconosOs")[3];
	var up = document.getElementsByClassName("iconosOs")[4];
	ctx.fillStyle = "#030303";
	ctx.fillRect(0, y, canvas.width, canvas.height);
	ctx.fillStyle = "#00ff00";
	ctx.fillRect(125, y + 20, 450, 100);
	ctx.drawImage(down, 325, y + 50, 50, 50);

	ctx.fillStyle = "#00ff00";
	ctx.fillRect(600, y + 20, 450, 100);
	ctx.drawImage(up, 800, y + 50, 50, 50);
	//
	ctx.strokeRect(125, y + 145, 450, 100);
	ctx.stroke();
	ctx.strokeRect(600, y + 145, 450, 100);
	ctx.stroke();
	//
	ctx.font = "50px text";
	ctx.fillStyle = "#00ff00";
	ctx.fillText("BACK", 290, y + 212);
	ctx.fillText("SELECT", 745, y + 212);
}
function aboutMeScreen() {
	ctx.fillStyle = "#030303";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font = "50px text";
	ctx.fillStyle = "#00ff00";
	var string = "My name is Jaume, I'm an\n enthusiastic programmer.\nI like to learn and \ninvestigate on my own in\n a self-taught way.";
	var lines = string.split('\n');
	for (var i = 0; i < lines.length; i++)
		ctx.fillText(lines[i], canvas.width / 2, 150 + 75 * i);
	ctx.textAlign = "left";
	ctx.fillStyle = "#00ff00";
	ctx.strokeRect(125, 550 + 145, 450, 100);
	ctx.stroke();
	ctx.font = "50px text";
	ctx.fillStyle = "#00ff00";
	ctx.fillText("BACK", 290, 550 + 212);
}
function osScreen() {
	ctx.fillStyle = "#030303";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	var title = new FontFace('title', 'url(./title2.ttf)');
	title.load().then(function (font) {
		document.fonts.add(font);
		ctx.font = "170px title";
		ctx.fillStyle = "#00ff00";
		ctx.textAlign = "center";
		ctx.fillText("Jaume OS", canvas.width / 2, canvas.height / 2 - 120);
	});
	var passwd = new FontFace('text', 'url(./text.ttf)');
	passwd.load().then(function (font) {
		document.fonts.add(font);
		ctx.font = "50px text";
		ctx.fillStyle = "#00ff00";
		ctx.textAlign = "center";
		ctx.fillText("PASSWORD:", canvas.width / 2, canvas.height / 2 + 20);
	});
	ctx.fillStyle = "#00ff00";
	ctx.fillRect(300, 550, 700, 200);
	ctx.fillStyle = "#030303";
	ctx.fillRect(300 + 10, 550 + 10, 680, 180);
}
var cursor = false;
var currentX = 0;
var inputPwd = document.getElementById("pwd");
inputPwd.addEventListener('input', writeText);
inputPwd.addEventListener('focusout', stopBlink);
inputPwd.addEventListener('keyup', function (e) {
	if (e.key === "Enter" && inputPwd.value === "1234") {
		loadMainScreen();
		activeScreen = "menu";
		clearTimeout(focusInput);
	}
});

var video = document.getElementById('video');

video.addEventListener('play', function () {
	var $this = this;
	(function loop() {
		if (!$this.paused && !$this.ended) {
			ctx.drawImage($this, 0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#00ff00";
			ctx.strokeRect(125, 550 + 145, 450, 100);
			ctx.stroke();
			ctx.font = "50px text";
			ctx.fillStyle = "#00ff00";
			ctx.fillText("BACK", 290, 550 + 212);
			focusInput = setTimeout(loop, 1000 / 30);
		}
	})();
}, 0);

function loadMainScreen() {
	ctx.textAlign = "center";
	ctx.fillStyle = "#030303";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.lineWidth = 7;
	//
	ctx.strokeStyle = '#00ff00';
	ctx.strokeRect(137.5, 100, 375, 337.5);
	ctx.stroke();
	ctx.strokeRect(687.5, 100, 375, 337.5);
	ctx.stroke();
	ctx.strokeRect(137.5, 475, 925, 325);
	ctx.stroke();
	//s
	var profile = document.getElementsByClassName("iconosOs")[0];
	var proyects = document.getElementsByClassName("iconosOs")[1];
	var jobs = document.getElementsByClassName("iconosOs")[2];
	ctx.drawImage(profile, 200, 125, profile.width * 2.7, profile.height * 2.7);
	ctx.drawImage(proyects, 750, 125, profile.width * 2.7, profile.height * 2.7);
	ctx.drawImage(jobs, canvas.width / 2 - profile.width * 1.35, 500, profile.width * 2.7 + 50, profile.height * 1.7 + 50);
	ctx.font = "70px text";
	ctx.fillStyle = "#00ff00";
	ctx.fillText("ABOUT ME", 325, 400);
	ctx.fillText("PROJECTS", 875, 400);
	ctx.fillText("PREVIOUS JOBS", canvas.width / 2, 762.5);
	clearTimeout(focusInput);
}
function stopBlink() {
	clearTimeout(focusInput);
	ctx.fillStyle = "#030303";
	ctx.fillRect(canvas.width / 3.2 - 1 + currentX, canvas.height / 8 - 1 + 500, canvas.width / 40 + 1, canvas.height / 14 + 2);
	cursor = true;
}
function blinkCursor() {
	if (cursor) {
		ctx.fillStyle = "#030303";
		ctx.fillRect(canvas.width / 3.2 - 1 + currentX, canvas.height / 8 - 1 + 500, canvas.width / 40 + 1, canvas.height / 14 + 2);
	} else {
		ctx.fillStyle = "#00ff00";
		ctx.fillRect(canvas.width / 3.2 + currentX, canvas.height / 8 + 500, canvas.width / 40, canvas.height / 14);
	}
	cursor = !cursor;
	focusInput = setTimeout(blinkCursor, 1000);
}
function writeText(e) {
	currentX = 0;
	ctx.fillStyle = "#030303";
	ctx.fillRect(300 + 10, 550 + 10, 680, 180);
	ctx.font = "70px text";
	ctx.fillStyle = "#00ff00";
	if (e.target.value.length > 4) {
		var newVal = "";
		for (var i = 0; i < 4; i++) {
			newVal += e.target.value[i];
		}
		inputPwd.value = newVal;
	}
	for (var i = 0; i < e.target.value.length; i++) {
		ctx.fillText("*", canvas.width / 3.2 + currentX, canvas.height / 1.5 + 80);
		currentX += 140;
	}
	ctx.fillStyle = "#00ff00";
	ctx.fillRect(canvas.width / 3.2 + currentX, canvas.height / 8 + 500, canvas.width / 40, canvas.height / 14);
	cursor = !cursor;
}
