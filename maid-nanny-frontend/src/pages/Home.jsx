import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function Home() {
  const navigate = useNavigate();

  const paths = [
    {
      title: "Hire a Helper",
      desc: "Find verified maids, nannies, and babysitters for your family with flexible plans.",
      btn: "Find Helper",
      link: "/register/household",
      theme: "primary",
      icon: "🏠",
      sub: "Trust & Safety First"
    },
    {
      title: "Become a Provider",
      desc: "Join our network of professionals and find high-quality work opportunities.",
      btn: "Join as Partner",
      link: "/register/helper",
      theme: "primary",
      icon: "💼",
      sub: "Professional Growth"
    },
    {
      title: "Platform Manager",
      desc: "Unified administration portal for verification and system analytics.",
      btn: "Secure Login",
      link: "/admin-portal",
      theme: "primary",
      icon: "⚙️",
      sub: "Admin Portal"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-6">Verified Domestic Help</Badge>
          <h1 className="text-5xl md:text-7xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            Find Trusted <br/>
            <span className="text-primary-600">Maids & Nannies</span> For Your Home
          </h1>
          <p className="text-xl text-slate-500 mt-6 max-w-3xl mx-auto">
            Standardized pricing, verified profiles, and flexible plans for your household needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {paths.map((p, i) => (
            <div 
              key={p.title} 
              className={`p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-start text-left animate-slide-up`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl mb-6">{p.icon}</div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-2">{p.sub}</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{p.title}</h2>
              <p className="text-slate-500 mb-8 leading-relaxed flex-grow">{p.desc}</p>
              <Button 
                size="lg" 
                variant={p.theme}
                className="w-full font-bold py-7 rounded-2xl mt-auto"
                onClick={() => navigate(p.link)}
              >
                {p.btn}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function Badge({ children, className }) {
  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary-50 text-primary-700 ${className}`}>{children}</span>;
}
