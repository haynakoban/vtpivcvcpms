import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = [
  {
    accessorKey: "petName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pet Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "appointmentDate",
    header: "Appointment Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("appointmentDate"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "appointmentTime",
    header: "Appointment Time",
    cell: ({ row }) => {
      const formatted = `${row.getValue("appointmentTime")}`;
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("appointmentDate"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View appointment details</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const users = [
  {
    createdAt: "2024-03-23T00:09:35.847Z",
    petName: "Harriet Franecki",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/88.jpg",
    dateCreated: "2024-03-23T09:04:19.766Z",
    appointmentDate: "2024-03-30T09:04:19.766Z",
    appointmentTime: "10:30 AM - 11:30 AM",
    email: "Jaden_Lebsack@yahoo.com",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1117.jpg",
    id: "1",
  },
  {
    createdAt: "2024-03-22T18:43:52.323Z",
    petName: "Ms. Emanuel Kozey",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/235.jpg",
    dateCreated: "2024-03-23T06:44:43.334Z",
    appointmentDate: "2024-03-30T06:44:43.334Z",
    appointmentTime: "11:30 AM - 12:30 PM",
    email: "Corbin.Bins@gmail.com",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/113.jpg",
    id: "2",
  },
  {
    createdAt: "2024-03-22T19:16:46.304Z",
    petName: "Betty Franecki",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1067.jpg",
    dateCreated: "2024-03-23T00:14:58.448Z",
    appointmentDate: "2024-03-25T00:14:58.448Z",
    appointmentTime: "10:30 AM - 11:30 AM",
    email: "Gage_Macejkovic@yahoo.com",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/507.jpg",
    id: "3",
  },
  {
    createdAt: "2024-03-23T02:06:16.977Z",
    petName: "Arnold Powlowski V",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/842.jpg",
    dateCreated: "2024-03-23T00:38:26.856Z",
    appointmentDate: "2024-03-26T00:38:26.856Z",
    appointmentTime: "08:30 AM - 09:30 AM",
    email: "Victoria19@hotmail.com",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/363.jpg",
    id: "4",
  },
  {
    createdAt: "2024-03-23T13:17:43.068Z",
    petName: "Dana Hessel",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/680.jpg",
    dateCreated: "2024-03-23T06:13:22.841Z",
    appointmentDate: "2024-03-27T06:13:22.841Z",
    appointmentTime: "10:30 AM - 11:30 AM",
    email: "Millie_Rowe41@gmail.com",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1134.jpg",
    id: "5",
  },
  {
    createdAt: "2024-03-23T12:11:49.227Z",
    petName: "Claire Buckridge",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1031.jpg",
    dateCreated: "2024-03-23T00:49:39.996Z",
    appointmentDate: "2024-03-26T00:49:39.996Z",
    appointmentTime: "10:30 AM - 11:30 AM",
    email: "Dax_Heidenreich@hotmail.com",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/308.jpg",
    id: "6",
  },
  {
    createdAt: "2024-03-23T16:04:38.024Z",
    petName: "Johnny Ebert",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/334.jpg",
    dateCreated: "2024-03-22T19:47:25.364Z",
    appointmentDate: "2024-03-24T19:47:25.364Z",
    appointmentTime: "10:30 AM - 11:30 AM",
    email: "Reva72@gmail.com",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/255.jpg",
    id: "7",
  },
  {
    createdAt: "2024-03-23T06:17:13.500Z",
    petName: "Jennie Boehm",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/604.jpg",
    dateCreated: "2024-03-23T05:43:11.602Z",
    appointmentDate: "2024-03-23T05:43:11.602Z",
    appointmentTime: "10:30 AM - 11:30 AM",
    email: "Roberto70@hotmail.com",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/235.jpg",
    id: "8",
  },
  {
    createdAt: "2024-03-22T23:26:44.154Z",
    petName: "Bethany Schinner",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/108.jpg",
    dateCreated: "2024-03-22T19:39:29.692Z",
    appointmentDate: "2024-03-22T19:39:29.692Z",
    appointmentTime: "10:30 AM - 11:30 AM",
    email: "Murl.Cassin57@gmail.com",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/275.jpg",
    id: "9",
  },
  {
    createdAt: "2024-03-22T22:30:49.220Z",
    petName: "Dr. Colleen Roob",
    image:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/205.jpg",
    dateCreated: "2024-03-22T22:07:29.209Z",
    appointmentDate: "2024-03-22T22:07:29.209Z",
    appointmentTime: "10:30 AM - 11:30 AM",
    email: "Sage_Harris37@yahoo.com",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/590.jpg",
    id: "10",
  },
];
