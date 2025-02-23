/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function CarePlanLists({ appointments }) {
  return (
    <div className="w-full sm:p-4">
      <h2 className="p-4">Care Plan List</h2>
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Link</TableHead>
              <TableHead className="font-medium">Views</TableHead>
              <TableHead className="font-medium">Link</TableHead>
              <TableHead className="font-medium">Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments
              ? appointments.map((appt) => (
                  <Collapsible key={appt.id} asChild>
                    <>
                      <TableRow>
                        <TableCell>{appt.name}</TableCell>
                        <TableCell>{appt.id}</TableCell>
                        <TableCell>
                          {appt.status}
                          <CollapsibleTrigger asChild>
                            <div>{appt.status}</div>
                          </CollapsibleTrigger>
                        </TableCell>
                      </TableRow>
                      <CollapsibleContent asChild>
                        <p>TEST</p>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
