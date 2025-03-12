/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import useSettingsStore from "@/store/useSettings";
import SecureMainLayout from "@/layout/private";
import { ContentLayout } from "@/layout/private/content-layout";
import { TimePicker } from "@/components/time-picker/time-picker";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthStore from "@/store/useAuthStore";
import { Input } from "@/components/ui/input";

export default function Availability() {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { schedules, updateSchedule, getSchedule } = useSettingsStore();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      schedule: [
        {
          day: "Monday",
          isDayChecked: false,
          from: new Date(),
          to: new Date(),
        },
        {
          day: "Tuesday",
          isDayChecked: false,
          from: new Date(),
          to: new Date(),
        },
        {
          day: "Wednesday",
          isDayChecked: false,
          from: new Date(),
          to: new Date(),
        },
        {
          day: "Thursday",
          isDayChecked: false,
          from: new Date(),
          to: new Date(),
        },
        {
          day: "Friday",
          isDayChecked: false,
          from: new Date(),
          to: new Date(),
        },
        {
          day: "Saturday",
          isDayChecked: false,
          from: new Date(),
          to: new Date(),
        },
        {
          day: "Sunday",
          isDayChecked: false,
          from: new Date(),
          to: new Date(),
        },
      ],
      timeSlot: {
        duration: 30,
        maxClients: 1,
      },
      appointmentAmount: 100
    },
  });

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      await getSchedule(user?.id);
      setIsLoading(false);
    };

    fetchSchedules();
  }, [getSchedule, user?.id]);

  useEffect(() => {
    if (schedules && schedules.length > 0) {
      const formattedSchedules = schedules[0].schedule.map((schedule) => ({
        day: schedule.day,
        isDayChecked: schedule.isDayChecked,
        from: schedule.from
          ? moment(schedule.from, "hh:mm A").toDate()
          : new Date(),
        to: schedule.to ? moment(schedule.to, "hh:mm A").toDate() : new Date(),
      }));

      const formattedTimeSlot = {
        duration: schedules[0].timeSlot.duration,
        maxClients: schedules[0].timeSlot.maxClients,
      };

      const appointmentAmount = schedules[0].appointmentAmount;

      reset({ schedule: formattedSchedules, timeSlot: formattedTimeSlot, appointmentAmount });
    }
  }, [schedules, reset]);

  const onSubmit = async (data) => {
    const processedSchedule = data.schedule.map(
      ({ day, isDayChecked, from, to }) => ({
        day,
        isDayChecked: isDayChecked,
        from: isDayChecked && from ? moment(from).format("hh:mm A") : "",
        to: isDayChecked && to ? moment(to).format("hh:mm A") : "",
      })
    );

    const processedTimeSlot = {
      duration: parseInt(data.timeSlot.duration),
      maxClients: parseInt(data.timeSlot.maxClients),
    };

    const appointmentAmount = data.appointmentAmount;
    try {
      setIsLoading(true);
      const result = await updateSchedule(
        processedSchedule,
        processedTimeSlot,
        appointmentAmount,
        user?.id,
        schedules[0]?.id || null
      );

      if (result?.err) toast({ title: "Error", description: result.err });
      if (result?.success)
        toast({ title: "Success", description: result.success });
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(user){
      if(user?.userType != 1) navigate('/auth/dashboard')
    } else {
      navigate('/')
    }
  }, [navigate, user])
  return (
    <SecureMainLayout>
      <ContentLayout title="Settings and Privacy">
        <div>
          <div className="flex min-h-screen w-full flex-col">
            <div className="grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <nav className="grid gap-4 text-sm text-muted-foreground">
                <Link to="/auth/settings">General</Link>
                <Link to="/auth/settings/security">Security</Link>
                {user?.userType == 1 && (
                  <Link to="#" className="font-semibold text-primary">
                    Availability
                  </Link>
                )}
              </nav>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appointment Price Management</CardTitle>
                    <CardDescription>
                      Set the default price/amount for every booking.
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                      <div className="grid gap-4">
                        {/* Amount Input */}
                        <div>
                          <label className="block text-sm font-medium">
                            Amount (PHP)
                          </label>
                          <Controller
                            control={control}
                            name="appointmentAmount"
                            render={({ field }) => (
                              <Input
                                type="number"
                                placeholder="Enter duration"
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Appointment Time Slot Management</CardTitle>
                    <CardDescription>
                      Set the duration for each appointment and the maximum
                      number of clients that can be accommodated within each
                      time slot. This facilitates effective management of your
                      availability.
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                      <div className="grid gap-4">
                        {/* Duration Input */}
                        <div>
                          <label className="block text-sm font-medium">
                            Duration (minutes)
                          </label>
                          <Controller
                            control={control}
                            name="timeSlot.duration"
                            render={({ field }) => (
                              <Input
                                type="number"
                                placeholder="Enter duration"
                                {...field}
                              />
                            )}
                          />
                        </div>

                        {/* Maximum Clients Input */}
                        <div>
                          <label className="block text-sm font-medium">
                            Maximum Clients
                          </label>
                          <Controller
                            control={control}
                            name="timeSlot.maxClients"
                            render={({ field }) => (
                              <Input
                                type="number"
                                placeholder="Enter max clients"
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Appointment Schedule Management</CardTitle>
                    <CardDescription>
                      Set your available days and working hours for client
                      appointments. Clearly define when clients can schedule
                      their visits.
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day, index) => (
                        <div key={day} className="border rounded-lg p-4 mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Controller
                              control={control}
                              name={`schedule.${index}.isDayChecked`}
                              render={({ field }) => (
                                <Checkbox
                                  id={day.toLowerCase()}
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              )}
                            />
                            <label
                              htmlFor={day.toLowerCase()}
                              className="text-md font-medium leading-none cursor-pointer"
                            >
                              {day}
                            </label>
                          </div>

                          <Controller
                            control={control}
                            name={`schedule.${index}.isDayChecked`}
                            render={({ field }) =>
                              field.value ? (
                                <div className="flex flex-wrap items-center gap-3">
                                  <div className="flex items-center space-x-3">
                                    <p className="mt-4 w-12 text-right">
                                      From:
                                    </p>
                                    <Controller
                                      control={control}
                                      name={`schedule.${index}.from`}
                                      render={({ field: timeField }) => (
                                        <TimePicker
                                          date={timeField.value}
                                          setDate={timeField.onChange}
                                        />
                                      )}
                                    />
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <p className="mt-4 w-12 text-right">To:</p>
                                    <Controller
                                      control={control}
                                      name={`schedule.${index}.to`}
                                      render={({ field: timeField }) => (
                                        <TimePicker
                                          date={timeField.value}
                                          setDate={timeField.onChange}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <p className="mt-4 text-gray-500">
                                  Select the checkbox to set availability for{" "}
                                  {day}.
                                </p>
                              )
                            }
                          />
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
                <div className="my-5"></div>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </SecureMainLayout>
  );
}
