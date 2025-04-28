
import { FC } from "react";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Home, 
  Bell, 
  TicketIcon, 
  LogOut,
  Building2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, activeView, setActiveView }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "overview", label: "Dashboard Overview", icon: Home },
    { id: "sales", label: "Sales & Analytics", icon: BarChart3 },
    { id: "tickets", label: "Bookings & Tickets", icon: TicketIcon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "franchises", label: "Franchise Management", icon: Building2 }
  ];

  const handleLogout = () => {
    // In a real application, this would clear auth tokens/session
    console.log("Logging out...");
    // Redirect to login page
    navigate("/");
  };

  return (
    <aside 
      className={cn(
        "bg-white dark:bg-gray-800 shadow-md transition-all duration-300 ease-in-out z-20 h-screen",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <h1 className={cn(
          "text-primary font-bold transition-opacity duration-300",
          isOpen ? "text-xl" : "text-xs rotate-90 opacity-70"
        )}>
          {isOpen ? "HermesPass" : "HP"}
        </h1>
      </div>

      <nav className="mt-6 px-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "flex items-center w-full px-4 py-3 transition-colors rounded-md",
                activeView === item.id 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                !isOpen && "justify-center"
              )}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {isOpen && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-1">
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
              !isOpen && "justify-center"
            )}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {isOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};
