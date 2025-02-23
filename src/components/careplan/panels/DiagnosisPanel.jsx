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

export function DiagnosisPanel({ control, togglePanelState, isPanelOpen }) {
  return (
    <div className="mt-5">
      <div className="border rounded-md shadow-md">
        <Button
          type="button"
          onClick={() => togglePanelState("diagnosisIsOpen")}
          variant="ghost"
          className="w-full flex justify-between items-center py-5 font-semibold bg-purple-500 text-white hover:bg-purple-600 hover:text-white"
        >
          <span>Diagnoses</span>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                {/* Diagnosis Type */}
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="diagnosisType" className="w-[150px]">
                    Diagnosis Type:
                  </Label>
                  <Controller
                    name="diagnoses.diagnosisType"
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
                            <SelectItem value="admission">Admission</SelectItem>
                            <SelectItem value="discharge">Discharge</SelectItem>
                            <SelectItem value="onset">Onset</SelectItem>
                            <SelectItem value="update">Update</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Condition */}
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="condition" className="w-[150px]">
                    Condition:
                  </Label>
                  <Controller
                    name="diagnoses.condition"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="w-[200px]"
                        type="text"
                        placeholder="e.g., Arthritis"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                {/* Date of Diagnosis */}
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="dateOfDiagnosis" className="w-[150px]">
                    Date of Diagnosis:
                  </Label>
                  <Controller
                    name="diagnoses.dateOfDiagnosis"
                    control={control}
                    render={({ field }) => <DateTimePicker {...field} />}
                  />
                </div>

                {/* Diagnosis Status */}
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="diagnosisStatus" className="w-[150px]">
                    Diagnosis Status:
                  </Label>
                  <Controller
                    name="diagnoses.diagnosisStatus"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="worsening">Worsening</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* Symptoms */}
              <div className="mt-5 flex gap-1.5">
                <Label htmlFor="symptoms" className="w-[150px] mt-2.5">
                  Symptoms:
                </Label>
                <Controller
                  name="diagnoses.symptoms"
                  control={control}
                  render={({ field }) => (
                    <Textarea {...field} placeholder="List symptoms" />
                  )}
                />
              </div>

              {/* Notes */}
              <div className="mt-5 flex gap-1.5">
                <Label htmlFor="notes" className="w-[150px] mt-2.5">
                  Notes:
                </Label>
                <Controller
                  name="diagnoses.notes"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Additional notes or observations"
                    />
                  )}
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
