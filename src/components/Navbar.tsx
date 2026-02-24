import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isLanding ? "bg-transparent" : "bg-card/95 backdrop-blur-md border-b"}`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <GraduationCap className={`w-7 h-7 ${isLanding ? "text-accent" : "text-primary"}`} />
          <span className={isLanding ? "text-primary-foreground" : "text-foreground"}>
            RWE<span className="text-accent">NET</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {isLanding && (
            <>
              <a href="#features" className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">Features</a>
              <a href="#stats" className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">Statistics</a>
              <a href="#about" className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">About</a>
            </>
          )}
          <Link to="/login">
            <Button variant={isLanding ? "outline" : "ghost"} size="sm" className={isLanding ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" : ""}>
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X className={`w-6 h-6 ${isLanding ? "text-primary-foreground" : "text-foreground"}`} /> : <Menu className={`w-6 h-6 ${isLanding ? "text-primary-foreground" : "text-foreground"}`} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b p-4 space-y-3 animate-fade-up">
          <Link to="/login" className="block" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">Sign In</Button>
          </Link>
          <Link to="/register" className="block" onClick={() => setOpen(false)}>
            <Button className="w-full bg-secondary text-secondary-foreground">Get Started</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
