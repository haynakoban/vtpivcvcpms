/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Controller, useFieldArray } from "react-hook-form";
import { formatDateForFirestore, normalizeDate } from "@/lib/functions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import useLookUpsStore from "@/store/useLookUpsStore";

export function CarePlanPanel({
  carePlan,
  control,
  togglePanelState,
  isPanelOpen,
  setValue,
}) {
  const petDiseases = useLookUpsStore((state) => state.petDiseases);
  const setPetDiseases = useLookUpsStore((state) => state.setPetDiseases);

  const {
    fields: problemFields,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "carePlan.problems",
  });

  const [otherProblems, setOtherProblems] = useState({});
  const [saving, setSaving] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleSaveOther = async (index) => {
    const input = otherProblems[index]?.trim();
    if (!input) return;

    setSaving(true);

    const snapshot = await getDocs(collection(db, "petDiseases"));
    const existingDiseases = snapshot.docs.map((doc) =>
      doc.data().value.toLowerCase().trim()
    );

    if (existingDiseases.includes(input.toLowerCase())) {
      setShowDialog(true);
      setSaving(false);
      return;
    }

    const keys = snapshot.docs.map((doc) => Number(doc.data().key));
    const maxKeyNum = Math.max(0, ...keys.filter(Number.isFinite));
    const newKey = maxKeyNum + 1;

    await addDoc(collection(db, "petDiseases"), {
      key: newKey,
      value: input,
    });

    const newProblem = {
      key: newKey,
      value: input,
    };

    console.log("TEST 123: ", [...petDiseases, newProblem]);
    setPetDiseases((prev) => {
      const updatedPetDiseases = [...prev, newProblem];
      setSaving(false);
      setValue(`carePlan.problems.${index}`, {
        problem: {
          key: newProblem.key,
          value: newProblem.value,
        },
      });

      update(index, {
        problem: {
          key: newProblem.key,
          value: newProblem.value,
        },
      });

      return updatedPetDiseases;
    });

    setOtherProblems((prev) => {
      const newState = { ...prev };
      delete newState[index];
      return newState;
    });
  };

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
              {/* Care Plan Problems */}
              <div>
                <div className="flex gap-1.5">
                  <Label className="flex-shrink-0 w-[150px] mt-2.5">
                    Care Plan Problems:
                  </Label>
                  <div>
                    {problemFields.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 mb-3"
                      >
                        <Controller
                          control={control}
                          name={`carePlan.problems.${index}.problem`}
                          render={({ field }) => (
                            <div className="flex gap-2 items-center">
                              <Select
                                onValueChange={(value) => {
                                  const selectedProblem = petDiseases.find(
                                    (opt) => opt.value === value
                                  );
                                  console.log(selectedProblem);
                                  field.onChange({
                                    key: selectedProblem?.key ?? "",
                                    value: selectedProblem?.value ?? value,
                                  });
                                }}
                                value={field.value?.value || ""}
                                className="!w-[400px]"
                                disabled={carePlan?.status === "locked"}
                              >
                                <SelectTrigger className="border border-gray-300 rounded px-3 py-2 !w-[400px]">
                                  <SelectValue placeholder="Select a problem" />
                                </SelectTrigger>
                                <SelectContent>
                                  {petDiseases.map((opt) => (
                                    <SelectItem key={opt.key} value={opt.value}>
                                      {opt.value}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              {field.value?.value === "Other" && (
                                <>
                                  <Input
                                    placeholder="Add other problem"
                                    value={otherProblems[index] || ""}
                                    onChange={(e) =>
                                      setOtherProblems((prev) => ({
                                        ...prev,
                                        [index]: e.target.value,
                                      }))
                                    }
                                    className="flex-1"
                                  />

                                  <Button
                                    type="button"
                                    onClick={() => handleSaveOther(index)}
                                    disabled={
                                      saving || !otherProblems[index]?.trim()
                                    }
                                  >
                                    {saving ? "Saving..." : "Save"}
                                  </Button>
                                </>
                              )}
                            </div>
                          )}
                        />

                        {!(carePlan?.status === "locked") && (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </Button>
                        )}
                      </div>
                    ))}

                    {!(carePlan?.status === "locked") && (
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={
                            () => append({ problem: { key: "", value: "" } }) // Correct structure with problem key and value
                          }
                          className="flex items-center gap-1 mb-2"
                        >
                          <Plus size={16} /> Add Problem
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

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
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Duplicate Disease</AlertDialogTitle>
            <AlertDialogDescription>
              This disease has already been added.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDialog(false)}>
              OK
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
