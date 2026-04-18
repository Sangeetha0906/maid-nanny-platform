import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { registerUser } from "../services/api";

export default function RegisterHousehold() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    familySize: "",
    address: "",
    preferredHelp: "Maid"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await registerUser({ ...formData, role: "household" });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/search");
    } catch (err) {
      setError("Registration failed. Please check your data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <Card className="w-full max-w-lg border-primary-100 shadow-xl">
        <CardHeader className="text-center pb-2 bg-primary-50/30">
          <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">🏠</div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Find Help for Your Home</h1>
          <p className="text-slate-500 mt-2">Hire verified professionals for your family</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name" name="name" placeholder="John Doe" required onChange={handleChange} />
              <Input label="Email" name="email" type="email" placeholder="john@example.com" required onChange={handleChange} />
            </div>

            <Input label="Password" name="password" type="password" placeholder="••••••••" required onChange={handleChange} />
            
            <div className="p-4 bg-primary-50/50 rounded-2xl border border-primary-100 space-y-4">
              <h3 className="font-semibold text-primary-800 text-sm">Household Details</h3>
              <Input label="Address / Area" name="address" placeholder="Downtown, City Center" required onChange={handleChange} />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Family Members</label>
                  <select name="familySize" className="w-full p-2 border border-slate-200 rounded-lg text-sm" onChange={handleChange}>
                    <option>1-2 Members</option>
                    <option>3-5 Members</option>
                    <option>6+ Members</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Primary Need</label>
                  <select name="preferredHelp" className="w-full p-2 border border-slate-200 rounded-lg text-sm" onChange={handleChange}>
                    <option>Maid</option>
                    <option>Nanny</option>
                    <option>Babysitter</option>
                  </select>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Creating Profile..." : "Find My Helper"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            Professional looking for work? <Link to="/register/helper" className="text-primary-600 font-bold hover:underline">Apply here</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
