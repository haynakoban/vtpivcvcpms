/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PersonalInformationPanel({
  carePlan,
  isPanelOpen,
  togglePanelState,
}) {
  return (
    <div className="border rounded-md shadow-md">
      <Button
        type="button"
        onClick={() => togglePanelState("personalInformation")}
        variant="ghost"
        className="w-full flex justify-between items-center py-5 font-semibold bg-purple-500 text-white hover:bg-purple-600 hover:text-white"
      >
        <span>Pet Information</span>
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
              <div>
                <span className="mr-2 text-muted-foreground inline-block w-[150px]">
                  Owner's Name:
                </span>
                <span className="font-semibold">
                  {carePlan?.user?.displayName || "John Doe"}
                </span>
              </div>
              <div>
                <span className="mr-2 text-muted-foreground inline-block w-[150px]">
                  Contact Number:
                </span>
                <span className="font-semibold">
                  {carePlan?.user?.contactNumber || "-"}
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              <div>
                <span className="mr-2 text-muted-foreground inline-block w-[150px]">
                  Pet's Name:
                </span>
                <span className="font-semibold">
                  {carePlan?.pet?.petName || "-"}
                </span>
              </div>
              <div>
                <span className="mr-2 text-muted-foreground inline-block w-[150px]">
                  Pet's Species:
                </span>
                <span className="font-semibold">
                  {carePlan?.pet?.species || "-"}
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              <div>
                <span className="mr-2 text-muted-foreground inline-block w-[150px]">
                  Pet's Breed:
                </span>
                <span className="font-semibold">
                  {carePlan?.pet?.breed || "-"}
                </span>
              </div>
              <div>
                <span className="mr-2 text-muted-foreground inline-block w-[150px]">
                  Pet's Age:
                </span>
                <span className="font-semibold">
                  {carePlan?.pet?.age || "-"}
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              <div>
                <span className="mr-2 text-muted-foreground inline-block w-[150px]">
                  Pet's Weight (kg):
                </span>
                <span className="font-semibold">
                  {carePlan?.pet?.weight || "-"}
                </span>
              </div>
              <div>
                <span className="mr-2 text-muted-foreground inline-block w-[150px]">
                  Pet's Sex:
                </span>
                <span className="font-semibold">
                  {carePlan?.pet?.sex || "-"}
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
