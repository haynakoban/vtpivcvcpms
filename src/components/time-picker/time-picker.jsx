/* eslint-disable react/prop-types */

import * as React from "react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/time-picker/time-picker-input";
import { TimePeriodSelect } from "@/components/time-picker/period-select";
import { isAMorPM } from "@/lib/functions";

export function TimePicker({ date, setDate }) {
  const [period, setPeriod] = React.useState(isAMorPM(date));

  const minuteRef = React.useRef(null);
  const hourRef = React.useRef(null);
  const secondRef = React.useRef(null);
  const periodRef = React.useRef(null);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <TimePickerInput
          picker="12hours"
          period={period}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePickerInput
          picker="minutes"
          id="minutes12"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="period" className="text-xs">
          Period
        </Label>
        <TimePeriodSelect
          period={period}
          setPeriod={setPeriod}
          date={date}
          setDate={setDate}
          ref={periodRef}
          onLeftFocus={() => secondRef.current?.focus()}
        />
      </div>
    </div>
  );
}
