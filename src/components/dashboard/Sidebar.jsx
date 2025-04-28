
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BarChart3,
  TicketIcon,
  Bell,
  Calendar
} from "lucide-react";

export const Sidebar = ({ isOpen, setActiveView, activeView }) => {
  // Track mobile viewport
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    // Set up event listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Navigation menu items
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "sales", label: "Sales Analytics", icon: BarChart3 },
    { id: "tickets", label: "Bookings & Tickets", icon: TicketIcon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "events", label: "Events", icon: Calendar }
  ];

  // Hide sidebar on mobile when closed
  if (!isOpen && !isMobile) return null;

  return (
    <div className={`${isOpen ? "w-64" : "w-0"} transition-all duration-300 bg-sidebar text-sidebar-foreground border-r border-sidebar-border shrink-0 h-screen`}>
      <div className="p-6">
        {/* Brand logo/name */}
        <h1 className="text-2xl font-bold mb-6 nav-animated-text">HermesPass</h1>
        
        {/* Navigation menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveView(item.id)}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
};
