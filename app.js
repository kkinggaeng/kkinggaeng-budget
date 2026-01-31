console.log('APPL Budget App Loaded');

const fab = document.getElementById("fab");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

function openModal() {
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

// + 버튼
fab?.addEventListener("click", openModal);

// 닫기 버튼
closeBtn?.addEventListener("click", closeModal);

// 모달 바깥 클릭 시 닫기
modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});


const amountEl = document.getElementById("amount");
const categoryEl = document.getElementById("category");
const placeEl = document.getElementById("place");
const memoEl = document.getElementById("memo");

function stripNonDigits(s) {
  return (s || "").replace(/[^\d]/g, "");
}
function formatKRWDigits(digits) {
  if (!digits) return "";
  return Number(digits).toLocaleString("ko-KR");
}

amountEl?.addEventListener("input", () => {
  // 입력 중엔 “숫자만” 남기기 (콤마는 아직 X)
  const digits = stripNonDigits(amountEl.value);
  amountEl.value = digits;
});

amountEl?.addEventListener("blur", () => {
  // 칸을 벗어나면 콤마 붙이기
  const digits = stripNonDigits(amountEl.value);
  amountEl.value = formatKRWDigits(digits);
});

amountEl?.addEventListener("focus", () => {
  // 다시 눌러서 수정할 땐 콤마 제거해 숫자만 보이게
  amountEl.value = stripNonDigits(amountEl.value);
});


let records = JSON.parse(localStorage.getItem("records") || "[]");

const saveBtn = document.getElementById("save");


  // 저장 로직
saveBtn?.addEventListener("click", () => {
  const digits = stripNonDigits(amountEl.value);
  if (!digits) return;

  const record = {
    amount: Number(digits),
    category: categoryEl.value,
    place: placeEl.value,
    memo: memoEl.value.trim(),   // ✅ 여기!!!
    date: Date.now()
  };

  records.push(record);
  localStorage.setItem("records", JSON.stringify(records));

  console.log("SAVED ITEM:", item);
  console.log("ALL ITEMS:", JSON.parse(localStorage.getItem("records") || "[]"));
  
  clearForm();
  closeModal();
});



function clearForm() {
  amountEl.value = "";
  placeEl.value = "";
  memoEl.value = "";   // ✅ 여기!!!
}

