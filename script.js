const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");
const card = document.getElementById("card");

const CONTACT_TEXT = `황하연 · PM/PO
사용자와 비즈니스를 잇는 제품을 만듭니다.
📧 airbody@gmail.com
📱 010-8881-3111`;

let toastTimer = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("연락처가 복사되었습니다.");
  } catch {
    showToast("복사에 실패했습니다. 직접 선택해 주세요.");
  }
}

copyBtn.addEventListener("click", () => copyText(CONTACT_TEXT));

document.querySelectorAll(".contact[data-copy]").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    copyText(link.dataset.copy);
  });
});

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
});

card.addEventListener("mouseleave", () => {
  card.style.transform = "";
});
