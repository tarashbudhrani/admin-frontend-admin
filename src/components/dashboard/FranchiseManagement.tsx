
import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { franchiseService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

type Franchise = {
  id: string;
  name: string;
  location: string;
  activeDate: string;
  screens: number;
  status: string;
};

export const FranchiseManagement = () => {
  const [franchises, setFranchises] = useState<Franchise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFranchises = async () => {
      try {
        const data = await franchiseService.getAllFranchises();
        setFranchises(data);
      } catch (error) {
        toast({
          title: "Error loading franchises",
          description: "Unable to load franchise data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFranchises();
  }, [toast]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Franchise Management</h2>
        <p className="text-muted-foreground">
          View and manage your cinema franchises
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="opacity-70 animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {franchises.length > 0 ? (
            franchises.map((franchise) => (
              <Card key={franchise.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Building2 className="mr-2 h-5 w-5" />
                    {franchise.name}
                  </CardTitle>
                  <CardDescription>{franchise.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Active since: {new Date(franchise.activeDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                  <p>Screens: {franchise.screens}</p>
                  <p>Status: {franchise.status}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Building2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No franchises found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                No franchise data is available at the moment.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
