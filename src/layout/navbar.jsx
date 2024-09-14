import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IoSettingsOutline } from "react-icons/io5";
import { ModeToggle } from "@/components/common/mode-toggle";

import useAuthStore from "@/store/useAuthStore";
import { PawPrint } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  async function handleSignOut() {
    signOut();
    navigate("/login");
  }

  return (
    <header className="flex justify-between h-16 w-full shrink-0 items-center px-4 md:px-6 border-b shadow-sm">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <div className="px-4">
            <Link to={"/"}>
              <PawPrint className="h-6 w-6" />
              <span className="sr-only">Company Logo</span>
            </Link>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="grid gap-2 py-6">
              <Button
                onClick={() => navigate("/pet-register")}
                variant={"ghost"}
                className="flex w-full justify-start items-center py-2 text-md font-bold"
              >
                Pet Registration
              </Button>
              <Button
                onClick={() => navigate("/schedule-appointment")}
                variant={"ghost"}
                className="flex w-full justify-start items-center py-2 text-md font-bold"
              >
                Schedule Appointment
              </Button>
              <Button
                onClick={() => navigate("/video")}
                variant={"ghost"}
                className="flex w-full justify-start items-center py-2 text-md font-bold"
              >
                Video Conferencing
              </Button>
              <Button
                onClick={() => navigate("/about-us")}
                variant={"ghost"}
                className="flex w-full justify-start items-center py-2 text-md font-bold"
              >
                About Us
              </Button>
            </div>
            <div className="grid gap-2 py-6">
              {user ? (
                <>
                  <Button
                    onClick={() => navigate("/settings/profile")}
                    variant={"ghost"}
                    className="flex w-full justify-start items-center py-2 text-md font-bold"
                  >
                    {user?.displayName || user?.email}
                  </Button>
                  <Button
                    onClick={() => navigate("/settings/settings")}
                    variant={"ghost"}
                    className="flex w-full justify-start items-center py-2 text-md font-bold"
                  >
                    Settings
                  </Button>
                  <Button
                    onClick={handleSignOut}
                    variant={"ghost"}
                    className="flex w-full justify-start items-center py-2 text-md font-bold"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/Login")}
                    variant={"ghost"}
                    className="flex w-full justify-start items-center py-2 text-md font-bold"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate("/register")}
                    variant={"ghost"}
                    className="flex w-full justify-start items-center py-2 text-md font-bold"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex items-center">
        <Link to={"/"} className="mr-6 hidden lg:flex">
          <PawPrint className="h-6 w-6" />
          <span className="sr-only">Company Logo</span>
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                to={"/pet-register"}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-md font-bold transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
              >
                Pet Registration
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                to={"/schedule-appointment"}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-md font-bold transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
              >
                Schedule Appointment
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                to={"/video"}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-md font-bold transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
              >
                Video Conferencing
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                to={"/about-us"}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-md font-bold transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
              >
                About Us
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          {user ? (
            <>
              <NavigationMenuLink asChild>
                <Button
                  variant={"ghost"}
                  className="flex w-full items-center py-2 text-md font-bold"
                >
                  {user?.displayName || user?.email}
                </Button>
              </NavigationMenuLink>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <IoSettingsOutline size={28} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="font-bold cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-bold cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-bold text-sm cursor-pointer"
                    onClick={handleSignOut}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <NavigationMenuLink asChild>
                <Link
                  to={"/login"}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-md font-bold transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                >
                  Login
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  to={"/register"}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-md font-bold transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                >
                  Sign Up
                </Link>
              </NavigationMenuLink>
            </>
          )}
        </NavigationMenuList>

        <div className="ml-4">
          <ModeToggle />
        </div>
      </NavigationMenu>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
