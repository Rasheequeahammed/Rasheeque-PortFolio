/* 
  QUANTUM THEME - 3D BACKGROUND LOGIC
  - Creates a "Neural Network" style particle system
  - Reacts to mouse movement
  - Responsive to window resize
*/
const canvas = document.querySelector('#bg-canvas');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// --- FLUID WAVE SETUP ---
const particlesGeometry = new THREE.BufferGeometry();
const count = 5000; // More particles for fluid look

const positions = new Float32Array(count * 3);
const scales = new Float32Array(count);

// Create a random cloud but we will move them in a wave
for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100; // Wide spread
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial({
    color: 0x00ffff, // Neon Cyan
    size: 0.15,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending // Glowing effect
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Camera Position
camera.position.z = 20; // Closer look for immersion
camera.position.y = 5;

// --- ANIMATION LOOP ---
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
});

const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime() * 0.5; // Slow time

    // Mouse Smooth Follow
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Rotate camera slightly based on mouse
    particles.rotation.y += 0.002;
    particles.rotation.x += (targetY - particles.rotation.x) * 0.05;
    particles.rotation.z += (targetX - particles.rotation.z) * 0.05;

    // Wavy motion for particles
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positions[i3]; // Keep original X

        // Complex wave function for "Fluid" look
        positions[i3 + 1] = Math.sin(elapsedTime + x * 0.5) * 2 + Math.sin(elapsedTime * 2 + x * 0.5) * 2;
        // Z movement for depth
        // positions[i3 + 2] += Math.sin(elapsedTime); 
    }

    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
