import Sidebar from "../layout/Sidebar";

export default function Bookings() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 w-full">
        <h2 className="text-xl font-bold">My Bookings</h2>
        <p>No bookings yet</p>
      </div>
    </div>
  );
}