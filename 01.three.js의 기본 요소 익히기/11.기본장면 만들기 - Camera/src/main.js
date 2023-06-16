import * as THREE from 'three';

// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerWidth);
// document.body.appendChild(renderer.domElement)

const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer( {canvas: canvas} )
renderer.setSize(window.innerWidth, window.innerHeight);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75, // 시야각(field of view)
    window.innerHeight/window.innerHeight, // aspect (종횡비)
    0.1, // near
    1000 // far
);
scene.add(camera); // scene에 카메라 붙이기 옵션값이 따로 주어지지 않으면 (0,0,0)에 위치한다.
// (0,0,0) 포지션은 보통 mesh의 위치일텐데 그러면 당연히 카메라가 피사체를 제대로 인지하지 못한다.

camera.position.z = 5;