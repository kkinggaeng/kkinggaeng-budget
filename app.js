console.log('APPL Budget App Loaded');

let suppressFocus = false;
let suppressTimer = null;

// ===== Modal open/close (iOS 앱 느낌) =====
const fab = document.getElementById("fab");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close"); 

function openModal() {
  suppressFocus = true;
  clearTimeout(suppressTimer);

  document.body.classList.add("modal-open");
  modal.classList.remove("hidden");

  // ✅ iOS 자동 포커스/키보드 방지: 금액칸 잠깐 잠그기
  const amountEl = document.getElementById("amount");
  amountEl?.setAttribute("readonly", "true");

  setTimeout(() => {
    document.activeElement?.blur();
    closeBtn?.focus({ preventScroll: true });
  }, 0);

  suppressTimer = setTimeout(() => {
    suppressFocus = false;
    amountEl?.removeAttribute("readonly"); // ✅ 잠금 해제
  }, 300);
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


modal.addEventListener("focusin", (e) => {
  if (!suppressFocus) return;

  // 입력칸으로 포커스 들어오면 즉시 뺏어서 키보드 못 뜨게
  e.target.blur();
  closeBtn?.focus({ preventScroll: true });
}, true);
