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

export function SurgeriesPanel({ control, togglePanelState, isPanelOpen }) {
  return (
    <div className="mt-5">
      <div className="border rounded-md shadow-md">
        <Button
          type="button"
          onClick={() => togglePanelState("surgeriesIsOpen")}
          variant="ghost"
          className="w-full flex justify-between items-center py-5 font-semibold bg-purple-500 text-white hover:bg-purple-600 hover:text-white"
        >
          <span>Surgeries</span>
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
              {/* Surgery Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="surgeryName"
                      className="flex-shrink-0 w-[150px]"
                    >
                      Surgery Name:
                    </Label>
                    <Controller
                      name="surgeries.surgeryName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className="w-[200px] max-w-60"
                          type="text"
                          placeholder="e.g., Spay/Neuter"
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Surgery Type */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="surgeryType"
                      className="flex-shrink-0 w-[150px]"
                    >
                      Surgery Type:
                    </Label>
                    <Controller
                      name="surgeries.surgeryType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="elective">Elective</SelectItem>
                              <SelectItem value="emergency">
                                Emergency
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time of Surgery */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div className="flex items-center gap-1.5">
                  <Label
                    htmlFor="dateOfSurgery"
                    className="flex-shrink-0 w-[150px]"
                  >
                    Date of Surgery:
                  </Label>
                  <Controller
                    name="surgeries.dateOfSurgery"
                    control={control}
                    render={({ field }) => <DateTimePicker {...field} />}
                  />
                </div>

                {/* Surgeon Name */}
                <div className="flex items-center gap-1.5">
                  <Label
                    htmlFor="surgeonName"
                    className="flex-shrink-0 w-[150px]"
                  >
                    Surgeon Name:
                  </Label>
                  <Controller
                    name="surgeries.surgeonName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="w-[200px] max-w-60"
                        type="text"
                        placeholder="Veterinarian Name"
                      />
                    )}
                  />
                </div>
              </div>

              {/* Post-Operative Care */}
              <div className="mt-5">
                <div className="flex gap-1.5">
                  <Label
                    htmlFor="postOpCare"
                    className="flex-shrink-0 w-[150px] mt-2.5"
                  >
                    Post-Op Care:
                  </Label>
                  <Controller
                    name="surgeries.postOpCare"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Instructions for post-surgery care"
                      />
                    )}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="mt-5">
                <div className="flex gap-1.5">
                  <Label
                    htmlFor="notes"
                    className="flex-shrink-0 w-[150px] mt-2.5"
                  >
                    Notes:
                  </Label>
                  <Controller
                    name="surgeries.notes"
                    control={control}
                    render={({ field }) => (
                      <Textarea {...field} placeholder="Additional Notes" />
                    )}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
