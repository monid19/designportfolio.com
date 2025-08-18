const imageCount = 16;
const bagImage = 'bag.png'; // Replace with your image path
const dodgeSpeed = 1;
const avoidRadius = 150;

const floaties = [];
const container = document.getElementById('background-layer');

for (let i = 0; i < imageCount; i++) {
  const img = document.createElement('img');
  img.src = bagImage;
  img.classList.add('floaty');
  container.appendChild(img);

  // Random starting position inside window bounds (accounting for image size 60x60)
  const pos = {
    x: Math.random() * (window.innerWidth - 60),
    y: Math.random() * (window.innerHeight - 60),
  };

  // Random initial velocity (direction and speed)
  const angle = Math.random() * 2 * Math.PI;
  const speed = dodgeSpeed;  // start moving at dodgeSpeed to keep consistent speed
  const vel = {
    x: Math.cos(angle) * speed,
    y: Math.sin(angle) * speed,
  };

  floaties.push({
    el: img,
    pos,
    vel,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 0.5,
  });
}

let mouse = { x: -9999, y: -9999 };

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function move() {
  for (const f of floaties) {
    const dx = f.pos.x + 30 - mouse.x;
    const dy = f.pos.y + 30 - mouse.y;
    const dist = Math.hypot(dx, dy);

    if (dist < avoidRadius) {
      // Dodge: set velocity directly away from mouse at dodgeSpeed
      const angle = Math.atan2(dy, dx);
      f.vel.x = Math.cos(angle) * dodgeSpeed;
      f.vel.y = Math.sin(angle) * dodgeSpeed;
    }
    // No slowing down — velocity stays as is when not dodging

    f.pos.x += f.vel.x;
    f.pos.y += f.vel.y;

    // Bounce off edges and keep inside bounds
    if (f.pos.x < 0) {
      f.pos.x = 0;
      f.vel.x *= -1;
    } else if (f.pos.x > window.innerWidth - 60) {
      f.pos.x = window.innerWidth - 60;
      f.vel.x *= -1;
    }

    if (f.pos.y < 0) {
      f.pos.y = 0;
      f.vel.y *= -1;
    } else if (f.pos.y > window.innerHeight - 60) {
      f.pos.y = window.innerHeight - 60;
      f.vel.y *= -1;
    }

    // Rotation
    f.rotation += f.rotationSpeed;

    f.el.style.transform = `translate(${f.pos.x}px, ${f.pos.y}px) rotate(${f.rotation}deg)`;
  }

  requestAnimationFrame(move);
}

move();
