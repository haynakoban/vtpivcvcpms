/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const parseDate = (value) => {
  if (!value) return null; // Return null for empty values

  // Check if value is already a Date object
  if (value instanceof Date) return value;

  // Firestore timestamp object (with seconds and nanoseconds)
  if (typeof value === "object" && value.seconds) {
    return new Date(value.seconds * 1000); // Convert to JavaScript Date
  }

  return null; // Default case if invalid input
};

export function DatePicker({ value, onChange, disabled }) {
  const parsedDate = parseDate(value); // Ensure correct format

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[200px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {parsedDate ? (
            format(parsedDate, "MMMM d, yyyy")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value} // Set the selected date from form state
          onSelect={onChange} // Update form state when a new date is selected
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
