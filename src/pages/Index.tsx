
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Home, Info, Mail } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="flex items-center space-x-2">
                <img 
                  src="/lovable-uploads/479d33dd-7d54-452d-a2cc-9b3c3c9b053c.png" 
                  alt="HermesPass" 
                  className="h-8 w-8"
                />
                <span className="text-xl font-semibold">HermesPass</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <Home size={18} />
                <span>Home</span>
              </a>
              <a href="/events" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <Calendar size={18} />
                <span>Events</span>
              </a>
              <a href="/about" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <Info size={18} />
                <span>About</span>
              </a>
              <a href="/contact" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <Mail size={18} />
                <span>Contact</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-700">
          Welcome to HermesPass
        </h1>
        <Button
          onClick={() => navigate("/events")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-md"
        >
          Explore Events
        </Button>
        <p className="text-gray-500 dark:text-gray-400 mt-8">No events to display</p>
      </div>
    </div>
  );
};

export default Index;
