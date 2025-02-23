/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { carePlanModel } from "@/model/careplan";
import { PersonalInformationPanel } from "@/components/careplan/panels/PersonalInformationPanel";
import { AllergiesPanel } from "@/components/careplan/panels/AllergiesPanel";
import { VaccinationPanel } from "@/components/careplan/panels/VaccinationPanel";
import { SurgeriesPanel } from "@/components/careplan/panels/SurgeriesPanel";
import { DiagnosisPanel } from "@/components/careplan/panels/DiagnosisPanel";
import { LaboratoryPanel } from "@/components/careplan/panels/LaboratoryPanel";
import { MedicationPanel } from "@/components/careplan/panels/MedicationPanel";
import { AdministrationMedicationPanel } from "@/components/careplan/panels/AdministrationMedicationPanel";
import { CarePlanPanel } from "@/components/careplan/panels/CarePlanPanel";
import { useCarePlanStore } from "@/store/useCarePlanStore";

const initialPanelState = {
  personalInformation: true,
  allergiesIsOpen: true,
  vaccinationIsOpen: true,
  surgeriesIsOpen: true,
  diagnosisIsOpen: true,
  laboratoryIsOpen: true,
  medicationIsOpen: true,
  administrationMedicationIsOpen: true,
  carePlanIsOpen: true,
  medicalHistoryIsOpen: true,
};

function NewUserCareplan() {
  const { apptId, petId } = useParams();
  const navigate = useNavigate();
  const [panels, setPanels] = useState(initialPanelState);
  const { carePlan, fetchCarePlan, saveCarePlan, loading } = useCarePlanStore();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: carePlan || carePlanModel,
  });

  useEffect(() => {
    if (apptId && petId) {
      fetchCarePlan(apptId, petId, navigate);
    }
  }, [apptId, petId, fetchCarePlan, navigate]);

  useEffect(() => {
    if (carePlan) {
      Object.keys(carePlan).forEach((key) => {
        const value = carePlan[key];

        if (typeof value === "object" && value !== null) {
          Object.keys(value).forEach((subKey) => {
            const subValue = value[subKey];

            if (
              subValue &&
              typeof subValue === "object" &&
              "seconds" in subValue
            ) {
              setValue(`${key}.${subKey}`, new Date(subValue.seconds * 1000));
            } else {
              setValue(`${key}.${subKey}`, subValue);
            }
          });
        } else {
          setValue(key, value);
        }
      });
    }
  }, [carePlan, setValue]);

  const onSubmit = (data) => {
    if (apptId && petId) {
      saveCarePlan(apptId, petId, data);
    }
  };

  const togglePanelState = (panel) => {
    setPanels((prev) => ({
      ...prev,
      [panel]: !prev[panel],
    }));
  };

  return (
    <div className="mb-[200px]">
      {loading ? (
        <p>Loading care plan...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <PersonalInformationPanel
            carePlan={carePlan}
            isPanelOpen={panels.personalInformation}
            togglePanelState={togglePanelState}
          />

          <AllergiesPanel
            control={control}
            errors={errors}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.allergiesIsOpen}
          />

          <VaccinationPanel
            control={control}
            errors={errors}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.vaccinationIsOpen}
          />

          <SurgeriesPanel
            control={control}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.surgeriesIsOpen}
          />

          <DiagnosisPanel
            control={control}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.diagnosisIsOpen}
          />

          <LaboratoryPanel
            control={control}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.laboratoryIsOpen}
          />

          <MedicationPanel
            control={control}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.medicationIsOpen}
          />

          <AdministrationMedicationPanel
            control={control}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.administrationMedicationIsOpen}
          />

          <CarePlanPanel
            control={control}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.carePlanIsOpen}
          />

          <div className="mt-5 flex justify-end gap-2.5">
            <Button type="submit" variant="default">
              Save Care Plan
            </Button>
            <Button variant="success" onClick={() => window.print()}>
              Export
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default NewUserCareplan;
