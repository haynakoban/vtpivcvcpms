import moment from "moment";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns = [
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = row.getValue("userId");
      return <div className="font-medium px-4">{formatted}</div>;
    },
  },
  {
    accessorKey: "log",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Log
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = row.getValue("log");
      return <div className="font-medium px-4">{formatted}</div>;
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Action
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = row.getValue("action");
      return <div className="font-medium px-4">{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { seconds } = row.getValue("createdAt");
      const date = moment(seconds * 1000);
      const formatted = date.format("MM/DD/YYYY hh:mm A");
      return <div className="font-medium px-4">{formatted}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { seconds } = row.getValue("updatedAt");
      const date = moment(seconds * 1000);
      const formatted = date.format("MM/DD/YYYY hh:mm A");
      return <div className="font-medium px-4">{formatted}</div>;
    },
  },
];
