import * as THREE from 'three';

// ----- 주제: AxesHelper, GridHelper

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.x = 1;
	camera.position.y = 3;
	camera.position.z = 0;
	scene.add(camera); // 카메라가 (1,3,0 위치에 있다고만 했지, 어느곳을 바라보고 있다고는 알 수없다 그 위치에 있으니까 그냥 그 위치에만 존재하고 어느곳도 응시하고 있지 않다.

	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight) // AmbientLight는 은은하게 조명을 비주는 작업을 의미한다.
	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// AxesHelper
	const axesHelper = new THREE.AxesHelper(3);
	scene.add(axesHelper);

	// GridHelper
	const gridHelper = new THREE.GridHelper(5);
	scene.add(gridHelper)

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = 2;
	scene.add(mesh);

	camera.lookAt(mesh.position) //

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const time = clock.getElapsedTime();

		mesh.rotation.y = time;

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
