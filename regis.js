const form = document.getElementById("registerForm");
document.querySelectorAll(".toggle").forEach((btn) =>
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.target);
    input.type = input.type === "password" ? "text" : "password";
  }),
);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim(),
    email = document.getElementById("email").value.trim(),
    password = document.getElementById("password").value,
    confirm = document.getElementById("confirm").value;
  if (password.length < 8) {
    alert("Kata sandi minimal 8 karakter.");
    return;
  }
  if (password !== confirm) {
    alert("Konfirmasi kata sandi tidak sesuai.");
    return;
  }
  if (!document.getElementById("agree").checked) {
    alert("Silakan setujui syarat dan ketentuan.");
    return;
  }
  localStorage.setItem("bakingUser", JSON.stringify({ name, email, password }));
  alert("Pendaftaran berhasil. Silakan masuk menggunakan akun Anda.");
  location.href = "login.html";
});
