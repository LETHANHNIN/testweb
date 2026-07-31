// ===== BƯỚC 1: Lấy tham chiếu tới các phần tử HTML =====
// document.getElementById(id) giống như "tìm ô có id này trên trang"
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const emptyMsg = document.getElementById("empty-msg");

// ===== BƯỚC 2: Nơi lưu dữ liệu (giống một list trong Python) =====
// Mỗi công việc là 1 object: { text: "nội dung", done: true/false }
let tasks = [];

// ===== BƯỚC 3: Hàm vẽ lại toàn bộ danh sách lên màn hình =====
// Mỗi khi tasks thay đổi (thêm/xóa/đánh dấu), ta gọi hàm này để cập nhật giao diện
function renderTasks() {
  // Xóa sạch danh sách cũ trên màn hình trước khi vẽ lại
  taskList.innerHTML = "";

  // Nếu chưa có công việc nào, hiện dòng thông báo, ẩn danh sách
  emptyMsg.classList.toggle("hidden", tasks.length > 0);

  // Duyệt qua từng công việc, giống "for task in tasks" bên Python
  tasks.forEach((task, index) => {
    // Tạo 1 thẻ <li> mới cho mỗi công việc
    const li = document.createElement("li");
    li.className = "task-item" + (task.done ? " done" : "");

    // Tạo phần chữ hiển thị nội dung công việc
    const span = document.createElement("span");
    span.textContent = task.text;
    // Khi bấm vào chữ -> đánh dấu hoàn thành / bỏ đánh dấu
    span.addEventListener("click", () => toggleTask(index));

    // Tạo nút xóa (dấu X)
    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "✕";
    delBtn.addEventListener("click", () => deleteTask(index));

    // Ghép span + nút xóa vào trong li, rồi ghép li vào danh sách
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// ===== BƯỚC 4: Các hàm xử lý hành động =====

function addTask() {
  const text = input.value.trim(); // .trim() bỏ khoảng trắng thừa đầu/cuối
  if (text === "") return; // không thêm nếu ô nhập trống

  tasks.push({ text: text, done: false }); // thêm vào cuối list, giống tasks.append() bên Python
  input.value = ""; // xóa trắng ô nhập sau khi thêm
  renderTasks(); // vẽ lại danh sách
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done; // đảo ngược trạng thái true/false
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1); // xóa 1 phần tử tại vị trí index, giống del tasks[index]
  renderTasks();
}

// ===== BƯỚC 5: Gắn sự kiện (event) cho nút và ô nhập =====

addBtn.addEventListener("click", addTask);

// Cho phép bấm phím Enter trong ô nhập để thêm việc, không cần bấm nút
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Vẽ danh sách lần đầu khi trang vừa load (lúc này tasks đang rỗng)
renderTasks();
