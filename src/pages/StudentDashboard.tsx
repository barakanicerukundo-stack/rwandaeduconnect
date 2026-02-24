import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { BookOpen, FileText, Award, Bell } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const courses = [
  { id: "1", title: "Mathematics S4", teacher: "Mr. Habimana", progress: 72 },
  { id: "2", title: "Physics S4", teacher: "Ms. Uwase", progress: 58 },
  { id: "3", title: "English Language", teacher: "Mr. Nshuti", progress: 85 },
  { id: "4", title: "ICT Fundamentals", teacher: "Ms. Ingabire", progress: 40 },
];

const assignments = [
  { id: "1", title: "Algebra Problem Set 5", course: "Mathematics S4", due: "Feb 28, 2026", status: "pending" },
  { id: "2", title: "Lab Report: Optics", course: "Physics S4", due: "Mar 02, 2026", status: "pending" },
  { id: "3", title: "Essay: Climate Change", course: "English Language", due: "Feb 25, 2026", status: "submitted" },
];

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student" userName="Jean Claude">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, Jean Claude 👋</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your studies.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Enrolled Courses" value="4" icon={<BookOpen className="w-5 h-5" />} variant="primary" />
        <StatCard label="Pending Tasks" value="2" icon={<FileText className="w-5 h-5" />} variant="secondary" />
        <StatCard label="Average Grade" value="78%" change="+3% this term" icon={<Award className="w-5 h-5" />} variant="accent" />
        <StatCard label="Notifications" value="5" icon={<Bell className="w-5 h-5" />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Courses */}
        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">My Courses</h2>
          <div className="space-y-4">
            {courses.map((c) => (
              <div key={c.id} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.teacher}</p>
                </div>
                <div className="w-24">
                  <Progress value={c.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1 text-right">{c.progress}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments */}
        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">Upcoming Assignments</h2>
          <div className="space-y-3">
            {assignments.map((a) => (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <FileText className="w-4 h-4 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.course} · Due {a.due}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  a.status === "submitted" ? "bg-secondary/20 text-secondary" : "bg-accent/20 text-accent-foreground"
                }`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
