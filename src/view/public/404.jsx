import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import Default404Photo from "@/assets/good_doggy_re_eet7.svg";

export default function CatchAllPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-slate-200 to-gray-200 dark:from-slate-800 dark:to-slate-900 text-black dark:text-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-2">
        <div className="w-[300px] mb-4">
          <img
            src={Default404Photo}
            alt="Cat Photo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="text-2xl font-medium mt-4">Oops! Page not found</p>
          <p className="mt-4 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button
            onClick={() => navigate("/")}
            size={"lg"}
            className="font-semibold rounded-full transition duration-300 ease-in-out"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
