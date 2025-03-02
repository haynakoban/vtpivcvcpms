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
import { DatePicker } from "@/components/ui/date-picker";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Controller } from "react-hook-form";
import { formatDateForFirestore, normalizeDate } from "@/lib/functions";

export function AdministrationMedicationPanel({
  carePlan,
  control,
  togglePanelState,
  isPanelOpen,
}) {
  return (
    <div className="mt-5">
      <div className="border rounded-md shadow-md">
        <Button
          type="button"
          onClick={() => togglePanelState("administrationMedicationIsOpen")}
          variant="ghost"
          className="w-full flex justify-between items-center py-5 font-semibold bg-purple-500 text-white hover:bg-purple-600 hover:text-white"
        >
          <span>Administration Medication</span>
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
              {/* Medication Name & Dosage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Label className="flex-shrink-0 w-[150px]">
                      Medication Name:
                    </Label>
                    <Controller
                      name="administrationMedication.name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className="w-[200px] max-w-60"
                          type="text"
                          placeholder="e.g., Amoxicillin"
                          disabled={carePlan?.status === "locked"}
                        />
                      )}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <Label className="flex-shrink-0 w-[150px]">Dosage:</Label>
                    <Controller
                      name="administrationMedication.dosage"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className="w-[200px] max-w-60"
                          type="text"
                          placeholder="e.g., 250mg"
                          disabled={carePlan?.status === "locked"}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Frequency & Administration Method */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div className="flex items-center gap-1.5">
                  <Label className="flex-shrink-0 w-[150px]">Frequency:</Label>
                  <Controller
                    name="administrationMedication.frequency"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={carePlan?.status === "locked"}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="once">Once Daily</SelectItem>
                            <SelectItem value="twice">Twice Daily</SelectItem>
                            <SelectItem value="thrice">Thrice Daily</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <Label className="flex-shrink-0 w-[150px]">
                    Administration Method:
                  </Label>
                  <Controller
                    name="administrationMedication.method"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={carePlan?.status === "locked"}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="oral">Oral</SelectItem>
                            <SelectItem value="injection">Injection</SelectItem>
                            <SelectItem value="topical">Topical</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* Start & End Date */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div className="flex items-center gap-1.5">
                  <Label className="flex-shrink-0 w-[150px]">Start Date:</Label>
                  <Controller
                    name="administrationMedication.startDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        disabled={carePlan?.status === "locked"}
                      />
                    )}
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <Label className="flex-shrink-0 w-[150px]">End Date:</Label>
                  <Controller
                    name="administrationMedication.endDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        disabled={carePlan?.status === "locked"}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Date & Time Administered */}
              <div className="mt-5 flex items-center gap-1.5">
                <Label className="flex-shrink-0 w-[150px]">
                  Date & Time Administered:
                </Label>
                <Controller
                  name="administrationMedication.dateTimeAdministered"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DateTimePicker
                      value={normalizeDate(value)}
                      onChange={(date) =>
                        onChange(formatDateForFirestore(date))
                      }
                      disabled={carePlan?.status === "locked"}
                    />
                  )}
                />
              </div>

              {/* Notes */}
              <div className="mt-5">
                <div className="flex gap-1.5">
                  <Label className="flex-shrink-0 w-[150px] mt-2.5">
                    Notes:
                  </Label>
                  <Controller
                    name="administrationMedication.notes"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Additional notes"
                        disabled={carePlan?.status === "locked"}
                      />
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
