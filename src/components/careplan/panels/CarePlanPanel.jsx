/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Controller } from "react-hook-form";
import { formatDateForFirestore, normalizeDate } from "@/lib/functions";

export function CarePlanPanel({
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
          onClick={() => togglePanelState("carePlanIsOpen")}
          variant="ghost"
          className="w-full flex justify-between items-center py-5 font-semibold bg-purple-500 text-white hover:bg-purple-600 hover:text-white"
        >
          <span>Care Plan</span>
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
              {/* Treatment Plan */}
              <div className="mt-5">
                <div className="flex gap-1.5">
                  <Label className="flex-shrink-0 w-[150px] mt-2.5">
                    Treatment Plan:
                  </Label>
                  <Controller
                    name="carePlan.treatmentPlan"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Describe the treatment plan"
                        disabled={carePlan?.status === "locked"}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Rehabilitation Plan */}
              <div className="mt-5">
                <div className="flex gap-1.5">
                  <Label className="flex-shrink-0 w-[150px] mt-2.5">
                    Rehabilitation Plan:
                  </Label>
                  <Controller
                    name="carePlan.rehabilitationPlan"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="If the pet requires therapy or gradual recovery"
                        disabled={carePlan?.status === "locked"}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Prescribed Medications */}
              <div className="mt-5">
                <div className="flex gap-1.5">
                  <Label className="flex-shrink-0 w-[150px] mt-2.5">
                    Prescribed Medications:
                  </Label>
                  <Controller
                    name="carePlan.prescribedMedications"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Medication details explicitly noted in the care plan"
                        disabled={carePlan?.status === "locked"}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Dietary Recommendations */}
              <div className="mt-5">
                <div className="flex gap-1.5">
                  <Label className="flex-shrink-0 w-[150px] mt-2.5">
                    Dietary Recommendations:
                  </Label>
                  <Controller
                    name="carePlan.dietaryRecommendations"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Dietary recommendations"
                        disabled={carePlan?.status === "locked"}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Owner Instructions */}
              <div className="mt-5">
                <div className="flex gap-1.5">
                  <Label className="flex-shrink-0 w-[150px] mt-2.5">
                    Owner Instructions:
                  </Label>
                  <Controller
                    name="carePlan.ownerInstructions"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Special instructions for the pet owner to follow at home"
                        disabled={carePlan?.status === "locked"}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Emergency Plan */}
              <div className="mt-5">
                <div className="flex gap-1.5">
                  <Label className="flex-shrink-0 w-[150px] mt-2.5">
                    Emergency Plan:
                  </Label>
                  <Controller
                    name="carePlan.emergencyPlan"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="What to do in case of complications or worsening symptoms"
                        disabled={carePlan?.status === "locked"}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Follow-up Date and Time */}
              <div className="mt-5 flex items-center gap-1.5">
                <Label className="flex-shrink-0 w-[150px]">
                  Follow-up Date & Time:
                </Label>
                <Controller
                  name="carePlan.followUpDateTime"
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
                    name="carePlan.notes"
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
