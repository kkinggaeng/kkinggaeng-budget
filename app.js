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

  const amountEl = document.getElementById("amount");

  // ✅ iOS 자동 포커스 복원 차단: 잠깐 disabled (포커스 불가)
  if (amountEl) {
    amountEl.disabled = true;
  }

  // 열리자마자 포커스 정리 + 닫기로 포커스
  setTimeout(() => {
    document.activeElement?.blur();
    closeBtn?.focus({ preventScroll: true });
  }, 0);

  // 0.3초 뒤 정상 입력 가능하게 복구
  suppressTimer = setTimeout(() => {
    suppressFocus = false;
    if (amountEl) amountEl.disabled = false;
  }, 300);
}


function closeModal() {
  document.activeElement?.blur();
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");

  // ✅ 금액 입력 원상복구
  amountReal.value = "";
  amountReal.classList.add("hidden");
  amountFake.classList.remove("active");
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

const amountFake = document.getElementById("amountFake");
const amountReal = document.getElementById("amount");

// 가짜 박스 눌렀을 때
if (amountFake && amountReal) {
  amountFake.addEventListener("click", () => {
    amountFake.classList.add("active");   // 가짜 숨김
    amountReal.classList.remove("hidden"); // 진짜 보여줌
    amountReal.focus();                    // ✅ 이때만 키보드
  });
}


