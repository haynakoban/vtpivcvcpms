import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import ActionCell from "@/components/appointments/ActionCell";

export const columns = [
  {
    accessorKey: "desc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("desc");
      const style = row.original.color;
      console.log(style)
      return <div className="font-medium w-auto px-4"><span className={`w-auto capitalize px-3 py-2 rounded bg-[${style}]`}>{status}</span></div>;
    },
  },
  {
    accessorKey: "appointmentType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Appointment Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = row.getValue("appointmentType")
      return <div className="font-medium px-4">{formatted}</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Appointment Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium px-4">{formatted}</div>;
    },
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Appointment Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = `${row.getValue("time")}`;
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
      const date = new Date(seconds * 1000);
      const formatted = date.toLocaleDateString();
      return <div className="font-medium px-4">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointment = row.original;
      return <ActionCell appointment={appointment} />;
    },
  },
];
