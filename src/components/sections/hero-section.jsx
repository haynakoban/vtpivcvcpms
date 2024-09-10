import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DogAndCatPhoto from "@/assets/dog_and_cat.jpg";

export default function HeroSection() {
  return (
    <section className="px-2 py-32 md:px-0">
      <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
        <div className="flex flex-wrap items-center sm:-mx-3">
          <div className="w-full md:w-1/2 md:px-3">
            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block">Caring Services to</span>
                <span className="block text-purple-700 dark:text-indigo-400">
                  Keep Your Pets Healthier.
                </span>
              </h1>
              <p className="mx-auto text-base text-gray-600 dark:text-gray-400 sm:max-w-md lg:text-xl md:max-w-3xl">
                Your pets deserve the best—our services are designed to keep
                them healthy, happy, and full of life.
              </p>
              <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                <Button variant={"default"} size={"lg"}>
                  Try It Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button variant={"secondary"} size={"lg"}>
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
              <img src={DogAndCatPhoto} alt="Dog and Cat Photo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
