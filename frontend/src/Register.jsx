import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    if (email == "" || password == "" || confirmPassword == "") {
      alert("Tạo tài khoản không thành công chỉ thành phượng");
      return;
    }
    if (confirmPassword != password) {
      alert("Mật khẩu không khớp");
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      alert("Tài khoản không có dạng @gmail.com");
      return;
    }
    if (password.length < 8) {
      alert("Mật khẩu quá ngắn");
      return;
    }
    try {
      const response = await fetch("http://localhost:5173/api/users/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const creatUser = response.json();
        localStorage.setItem("userId", creatUser.id);
        navigate("/");
      } else {
        const message = await response.text;
        alert(message);
      }
    } catch (error) {}
  };
  return (
    <>
      <div>
        <h1>Đăng ký</h1>
        <div>
          <input
            type="text"
            placeholder="Email..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Password..."
            value={password}
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="ConfirmPassword..."
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Quay lại
          </button>
          <button onClick={handleRegister}>Tạo tài khoản</button>
        </div>
      </div>
    </>
  );
}
