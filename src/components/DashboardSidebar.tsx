import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GraduationCap, LayoutDashboard, BookOpen, Crown,
  Users, Settings, LogOut, BarChart3, Bell, School, MessageCircle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const DashboardSidebar = ({ role, userName }: { role: string; userName: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, isAdmin, profile } = useAuth();

  const isPremium = profile?.account_type === "premium";

  const userItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    ...(isPremium ? [
      { label: "My Courses", icon: BookOpen, path: "/dashboard/courses" },
      { label: "Certificates", icon: BarChart3, path: "/dashboard/certificates" },
    ] : [
      { label: "Course Previews", icon: BookOpen, path: "/dashboard/courses" },
    ]),
    { label: "Upgrade", icon: Crown, path: "/upgrade" },
  ];

  const adminItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { label: "Users", icon: Users, path: "/admin/users" },
    { label: "Schools", icon: School, path: "/admin/schools" },
    { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const items = isAdmin && location.pathname.startsWith("/admin") ? adminItems : userItems;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="p-5 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <GraduationCap className="w-6 h-6 text-accent" />
          <span>RWE<span className="text-accent">NET</span></span>
        </Link>
      </div>

      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center font-semibold text-sm">
            {userName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">
              {isAdmin ? "Admin" : profile?.account_type === "premium" ? "Premium" : "Free"}
            </p>
          </div>
        </div>
      </div>

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

      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={handleSignOut}
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
