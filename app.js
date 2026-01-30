console.log('APPL Budget App Loaded');


// ===== Modal open/close (iOS 앱 느낌) =====
const fab = document.getElementById("fab");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close"); 

function openModal() {
  document.body.classList.add("modal-open");
  modal.classList.remove("hidden");

  // 모달 열릴 때 키보드 안 뜨게: 입력칸은 숨겨져 있으니 그냥 닫기 버튼만 포커스
  setTimeout(() => {
    closeBtn?.focus({ preventScroll: true });
  }, 0);
}



function closeModal() {
  document.activeElement?.blur();
  document.body.classList.remove("modal-open");
  modal.classList.add("hidden");

  // 금액 입력 원복
  const amountFake = document.getElementById("amountFake");
  const amountReal = document.getElementById("amount");
  if (amountFake && amountReal) {
    amountReal.value = "";
    amountReal.classList.add("hidden");
    amountFake.classList.remove("active");
  }

  fab?.focus({ preventScroll: true });
}





const amountFake = document.getElementById("amountFake");
const amountReal = document.getElementById("amount");

// 가짜 박스 눌렀을 때
amountFake.addEventListener("click", () => {
  // ✅ 사용자가 직접 눌렀으니 이제 포커스 차단 해제
  suppressFocus = false;
  clearTimeout(suppressTimer);

  // 가짜 숨기고 진짜 보여주기
  amountFake.classList.add("active");
  amountReal.classList.remove("hidden");

  // iOS는 화면에 나타난 직후에 focus가 더 잘 먹어서 한 박자 주기
setTimeout(() => {
  amountReal.disabled = false;
  amountReal.removeAttribute("readonly");
  amountReal.focus();
}, 0);
});



const amountFake = document.getElementById("amountFake");
const amountReal = document.getElementById("amount");

if (amountFake && amountReal) {
  amountFake.addEventListener("click", () => {
    // 혹시 예전 readonly/disabled가 남아있을까봐 강제 해제
    amountReal.disabled = false;
    amountReal.removeAttribute("readonly");

    // 가짜 숨기고 진짜 보여주기
    amountFake.classList.add("active");
    amountReal.classList.remove("hidden");

    // iOS: display:none → block 전환 직후엔 focus가 씹히는 경우가 있어 2단 딜레이
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        amountReal.focus();
      });
    });
  });
}

