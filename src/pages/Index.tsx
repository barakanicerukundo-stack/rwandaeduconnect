import { Link } from "react-router-dom";
import { BookOpen, Users, School, GraduationCap, ArrowRight, Globe, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "3,200+", label: "Schools Connected", icon: School },
  { value: "1.2M", label: "Students Enrolled", icon: GraduationCap },
  { value: "48,000+", label: "Qualified Teachers", icon: Users },
  { value: "15,000+", label: "Course Materials", icon: BookOpen },
];

const features = [
  {
    icon: BookOpen,
    title: "Digital Learning",
    description: "Access thousands of curriculum-aligned materials, assignments, and resources from any device.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security protects student data and ensures platform availability nationwide.",
  },
  {
    icon: Globe,
    title: "Nationwide Reach",
    description: "Connecting every district and province across Rwanda with a unified education platform.",
  },
  {
    icon: Zap,
    title: "Real-time Analytics",
    description: "Track student progress, school performance, and national education metrics instantly.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Rwanda landscape" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm text-primary-foreground/90">Rwanda Education Network — Now Live</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Transforming Education{" "}
              <span className="text-accent">Across Rwanda</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/75 max-w-2xl mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              A unified digital platform connecting students, teachers, and schools nationwide.
              Empowering the next generation through accessible, quality education.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/register">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold gap-2 shadow-glow-green">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="relative -mt-20 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl p-6 shadow-lg border animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-primary mb-3" />
                <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Built for Rwanda's <span className="text-gradient-hero">Future</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A comprehensive platform designed to support every aspect of education management.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <f.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Education?
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8 text-lg">
            Join thousands of schools, teachers, and students already using RWENET.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2">
                Register Your School <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background/70 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-display font-bold text-lg text-background">
              <GraduationCap className="w-6 h-6 text-accent" />
              RWE<span className="text-accent">NET</span>
            </div>
            <p className="text-sm">© 2026 Rwanda Education Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
