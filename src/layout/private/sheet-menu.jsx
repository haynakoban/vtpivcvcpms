import { Link } from "react-router-dom";
import { MenuIcon, PawPrint } from "lucide-react";

import { Menu } from "@/layout/private/menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link
              href="auth/dashboard"
              className="flex items-center gap-2 !no-underline"
            >
              <PawPrint className="w-6 h-6 mr-1" />
              <SheetTitle className="font-bold text-lg text-primary">
                Paws and Care Clinic
              </SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
