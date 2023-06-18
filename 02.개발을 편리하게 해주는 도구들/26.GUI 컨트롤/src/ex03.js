import * as THREE from 'three';
import Stats from 'stats.js';
import dat from 'dat.gui'
// ----- 주제: 초당 프레임 수 보기(status)

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

	camera.position.y = 1;
	camera.position.z = 5;
	scene.add(camera); // 카메라가 (1,3,0 위치에 있다고만 했지, 어느곳을 바라보고 있다고는 알 수없다 그 위치에 있으니까 그냥 그 위치에만 존재하고 어느곳도 응시하고 있지 않다.

	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight) // AmbientLight는 은은하게 조명을 비주는 작업을 의미한다.
	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	const gui = new dat.GUI();
	// gui.add(mesh.position, 'y', -5, 5, 0.01);

	gui
		.add(mesh.position,'z')
		.min(-10)
		.max(3)
		.step(0.01)
		.name('메쉬의 z 위치')
	gui.add(camera.position, 'x', -10, 10, 0.01).name('카메라 x 위치')
	gui.add(camera.position, 'y', -10, 10, 0.01).name('카메라 y 위치')
	gui.add(camera.position, 'z', -10, 10, 0.01).name('카메라 z 위치')

	camera.lookAt(mesh.position)
	const stats = new Stats();
	document.body.append(stats.domElement);

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const time = clock.getElapsedTime();

		stats.update();
		mesh.rotation.y = time;


		camera.lookAt(mesh.position);

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
