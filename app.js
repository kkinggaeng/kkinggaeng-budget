console.log('APPL Budget App Loaded');

// ===== Modal open/close (iOS 앱 느낌) =====
const fab = document.getElementById("fab");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

function openModal() {
  document.body.classList.add("modal-open");   // 배경 스크롤 방지
  modal.classList.remove("hidden");            // 모달 표시
}

function closeModal() {
  document.body.classList.remove("modal-open");
  modal.classList.add("hidden");
}

// + 버튼 누르면 열기
if (fab && modal) fab.addEventListener("click", openModal);

// 닫기 버튼 누르면 닫기
if (closeBtn && modal) closeBtn.addEventListener("click", closeModal);

// 모달 바깥(검은 배경) 누르면 닫기
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// ESC로 닫기(PC용, 있어도 무해)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
