
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { SalesAnalytics } from "@/components/dashboard/SalesAnalytics";
import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";
import { BookingsTickets } from "@/components/dashboard/BookingsTickets";
import { FranchiseManagement } from "@/components/dashboard/FranchiseManagement";

const Dashboard = () => {
  const [activeView, setActiveView] = useState<string>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setActiveView={setActiveView} activeView={activeView} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeView === "overview" && <DashboardOverview />}
          {activeView === "sales" && <SalesAnalytics />}
          {activeView === "tickets" && <BookingsTickets />}
          {activeView === "notifications" && <NotificationsPanel />}
          {activeView === "franchises" && <FranchiseManagement />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
