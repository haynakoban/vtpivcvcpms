/* eslint-disable react/prop-types */

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function TimePeriodSelect({ period, setPeriod, ref, onLeftFocus }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={ref}
          onFocus={onLeftFocus} // Handle left focus for accessibility
          variant="outline" // or your preferred variant
          className="w-full"
        >
          {period}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setPeriod("AM")}>AM</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setPeriod("PM")}>PM</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
