document.getElementById("time").textContent =
  "Trang được tải lúc: " + new Date().toLocaleString("vi-VN");

let count = 0;
const countEl = document.getElementById("count");
document.getElementById("btn").addEventListener("click", () => {
  count++;
  countEl.textContent = "Đã bấm: " + count + " lần";
});
