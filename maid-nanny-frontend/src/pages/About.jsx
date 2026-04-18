export default function About() {
  const steps = [
    { title: "Search", desc: "Browse verified maids, nannies, and babysitters based on your needs.", icon: "🔍" },
    { title: "Select", desc: "Choose a service plan (Hourly, Monthly, or Yearly) that fits your budget.", icon: "📋" },
    { title: "Book", desc: "Send a request and get instant confirmation from your chosen helper.", icon: "📅" },
    { title: "Relax", desc: "Enjoy professional service with trust, safety, and reliability.", icon: "✨" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-slate-900 mb-6">How it Works</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our platform simplifies the process of finding trusted domestic help through a digital-first approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-200 shadow-sm animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-4xl mb-4 bg-primary-50 w-16 h-16 flex items-center justify-center rounded-2xl">{step.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary-600 rounded-[2.5rem] p-12 text-white overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="bg-primary-500 rounded-full p-1 text-xs">✓</span>
                  <span><strong>100% Verified Profiles:</strong> We perform rigorous background checks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary-500 rounded-full p-1 text-xs">✓</span>
                  <span><strong>Standardized Pricing:</strong> No more bargaining or hidden fees.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary-500 rounded-full p-1 text-xs">✓</span>
                  <span><strong>Flexible Plans:</strong> Hourly, daily, or annual subscriptions.</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 text-center md:text-right">
              <div className="inline-block p-1 bg-white/10 rounded-3xl backdrop-blur-md">
                <div className="bg-white/20 p-8 rounded-2xl">
                  <p className="text-5xl font-bold mb-2">98%</p>
                  <p className="text-primary-100 uppercase tracking-widest text-xs font-bold">Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
