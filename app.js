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
