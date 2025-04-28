
import { FC } from "react";
import { 
  Bell, 
  Search, 
  Menu, 
  ChevronDown,
  MessageSquare,
  User
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopBarProps {
  toggleSidebar: () => void;
}

export const TopBar: FC<TopBarProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 z-10">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu size={20} />
          </Button>
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-9 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              placeholder="Search..."
              type="search"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <MessageSquare size={20} />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">7</Badge>
          </Button>
          <div className="hidden md:flex items-center space-x-2 border-l pl-4 border-gray-200 dark:border-gray-700">
            <Avatar>
              <AvatarImage src="" alt="Admin" />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-1">Admin User</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
