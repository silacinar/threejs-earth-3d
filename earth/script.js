const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0xffffff, 1); // Her şeyi aydınlat
scene.add(light);

const geometry = new THREE.SphereGeometry(2, 64, 64);

const textureLoader = new THREE.TextureLoader();
textureLoader.load(
  'https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg',
  function(texture) {
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    function animate() {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.002;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  },
  undefined,
  function(error) {
    console.error('❌ Texture yüklenemedi:', error);
  }
);
