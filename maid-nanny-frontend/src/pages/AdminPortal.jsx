import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { login } from "../services/api";

export default function AdminPortal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(formData.email, formData.password);
      if (data.user.role !== 'admin') {
        throw new Error("Access denied. Admin credentials required.");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Invalid Admin Credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700 shadow-2xl overflow-hidden">
        <div className="h-2 bg-primary-600"></div>
        <CardHeader className="text-center pt-8">
          <div className="w-16 h-16 bg-slate-700 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-slate-600 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold font-display text-white">Platform Manager</h1>
          <p className="text-slate-400 mt-2">Authorized Access Only</p>
        </CardHeader>
        <CardContent className="pb-10 pt-4">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <div className="p-3 text-sm text-red-400 bg-red-900/30 border border-red-800 rounded-lg">{error}</div>}
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Admin Email</label>
                <input 
                  type="email" 
                  className="w-full bg-slate-700 border-slate-600 text-white p-3 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                  placeholder="admin@platform.com"
                  required
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Secret Key</label>
                <input 
                  type="password" 
                  className="w-full bg-slate-700 border-slate-600 text-white p-3 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                  placeholder="••••••••"
                  required
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-500 text-white py-6 text-lg font-bold" disabled={loading}>
              {loading ? "Authenticating..." : "Enter Portal"}
            </Button>
          </form>
          <p className="text-center mt-6 text-xs text-slate-500">
            Forgot credentials? Contact system architect.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
