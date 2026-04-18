import { useState, useEffect } from "react";
import { getBookings, updateAttendance, createReview, createComplaint } from "../services/api";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // { type: 'review'|'report', booking: {} }
  const [formData, setFormData] = useState({ rating: 5, comment: "", subject: "", description: "" });
  
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchBookings = () => {
    if (user) {
      getBookings({ householdId: user._id })
        .then(setBookings)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAttendance = async (id, type) => {
    try {
      await updateAttendance(id, type);
      fetchBookings();
      alert(`Attendance recorded: ${type === 'checkIn' ? 'Check-in' : 'Check-out'} successful.`);
    } catch (error) {
      alert("Failed to update attendance");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        householdId: user._id,
        helperId: activeModal.booking.helperId._id,
        bookingId: activeModal.booking._id,
        rating: formData.rating,
        comment: formData.comment
      });
      alert("Review submitted successfully!");
      setActiveModal(null);
    } catch (error) {
      alert("Failed to submit review");
    }
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    try {
      await createComplaint({
        userId: user._id,
        subject: formData.subject,
        description: formData.description
      });
      alert("Complaint filed. Admin will review this shortly.");
      setActiveModal(null);
    } catch (error) {
      alert("Failed to file complaint");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Bookings...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display text-slate-900">Service History</h1>
          <p className="text-slate-500 mt-1">Track your active bookings, attendance, and history.</p>
        </div>

        {bookings.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-slate-400 mb-4 text-4xl">📋</div>
            <h3 className="text-lg font-semibold text-slate-900">No bookings yet</h3>
            <p className="text-slate-500 mb-6">You haven't booked any service providers yet.</p>
            <Button onClick={() => window.location.href='/search'}>Find a Helper</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => (
              <Card key={booking._id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row items-center p-6 gap-6">
                    <img 
                      src={booking.helperId?.avatar || "https://i.pravatar.cc/150"} 
                      alt={booking.helperId?.name} 
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm"
                    />
                    <div className="flex-grow text-center md:text-left">
                      <h3 className="text-xl font-bold text-slate-900">{booking.helperId?.name}</h3>
                      <p className="text-primary-600 font-medium text-sm">{booking.helperId?.type} • {booking.plan} Plan</p>
                      <div className="flex gap-4 mt-2">
                        {booking.checkInTime && <p className="text-[10px] text-emerald-600 font-bold">Checked-in: {new Date(booking.checkInTime).toLocaleTimeString()}</p>}
                        {booking.checkOutTime && <p className="text-[10px] text-blue-600 font-bold">Checked-out: {new Date(booking.checkOutTime).toLocaleTimeString()}</p>}
                      </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-3">
                      <div className="flex gap-2">
                        <Badge variant={booking.status === "Active" ? "success" : booking.status === "Pending" ? "warning" : booking.status === "Completed" ? "neutral" : "error"}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {booking.status === 'Active' && !booking.checkInTime && (
                          <Button size="sm" onClick={() => handleAttendance(booking._id, 'checkIn')}>Check-in</Button>
                        )}
                        {booking.status === 'Active' && booking.checkInTime && !booking.checkOutTime && (
                          <Button size="sm" variant="outline" onClick={() => handleAttendance(booking._id, 'checkOut')}>Check-out</Button>
                        )}
                        {booking.status === 'Completed' && (
                          <Button size="sm" variant="primary" onClick={() => setActiveModal({ type: 'review', booking })}>Rate</Button>
                        )}
                        <Button size="sm" variant="ghost" className="text-red-500" onClick={() => setActiveModal({ type: 'report', booking })}>Report</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Modals */}
        {activeModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md animate-slide-up">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">{activeModal.type === 'review' ? 'Rate Service' : 'Report an Issue'}</h2>
                <form onSubmit={activeModal.type === 'review' ? handleSubmitReview : handleSubmitComplaint} className="space-y-4">
                  {activeModal.type === 'review' ? (
                    <>
                      <Input label="Rating (1-5)" type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} />
                      <Input label="Comment" placeholder="Describe your experience..." value={formData.comment} onChange={(e) => setFormData({...formData, comment: e.target.value})} />
                    </>
                  ) : (
                    <>
                      <Input label="Subject" placeholder="e.g. Absenteeism, Quality issue" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
                      <Input label="Description" placeholder="Provide more details..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                    </>
                  )}
                  <div className="flex gap-3 pt-2">
                    <Button type="submit" className="flex-grow">Submit</Button>
                    <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
