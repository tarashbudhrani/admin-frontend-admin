
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, Bell, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

// Sample notifications
const initialNotifications = [
  { 
    id: 1, 
    title: 'Summer Blockbuster Sale', 
    content: 'Get 20% off on all blockbuster movie tickets this summer!',
    date: '2023-06-15',
    status: 'active',
    type: 'promotion',
    target: 'all'
  },
  { 
    id: 2, 
    title: 'Weekend Family Discount', 
    content: 'Family package: Buy 3 tickets, get 1 free. Valid every weekend.',
    date: '2023-06-10',
    status: 'active',
    type: 'promotion',
    target: 'families'
  },
  { 
    id: 3, 
    title: 'New York City Locations - Special Offer', 
    content: 'NYC residents: Show your ID for a free popcorn with any ticket purchase.',
    date: '2023-06-05',
    status: 'scheduled',
    type: 'location',
    target: 'new-york'
  },
  { 
    id: 4, 
    title: 'Student Discount Week', 
    content: '30% off for students. Valid ID required.',
    date: '2023-05-28',
    status: 'expired',
    type: 'promotion',
    target: 'students'
  },
  { 
    id: 5, 
    title: 'System Maintenance Notice', 
    content: 'Our booking system will be down for maintenance on July 5th from 2-4 AM ET.',
    date: '2023-05-20',
    status: 'scheduled',
    type: 'system',
    target: 'all'
  },
];

export const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("manage");
  
  // New notification form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [target, setTarget] = useState("");
  const [activate, setActivate] = useState(false);
  
  const { toast } = useToast();

  const filteredNotifications = notifications.filter(notification => {
    // Filter by status
    if (filter !== "all" && notification.status !== filter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && 
        !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !notification.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleCreateNotification = () => {
    if (!title || !content || !type || !target) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');
    
    const newNotification = {
      id: notifications.length + 1,
      title,
      content,
      date: formattedDate,
      status: activate ? 'active' : 'scheduled',
      type,
      target
    };

    setNotifications([newNotification, ...notifications]);
    
    // Reset form
    setTitle("");
    setContent("");
    setType("");
    setTarget("");
    setStartDate(undefined);
    setEndDate(undefined);
    setActivate(false);
    
    // Switch to manage tab
    setActiveTab("manage");
    
    toast({
      title: "Notification created",
      description: "Your notification has been successfully created",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            Manage promotional offers and system notifications
          </p>
        </div>
        <div>
          <Button className="w-full sm:w-auto" onClick={() => setActiveTab("create")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Notification
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="manage">Manage Notifications</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-9"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Notifications</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Card key={notification.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                        <CardDescription>
                          Created on {notification.date} • Target: {notification.target}
                        </CardDescription>
                      </div>
                      <Badge 
                        className={
                          notification.status === 'active' ? 'bg-green-500' : 
                          notification.status === 'scheduled' ? 'bg-blue-500' : 
                          'bg-gray-500'
                        }
                      >
                        {notification.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{notification.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id={`active-${notification.id}`} 
                        checked={notification.status === 'active'} 
                        onCheckedChange={(checked) => {
                          const updatedNotifications = notifications.map(item => 
                            item.id === notification.id 
                              ? {...item, status: checked ? 'active' : 'scheduled'} 
                              : item
                          );
                          setNotifications(updatedNotifications);
                        }}
                      />
                      <Label htmlFor={`active-${notification.id}`}>Active</Label>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          setNotifications(notifications.filter(
                            item => item.id !== notification.id
                          ));
                          toast({
                            title: "Notification deleted",
                            description: "The notification has been removed"
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <Bell className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No notifications found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No notifications match your current filters.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="create">
          <Card className="relative z-50">
            <CardHeader>
              <CardTitle>Create New Notification</CardTitle>
              <CardDescription>
                Create promotional offers or system notifications for your users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Notification Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter title..." 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Enter notification content..." 
                  className="min-h-[100px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Notification Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="promotion">Promotion</SelectItem>
                      <SelectItem value="discount">Discount</SelectItem>
                      <SelectItem value="system">System Notice</SelectItem>
                      <SelectItem value="event">Special Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Select value={target} onValueChange={setTarget}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="new-york">New York Users</SelectItem>
                      <SelectItem value="los-angeles">Los Angeles Users</SelectItem>
                      <SelectItem value="students">Students</SelectItem>
                      <SelectItem value="families">Families</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 z-50">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2 z-50">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="activate" 
                  checked={activate}
                  onCheckedChange={setActivate}
                />
                <Label htmlFor="activate">Activate immediately</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("manage")}>Cancel</Button>
              <Button onClick={handleCreateNotification}>Create Notification</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
