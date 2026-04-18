import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHelperById, createBooking } from "../services/api";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export default function HelperProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [helper, setHelper] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("hourly");
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    getHelperById(id)
      .then(setHelper)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleBook = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setBookingLoading(true);
    try {
      await createBooking({
        householdId: user._id,
        helperId: helper._id,
        plan: selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1),
        startDate: new Date() // Simplified for MVP
      });
      alert("Booking request sent successfully!");
      navigate("/bookings");
    } catch (error) {
      alert("Failed to book. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
  if (!helper) return <div className="min-h-screen flex items-center justify-center">Helper not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-8 flex flex-col items-center">
                <img src={helper.avatar} alt={helper.name} className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4" />
                <h1 className="text-2xl font-bold font-display text-slate-900">{helper.name}</h1>
                <p className="text-primary-600 font-medium mb-2">{helper.type}</p>
                <Badge variant={helper.verified ? "success" : "neutral"}>
                  {helper.verified ? "Verified Provider" : "Verification Pending"}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4">
                <h3 className="font-bold text-slate-900">Details</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Experience</span>
                  <span className="font-medium">{helper.experience}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Location</span>
                  <span className="font-medium">{helper.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Rating</span>
                  <span className="font-medium text-amber-500">★ {helper.rating}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent>
                <h2 className="text-xl font-bold text-slate-900 mb-4">About</h2>
                <p className="text-slate-600 leading-relaxed">{helper.about}</p>
                
                <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {helper.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-lg font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary-100 bg-primary-50/30">
              <CardContent>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Choose a Service Plan</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {Object.entries(helper.plans).map(([key, value]) => (
                    value && (
                      <button
                        key={key}
                        onClick={() => setSelectedPlan(key)}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${selectedPlan === key ? 'border-primary-600 bg-white shadow-md' : 'border-slate-200 bg-white hover:border-primary-300'}`}
                      >
                        <span className="text-xs uppercase font-bold text-slate-400">{key}</span>
                        <span className="text-lg font-bold text-slate-900">{value}</span>
                      </button>
                    )
                  ))}
                </div>
                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={handleBook}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? "Processing..." : `Book Now (${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)})`}
                </Button>
                <p className="text-center text-xs text-slate-400 mt-4 italic">
                  Payments are handled after service completion in Phase 1.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
