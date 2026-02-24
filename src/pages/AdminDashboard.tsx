import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Users, School, BookOpen, Shield, TrendingUp } from "lucide-react";

const recentActivity = [
  { action: "New school registered", detail: "Lycée de Kigali", time: "2 hours ago" },
  { action: "Teacher approved", detail: "Uwamahoro Diane — Physics", time: "4 hours ago" },
  { action: "Course published", detail: "Biology S6 — National Curriculum", time: "6 hours ago" },
  { action: "User reported", detail: "Spam content flagged", time: "1 day ago" },
  { action: "System update", detail: "Platform v2.4 deployed", time: "2 days ago" },
];

const topSchools = [
  { name: "Green Hills Academy", students: 1240, district: "Kigali" },
  { name: "Riviera High School", students: 980, district: "Gasabo" },
  { name: "King David Academy", students: 870, district: "Nyarugenge" },
  { name: "Lycée Notre Dame", students: 760, district: "Huye" },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">National overview of the RWENET platform.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Users" value="1.28M" change="+12% this month" icon={<Users className="w-5 h-5" />} variant="primary" />
        <StatCard label="Registered Schools" value="3,247" change="+48 new" icon={<School className="w-5 h-5" />} variant="secondary" />
        <StatCard label="Active Courses" value="15,420" icon={<BookOpen className="w-5 h-5" />} variant="accent" />
        <StatCard label="System Health" value="99.8%" icon={<Shield className="w-5 h-5" />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">Top Schools</h2>
          <div className="space-y-3">
            {topSchools.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center font-display font-bold text-sm text-secondary">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.district}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">{s.students.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
