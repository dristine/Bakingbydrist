const form = document.getElementById("loginForm");
document.querySelectorAll(".toggle").forEach((btn) =>
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.target);
    input.type = input.type === "password" ? "text" : "password";
  }),
);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("bakingUser") || "null");
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  if (!user) {
    alert("Akun belum terdaftar. Silakan daftar terlebih dahulu.");
    return;
  }
  if (user.email !== email || user.password !== password) {
    alert("Email atau kata sandi belum sesuai.");
    return;
  }
  alert("Login berhasil. Selamat datang, " + user.name + "!");
  location.href = "index.html";
});
document.getElementById("forgot").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Silakan hubungi Baking by Drist untuk bantuan pemulihan akun.");
});
