const testimonials = [
  {
    title: "Exceptional Veterinary Care",
    content:
      "Our experience with this clinic has been outstanding. The care and attention they provide to our pets are unparalleled, making every visit a positive one.",
    name: "Lisa Thompson",
    position: "Pet Owner",
    image: "https://randomuser.me/api/portraits/women/54.jpg",
    colSpan: 2,
  },
  {
    title: "Highly Responsive and Supportive",
    content:
      "The support team at this clinic is incredibly responsive and supportive. They always go the extra mile to ensure the best care for our pets.",
    name: "Mark Johnson",
    position: "Dog Owner",
    image: "https://randomuser.me/api/portraits/men/30.jpg",
    colSpan: 3,
  },
  {
    title: "Smooth and Professional Service",
    content:
      "The integration of new treatments and services was smooth and professionally handled. The staff made sure we were well-informed and comfortable throughout.",
    name: "Rachel Davis",
    position: "Cat Owner",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    colSpan: 3,
  },
  {
    title: "Consistent and Reliable Care",
    content:
      "We have always received reliable and consistent care from this clinic. Their commitment to maintaining high standards is evident in every aspect of their service.",
    name: "John Smith",
    position: "Pet Parent",
    image: "https://randomuser.me/api/portraits/men/90.jpg",
    colSpan: 2,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="my-24 mt-0 md:my-56 lg:my-24 max-w-7xl mx-auto w-full px-10 dark:text-white">
      <div className="flex items-center justify-center flex-col gap-y-2 py-5">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          What Our Clients Say
        </h2>
        <p className="text-center italic text-lg font-medium text-slate-700/70 dark:text-gray-400">
          Hear from our satisfied customers about their experiences and how our
          service has made a positive impact on their lives.{" "}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
        {testimonials.map((testimonial, index) => {
          const colSpan =
            testimonial.colSpan === 2 ? "lg:col-span-2" : "lg:col-span-3";
          return (
            <div
              key={index}
              className={`border p-7 rounded-xl bg-white dark:bg-slate-900 drop-shadow-md dark:drop-shadow-white border-neutral-200/50 dark:border-slate-800
                        col-span-3 ${colSpan} flex flex-col gap-y-10 justify-between`}
            >
              <div className="flex flex-col gap-y-3.5">
                <p className="font-bold text-xl">{testimonial.title}</p>
                <p className="font-medium text-slate-700/90 dark:text-gray-300">
                  {testimonial.content}
                </p>
              </div>
              <div className="flex flex-col">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full"
                />
                <p className="pt-2 text-sm font-semibold">{testimonial.name}</p>
                <p className="text-sm font-medium text-slate-700/70 dark:text-gray-400">
                  {testimonial.position}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
