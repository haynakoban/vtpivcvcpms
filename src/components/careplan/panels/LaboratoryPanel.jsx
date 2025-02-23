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

export function LaboratoryPanel({ control, togglePanelState, isPanelOpen }) {
  return (
    <div className="mt-5">
      <div className="border rounded-md shadow-md">
        <Button
          type="button"
          onClick={() => togglePanelState("laboratoryIsOpen")}
          variant="ghost"
          className="w-full flex justify-between items-center py-5 font-semibold bg-purple-500 text-white hover:bg-purple-600 hover:text-white"
        >
          <span>Laboratory</span>
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
              {/* Test Name & Test Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="testName"
                      className="flex-shrink-0 w-[150px]"
                    >
                      Test Name:
                    </Label>
                    <Controller
                      name="laboratory.testName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className="w-[200px] max-w-60"
                          type="text"
                          placeholder="e.g., Blood Test"
                        />
                      )}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="testType"
                      className="flex-shrink-0 w-[150px]"
                    >
                      Test Type:
                    </Label>
                    <Controller
                      name="laboratory.testType"
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
                              <SelectItem value="blood">Blood Test</SelectItem>
                              <SelectItem value="xray">X-ray</SelectItem>
                              <SelectItem value="urinalysis">
                                Urinalysis
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Date Conducted & Conducted By */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div className="flex items-center gap-1.5">
                  <Label
                    htmlFor="dateConducted"
                    className="flex-shrink-0 w-[150px]"
                  >
                    Date Conducted:
                  </Label>
                  <Controller
                    name="laboratory.dateConducted"
                    control={control}
                    render={({ field }) => <DateTimePicker {...field} />}
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <Label
                    htmlFor="conductedBy"
                    className="flex-shrink-0 w-[150px]"
                  >
                    Conducted By:
                  </Label>
                  <Controller
                    name="laboratory.conductedBy"
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

              {/* Result */}
              <div className="mt-5">
                <div className="flex gap-1.5">
                  <Label
                    htmlFor="testResult"
                    className="flex-shrink-0 w-[150px] mt-2.5"
                  >
                    Result:
                  </Label>
                  <Controller
                    name="laboratory.testResult"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Enter test result details"
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
                    name="laboratory.notes"
                    control={control}
                    render={({ field }) => (
                      <Textarea {...field} placeholder="Additional notes" />
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
