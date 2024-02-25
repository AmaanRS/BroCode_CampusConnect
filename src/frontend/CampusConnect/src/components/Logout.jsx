import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }

  return (
    <>
      <div className="bg-red-600 p-2 text-white rounded-md hover:bg-red-400">
        <button onClick={handleClick} className="">
          Logout
        </button>
      </div>
    </>
  );
}
