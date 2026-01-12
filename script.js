/* =========================================
   PORTFOLIO INTERACTIVE ENGINE
   Accurate to Neon-Pulse Branding
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Butter-Smooth Cursor Follower
  const cursor = document.getElementById("cursor-blur");
  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    let dx = mouseX - cursorX;
    let dy = mouseY - cursorY;
    // 0.1 creates a slight lag/elastic effect that feels high-end
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // 2. Technical Typewriter Logic
  const typeTarget = document.getElementById("typewriter");
  const logs = [
    "> INITIALIZING NEON_PULSE...",
    "> LOADING PROCEDURAL_AUDIO...",
    "> STABILIZING GLASSMORPHIC_SHELL...",
    "> SYSTEM_READY_V1.0",
  ];
  let logIdx = 0;
  let charIdx = 0;

  function writeLog() {
    if (charIdx < logs[logIdx].length) {
      typeTarget.textContent += logs[logIdx].charAt(charIdx);
      charIdx++;
      setTimeout(writeLog, 40);
    } else {
      setTimeout(clearLog, 2500);
    }
  }

  function clearLog() {
    if (charIdx > 0) {
      typeTarget.textContent = logs[logIdx].substring(0, charIdx - 1);
      charIdx--;
      setTimeout(clearLog, 20);
    } else {
      logIdx = (logIdx + 1) % logs.length;
      setTimeout(writeLog, 500);
    }
  }
  writeLog();

  // 3. Magnetic Card Tilt (Perspective Transform)
  const card = document.getElementById("neon-pulse-card");
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tilt intensity calculation
    const tiltX = (y - centerY) / 25;
    const tiltY = (centerX - x) / 25;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  });
});
