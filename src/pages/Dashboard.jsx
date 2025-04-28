
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { SalesAnalytics } from "@/components/dashboard/SalesAnalytics";
import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";
import { BookingsTickets } from "@/components/dashboard/BookingsTickets";
import EventManagement from "@/components/dashboard/EventManagement";
import "../styles/variables.css";
import "../styles/theme.css";

const Dashboard = () => {
  // Main state for the dashboard
  const [activeView, setActiveView] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Toggle sidebar visibility
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar navigation */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setActiveView={setActiveView} 
        activeView={activeView} 
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Conditional rendering of dashboard views */}
          {activeView === "overview" && <DashboardOverview />}
          {activeView === "sales" && <SalesAnalytics />}
          {activeView === "tickets" && <BookingsTickets />}
          {activeView === "notifications" && <NotificationsPanel />}
          {activeView === "events" && <EventManagement />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
