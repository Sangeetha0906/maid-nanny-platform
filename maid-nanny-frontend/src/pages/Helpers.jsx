import { useState } from "react";
import Sidebar from "../layout/Sidebar";

export default function Helpers() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const helpers = [
    { name: "Lakshmi", type: "Maid", experience: "3 years" },
    { name: "Anitha", type: "Nanny", experience: "5 years" },
    { name: "Priya", type: "Babysitter", experience: "2 years" },
  ];

  // Filter logic
  const filteredHelpers = helpers.filter((h) => {
    return (
      h.name.toLowerCase().includes(search.toLowerCase()) &&
      (type === "" || h.type === type)
    );
  });

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 w-full">
        <h2 className="text-xl font-bold mb-4">Helpers</h2>

        {/* 🔍 Search + Filter */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name"
            className="border p-2 rounded w-1/3"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All</option>
            <option value="Maid">Maid</option>
            <option value="Nanny">Nanny</option>
            <option value="Babysitter">Babysitter</option>
          </select>
        </div>

        {/* 👩‍🔧 Helpers List */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredHelpers.map((h, i) => (
            <div key={i} className="border p-4 rounded shadow">
              <h3 className="font-bold">{h.name}</h3>
              <p>{h.type}</p>
              <p>{h.experience}</p>

              <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
                Book
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}