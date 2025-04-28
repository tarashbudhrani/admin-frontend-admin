
import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { ArrowUpRight, PieChart as PieChartIcon, BarChart3, TrendingUp, Users, TicketIcon, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data - replace with actual data in a real implementation
const salesData = [
  { name: 'Jan', franchise1: 4000, franchise2: 2400, franchise3: 2400 },
  { name: 'Feb', franchise1: 3000, franchise2: 1398, franchise3: 2210 },
  { name: 'Mar', franchise1: 2000, franchise2: 9800, franchise3: 2290 },
  { name: 'Apr', franchise1: 2780, franchise2: 3908, franchise3: 2000 },
  { name: 'May', franchise1: 1890, franchise2: 4800, franchise3: 2181 },
  { name: 'Jun', franchise1: 2390, franchise2: 3800, franchise3: 2500 },
];

const pieData = [
  { name: 'Tickets', value: 65 },
  { name: 'Concessions', value: 25 },
  { name: 'Merchandise', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const statCards = [
  { 
    title: 'Total Revenue', 
    value: '$253,456', 
    change: '+12.5%', 
    timeframe: 'from last month', 
    icon: DollarSign,
    color: 'text-emerald-500 bg-emerald-100' 
  },
  { 
    title: 'Tickets Sold', 
    value: '45,679', 
    change: '+18.2%', 
    timeframe: 'from last month', 
    icon: TicketIcon,
    color: 'text-blue-500 bg-blue-100' 
  },
  { 
    title: 'Active Users', 
    value: '12,598', 
    change: '+4.6%', 
    timeframe: 'from last month', 
    icon: Users,
    color: 'text-violet-500 bg-violet-100' 
  },
  { 
    title: 'Avg. Booking Value', 
    value: '$32.78', 
    change: '+2.3%', 
    timeframe: 'from last month', 
    icon: TrendingUp,
    color: 'text-amber-500 bg-amber-100' 
  },
];

export const DashboardOverview = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  const [location, setLocation] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground">
            Welcome back, Admin! Here's what's happening across your cinemas.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="los-angeles">Los Angeles</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
              <SelectItem value="miami">Miami</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.color}`}>
                <card.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <span className="text-emerald-500 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {card.change}
                </span> 
                {card.timeframe}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="tickets">Ticket Sales</TabsTrigger>
            <TabsTrigger value="distribution">Revenue Distribution</TabsTrigger>
          </TabsList>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Monthly" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Compare revenue across different franchises
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Legend />
                  <Bar dataKey="franchise1" name="New York" fill="#8884d8" />
                  <Bar dataKey="franchise2" name="Los Angeles" fill="#82ca9d" />
                  <Bar dataKey="franchise3" name="Chicago" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Sales Trend</CardTitle>
              <CardDescription>
                Monthly ticket sales across all locations
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="franchise1" name="New York" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="franchise2" name="Los Angeles" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="franchise3" name="Chicago" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Distribution</CardTitle>
              <CardDescription>
                Breakdown of revenue by category
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
