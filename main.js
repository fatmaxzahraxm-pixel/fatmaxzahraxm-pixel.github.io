import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TDSLoader } from 'three/addons/loaders/TDSLoader.js';

// 1. Setup Three.js Scene
const canvas = document.querySelector('#webgl-canvas');
const scene = new THREE.Scene();

// Camera setup
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 6;
scene.add(camera);

// Renderer setup
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, // Important: lets CSS background color show through
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 2. Add Objects (Silhouette of a student with glasses)
// We space objects equally on the Y axis, aligned with our HTML sections
const objectsDistance = 4;
const sectionMeshes = [];

const gltfLoader = new GLTFLoader();

gltfLoader.load(
    'models/uploads_files_5657419_Female_Human.glb',
    (gltf) => {
        // Basic setup for the loaded model
        const model = gltf.scene;
        model.scale.set(1.5, 1.5, 1.5); // Increase scale

        // Rotate the model so it faces the camera properly
        // Math.PI was facing left, let's try Math.PI * 1.5 to face front
        model.rotation.y = Math.PI * 1.5;

        // Let's create materials to match the previous aesthetic but keep it nice
        model.traverse((child) => {
            if (child.isMesh) {
                // Changing color to a soft gold/beige that matches the CV's aesthetic
                child.material = new THREE.MeshToonMaterial({ color: '#cca27d' });
            }
        });

        // Clone the model once for the About section (2nd section)
        const mesh2 = model.clone();

        // Position object matching the 'about' section
        mesh2.position.y = -objectsDistance * 1 - 0.5;

        // Position object horizontally to balance text layout
        mesh2.position.x = -1.5;  // About text is on right, object left

        scene.add(mesh2);
        sectionMeshes.push(mesh2);
    }
);

// Load the Retro Computer for the Hero Section (next to "Fatma Marzouk")
gltfLoader.load(
    'models/the_iop-retro-computer-2703.glb',
    (gltf) => {
        const computer = gltf.scene;

        // Adjust scale (multiplied by 4 as requested)
        computer.scale.set(2, 2, 2);

        // Turn it slightly so it looks good
        computer.rotation.y = -Math.PI * 0.2;
        computer.rotation.x = Math.PI * 0.1;

        // Position at the first section
        computer.position.y = -objectsDistance * 0 - 0.5;
        // Text is on the left, so object goes on the right
        computer.position.x = 1.5;

        scene.add(computer);

        // Add it to the BEGINNING of sectionMeshes so it corresponds to index 0 
        // and animated scroll/parallax logic works in order (Hero -> About -> -> -> Sport)
        sectionMeshes.unshift(computer);
    }
);

// Load the Sport 3D model (Boat/Yacht)
const tdsLoader = new TDSLoader();
tdsLoader.setResourcePath('models/');
tdsLoader.load(
    'models/Yaht N020419.3ds',
    (object) => {
        // Basic scale and rotation settings to match the scene aesthetic
        object.scale.set(3.5, 3.5, 3.5);
        object.rotation.x = -Math.PI / 2; // Usually 3DS models are Z-up, converting to Y-up

        // Position it at the "Sport" section (index 5)
        object.position.y = -objectsDistance * 5 - 0.5;
        // The text is on the right ("section right"), so the object goes on the left
        object.position.x = -1.5;

        // Apply a fun material or let it keep its textures
        object.traverse((child) => {
            if (child.isMesh) {
                // If the model looks weird, you can force the toon material here too
                // child.material = new THREE.MeshToonMaterial({ color: '#cca27d' });
            }
        });

        scene.add(object);
        sectionMeshes.push(object); // Adding it so it gets the floating animation
    }
);


// Lights
const directionalLight = new THREE.DirectionalLight('#ffffff', 2);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
scene.add(ambientLight);

// 3. Scroll Animation with GSAP
// Connect HTML scrollbar to Three.js camera position
gsap.registerPlugin(ScrollTrigger);

// Move the Camera alongside page scroll
gsap.to(camera.position, {
    y: -objectsDistance * 6, // Target position (last object is further down now)
    ease: "none",
    scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: true // Scrub syncs animation playhead to scroll position
    }
});

// Optional: Give them dynamic Entrance/parallax positions instead of full rotations
sectionMeshes.forEach((mesh, index) => {
    // We can just add a subtle parallax or let it sit statically. 
    // Here we just keep a subtle parallax on Y.
    gsap.to(mesh.position, {
        y: mesh.position.y - 0.5, // Moves slightly down via scroll
        ease: "none",
        scrollTrigger: {
            trigger: "main",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
});

// 4. Handle Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera param
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// 5. Animation Loop (Add a subtle continuous bobbing/rotation)
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    // Add a very subtle continuous floating/bobbing logic (instead of rotation)
    for (const mesh of sectionMeshes) {
        // Just a subtle floating effect on Y based on sine wave
        // Since original Y is tied to sections, we add the bobbing to a placeholder or carefully
        mesh.position.y += Math.sin(elapsedTime) * deltaTime * 0.1;

        // Let's add a slight rotation if the mesh is our boat (index 1)
        if (sectionMeshes.indexOf(mesh) === 1) {
            mesh.rotation.y += 0.005; // Gentle rotation specifically for the boat
            mesh.rotation.z += Math.sin(elapsedTime) * 0.001; // Tiny pitch rocking motion
        }
    }

    // Render Scene
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();

// 6. Handle RTL Language Switching
window.addEventListener('languageChanged', (e) => {
    // If RTL, text is inverted to opposite side by flex-box. We must invert 3D object X-positions.
    const direction = e.detail.isRtl ? -1 : 1;

    // Animate mesh positions gracefully if meshes are loaded
    if (sectionMeshes.length > 0) {
        gsap.to(sectionMeshes[0].position, { x: -1.5 * direction, duration: 0.8, ease: "power2.out" });
    }
    if (sectionMeshes.length > 1) {
        gsap.to(sectionMeshes[1].position, { x: -1.5 * direction, duration: 0.8, ease: "power2.out" });
    }
});
