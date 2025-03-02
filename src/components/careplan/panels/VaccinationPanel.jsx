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
import { DatePicker } from "@/components/ui/date-picker";
import { Controller } from "react-hook-form";
import { formatDateForFirestore, normalizeDate } from "@/lib/functions";

export function VaccinationPanel({
  carePlan,
  control,
  watch,
  errors,
  togglePanelState,
  isPanelOpen,
}) {
  return (
    <div className="mt-5">
      <div className="border rounded-md shadow-md">
        <Button
          type="button"
          onClick={() => togglePanelState("vaccinationIsOpen")}
          variant="ghost"
          className="w-full flex justify-between items-center py-5 font-semibold bg-purple-500 text-white hover:bg-purple-600 hover:text-white"
        >
          <span>Vaccination</span>
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
              {/* Vaccine Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="vaccineName"
                      className="flex-shrink-0 w-[150px]"
                    >
                      Vaccine Name:
                    </Label>
                    <Controller
                      name="vaccination.vaccineName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className="w-[200px] max-w-60"
                          type="text"
                          placeholder="e.g., Rabies Vaccine"
                          disabled={carePlan?.status === "locked"}
                        />
                      )}
                    />
                  </div>
                  {errors.vaccineName && (
                    <p className="text-red-500">
                      {errors.vaccination.vaccineName.message}
                    </p>
                  )}
                </div>

                {/* Vaccine Type */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="vaccineType"
                      className="flex-shrink-0 w-[150px]"
                    >
                      Vaccine Type:
                    </Label>
                    <Controller
                      name="vaccination.vaccineType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={carePlan?.status === "locked"}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="core">Core</SelectItem>
                              <SelectItem value="non-core">Non-Core</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  {errors.vaccineType && (
                    <p className="text-red-500">
                      {errors.vaccination.vaccineType.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Date & Time Administered */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="administeredAt"
                      className="flex-shrink-0 w-[150px]"
                    >
                      Date Administered:
                    </Label>
                    <Controller
                      name="vaccination.administeredAt"
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
                  {errors.administeredAt && (
                    <p className="text-red-500">
                      {errors.vaccination.administeredAt.message}
                    </p>
                  )}
                </div>

                {/* Next Due Date */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="nextDueDate"
                      className="flex-shrink-0 w-[150px]"
                    >
                      Next Due Date:
                    </Label>
                    <Controller
                      name="vaccination.nextDueDate"
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
                  {errors.nextDueDate && (
                    <p className="text-red-500">
                      {errors.vaccination.nextDueDate.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Administered By */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="administeredBy"
                      className="flex-shrink-0 w-[150px]"
                    >
                      Administered By:
                    </Label>
                    <span className="font-semibold text-sm bg-secondary py-1 px-3 rounded-md">
                      {carePlan?.vaccination?.administeredBy ||
                        watch("vaccination.administeredBy") ||
                        "-"}
                    </span>

                    {/* <Controller
                      name="vaccination.administeredBy"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className="w-[200px] max-w-60"
                          type="text"
                          placeholder="Veterinarian Name"
                          disabled={carePlan?.status === "locked"}
                        />
                      )}
                    /> */}
                  </div>
                  {errors.administeredBy && (
                    <p className="text-red-500">
                      {errors.vaccination.administeredBy.message}
                    </p>
                  )}
                </div>

                {/* Batch Number */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="batchNumber"
                      className="flex-shrink-0 w-[150px]"
                    >
                      Batch Number:
                    </Label>
                    <Controller
                      name="vaccination.batchNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className="w-[200px] max-w-60"
                          type="text"
                          placeholder="Batch Number"
                          disabled={carePlan?.status === "locked"}
                        />
                      )}
                    />
                  </div>
                  {errors.batchNumber && (
                    <p className="text-red-500">
                      {errors.vaccination.batchNumber.message}
                    </p>
                  )}
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
                      name="vaccination.notes"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Additional Notes"
                          disabled={carePlan?.status === "locked"}
                        />
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
