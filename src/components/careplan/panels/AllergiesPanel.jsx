/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Controller } from "react-hook-form";
import { formatDateForFirestore, normalizeDate } from "@/lib/functions";

export function AllergiesPanel({
  control,
  errors,
  togglePanelState,
  isPanelOpen,
}) {
  return (
    <div className="mt-5">
      <div className="border rounded-md shadow-md">
        <Button
          type="button"
          onClick={() => togglePanelState("allergiesIsOpen")}
          variant="ghost"
          className="w-full flex justify-between items-center py-5 font-semibold bg-purple-500 text-white hover:bg-purple-600 hover:text-white"
        >
          <span>Allergies</span>
          <div className="flex">
            {isPanelOpen ? <ChevronDown /> : <ChevronLeft />}
          </div>
        </Button>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isPanelOpen ? "auto" : 0,
            opacity: isPanelOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {isPanelOpen && (
            <div className="p-4">
              {/* Allergy Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="allergyName"
                      className="flex-shrink-0 w-[150px]"
                    >
                      Allergy Name:
                    </Label>
                    <Controller
                      name="allergies.allergyName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className="w-[200px] max-w-60"
                          type="text"
                          placeholder="e.g., Peanuts"
                        />
                      )}
                    />
                  </div>
                  {errors.allergyName && (
                    <p className="text-red-500">
                      {errors.allergies.allergyName.message}
                    </p>
                  )}
                </div>

                {/* Severity */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="severity"
                      className="flex-shrink-0 w-[150px]"
                    >
                      Severity:
                    </Label>
                    <Controller
                      name="allergies.severity"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Mild">Mild</SelectItem>
                              <SelectItem value="Moderate">Moderate</SelectItem>
                              <SelectItem value="Severe">Severe</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  {errors.severity && (
                    <p className="text-red-500">
                      {errors.allergies.severity.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Date & Time Recorded */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="dateRecorded"
                      className="flex-shrink-0 w-[150px]"
                    >
                      Date & Time Recorded:
                    </Label>
                    <Controller
                      name="allergies.dateRecorded"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <DateTimePicker
                          value={normalizeDate(value)}
                          onChange={(date) =>
                            onChange(formatDateForFirestore(date))
                          }
                        />
                      )}
                    />
                  </div>
                  {errors.dateRecorded && (
                    <p className="text-red-500">
                      {errors.allergies.dateRecorded.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Reaction */}
              <div className="mt-5">
                <div>
                  <div className="flex gap-1.5">
                    <Label
                      htmlFor="reaction"
                      className="flex-shrink-0 w-[150px] mt-2.5"
                    >
                      Reaction:
                    </Label>
                    <Controller
                      name="allergies.reaction"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Describe the reaction"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mt-5">
                <div>
                  <div className="flex gap-1.5">
                    <Label
                      htmlFor="notes"
                      className="flex-shrink-0 w-[150px] mt-2.5"
                    >
                      Notes:
                    </Label>
                    <Controller
                      name="allergies.notes"
                      control={control}
                      render={({ field }) => (
                        <Textarea {...field} placeholder="Additional Notes" />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
