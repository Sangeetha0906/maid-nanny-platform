import { useState, useEffect } from "react";
import { getBookings, updateBookingStatus, getHelperProfile, getComplaints } from "../services/api";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export default function HelperDashboard() {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [helperInfo, setHelperInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("user") || "null");

  const fetchData = () => {
    if (userData) {
      getHelperProfile(userData._id)
        .then(data => {
          const profile = data.find(h => h.userId === userData._id);
          setHelperInfo(profile);
          if (profile) {
            return Promise.all([
                  getBookings({ helperId: profile._id }),
                  getComplaints()
            ]);
          }
          return [[], []];
        })
        .then(([bookingsData]) => {
          setBookings(bookingsData);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      fetchData();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>;

  const pendingRequests = bookings.filter(b => b.status === "Pending");
  const activeJobs = bookings.filter(b => b.status === "Active");
  const workHistory = bookings.filter(b => b.status === "Completed" || b.status === "Cancelled");
  
  const totalEarnings = bookings
    .filter(b => b.status === "Completed")
    .reduce((acc, curr) => acc + (parseFloat(curr.amount?.replace('$', '')) || 800), 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-6 py-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-display text-slate-900 mb-6">Welcome Back, {userData?.name}!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="py-6">
              <p className="text-slate-500 text-sm font-medium mb-1">Total Earnings</p>
              <h3 className="text-3xl font-bold text-slate-900">${totalEarnings}</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-6">
              <p className="text-slate-500 text-sm font-medium mb-1">Active Jobs</p>
              <h3 className="text-3xl font-bold text-slate-900">{activeJobs.length}</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-6">
              <p className="text-slate-500 text-sm font-medium mb-1">Overall Rating</p>
              <h3 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                {helperInfo?.rating || 5.0} <span className="text-amber-500 text-2xl mt-[-4px]">★</span>
              </h3>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Pending Requests</h2>
            {pendingRequests.length === 0 ? (
              <p className="text-slate-500 italic p-4 bg-white rounded-xl border border-slate-100">No pending requests.</p>
            ) : (
              <Card>
                <CardContent className="divide-y divide-slate-100">
                  {pendingRequests.map(request => (
                    <div key={request._id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                      <div>
                        <h4 className="font-semibold text-slate-900">{request.householdId?.name}</h4>
                        <p className="text-sm text-slate-500">{request.plan} plan starting {new Date(request.startDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(request._id, "Cancelled")}>Decline</Button>
                        <Button size="sm" onClick={() => handleStatusUpdate(request._id, "Active")}>Accept</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Active Jobs</h2>
            <div className="space-y-4">
              {activeJobs.length === 0 ? (
                <p className="text-slate-500 italic p-4 bg-white rounded-xl border border-slate-100">No active jobs currently.</p>
              ) : (
                activeJobs.map(job => (
                  <Card key={job._id}>
                    <CardContent className="py-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-slate-900">{job.householdId?.name}</h4>
                        <div className="flex gap-4 mt-1">
                          <p className="text-xs text-slate-500">📍 {job.plan} Plan</p>
                          {job.checkInTime && <Badge variant="primary">Helper Onsite</Badge>}
                        </div>
                      </div>
                      <Button variant="ghost" className="text-primary-600 font-bold" onClick={() => handleStatusUpdate(job._id, "Completed")}>
                        Mark Completed
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Work History</h2>
            <Card>
              <CardContent className="divide-y divide-slate-100">
                {workHistory.length === 0 ? (
                  <p className="text-slate-500 italic py-4">No completed jobs yet.</p>
                ) : (
                  workHistory.map(job => (
                    <div key={job._id} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                      <div>
                        <p className="font-medium text-slate-900">{job.householdId?.name}</p>
                        <p className="text-[10px] text-slate-400">{new Date(job.startDate).toLocaleDateString()}</p>
                      </div>
                      <Badge variant={job.status === 'Completed' ? 'success' : 'neutral'}>{job.status}</Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
