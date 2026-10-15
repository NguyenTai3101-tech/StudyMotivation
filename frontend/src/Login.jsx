import {  useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [password, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      if (email === "" || password == "") {
        alert("Không được để trống thông tin");
        return;
      }
      const response = await fetch("http://localhost:5173/api/users/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const message = await response.text;
      if (response.ok) {
        alert(message);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Hiện đang lỗi", error);
    }
  };
  return (
    <>
      <div>
        <h1>Đăng nhập</h1>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassWord(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleLogin}>Đăng nhập</button>
          </div>
          <div>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Chưa có tài khoản?Đăng ký
          </button>
        </div>
      </div>
    </>
  );
}
