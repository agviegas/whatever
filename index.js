import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

console.log(THREE);

// Basic elements

const canvas = document.getElementById("three-canvas");
const camera = new THREE.PerspectiveCamera();
camera.position.z = 3;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setAnimationLoop(animate);

// Geometry

const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshLambertMaterial({
  color: "red",
});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

// Lights

const firstLight = new THREE.DirectionalLight();
firstLight.position.y = 3;
firstLight.position.x = 2;
firstLight.position.z = 2;
scene.add(firstLight);

const secondLight = new THREE.DirectionalLight();
secondLight.position.y = 3;
secondLight.position.x = -4;
secondLight.position.z = -4;
scene.add(secondLight);

// Controls

const controls = new OrbitControls(camera, canvas);

// Animation

function animate() {
  controls.update();
  renderer.render(scene, camera);
}

// Aspect ratio

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

resize();

window.onresize = resize;

// Load model

const loader = new GLTFLoader();

loader.load("resources/police_station.glb", function (gltf) {
  scene.add(gltf.scene);
});

// loader.load(
//   // resource URL
//   "resources/police_station.glb",
//   // called when the resource is loaded
//   function (gltf) {
//     scene.add(gltf.scene);

//     console.log(gltf);

//     gltf.animations; // Array<THREE.AnimationClip>
//     gltf.scene; // THREE.Group
//     gltf.scenes; // Array<THREE.Group>
//     gltf.cameras; // Array<THREE.Camera>
//     gltf.asset; // Object
//   },
//   // called while loading is progressing
//   function (xhr) {
//     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//   },
//   // called when loading has errors
//   function (error) {
//     console.log("An error happened");
//   }
// );
