import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function FillProfile() {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const navigate = useNavigate;
  const handleFillProfile = async () => {
    if (name.trim() === "" || school.trim() === "") {
      alert("Không được để trống thông tin");
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:5173/api/users/${userId}`,
          {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ name, school }),
          },
        );
        const message = await response.text();
        if (response.ok) {
          alert(message);
          navigate("/register");
        } else {
          alert(message);
        }
      } catch (error) {
        console.error("Hiện đang có lỗi ", error);
      }
    }
  };
  return (
    <>
      <div>Thông tin cá nhân</div>
      <div>
        <input
          type="text"
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Trường"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
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
        <button onClick={handleFillProfile}>Tiếp tục</button>
      </div>
    </>
  );
}
