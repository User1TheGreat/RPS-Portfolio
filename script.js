document.addEventListener("DOMContentLoaded", () => {
  const State = {
    initialized: false,
    audioCtx: null,
    settings: {
      scanlines: true,
      particles: true,
      glow: true,
      tilt: true,
      magnet: true,
      audio: true,
      sfx: true,
      fps: true,
      clock: true,
    },
  };

  const overlay = document.getElementById("start-overlay");
  const main = document.querySelector(".content-wrapper");

  // INITIALIZATION TRIGGER
  overlay.addEventListener("click", () => {
    if (State.initialized) return;
    State.initialized = true;

    overlay.style.opacity = "0";
    main.style.opacity = "1";
    setTimeout(() => overlay.remove(), 600);

    initAudio();
    startClock();
    initTypewriter();
    initParticles();
  });

  // AUDIO SYSTEM
  function initAudio() {
    try {
      State.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = State.audioCtx.createAnalyser();
      analyser.fftSize = 64;
      const data = new Uint8Array(analyser.frequencyBinCount);

      const canvas = document.getElementById("audio-visualizer");
      const ctx = canvas.getContext("2d");

      function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(data);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--accent");
        data.forEach((v, i) => {
          ctx.fillRect(i * 4, canvas.height - v / 8, 3, v / 8);
        });
      }
      draw();
    } catch (e) {
      console.log("Audio Init Blocked");
    }
  }

  // SETTINGS LOGIC
  const modal = document.getElementById("settings-modal");
  document
    .getElementById("settings-btn")
    .addEventListener("click", () => modal.classList.add("active"));
  document
    .getElementById("close-settings")
    .addEventListener("click", () => modal.classList.remove("active"));

  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const theme = e.target.dataset.setTheme;
      document.body.setAttribute("data-theme", theme);
      document
        .querySelectorAll(".theme-btn")
        .forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      showToast(`ENVIRONMENT: ${theme.toUpperCase()}`);
    });
  });

  // TYPEWRITER
  function initTypewriter() {
    const el = document.getElementById("typewriter");
    const text = "> ARCADE_CORE_V3.2 // AUTHENTICATED // WELCOME_USER";
    let i = 0;
    function type() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 40);
      }
    }
    type();
  }

  // UTILITIES
  function startClock() {
    setInterval(() => {
      document.getElementById("clock").innerText =
        new Date().toLocaleTimeString();
    }, 1000);
  }

  function showToast(m) {
    const t = document.createElement("div");
    t.className = "toast";
    t.innerText = m;
    document.getElementById("toast-container").appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }

  // MAGNETIC & TILT
  document.addEventListener("mousemove", (e) => {
    // Cursor Blur
    const cb = document.getElementById("cursor-blur");
    cb.style.left = e.clientX + "px";
    cb.style.top = e.clientY + "px";

    // Card Tilt
    document.querySelectorAll(".project-card").forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${
        x * 10
      }deg) rotateX(${y * -10}deg)`;
    });
  });

  // Reset All
  document.getElementById("reset-all").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
});
