document.addEventListener("DOMContentLoaded", function () {

  const noBtn = document.getElementById("noBtn");
  const noWrapper = document.getElementById("noWrapper");
  const yesBtn = document.getElementById("yesBtn");
  const plea = document.getElementById("plea");

  let mouseX = 0;
  let mouseY = 0;

  let btnX = 0;
  let btnY = 0;

  let modalOpen = false;

  const safeDistance = 200;
  const panicMultiplier = 2.5;

  /* ---------------- TRACK MOUSE ---------------- */
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /* ---------------- RUNAWAY LOGIC ---------------- */
  function animate() {

    if (!modalOpen && noWrapper) {

      const rect = noWrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = centerX - mouseX;
      const dy = centerY - mouseY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < safeDistance) {
        const angle = Math.atan2(dy, dx);
        const strength = (safeDistance - distance) * panicMultiplier;

        btnX += Math.cos(angle) * strength * 0.05;
        btnY += Math.sin(angle) * strength * 0.05;

        if (plea) plea.style.opacity = 1;
      }

      noWrapper.style.transform = `translate(${btnX}px, ${btnY}px)`;
    }

    requestAnimationFrame(animate);
  }

  animate();

  /* ---------------- YES BUTTON ---------------- */
  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      document.body.innerHTML = `
        <div style="
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:#fce4ec;
          text-align:center;
          font-size:42px;
          font-weight:bold;">
          💖 YAYYYY 💖<br><br>
          You’re officially my Valentine ❤️
        </div>
      `;
    });
  }

  /* ---------------- NO BUTTON FAILSAFE ---------------- */
  if (noBtn) {
    noBtn.addEventListener("click", () => {
      modalOpen = true;
      showNoModal();
    });
  }

  function showNoModal() {

    const modal = document.createElement("div");
    modal.innerHTML = `
      <div style="
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.6);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;">
        
        <div style="
          background:white;
          padding:40px;
          border-radius:20px;
          text-align:center;
          width:400px;
          font-size:24px;
          font-weight:bold;">
          
          Are you sure you didn’t mean YES? 😏
          
          <div style="margin-top:30px;">
            
            <button id="modalYes" style="
              padding:15px 30px;
              font-size:20px;
              margin-right:15px;
              background:#43a047;
              color:white;
              border:none;
              border-radius:10px;
              cursor:pointer;">
              Oops, YES 💖
            </button>

            <button id="modalNo" style="
              padding:15px 30px;
              font-size:20px;
              background:#e53935;
              color:white;
              border:none;
              border-radius:10px;
              cursor:pointer;">
              No I meant NO
            </button>

          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("modalYes").onclick = () => {
      yesBtn.click();
    };

    document.getElementById("modalNo").onclick = () => {
      document.body.removeChild(modal);
      modalOpen = false;
    };
  }

});
