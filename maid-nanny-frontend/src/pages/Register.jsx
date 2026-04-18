import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { registerUser } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get("role") === "helper" ? "helper" : "household";
  
  const [role, setRole] = useState(initialRole);

  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
    experience: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await registerUser({ ...formData, role });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (role === "household") navigate("/search");
      else navigate("/helper/dashboard");
    } catch (err) {
      setError("Registration failed. Email might already be in use.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg animate-slide-up shadow-elegant">
        <CardHeader>
          <div className="text-center">
            <h1 className="text-2xl font-bold font-display text-slate-900">Create an Account</h1>
            <p className="text-sm text-slate-500 mt-2">Join the Maid & Nanny platform</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-5">
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg animate-fade-in">{error}</div>}
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
              {['household', 'helper'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg capitalize transition-all ${role === r ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  I am a {r}
                </button>
              ))}
            </div>
            
            <Input 
              label="Full Name" 
              name="name"
              placeholder="John Doe" 
              required 
              value={formData.name}
              onChange={handleChange}
            />
            <Input 
              label="Email Address" 
              name="email"
              type="email" 
              placeholder="you@example.com" 
              required 
              value={formData.email}
              onChange={handleChange}
            />
            <Input 
              label="Password" 
              name="password"
              type="password" 
              placeholder="••••••••" 
              required 
              value={formData.password}
              onChange={handleChange}
            />

            {role === 'helper' && (
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                <h3 className="font-semibold text-slate-800 text-sm">Helper Details</h3>
                <Input 
                  label="Service Type" 
                  name="type"
                  placeholder="Maid, Nanny, or Babysitter" 
                  required 
                  value={formData.type}
                  onChange={handleChange}
                />
                <Input 
                  label="Experience (Years)" 
                  name="experience"
                  type="number" 
                  placeholder="5" 
                  required 
                  value={formData.experience}
                  onChange={handleChange}
                />
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="verify" className="rounded text-primary-600 w-4 h-4" required />
                  <label htmlFor="verify" className="text-sm text-slate-600">I agree to background verification</label>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-600 flex justify-center gap-1">
            Already have an account? <p className="text-primary-600 hover:underline cursor-pointer font-medium" onClick={() => navigate("/login")}>Log in</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
