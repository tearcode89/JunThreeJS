import * as THREE from 'three';

export default function ex06_02() {
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

    camera.position.z = 5;
    camera.zoom = 0.5
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0)

    scene.add(camera);

    const light = new THREE.DirectionalLight(0xffffff, 0.4);
    light.position.x = 2;
    light.position.z = 3;
    scene.add(light)

    // Mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: '#6667ab'
    });

    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);

    const clock = new THREE.Clock(); // Clock 자체가 경과된 시간을 숫자 값으로 가지고 있다.

    // console.log(Date.now()

    let oldTime = Date.now()
    function draw() {
        const newTime = Date.now()
        const deltaTime = newTime - oldTime;
        oldTime = newTime
        // mesh.rotation.x += 0.1 // 라디안 기준
        // mesh.rotation.y += 0.1
        // mesh.rotation.z += 0.1
        mesh.rotation.y += deltaTime * 0.001;
        mesh.position.y += deltaTime * 0.001;
        if(mesh.position.y > 3) {
            mesh.position.y = 0;
        }
        renderer.render(scene, camera);

        // window.requestAnimationFrame(draw);
        renderer.setAnimationLoop(draw);
    }

    function setSize() {
        camera.aspect = window.innerWidth/ window.innerHeight
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }

    //이벤트
    window.addEventListener('resize', setSize);

    draw();
}