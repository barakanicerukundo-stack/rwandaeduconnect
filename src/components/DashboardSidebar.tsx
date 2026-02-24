import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GraduationCap, LayoutDashboard, BookOpen, FileText,
  Users, Settings, LogOut, BarChart3, Bell, School, ClipboardList
} from "lucide-react";
import type { UserRole } from "@/types";

interface Props {
  role: UserRole;
  userName: string;
}

const menuItems: Record<UserRole, { label: string; icon: typeof LayoutDashboard; path: string }[]> = {
  student: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/student" },
    { label: "My Courses", icon: BookOpen, path: "/student/courses" },
    { label: "Assignments", icon: FileText, path: "/student/assignments" },
    { label: "Grades", icon: BarChart3, path: "/student/grades" },
    { label: "Notifications", icon: Bell, path: "/student/notifications" },
  ],
  teacher: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/teacher" },
    { label: "Courses", icon: BookOpen, path: "/teacher/courses" },
    { label: "Assignments", icon: ClipboardList, path: "/teacher/assignments" },
    { label: "Students", icon: Users, path: "/teacher/students" },
    { label: "Notifications", icon: Bell, path: "/teacher/notifications" },
  ],
  admin: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { label: "Users", icon: Users, path: "/admin/users" },
    { label: "Schools", icon: School, path: "/admin/schools" },
    { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ],
};

const DashboardSidebar = ({ role, userName }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const items = menuItems[role];

  return (
    <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <GraduationCap className="w-6 h-6 text-accent" />
          <span>RWE<span className="text-accent">NET</span></span>
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center font-semibold text-sm">
            {userName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">{role}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
