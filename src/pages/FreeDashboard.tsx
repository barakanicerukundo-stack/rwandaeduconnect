import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { BookOpen, Lock, Crown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const previewCourses = [
  { title: "Mathematics S4", teacher: "Mr. Habimana", locked: true },
  { title: "Physics S4", teacher: "Ms. Uwase", locked: true },
  { title: "English Language (Intro)", teacher: "Mr. Nshuti", locked: false },
  { title: "ICT Fundamentals (Intro)", teacher: "Ms. Ingabire", locked: false },
];

const FreeDashboard = () => {
  const { profile, user } = useAuth();

  const { data: upgradeRequest } = useQuery({
    queryKey: ["upgrade-request", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("upgrade_requests")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  return (
    <DashboardLayout role="student" userName={profile?.full_name ?? "User"}>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Welcome, {profile?.full_name?.split(" ")[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1">You're on the <span className="font-semibold text-accent">Free Plan</span>. Upgrade to access all courses.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Free Courses" value="2" icon={<BookOpen className="w-5 h-5" />} variant="primary" />
        <StatCard label="Locked Courses" value="15,000+" icon={<Lock className="w-5 h-5" />} />
        <StatCard label="Account Type" value="Free" icon={<Crown className="w-5 h-5" />} variant="accent" />
        <StatCard label="Messages" value="0" icon={<MessageCircle className="w-5 h-5" />} />
      </div>

      {/* Upgrade CTA */}
      <div className="bg-gradient-hero rounded-xl p-6 mb-6 text-primary-foreground">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-xl mb-1">🚀 Upgrade to Premium</h2>
            <p className="text-primary-foreground/70">Get full access to all courses, tutorials, certificates & more for just <strong>10,000 RWF / 2 months</strong>.</p>
          </div>
          <Link to="/upgrade">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold whitespace-nowrap">
              <Crown className="w-4 h-4 mr-2" /> Upgrade Now
            </Button>
          </Link>
        </div>
        {upgradeRequest && (
          <div className="mt-4 bg-primary-foreground/10 rounded-lg p-3">
            <p className="text-sm">
              Upgrade request status: <span className={`font-bold ${upgradeRequest.status === 'approved' ? 'text-secondary' : upgradeRequest.status === 'rejected' ? 'text-destructive' : 'text-accent'}`}>
                {upgradeRequest.status.toUpperCase()}
              </span>
              {upgradeRequest.admin_notes && <span className="block mt-1 text-primary-foreground/60">Note: {upgradeRequest.admin_notes}</span>}
            </p>
          </div>
        )}
      </div>

      {/* Course Previews */}
      <div className="bg-card border rounded-xl p-6">
        <h2 className="font-display font-semibold text-lg text-foreground mb-4">Course Previews</h2>
        <div className="space-y-3">
          {previewCourses.map((c, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.locked ? 'bg-muted' : 'bg-primary/10'}`}>
                  {c.locked ? <Lock className="w-5 h-5 text-muted-foreground" /> : <BookOpen className="w-5 h-5 text-primary" />}
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.teacher}</p>
                </div>
              </div>
              {c.locked ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">Premium</span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-medium">Free</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FreeDashboard;
