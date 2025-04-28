
import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

// Sample data - replace with actual data
const monthlyData = [
  { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600, tickets: 310 },
  { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602, tickets: 290 },
  { name: 'Mar', revenue: 2000, expenses: 1200, profit: 800, tickets: 200 },
  { name: 'Apr', revenue: 2780, expenses: 1908, profit: 872, tickets: 310 },
  { name: 'May', revenue: 1890, expenses: 1200, profit: 690, tickets: 290 },
  { name: 'Jun', revenue: 2390, expenses: 1800, profit: 590, tickets: 390 },
  { name: 'Jul', revenue: 3490, expenses: 2300, profit: 1190, tickets: 420 },
  { name: 'Aug', revenue: 4000, expenses: 2400, profit: 1600, tickets: 450 },
  { name: 'Sep', revenue: 3000, expenses: 1398, profit: 1602, tickets: 380 },
  { name: 'Oct', revenue: 2000, expenses: 1200, profit: 800, tickets: 300 },
  { name: 'Nov', revenue: 2780, expenses: 1908, profit: 872, tickets: 320 },
  { name: 'Dec', revenue: 4000, expenses: 2400, profit: 1600, tickets: 450 },
];

const franchisePerformance = [
  { name: 'New York', revenue: 12000, profit: 4800, expenses: 7200, tickets: 1800 },
  { name: 'Los Angeles', revenue: 9800, profit: 3500, expenses: 6300, tickets: 1400 },
  { name: 'Chicago', revenue: 8700, profit: 2900, expenses: 5800, tickets: 1200 },
  { name: 'Miami', revenue: 7600, profit: 2200, expenses: 5400, tickets: 950 },
  { name: 'Dallas', revenue: 6900, profit: 1800, expenses: 5100, tickets: 780 },
];

export const SalesAnalytics = () => {
  const [timeFrame, setTimeFrame] = useState("yearly");
  const [franchise, setFranchise] = useState("all");
  const [location, setLocation] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales & Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive view of your business performance
          </p>
        </div>
        <div className="flex items-center space-x-2 justify-end">
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger>
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>

        <Select value={franchise} onValueChange={setFranchise}>
          <SelectTrigger>
            <SelectValue placeholder="Franchise" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Franchises</SelectItem>
            <SelectItem value="franchise-1">Cineplex</SelectItem>
            <SelectItem value="franchise-2">MovieWorld</SelectItem>
            <SelectItem value="franchise-3">Cinema City</SelectItem>
          </SelectContent>
        </Select>

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="new-york">New York</SelectItem>
            <SelectItem value="los-angeles">Los Angeles</SelectItem>
            <SelectItem value="chicago">Chicago</SelectItem>
            <SelectItem value="miami">Miami</SelectItem>
            <SelectItem value="dallas">Dallas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full md:w-1/2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="profits">Profits</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Yearly Performance</CardTitle>
                <CardDescription>Revenue vs Expenses</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
                    <Bar dataKey="expenses" name="Expenses" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit Trend</CardTitle>
                <CardDescription>Monthly profit analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    <Legend />
                    <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Franchise Performance Comparison</CardTitle>
              <CardDescription>Revenue, expenses and profits by location</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={franchisePerformance}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
                  <Bar dataKey="expenses" name="Expenses" fill="#82ca9d" />
                  <Bar dataKey="profit" name="Profit" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Monthly revenue breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Analysis</CardTitle>
              <CardDescription>Monthly expense breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Expenses']} />
                  <Area type="monotone" dataKey="expenses" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profit Analysis</CardTitle>
              <CardDescription>Monthly profit breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Profit']} />
                  <Area type="monotone" dataKey="profit" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
