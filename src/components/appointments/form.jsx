import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import usePetStore from "@/store/usePetStore";
import { checkSelectedPet, formatDateWDay, generateTimeSlots, getDay, checkBookedSlot, formattedDate } from "@/lib/functions";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup } from "@/components/ui/radio-group";
import useSettingsStore from "@/store/useSettings";
import useAuthStore from "@/store/useAuthStore";

const steps = [
  {
    id: "Step 1",
    name: "Pick a date",
  },
  {
    id: "Step 2",
    name: "Selet your pet"
  },
  { 
    id: "Step 3", 
    name: "Billing" 
  },
];

const bookedAppointment = [
  {
    date: '10-07-2024',
    time: '08:00 AM - 09:00 AM'
  },
  {
    date: '10-07-2024',
    time: '09:00 AM - 10:00 AM'
  },
  {
    date: '10-07-2024',
    time: '10:00 AM - 11:00 AM'
  },
  {
    date: '10-07-2024',
    time: '11:00 AM - 12:00 PM'
  },
  {
    date: '10-07-2024',
    time: '12:00 PM - 01:00 PM'
  },
  {
    date: '10-07-2024',
    time: '01:00 PM - 02:00 PM'
  },
  {
    date: '10-07-2024',
    time: '02:00 PM - 03:00 PM'
  },
  {
    date: '10-07-2024',
    time: '03:00 PM - 04:00 PM'
  },
  {
    date: '10-07-2024',
    time: '04:00 PM - 05:00 PM'
  }
];

export default function Form() {
  const { userPets, getUserPet } = usePetStore();
  const { user } = useAuthStore();
  useEffect(() => {
    getUserPet(false, user?.id);
  },[user]);

  const { schedules, getScheduleFirst } = useSettingsStore();
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPet, setSelectedPet] = useState([]);
  const delta = currentStep - previousStep;
  const [selected, setSelected] = useState(new Date());
  const today = new Date();
  const selected_day = getDay(Math.floor(selected.getTime() / 1000));
  const [availability, setAvailability] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const fullyBooked = () => {
    const full = timeSlots?.filter((slots) => checkBookedSlot(bookedAppointment, formattedDate(selected), `${slots.start} - ${slots.end}`)).length === timeSlots?.length
    return timeSlots?.length < 1 ? false : full;
  }

  useEffect(() => {
    getScheduleFirst();
  },[])

  useEffect(() => {
    schedules?.schedule?.map(day => {
      if(day?.day == selected_day){
        setAvailability({...day, ...schedules.timeSlot});
      }
    });
  },[selected])


  useEffect(() => {
    if(availability){
      setTimeSlots(generateTimeSlots(availability));
    }
  },[availability])

  const processForm = async () => {
    console.log(formattedDate(selected), selectedSlot, selectedPet);
    setSelectedPet([]);
    setSelected(new Date());
    setSelectedSlot(null);
  };

  const next = async () => {
    if (!selectedSlot) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === 1) {
        if(selectedPet.length <= 0) return;
      }

      if (currentStep === steps.length - 2) {
        await processForm();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const handleSelectPet = (e) => {
    const id = e.target.value;
    const isChecked = e.target.checked;

    if(!isChecked){
      const removedId = selectedPet.filter((pet) => {
        return pet != id
      })
      setSelectedPet(removedId);
    } else {
      setSelectedPet(prev => [...prev, id]);
    }
  }

  const handleSelectDate = (date) => {
    if(date == undefined) return;
    if (selected && date.toDateString() === selected.toDateString()) return;
    setSelected(date);
    setSelectedSlot(null);
  };

  return (
    <section className="absolute inset-0 flex flex-col justify-between p-16">
      {/* steps */}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-purple-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-purple-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-purple-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-purple-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className="mt-12 py-12">
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 ">
              Pick A Date
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Please select date and time.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 xl:grid-cols-6">
              <div className="sm:col-span-2">
                <div className="w-full flex items-center py-4 px-4 justify-center rounded-md border">
                  <Calendar
                    mode="single"
                    selected={selected}
                    onSelect={handleSelectDate}
                    fromDate={today}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <div className="px-1 mb-3 font-bold">{formatDateWDay(Math.floor(selected.getTime() / 1000))}</div>
                <RadioGroup>
                    {!availability?.isDayChecked ?
                      <div>No available time.</div>
                    :
                    <div className="flex items-center flex-wrap">
                      {timeSlots?.length < 1 &&
                        <div>No available time.</div>
                      }

                      {timeSlots?.map((slots, i) => {
                        const slotValue = `${slots.start} - ${slots.end}`;

                        return <div key={i} className={`${timeSlots?.length > 10 ? 'w-full xl:w-1/3' : 'w-full xl:w-1/2'} p-1`}>
                            <div 
                                className={`flex items-start flex-col rounded border p-2 cursor-pointer ${selectedSlot == slotValue ? 'bg-primary text-primary-foreground ' : ''} ${checkBookedSlot(bookedAppointment, formattedDate(selected), slotValue) ? 'bg-secondary booked-cursor' : ''}`} 
                                onClick={() => {
                                  if(!checkBookedSlot(bookedAppointment, formattedDate(selected), slotValue)){
                                    handleSelect(slotValue)
                                  }
                                }}>
                                  &nbsp;&nbsp;{slots?.start} - {slots?.end} 
                                  <span className="text-xs">&nbsp;&nbsp;&nbsp;&nbsp;{checkBookedSlot(bookedAppointment, formattedDate(selected), slotValue) ? 'Booked' : 'Available'}</span>
                            </div>
                          </div>
                      })}

                    </div>
                    }
                    <div className="px-2 text-destructive">{fullyBooked() ? 'Fully Booked' : ''}</div>
                </RadioGroup>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 ">
              Select Your Pet
            </h2>

            <div className="mt-2 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6">
              {userPets?.map((pet) => {
                return <label key={pet?.id} className="sm:col-span-2 border rounded cursor-pointer">
                    <input type="checkbox" hidden value={pet?.id} onClick={handleSelectPet}/>
                    <div className={`${checkSelectedPet(selectedPet, pet?.id) ? 'bg-primary text-primary-foreground' : ''} flex gap-2 items-center p-2`}>
                      <img key={pet?.id} src={pet?.petImage} alt="" className="h-12 aspect-square object-cover" />
                      <div>
                        <p>{pet?.petName}</p>
                        <p className="text-xs">{pet?.species}</p>
                      </div>
                    </div>
                </label>
              })}
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-base font-semibold leading-7">
              Payment
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              To Complete Your Appointment Please Pay Exact Amount in this Gcash Account, and submit it.
            </p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="" className="bg-white my-2 h-[250px]" />
            <input type="file" />
            <div className="mt-2"></div>
            <Button className="btn btn-sm bg-primary">Submit</Button>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className="mt-8 pt-5 pb-20">
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            disabled={currentStep === 0}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            disabled={currentStep === steps.length - 1}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
