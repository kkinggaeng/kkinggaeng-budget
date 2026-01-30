console.log('APPL Budget App Loaded');

/* ===== 모달 열기 / 닫기 ===== */

// + 버튼 클릭 → 모달 열기
const openBtn = document.getElementById("open-modal");
const closeBtn = document.getElementById("close-modal");
const modal = document.getElementById("modal");

// 안전장치 (요소 없으면 에러 안 나게)
if (openBtn && modal) {
  openBtn.addEventListener("click", () => {
    document.body.classList.add("modal-open"); // 🔑 앱 느낌 핵심
    modal.classList.remove("hidden");
  });
}

if (closeBtn && modal) {
  closeBtn.addEventListener("click", () => {
    document.body.classList.remove("modal-open");
    modal.classList.add("hidden");
  });
}

// 모달 바깥 눌러도 닫히게
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.classList.remove("modal-open");
      modal.classList.add("hidden");
    }
  });
}
