
import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { TicketIcon, Calendar, Users, MapPin } from "lucide-react";

const dummyBookings = [
  {
    id: 1,
    eventName: "Tech Conference 2025",
    date: "2025-05-15",
    attendees: 3,
    location: "San Francisco",
    status: "Confirmed"
  },
  {
    id: 2,
    eventName: "Digital Summit",
    date: "2025-06-01",
    attendees: 2,
    location: "New York",
    status: "Pending"
  },
  {
    id: 3,
    eventName: "AI Workshop",
    date: "2025-05-20",
    attendees: 5,
    location: "Boston",
    status: "Confirmed"
  }
];

const dummyTickets = [
  {
    id: 1,
    type: "VIP Pass",
    event: "Tech Conference 2025",
    price: "$599",
    available: 50
  },
  {
    id: 2,
    type: "Standard Pass",
    event: "Digital Summit",
    price: "$299",
    available: 150
  },
  {
    id: 3,
    type: "Early Bird",
    event: "AI Workshop",
    price: "$199",
    available: 75
  }
];

export const BookingsTickets: FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Bookings & Tickets</h2>
      </div>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>
                Overview of the most recent event bookings across all locations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.eventName}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>{booking.attendees}</TableCell>
                      <TableCell>{booking.location}</TableCell>
                      <TableCell>
                        <Badge variant={booking.status === "Confirmed" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TicketIcon className="h-5 w-5" />
                Ticket Management
              </CardTitle>
              <CardDescription>
                View and manage ticket allocations for all events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Available</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.type}</TableCell>
                      <TableCell>{ticket.event}</TableCell>
                      <TableCell>{ticket.price}</TableCell>
                      <TableCell>{ticket.available}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
