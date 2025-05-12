/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
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
import { MedicalHistoryPanel } from "@/components/careplan/panels/MedicalHistoryPanel";
import CareplanButtons from "@/components/careplan/CareplanButtons";
import { useCarePlanStore } from "@/store/useCarePlanStore";
import useUsersStore from "@/store/useUsersStore";

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
  medicalHistoryIsOpen: false,
};

function NewUserCareplan() {
  const { toast } = useToast();
  const { apptId, petId } = useParams();
  const navigate = useNavigate();
  const [panels, setPanels] = useState(initialPanelState);
  const {
    carePlan,
    fetchCarePlan,
    saveCarePlan,
    lockCarePlan,
    getMedicalHistory,
    medicalHistory,
    loading,
  } = useCarePlanStore();
  const { vetInfos } = useUsersStore();

  const [originalCarePlan, setOriginalCarePlan] = useState(null);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    getValues,
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
    if (!carePlan) return;

    Object.keys(carePlan).forEach((key) => {
      const value = carePlan[key];

      if (typeof value === "object" && value !== null) {
        Object.keys(value).forEach((subKey) => {
          // Prevent updating specific fields
          if (
            (key === "vaccination" && subKey === "administeredBy") ||
            (key === "surgeries" && subKey === "surgeonName") ||
            (key === "laboratory" && subKey === "conductedBy")
          ) {
            return; // Skip updating these fields
          }

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
  }, [carePlan, setValue]);

  useEffect(() => {
    if (carePlan) {
      getMedicalHistory(petId, carePlan.id);
    }
  }, [carePlan, petId, getMedicalHistory]);

  // useEffect(() => {
  //   if (vetInfos) {
  //     setValue("vaccination.administeredBy", vetInfos.displayName || "");
  //     setValue("surgeries.surgeonName", vetInfos.displayName || "");
  //     setValue("laboratory.conductedBy", vetInfos.displayName || "");
  //   }
  // }, [vetInfos, setValue]);

  useEffect(() => {
    if (carePlan) {
      setOriginalCarePlan(carePlan);
      // Ensure form syncs with carePlan
      reset({
        ...carePlan,
        // vaccination: {
        //   ...carePlan.vaccination,
        //   administeredBy:
        //     vetInfos?.displayName || carePlan.vaccination?.administeredBy || "",
        // },
        // surgeries: {
        //   ...carePlan.surgeries,
        //   surgeonName:
        //     vetInfos?.displayName || carePlan.surgeries?.surgeonName || "",
        // },
        // laboratory: {
        //   ...carePlan.laboratory,
        //   conductedBy:
        //     vetInfos?.displayName || carePlan.laboratory?.conductedBy || "",
        // },
      });
    }
  }, [carePlan, vetInfos?.displayName, reset]);

  const onSubmit = async (data) => {
    if (apptId && petId) {
      const toastId = toast({
        title: "Saving Careplan",
        description: "Your care plan is being saved...",
      });
      try {
        const { pet, user, id, ...filteredData } = data;

        const filteredProblems = filteredData.carePlan?.problems
          ?.filter((item) => item.problem?.key && item.problem?.value)
          .filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) =>
                  t.problem.key === item.problem.key &&
                  t.problem.value === item.problem.value
              )
          );

        filteredData.carePlan.problems = filteredProblems;

        // if (filteredData.carePlan.problems.length === 0) {
        //   toast({
        //     title: "No valid care plan problems",
        //     description: "Please add valid care plan problems before saving.",
        //     status: "error",
        //   });
        //   return;
        // }

        saveCarePlan(apptId, petId, filteredData);

        setTimeout(() => {
          toastId.dismiss();
          navigate("/auth/careplan");
        }, 1500);
      } catch (error) {
        toastId.dismiss();
      }
    }
  };

  const watchedValues = watch();

  // Check if form has unsaved changes
  const isFormChanged = useMemo(() => {
    if (!originalCarePlan) return false;
    return JSON.stringify(originalCarePlan) !== JSON.stringify(watchedValues);
  }, [originalCarePlan, watchedValues]);

  const cancelCareplan = () => {
    navigate("/auth/careplan");
  };

  const lockCareplan = () => {
    if (apptId && petId) {
      const formData = getValues();
      const problems = formData.carePlan?.problems || [];

      const validProblems = problems.filter(
        (item) => item.problem?.key && item.problem?.value
      );

      const uniqueProblems = validProblems.filter(
        (item, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.problem.key === item.problem.key &&
              t.problem.value === item.problem.value
          )
      );

      // if (uniqueProblems.length === 0) {
      //   toast({
      //     title: "No valid care plan problems",
      //     description:
      //       "Please add valid care plan problems before locking the care plan.",
      //     status: "error",
      //   });
      //   return;
      // }

      const toastId = toast({
        title: "Locking Careplan",
        description: "Your care plan is being locked...",
      });
      try {
        lockCarePlan(apptId, petId);

        setTimeout(() => {
          toastId.dismiss();
        }, 1500);
      } catch (error) {
        toastId.dismiss();
      }
    }
  };

  const togglePanelState = (panel) => {
    setPanels((prev) => ({
      ...prev,
      [panel]: !prev[panel],
    }));
  };

  const onSaveAndLock = async () => {
    if (apptId && petId) {
      const toastId = toast({
        title: "Saving Careplan",
        description: "Your care plan is being saved...",
      });

      try {
        const formData = getValues();

        const { pet, user, id, ...filteredData } = formData;

        const filteredProblems = filteredData.carePlan?.problems
          ?.filter((item) => item.problem?.key && item.problem?.value)
          .filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) =>
                  t.problem.key === item.problem.key &&
                  t.problem.value === item.problem.value
              )
          );

        filteredData.carePlan.problems = filteredProblems;

        // if (filteredProblems.length === 0) {
        //   toast({
        //     title: "No valid care plan problems",
        //     description:
        //       "Please add valid care plan problems before locking the care plan.",
        //     status: "error",
        //   });
        //   return;
        // }

        await saveCarePlan(apptId, petId, filteredData);

        toastId.dismiss();
        lockCareplan();
      } catch (error) {
        toastId.dismiss();
        console.error("Error saving care plan:", error);
      }
    }
  };

  const printCarePlan = (sectionToPrint) => {
    setPanels({
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
    });

    setTimeout(() => {
      const printSection = document.querySelector(`.${sectionToPrint}`);
      const logo = document.querySelector(".print_logo");
      const elementsToOpen = document.querySelectorAll(".open_when_print");

      const html = document.querySelectorAll("html");

      if (!printSection) {
        console.error("Section not found:", sectionToPrint);
        return;
      }

      html.forEach((element) => {
        element.classList.remove("dark");
      });

      elementsToOpen.forEach((element) => {
        element.classList.remove("hidden", "opacity-0", "-translate-x-96");
        element.style.setProperty("transform", "translateX(0)", "important");
        element.style.setProperty("opacity", "1", "important");
      });

      // Save original content
      const originalContent = document.body.innerHTML;

      // Extract print content
      const logoContent = logo ? logo.outerHTML : ""; // Include logo if it exists
      const printContent = printSection.innerHTML;

      // Replace body with print content
      document.body.innerHTML = `<div>${logoContent}${printContent}</div>`;

      // Print and restore original content
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // Reload to restore original content
    }, 500);
  };

  return (
    <div className="mb-[200px]">
      {loading ? (
        <p>Loading care plan...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="print_careplan">
          <div className="mb-5">
            <CareplanButtons
              carePlan={carePlan}
              isFormChanged={isFormChanged}
              onSaveAndLock={onSaveAndLock}
              lockCareplan={lockCareplan}
              cancelCareplan={cancelCareplan}
              navigate={navigate}
              printCarePlan={printCarePlan}
            />
          </div>

          <PersonalInformationPanel
            carePlan={carePlan}
            isPanelOpen={panels.personalInformation}
            togglePanelState={togglePanelState}
          />

          <AllergiesPanel
            carePlan={carePlan}
            control={control}
            errors={errors}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.allergiesIsOpen}
          />

          <VaccinationPanel
            carePlan={carePlan}
            watch={watch}
            control={control}
            errors={errors}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.vaccinationIsOpen}
          />

          <SurgeriesPanel
            carePlan={carePlan}
            watch={watch}
            control={control}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.surgeriesIsOpen}
          />

          <DiagnosisPanel
            carePlan={carePlan}
            control={control}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.diagnosisIsOpen}
          />

          <LaboratoryPanel
            carePlan={carePlan}
            watch={watch}
            control={control}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.laboratoryIsOpen}
          />

          <MedicationPanel
            carePlan={carePlan}
            control={control}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.medicationIsOpen}
          />

          <AdministrationMedicationPanel
            carePlan={carePlan}
            control={control}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.administrationMedicationIsOpen}
          />

          <CarePlanPanel
            carePlan={carePlan}
            control={control}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.carePlanIsOpen}
            setValue={setValue}
          />

          <MedicalHistoryPanel
            medicalHistory={medicalHistory}
            togglePanelState={togglePanelState}
            isPanelOpen={panels.medicalHistoryIsOpen}
          />

          <div className="mt-5">
            <CareplanButtons
              carePlan={carePlan}
              isFormChanged={isFormChanged}
              onSaveAndLock={onSaveAndLock}
              lockCareplan={lockCareplan}
              cancelCareplan={cancelCareplan}
              navigate={navigate}
              printCarePlan={printCarePlan}
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default NewUserCareplan;
