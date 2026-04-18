import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAdminStats, getHelpers, verifyHelper, getComplaints, resolveComplaint } from "../services/api";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export default function AdminDashboard() {
  const location = useLocation();
  const isVerifyPage = location.pathname === "/admin/verify";
  
  const [stats, setStats] = useState(null);
  const [pendingHelpers, setPendingHelpers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState(isVerifyPage ? "verifications" : "verifications");
  const [loading, setLoading] = useState(true);

  // Sync activeTab with URL if it's the verify page
  useEffect(() => {
    if (isVerifyPage) setActiveTab("verifications");
  }, [isVerifyPage]);

  const fetchData = () => {
    Promise.all([
      getAdminStats(),
      getHelpers("All"),
      getComplaints()
    ]).then(([statsData, helpersData, complaintsData]) => {
      setStats(statsData);
      setPendingHelpers(helpersData.filter(h => !h.verified));
      setComplaints(complaintsData);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVerify = async (id) => {
    try {
      await verifyHelper(id, true);
      setPendingHelpers(pendingHelpers.filter(h => h._id !== id));
      getAdminStats().then(setStats);
    } catch (error) {
      alert("Failed to verify helper");
    }
  };

  const handleResolveComplaint = async (id) => {
    try {
      await resolveComplaint(id);
      setComplaints(complaints.map(c => c._id === id ? { ...c, status: 'Resolved' } : c));
      getAdminStats().then(setStats);
    } catch (error) {
      alert("Failed to resolve complaint");
    }
  };

  if (loading || !stats) return <div className="min-h-screen flex items-center justify-center">Loading Analytics...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-6 py-8 animate-fade-in">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-slate-900">
              {isVerifyPage ? "Service Provider Verifications" : "Platform Overview & Analytics"}
            </h1>
            <p className="text-slate-500">
              {isVerifyPage ? "Review and approve pending helper applications." : "Manage users, track growth, and resolve disputes."}
            </p>
          </div>
          
          {!isVerifyPage && (
            <div className="flex bg-slate-200 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab("verifications")}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "verifications" ? "bg-white text-primary-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
              >
                Verifications
              </button>
              <button 
                onClick={() => setActiveTab("complaints")}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "complaints" ? "bg-white text-primary-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
              >
                Complaints
              </button>
            </div>
          )}
        </div>

        {/* Show Stats Cards only on the Analytics/Dashboard route */}
        {!isVerifyPage && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Object.entries(stats).map(([key, value]) => (
              <Card key={key} className="border-none shadow-elegant">
                <CardContent className="py-6">
                  <p className="text-slate-500 text-sm font-medium mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {(activeTab === "verifications" || isVerifyPage) ? (
          <>
            {!isVerifyPage && <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">Pending Verifications</h2>}
            <Card className="border-none shadow-elegant overflow-hidden">
              <CardContent className="p-0">
                {pendingHelpers.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 italic bg-white">
                    ✨ All helpers are currently verified.
                  </div>
                ) : (
                  <table className="w-full text-left bg-white">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Name</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Type</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pendingHelpers.map(helper => (
                        <tr key={helper._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-900">{helper.name}</td>
                          <td className="px-6 py-4 text-slate-600">{helper.type}</td>
                          <td className="px-6 py-4"><Badge variant="warning">Pending</Badge></td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="sm" className="text-primary-600 font-bold" onClick={() => handleVerify(helper._id)}>
                              Approve Profile
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">Active Disputes</h2>
            <div className="space-y-4">
              {complaints.length === 0 ? (
                <div className="p-12 text-center text-slate-500 italic bg-white rounded-3xl border border-slate-100 shadow-elegant">
                  ✅ No complaints reported. Great job!
                </div>
              ) : (
                complaints.map(complaint => (
                  <Card key={complaint._id} className={`${complaint.status === 'Resolved' ? 'opacity-60 grayscale' : 'shadow-elegant border-none'}`}>
                    <CardContent className="py-6 flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-slate-900 text-lg">{complaint.subject}</h3>
                          <Badge variant={complaint.status === 'Open' ? 'danger' : 'success'}>
                            {complaint.status}
                          </Badge>
                        </div>
                        <p className="text-slate-600">{complaint.description}</p>
                        <p className="text-xs font-medium text-slate-400 mt-3 pt-3 border-t border-slate-100">Reported by: {complaint.userId?.name} • {new Date(complaint.createdAt).toLocaleDateString()}</p>
                      </div>
                      {complaint.status === 'Open' && (
                        <Button variant="outline" size="sm" className="ml-6 shrink-0" onClick={() => handleResolveComplaint(complaint._id)}>
                          Mark Resolved
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
