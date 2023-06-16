import * as THREE from 'three';

// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerWidth);
// document.body.appendChild(renderer.domElement)

const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer( {canvas: canvas} )
renderer.setSize(window.innerWidth, window.innerHeight);