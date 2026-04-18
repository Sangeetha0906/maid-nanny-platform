import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { registerUser } from "../services/api";

export default function RegisterHelper() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "Maid",
    experience: "",
    skills: [],
    about: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const predefinedSkills = ["Cooking", "Deep Cleaning", "Infant Care", "Pet Friendly", "Elderly Care"];

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await registerUser({ ...formData, role: "helper" });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/helper/dashboard");
    } catch (err) {
      setError("Failed to create provider profile. Email might be in use.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSkill = (skill) => {
    const updated = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
    setFormData({ ...formData, skills: updated });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <Card className="w-full max-w-lg border-primary-100 shadow-xl">
        <CardHeader className="text-center pb-2 bg-primary-50/30">
          <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">💼</div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Become a Provider</h1>
          <p className="text-slate-500 mt-2">Build your professional profile and find jobs</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
            
            <Input label="Full Name" name="name" placeholder="Maria Garcia" required onChange={handleChange} />
            <Input label="Email Address" name="email" type="email" placeholder="maria@helper.com" required onChange={handleChange} />
            <Input label="Password" name="password" type="password" placeholder="••••••••" required onChange={handleChange} />
            
            <div className="p-4 bg-primary-50/50 rounded-2xl border border-primary-100 space-y-4">
              <h3 className="font-semibold text-primary-800 text-sm">Professional Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Profession</label>
                  <select name="type" className="w-full p-2 border border-slate-200 rounded-lg text-sm" onChange={handleChange}>
                    <option>Maid</option>
                    <option>Nanny</option>
                    <option>Babysitter</option>
                  </select>
                </div>
                <Input label="Experience (Yrs)" name="experience" type="number" placeholder="3" required onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">My Skills</label>
                <div className="flex flex-wrap gap-2">
                  {predefinedSkills.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${formData.skills.includes(skill) ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-500 border-slate-200 hover:border-primary-300'}`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">About Me</label>
                <textarea 
                  name="about" 
                  rows="3" 
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm" 
                  placeholder="Tell clients about your work style..."
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Publishing Profile..." : "Publish My Profile"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            Looking to hire? <Link to="/register/household" className="text-primary-600 font-bold hover:underline">Find a Helper</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
