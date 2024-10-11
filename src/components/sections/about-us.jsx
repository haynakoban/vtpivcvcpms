import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function AboutUsSection() {
  return (
    <section className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                <h6 className="text-gray-400 text-base font-normal leading-relaxed">
                  About Us
                </h6>
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 className="text-primary text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    Our Journey of Care and Commitment
                  </h2>
                  <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    Our story is one of dedication to the well-being of animals
                    and the trust of their owners. Through collaboration,
                    passion, and innovation, we’ve built a foundation that
                    reflects our unwavering commitment to providing
                    compassionate veterinary care and fostering lasting
                    relationships with our community.
                  </p>
                </div>
              </div>
              <div className="w-full flex-col justify-center items-start gap-6 flex">
                <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 dark:text-white text-2xl font-bold font-manrope leading-9">
                      5+ Years
                    </h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      Caring for Pets and Promoting Healthier Lives
                    </p>
                  </div>
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 dark:text-white text-2xl font-bold font-manrope leading-9">
                      1,000+ Appointments
                    </h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      Delivering Quality Veterinary Services
                    </p>
                  </div>
                </div>
                <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  <div className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 dark:text-white text-2xl font-bold font-manrope leading-9">
                      3 Industry Recognitions
                    </h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      Celebrating Our Commitment to Animal Care
                    </p>
                  </div>
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 dark:text-white text-2xl font-bold font-manrope leading-9">
                      95% Satisfied Pet Owners
                    </h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      Reflecting Our Dedication to Compassionate Service
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Button className="sm:w-fit w-full group px-3.5 py-2 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
              <span className="px-1.5  text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                Read More
              </span>

              <ChevronRight className="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out size-5" />
            </Button>
          </div>
          <div className="w-full lg:justify-start justify-center items-start flex">
            <div className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
              <img
                className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                src="https://pagedone.io/asset/uploads/1717742431.png"
                alt="about Us image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
