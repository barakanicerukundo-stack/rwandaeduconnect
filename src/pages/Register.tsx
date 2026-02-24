import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UserRole } from "@/types";

const roles: { value: UserRole; label: string; desc: string }[] = [
  { value: "student", label: "Student", desc: "Access courses and assignments" },
  { value: "teacher", label: "Teacher", desc: "Manage courses and grade students" },
  { value: "admin", label: "Administrator", desc: "Manage schools and users" },
];

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="hidden lg:flex flex-1 bg-gradient-green items-center justify-center p-12">
        <div className="max-w-md text-secondary-foreground">
          <GraduationCap className="w-12 h-12 text-accent mb-6" />
          <h1 className="font-display text-3xl font-bold mb-4">Join RWENET Today</h1>
          <p className="text-secondary-foreground/70 text-lg">
            Register to access Rwanda's national education platform and start your learning journey.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 font-display font-bold text-xl mb-8">
            <GraduationCap className="w-7 h-7 text-secondary" />
            RWE<span className="text-accent">NET</span>
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground mb-1">Create Account</h2>
          <p className="text-muted-foreground mb-8">Select your role and fill in your details</p>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {roles.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  role === r.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <p className="font-semibold text-sm text-foreground">{r.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Jean Claude Uwimana" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@school.rw" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
              Create Account
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
