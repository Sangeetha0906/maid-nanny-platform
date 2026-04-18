import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { login } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("household");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      const userRole = data.user.role;
      if (userRole === "household") navigate("/search");
      if (userRole === "helper") navigate("/helper/dashboard");
      if (userRole === "admin") navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-slide-up shadow-elegant">
        <CardHeader>
          <div className="text-center">
            <h1 className="text-2xl font-bold font-display text-slate-900">Welcome Back</h1>
            <p className="text-sm text-slate-500 mt-2">Log in to your account</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg animate-fade-in">{error}</div>}
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
              {['household', 'helper', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg capitalize transition-all ${role === r ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {r}
                </button>
              ))}
            </div>
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="you@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Logging in..." : `Log In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-600 flex justify-center gap-1">
            Don't have an account? <p className="text-primary-600 hover:underline cursor-pointer font-medium" onClick={() => navigate("/register")}>Sign up</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}