import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { BookOpen, Award, Download, Crown, Play, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const courses = [
  { title: "Mathematics S4", teacher: "Mr. Habimana", progress: 72, lessons: 24 },
  { title: "Physics S4", teacher: "Ms. Uwase", progress: 58, lessons: 20 },
  { title: "English Language", teacher: "Mr. Nshuti", progress: 85, lessons: 18 },
  { title: "ICT Fundamentals", teacher: "Ms. Ingabire", progress: 40, lessons: 22 },
  { title: "Biology S5", teacher: "Dr. Kamanzi", progress: 15, lessons: 28 },
];

const PremiumDashboard = () => {
  const { profile } = useAuth();

  const expiresAt = profile?.premium_expires_at ? new Date(profile.premium_expires_at) : null;
  const daysLeft = expiresAt ? Math.max(0, Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 0;

  return (
    <DashboardLayout role="student" userName={profile?.full_name ?? "User"}>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Welcome, {profile?.full_name?.split(" ")[0]} 👋
          </h1>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground text-xs font-semibold">
            <Crown className="w-3 h-3" /> Premium
          </span>
        </div>
        <p className="text-muted-foreground">
          {daysLeft > 0 ? `${daysLeft} days remaining on your premium plan.` : "Your premium plan has full access."}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="All Courses" value="15,000+" icon={<BookOpen className="w-5 h-5" />} variant="primary" />
        <StatCard label="Completed" value="3" icon={<Award className="w-5 h-5" />} variant="secondary" />
        <StatCard label="Certificates" value="2" icon={<Download className="w-5 h-5" />} variant="accent" />
        <StatCard label="Video Tutorials" value="200+" icon={<Play className="w-5 h-5" />} />
      </div>

      {/* Premium tools */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer">
          <Play className="w-8 h-8 text-primary mb-3" />
          <h3 className="font-display font-semibold text-foreground">Video Tutorials</h3>
          <p className="text-xs text-muted-foreground mt-1">Watch full course videos</p>
        </div>
        <div className="bg-card border rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer">
          <Download className="w-8 h-8 text-secondary mb-3" />
          <h3 className="font-display font-semibold text-foreground">Downloads</h3>
          <p className="text-xs text-muted-foreground mt-1">PDFs, assignments, resources</p>
        </div>
        <div className="bg-card border rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer">
          <Award className="w-8 h-8 text-accent mb-3" />
          <h3 className="font-display font-semibold text-foreground">Certificates</h3>
          <p className="text-xs text-muted-foreground mt-1">Download your certificates</p>
        </div>
      </div>

      {/* Course progress */}
      <div className="bg-card border rounded-xl p-6">
        <h2 className="font-display font-semibold text-lg text-foreground mb-4">Your Courses</h2>
        <div className="space-y-4">
          {courses.map((c, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">{c.title}</p>
                <p className="text-xs text-muted-foreground">{c.teacher} · {c.lessons} lessons</p>
              </div>
              <div className="w-28">
                <Progress value={c.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1 text-right">{c.progress}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PremiumDashboard;
