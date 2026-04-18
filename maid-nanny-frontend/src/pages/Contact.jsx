import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-slate-900 mb-6">Let's Talk</h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Have questions about our services or need help finding the right helper? Our team is here to support you 24/7.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-2xl text-2xl">📧</div>
                <div>
                  <h4 className="font-bold text-slate-900">Email Us</h4>
                  <p className="text-slate-500">support@maidnanny.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-2xl text-2xl">📞</div>
                <div>
                  <h4 className="font-bold text-slate-900">Call Us</h4>
                  <p className="text-slate-500">+1 (555) 000-0000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-2xl text-2xl">📍</div>
                <div>
                  <h4 className="font-bold text-slate-900">Visit Us</h4>
                  <p className="text-slate-500">123 Service Lane, Suite 100<br/>New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-8 shadow-2xl border-none">
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" placeholder="Jane" />
                  <Input label="Last Name" placeholder="Doe" />
                </div>
                <Input label="Email Address" type="email" placeholder="jane@example.com" />
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Message</label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all min-h-[150px]"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>
                <Button className="w-full py-4 font-bold text-lg">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
