/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function MedicalHistoryTableList({ title, headers, columns, lists }) {
  return (
    <div
      className="mt-5 relative overflow-x-auto shadow-sm border sm:rounded-lg"
      style={title === "Allergies" ? { marginTop: "0px !important" } : {}}
    >
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          {title}
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lists.map((list, index) => (
            <tr
              key={`${list[columns[0]]}-${index}`}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              {columns.map((col) => (
                <td key={col} className="px-6 py-4">
                  {list[col] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MedicalHistoryPanel({
  medicalHistory,
  togglePanelState,
  isPanelOpen,
}) {
  const isEmptyHistory = Object.values(medicalHistory).every(
    (category) => category.length === 0
  );

  return (
    <div className="mt-5">
      <div className="border rounded-md shadow-md">
        <Button
          type="button"
          onClick={() => togglePanelState("medicalHistoryIsOpen")}
          variant="ghost"
          className="w-full flex justify-between items-center py-5 font-semibold bg-purple-500 text-white hover:bg-purple-600 hover:text-white"
        >
          <span>Medical History</span>
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
          {isPanelOpen && isEmptyHistory ? (
            <div className="p-4 text-center text-gray-500">
              No medical history available.
            </div>
          ) : (
            <div className="p-4">
              {/* allergies */}
              <MedicalHistoryTableList
                title="Allergies"
                headers={["Name", "Severity", "Date Recorded"]}
                columns={["allergyName", "severity", "dateRecorded"]}
                lists={medicalHistory["allergies"]}
              />

              {/* vaccination */}
              <MedicalHistoryTableList
                title="Vaccination"
                headers={[
                  "Name",
                  "Type",
                  "Batch Number",
                  "Date Administered",
                  "Next Due Date",
                ]}
                columns={[
                  "vaccineName",
                  "vaccineType",
                  "batchNumber",
                  "administeredAt",
                  "nextDueDate",
                ]}
                lists={medicalHistory["vaccination"]}
              />

              {/* surgeries */}
              <MedicalHistoryTableList
                title="Surgeries"
                headers={["Name", "Type", "Date of Surgery", "Surgeon Name"]}
                columns={[
                  "surgeryName",
                  "surgeryType",
                  "dateOfSurgery",
                  "surgeonName",
                ]}
                lists={medicalHistory["surgeries"]}
              />

              {/* diagnoses */}
              <MedicalHistoryTableList
                title="Diagnoses"
                headers={["Type", "Condition", "Status", "Date of Diagnosis"]}
                columns={[
                  "diagnosisType",
                  "condition",
                  "diagnosisStatus",
                  "dateOfDiagnosis",
                ]}
                lists={medicalHistory["diagnoses"]}
              />

              {/* laboratory */}
              <MedicalHistoryTableList
                title="Laboratory"
                headers={["Name", "Type", "Conducted By", "Date Conducted"]}
                columns={[
                  "testName",
                  "testType",
                  "conductedBy",
                  "dateConducted",
                ]}
                lists={medicalHistory["laboratory"]}
              />

              {/* medication */}
              <MedicalHistoryTableList
                title="Medication"
                headers={[
                  "Name",
                  "Frequency",
                  "Dosage",
                  "Start Date",
                  "End Date",
                ]}
                columns={[
                  "medicationName",
                  "frequency",
                  "dosage",
                  "startDate",
                  "endDate",
                ]}
                lists={medicalHistory["medication"]}
              />

              {/* administrationMedication  */}
              <MedicalHistoryTableList
                title="Administration Medication"
                headers={[
                  "Name",
                  "Frequency",
                  "Dosage",
                  "Start Date",
                  "End Date",
                ]}
                columns={[
                  "name",
                  "frequency",
                  "dosage",
                  "startDate",
                  "endDate",
                ]}
                lists={medicalHistory["administrationMedication"]}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
