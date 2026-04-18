import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHelpers } from "../services/api";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export default function SearchHelpers() {
  const [filter, setFilter] = useState("All");
  const [helpers, setHelpers] = useState([]);

  useEffect(() => {
    getHelpers(filter).then(setHelpers).catch(console.error);
  }, [filter]);

  const filteredHelpers = helpers;

  return (
    <div className="min-h-screen bg-slate-50">
      
      <main className="max-w-7xl mx-auto px-6 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-slate-900">Find a Helper</h1>
            <p className="text-slate-500 mt-1">Browse verified maids, nannies, and babysitters.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {["All", "Maid", "Nanny", "Babysitter"].map(t => (
              <Button 
                key={t} 
                variant={filter === t ? "primary" : "outline"} 
                size="sm"
                onClick={() => setFilter(t)}
                className="whitespace-nowrap"
              >
                {t}s
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHelpers.map(helper => (
            <Card key={helper._id} hover className="flex flex-col">
              <CardContent className="flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <img src={helper.avatar} alt={helper.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                  <Badge variant={helper.verified ? "success" : "neutral"} className="mt-1">
                    {helper.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900">{helper.name}</h3>
                <p className="text-primary-600 font-medium text-sm mb-3">{helper.type} • {helper.experience}</p>
                <div className="flex items-center gap-1 text-sm text-amber-500 font-medium mb-3">
                  ★ {helper.rating} <span className="text-slate-400 font-normal">({helper.reviews} reviews)</span>
                </div>
                <p className="text-slate-600 text-sm mb-6 line-clamp-2">{helper.about}</p>
                
                <div className="mt-auto space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Hourly Rate</span>
                    <span className="font-semibold text-slate-900">{helper.plans.hourly}</span>
                  </div>
                  <Link to={`/helper/${helper._id}`}>
                    <Button className="w-full">View Profile</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
