import Sidebar from "../layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-2">Welcome to Maid & Nanny Platform</p>
      </div>
    </div>
  );
}