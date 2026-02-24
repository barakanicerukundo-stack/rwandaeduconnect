import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { BookOpen, Users, ClipboardList, FileUp } from "lucide-react";

const courses = [
  { id: "1", title: "Mathematics S4", students: 42, submissions: 38 },
  { id: "2", title: "Mathematics S5", students: 35, submissions: 30 },
  { id: "3", title: "Advanced Calculus", students: 28, submissions: 22 },
];

const recentSubmissions = [
  { student: "Umuhoza Marie", assignment: "Algebra Set 5", date: "Feb 23, 2026", graded: false },
  { student: "Ndayisaba Patrick", assignment: "Algebra Set 5", date: "Feb 23, 2026", graded: false },
  { student: "Uwimana Gloria", assignment: "Geometry Quiz", date: "Feb 22, 2026", graded: true },
  { student: "Mugisha David", assignment: "Geometry Quiz", date: "Feb 22, 2026", graded: true },
];

const TeacherDashboard = () => {
  return (
    <DashboardLayout role="teacher" userName="Mr. Habimana">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Teacher Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your courses and student submissions.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Active Courses" value="3" icon={<BookOpen className="w-5 h-5" />} variant="primary" />
        <StatCard label="Total Students" value="105" icon={<Users className="w-5 h-5" />} variant="secondary" />
        <StatCard label="Pending Grading" value="12" icon={<ClipboardList className="w-5 h-5" />} variant="accent" />
        <StatCard label="Materials Uploaded" value="47" change="+5 this week" icon={<FileUp className="w-5 h-5" />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">My Courses</h2>
          <div className="space-y-3">
            {courses.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.students} students</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{c.submissions}/{c.students} submitted</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">Recent Submissions</h2>
          <div className="space-y-3">
            {recentSubmissions.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm text-foreground">{s.student}</p>
                  <p className="text-xs text-muted-foreground">{s.assignment} · {s.date}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  s.graded ? "bg-secondary/20 text-secondary" : "bg-accent/20 text-accent-foreground"
                }`}>
                  {s.graded ? "Graded" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
