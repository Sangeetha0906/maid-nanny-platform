import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-screen bg-white shadow-md p-5">
      <h2 className="text-xl font-bold mb-6">Helper App</h2>

      <ul className="space-y-4">
        <li
          className="cursor-pointer hover:text-blue-500"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </li>

        <li
          className="cursor-pointer hover:text-blue-500"
          onClick={() => navigate("/helpers")}
        >
          Helpers
        </li>

        <li
          className="cursor-pointer hover:text-blue-500"
          onClick={() => navigate("/bookings")}
        >
          Bookings
        </li>
      </ul>
    </div>
  );
}