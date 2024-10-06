/* eslint-disable react/prop-types */
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function TimePeriodSelect({
  period,
  setPeriod,
  date,
  setDate,
  ref,
  onLeftFocus,
}) {
  const handlePeriodChange = (newPeriod) => {
    const updatedDate = new Date(date);

    if (newPeriod === "PM" && updatedDate.getHours() < 12) {
      updatedDate.setHours(updatedDate.getHours() + 12);
    } else if (newPeriod === "AM" && updatedDate.getHours() >= 12) {
      updatedDate.setHours(updatedDate.getHours() - 12);
    }

    setPeriod(newPeriod); // Update the period state
    setDate(updatedDate); // Update the actual date to reflect the period change
  };

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
        <DropdownMenuItem onClick={() => handlePeriodChange("AM")}>
          AM
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handlePeriodChange("PM")}>
          PM
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
