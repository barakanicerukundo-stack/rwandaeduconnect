import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Crown, Upload, Phone, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const UpgradePage = () => {
  const { user, profile } = useAuth();
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!transactionId && !screenshot) {
      toast.error("Please provide a transaction ID or payment screenshot");
      return;
    }

    setLoading(true);
    let screenshotUrl: string | null = null;

    if (screenshot) {
      const ext = screenshot.name.split(".").pop();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("payment-proofs")
        .upload(path, screenshot);
      if (uploadError) {
        toast.error("Failed to upload screenshot: " + uploadError.message);
        setLoading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("payment-proofs").getPublicUrl(path);
      screenshotUrl = urlData.publicUrl;
    }

    const { error } = await supabase.from("upgrade_requests").insert({
      user_id: user.id,
      transaction_id: transactionId || null,
      payment_screenshot_url: screenshotUrl,
    });

    setLoading(false);
    if (error) {
      toast.error("Failed to submit: " + error.message);
    } else {
      toast.success("Upgrade request submitted! We'll verify your payment shortly.");
      setSubmitted(true);
    }
  };

  if (profile?.account_type === "premium") {
    return (
      <DashboardLayout role="student" userName={profile.full_name}>
        <div className="max-w-lg mx-auto text-center py-12">
          <CheckCircle2 className="w-16 h-16 text-secondary mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">You're Already Premium!</h1>
          <p className="text-muted-foreground mb-6">Enjoy full access to all courses and resources.</p>
          <Link to="/dashboard">
            <Button><ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  if (submitted) {
    return (
      <DashboardLayout role="student" userName={profile?.full_name ?? "User"}>
        <div className="max-w-lg mx-auto text-center py-12">
          <CheckCircle2 className="w-16 h-16 text-secondary mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Request Submitted!</h1>
          <p className="text-muted-foreground mb-6">Our admin will verify your payment within 24 hours. You'll be notified once approved.</p>
          <Link to="/dashboard">
            <Button><ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student" userName={profile?.full_name ?? "User"}>
      <div className="max-w-2xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="bg-gradient-hero rounded-xl p-8 text-primary-foreground mb-8">
          <Crown className="w-10 h-10 text-accent mb-4" />
          <h1 className="font-display text-3xl font-bold mb-2">Upgrade to Premium</h1>
          <p className="text-primary-foreground/70 text-lg">Unlock all courses, tutorials, downloadable resources, and certificates.</p>
          <div className="mt-4 inline-flex items-baseline gap-1">
            <span className="text-4xl font-display font-bold">10,000</span>
            <span className="text-lg">RWF</span>
            <span className="text-primary-foreground/60 ml-2">/ 2 months</span>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-card border rounded-xl p-6 mb-6">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">
            <Phone className="w-5 h-5 inline mr-2 text-primary" />
            Payment via Mobile Money
          </h2>
          <div className="space-y-3 text-sm">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-medium text-foreground mb-2">Send 10,000 RWF to:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">MTN MoMo:</span>
                  <code className="bg-primary/10 text-primary px-2 py-0.5 rounded font-mono font-bold">+250 792 828 727</code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Airtel Money:</span>
                  <code className="bg-primary/10 text-primary px-2 py-0.5 rounded font-mono font-bold">+250 732 594 863</code>
                </div>
              </div>
            </div>
            <ol className="list-decimal list-inside text-muted-foreground space-y-1">
              <li>Send <strong className="text-foreground">10,000 RWF</strong> to one of the numbers above</li>
              <li>Take a <strong className="text-foreground">screenshot</strong> of the confirmation or note the <strong className="text-foreground">Transaction ID</strong></li>
              <li>Submit the proof below — we'll verify and upgrade your account</li>
            </ol>
          </div>
        </div>

        {/* Upload Form */}
        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">Submit Payment Proof</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="txId">Transaction ID (optional)</Label>
              <Input id="txId" placeholder="e.g. TXN123456789" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="screenshot">Payment Screenshot (optional)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer" onClick={() => document.getElementById("screenshot")?.click()}>
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                {screenshot ? (
                  <p className="text-sm text-foreground font-medium">{screenshot.name}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Click to upload screenshot (PNG, JPG)</p>
                )}
                <input id="screenshot" type="file" accept="image/*" className="hidden" onChange={(e) => setScreenshot(e.target.files?.[0] || null)} />
              </div>
            </div>

            <Button type="submit" className="w-full font-semibold" size="lg" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>
                <Crown className="w-4 h-4 mr-2" /> Submit Upgrade Request
              </>}
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UpgradePage;
