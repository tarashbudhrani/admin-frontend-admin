
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { franchiseService, bookingsService, authService } from "@/services/api";

const BackendConnection = () => {
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseData, setResponseData] = useState<any>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const { toast } = useToast();

  const testConnection = async (serviceType: string) => {
    setConnectionStatus("loading");
    setResponseData(null);
    setErrorDetails(null);
    
    try {
      let data;
      
      switch (serviceType) {
        case "franchises":
          data = await franchiseService.getAllFranchises();
          break;
        case "bookings":
          data = await bookingsService.getRecentBookings();
          break;
        case "auth":
          // Just checking if the /auth/me endpoint is available (won't work without login)
          try {
            data = await authService.getCurrentUser();
          } catch (e) {
            data = { message: "Auth endpoint exists but requires login" };
          }
          break;
        default:
          throw new Error("Invalid service type");
      }
      
      setResponseData(data);
      setConnectionStatus("success");
      
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${serviceType} endpoint`,
      });
    } catch (error) {
      console.error("Connection test failed:", error);
      setConnectionStatus("error");
      
      const errorMessage = error instanceof Error ? error.message : "Could not connect to backend";
      setErrorDetails(errorMessage);
      
      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Test direct connection to the root of the API
  const testRootConnection = async () => {
    setConnectionStatus("loading");
    setResponseData(null);
    setErrorDetails(null);
    
    try {
      const response = await fetch("https://se2group6-backend-1.onrender.com");
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = { message: "Connected but response is not JSON", status: response.status };
      }
      
      setResponseData(data);
      setConnectionStatus("success");
      
      toast({
        title: "Connection Successful",
        description: `Successfully connected to API root, status: ${response.status}`,
      });
    } catch (error) {
      console.error("Root connection test failed:", error);
      setConnectionStatus("error");
      
      const errorMessage = error instanceof Error ? error.message : "Could not connect to backend root";
      setErrorDetails(errorMessage);
      
      toast({
        title: "Root Connection Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Backend Connection Test</h1>
        <p className="text-gray-600 dark:text-gray-300">
          This page helps you test if your frontend is properly connected to your MERN backend.
        </p>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>API Root Connection</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Test direct connection to your API root (http://localhost:3000/)</p>
            <Button 
              onClick={testRootConnection} 
              disabled={connectionStatus === "loading"}
              className="w-full"
            >
              Test Root API Connection
            </Button>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Franchises API</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => testConnection("franchises")} 
                disabled={connectionStatus === "loading"}
                className="w-full"
              >
                Test Franchises Connection
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bookings API</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => testConnection("bookings")} 
                disabled={connectionStatus === "loading"}
                className="w-full"
              >
                Test Bookings Connection
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auth API</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => testConnection("auth")} 
                disabled={connectionStatus === "loading"}
                className="w-full"
              >
                Test Auth Connection
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {connectionStatus === "loading" && (
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
              </div>
              <p className="text-center mt-4">Testing connection...</p>
            </CardContent>
          </Card>
        )}
        
        {connectionStatus === "success" && responseData && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-500">Connection Successful!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto max-h-96">
                <pre className="text-sm">{JSON.stringify(responseData, null, 2)}</pre>
              </div>
            </CardContent>
          </Card>
        )}
        
        {connectionStatus === "error" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">Connection Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Could not connect to the backend API. Please check:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Your backend server is running</li>
                <li>The API_BASE_URL in src/services/api.ts is correct</li>
                <li>Your endpoints match what the frontend is expecting</li>
                <li>CORS is properly configured on your backend</li>
              </ul>
              
              {errorDetails && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="font-medium">Error details:</p>
                  <p className="text-sm text-red-700 dark:text-red-300">{errorDetails}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BackendConnection;
