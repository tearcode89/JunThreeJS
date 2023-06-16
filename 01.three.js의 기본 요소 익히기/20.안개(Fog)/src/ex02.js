import * as THREE from 'three';

export default function ex02() {
    // Renderer
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer(
        {canvas: canvas, antialias: true} ) // antialias는 우리가 만들었던 정육면체를 화면을 확대해서 봤을 떄 굴곡이 있을 수 있는데 그것을 없애는 용도
    renderer.setSize(window.innerWidth, window.innerHeight);
    //console.log(window.devicePixelRatio) // 해당 기기의 픽셀 밀도
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.OrthographicCamera(
        -(window.innerWidth/window.innerHeight),
        window.innerWidth/window.innerHeight,
        1,
        -1,
        0.1,
        1000
    )
    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 2;
    camera.zoom = 0.5 // 40번줄을 먼저 적고 38번줄 끼워넣기
    camera.updateProjectionMatrix(); // 40 -> 38 -> 39 번 줄 순서로 적는다. 카메라 렌더에 대한 속성을 바꿨으면 이 작업이 진행되어야 한다.
    camera.lookAt(0, 0, 0) // 카메라가 매개변수 위치를 바라보게 한다. 37번 줄보다 선행된 작업

    scene.add(camera); // scene에 카메라 붙이기 옵션값이 따로 주어지지 않으면 (0,0,0)에 위치한다.
// (0,0,0) 포지션은 보통 mesh의 위치일텐데 그러면 당연히 카메라가 피사체를 제대로 인지하지 못한다.

    // Mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: '#6667ab'
    });

    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);

    renderer.render(scene, camera);
}