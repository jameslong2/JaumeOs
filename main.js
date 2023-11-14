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
controls.target = new THREE.Vector3(0.2, 3.3, 0.5);
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
//
var pantalla = undefined;
var canvas = document.getElementById("pantalla");
canvas.width *= 4;
canvas.height *= 6;
var ctx = canvas.getContext("2d");
osScreen();
var pantallaTex = new THREE.CanvasTexture(canvas);
pantallaTex.needsUpdate = true;
var loadingText = document.GetElementById("loadingTxt");
const loader = new GLTFLoader();
loader.load(
	'./assets/computer/modelo4.glb',
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
		loadingText.text = "Loading "+(xhr.loaded / xhr.total * 100).toString()+"%";
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
document.onclick = function (e) {

	raycaster.setFromCamera(new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1,
		(e.clientY / window.innerHeight) * -2 + 1), camera);
	var result = raycaster.intersectObjects([inputPASS,inputAbout,inputJobs,inputProyects]);
	for (var i = 0; i < result.length; i++)
	{
		var breakFor = false;
		switch (result[i].object.name){
			case "password":
				if (activeScreen === "OS"){
					document.getElementById("pwd").focus();
					focusInput = setTimeout(blinkCursor, 1000);
					activeScreen = "menu";
					breakFor = true;
				}
				break;
			case "about":
				if (activeScreen === "menu"){
					aboutMeScreen();
					activeScreen = "aboutMe";
					breakFor = true;
				}
				break;
			case "proyects":
				if (activeScreen === "menu"){
					breakFor = true;
				}
				break;
			case "jobs":
				if (activeScreen === "menu"){
					breakFor = true;
				}
				break;
		}
		if (breakFor)
			break;
	}
}
function aboutMeScreen(){
	ctx.fillStyle = "#030303";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font = "50px text";
	ctx.fillStyle = "#00ff00";
	var string = "My name is Jaume, I'm an\n enthusiastic programmer.\nI like to learn and \ninvestigate on my own in\n a self-taught way.";
	var lines = string.split('\n');
	for (var i = 0; i < lines.length; i++)
		ctx.fillText(lines[i], canvas.width/2, 150+75*i);
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
		clearTimeout(focusInput);
		//1200 por 900
		//gifler('./gif.gif').animate('canvas.pantalla');
	}
});

function DrawVideo() {
	ctx.drawImage(frames[actualFrame], 0, 0);
	actualFrame++;
	if (actualFrame >= frames.length)
		actualFrame = 0;
	setTimeout(DrawVideo,100)
  }

function loadMainScreen() {
	ctx.fillStyle = "#030303";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.lineWidth = 7;
	//
	ctx.strokeStyle = '#00ff00';
	ctx.rect(137.5, 100, 375, 337.5);
	ctx.stroke();
	ctx.rect(687.5, 100, 375, 337.5);
	ctx.stroke();
	ctx.rect(137.5, 475, 925, 325);
	ctx.stroke();
	//s
	var profile = document.getElementsByClassName("iconosOs")[0];
	var proyects = document.getElementsByClassName("iconosOs")[1];
	var jobs = document.getElementsByClassName("iconosOs")[2];
	ctx.drawImage(profile, 200, 125, profile.width / 2, profile.height / 2);
	ctx.drawImage(proyects, 750, 125, profile.width / 2, profile.height / 2);
	ctx.drawImage(jobs, canvas.width / 2 - profile.width / 4, 500, profile.width / 2 + 50, profile.height / 3 + 50);
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
