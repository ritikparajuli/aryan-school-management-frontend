// src/routes/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  BookOpen, 
  Users, 
  Award, 
  Calendar, 
  FileText, 
  BarChart, 
  CheckCircle,
  Clock,
  MessageSquare,
  Shield,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Zap,
  Globe,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Linkedin,
  Youtube
} from "lucide-react";
import { COLLEGE_NAME } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Navigation */}
      <nav className="border-b border-primary/10 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img 
              src="/aryan_college.jpg" 
              alt="Aryan College" 
              className="h-9 w-9 shrink-0 rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold text-lg">{COLLEGE_NAME}</p>
              <p className="text-xs text-muted-foreground">Excellence in Education</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-input bg-card px-5 text-sm font-medium transition hover:bg-muted"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Campus Management Reimagined
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              The Complete College
              <span className="text-primary block">Management Platform</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Streamline attendance tracking, assignment management, result publishing, 
              and campus communication, all in one intuitive platform designed for 
              modern educational institutions.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/login"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:opacity-95"
              >
                Get Started Free
                <span className="ml-2">→</span>
              </Link>
              <a
                href="#features"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-input px-8 text-base font-medium transition hover:bg-muted"
              >
                Learn More
              </a>
            </div>
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                No credit card
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Free for colleges
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                24/7 support
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/10 p-6 backdrop-blur border border-primary/20 h-[120px] flex flex-col">
                <Users className="h-8 w-8 text-primary" />
                <p className="mt-2 font-semibold">500+</p>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </div>
              <div className="rounded-xl bg-primary/10 p-6 backdrop-blur border border-primary/20 h-[120px] flex flex-col">
                <BookOpen className="h-8 w-8 text-primary" />
                <p className="mt-2 font-semibold">30+</p>
                <p className="text-sm text-muted-foreground">Academic Courses</p>
              </div>
              <div className="rounded-xl bg-primary/10 p-6 backdrop-blur border border-primary/20 h-[120px] flex flex-col">
                <Calendar className="h-8 w-8 text-primary" />
                <p className="mt-2 font-semibold">200+</p>
                <p className="text-sm text-muted-foreground">Events Annually</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/10 p-6 backdrop-blur border border-primary/20 h-[120px] flex flex-col">
                <Award className="h-8 w-8 text-primary" />
                <p className="mt-2 font-semibold">95%</p>
                <p className="text-sm text-muted-foreground">Student Pass Rate</p>
              </div>
              <div className="rounded-xl bg-primary/10 p-6 backdrop-blur border border-primary/20 h-[120px] flex flex-col">
                <BarChart className="h-8 w-8 text-primary" />
                <p className="mt-2 font-semibold">4.8</p>
                <p className="text-sm text-muted-foreground">Student Satisfaction</p>
              </div>
              <div className="rounded-xl bg-primary/10 p-6 backdrop-blur border border-primary/20 h-[120px] flex flex-col">
                <TrendingUp className="h-8 w-8 text-primary" />
                <p className="mt-2 font-semibold">100%</p>
                <p className="text-sm text-muted-foreground">Digital Transformation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Everything You Need</h2>
            <p className="mt-3 text-muted-foreground">
              A complete suite of tools for modern college management
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { 
                icon: Users, 
                label: "Attendance Management", 
                desc: "Mark and track attendance with ease. Real-time monitoring and automated reports." 
              },
              { 
                icon: FileText, 
                label: "Assignments & Submissions", 
                desc: "Upload assignments, track submissions, and provide feedback instantly." 
              },
              { 
                icon: BarChart, 
                label: "Results & Performance", 
                desc: "View grades, generate report cards, and track academic progress." 
              },
              { 
                icon: Calendar, 
                label: "Event Calendar", 
                desc: "Stay updated with college events, holidays, and important deadlines." 
              },
              { 
                icon: Clock, 
                label: "Time Management", 
                desc: "Schedule classes, manage timetables, and organize academic sessions." 
              },
              { 
                icon: MessageSquare, 
                label: "Real-time Communication", 
                desc: "Instant messaging and announcements for seamless campus communication." 
              },
              { 
                icon: Shield, 
                label: "Secure & Reliable", 
                desc: "Enterprise-grade security with role-based access control and data encryption." 
              },
              { 
                icon: Sparkles, 
                label: "Smart Analytics", 
                desc: "AI-powered insights and analytics for informed decision-making." 
              },
            ].map((f) => (
              <div key={f.label} className="rounded-xl bg-card p-6 border shadow-sm transition-all hover:shadow-lg hover:scale-[1.02] hover:border-primary/20">
                <f.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-3 font-semibold">{f.label}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">10K+</div>
            <div className="mt-2 text-sm text-muted-foreground">Students Enrolled</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">500+</div>
            <div className="mt-2 text-sm text-muted-foreground">Faculty Members</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">50+</div>
            <div className="mt-2 text-sm text-muted-foreground">Programs Offered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">98%</div>
            <div className="mt-2 text-sm text-muted-foreground">Placement Rate</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your College?</h2>
          <p className="mt-3 text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of institutions already using our platform to streamline 
            their operations and enhance the learning experience.
          </p>
          <Link
            to="/login"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-semibold text-primary shadow-lg mt-6 transition hover:scale-105"
          >
            Start Your Journey Today
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* About */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/aryan_college.jpg" 
                  alt="Aryan College" 
                  className="h-9 w-9 shrink-0 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">{COLLEGE_NAME}</p>
                  <p className="text-xs text-muted-foreground">Excellence in Education</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Empowering educational institutions with cutting-edge technology 
                for seamless campus management.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition">Features</a></li>
                <li><a href="#" className="hover:text-primary transition">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition">Courses</a></li>
                <li><a href="#" className="hover:text-primary transition">Admissions</a></li>
                <li><a href="#" className="hover:text-primary transition">Careers</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition">FAQs</a></li>
                <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Get in Touch</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>123 Education Street, College Town</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:info@college.edu" className="hover:text-primary transition">
                    info@college.edu
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+1234567890" className="hover:text-primary transition">
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-primary" />
                  <a href="#" className="hover:text-primary transition">
                    www.college.edu
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} {COLLEGE_NAME}. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition">Cookie Policy</a>
              <a href="#" className="hover:text-foreground transition">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}