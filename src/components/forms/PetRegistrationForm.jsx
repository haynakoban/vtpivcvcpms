import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UploadCloud } from "lucide-react";

const ageSchema = z.string()
  .transform((val) => {
    const numberVal = parseInt(val);
    return isNaN(numberVal) ? undefined : numberVal;
  })
  .refine((val) => val !== undefined, {
    message: 'Invalid age format',
  })
  .refine((val) => Number.isInteger(val), {
    message: 'Age must be an integer.',
  });

const fileSchema = z.object({
    name: z.string().min(1, "File name is required"),
    size: z.number().positive("File size must be a positive number"),
    type: z.string().refine(value => ['image/jpeg', 'image/png'].includes(value), {
      message: "Invalid file type",
    }),
  });

const formSchema = z.object({
    petName: z.string().min(1, "Pet name is required"),
    species: z.string().min(1, "Species is required"),
    breed: z.string().min(1, "Breed is required"),
    // petImage: z.instanceof(File).optional().refine(file => {
    //     if (!file) return true;
    //     const result = fileSchema.safeParse({
    //         name: file.name,
    //         size: file.size,
    //         type: file.type,
    //     });
    //     return result.success;
    // }, { message: "Invalid file" }),
    age: ageSchema,
    birthday: z.date(),
});

// eslint-disable-next-line react/prop-types
function PetRegistrationForm({ setIsModalOpen }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          petName: "",
          species: "",
          breed: "",
          age: "",
        //   petImage: undefined,
          birthday: undefined,
        },
        transform: {
            age: (value) => parseInt(value),
        },        
    });

    async function onUpdateProfile(values) {
        const { petName, breed, species, age, birthday, petImage  } = values;
        console.log(petName, breed, species, age, birthday, petImage  )
        try {
        //   const result = await updateUserProfile(petName, email, user.id);
        //   if(result?.err) toast({ title: 'Error', description: result.err })
        //   if(result?.success) toast({ title: 'Success', description: result.success })
        } catch (error) {
          console.log(error);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || undefined;
        form.setValue("petImage", file);
    };

    return (
        <div className="relative z-[998]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-background px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                            <div className="p-5 w-full">
                                <div>Pet Information</div>
                                <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onUpdateProfile)}
                                    className="space-y-5"
                                >
                                    {/*<FormField
                                        control={form.control}
                                        name="petImage"
                                        render={({ field }) => (
                                            <FormItem className="mt-4">
                                            <FormLabel>Pet Image</FormLabel>
                                            <FormControl>
                                                <div>
                                                    <label
                                                    {...field}
                                                    className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-background hover:bg-secondary "
                                                    >
                                                    <div className=" text-center">
                                                        <div className="p-2 rounded-md max-w-min mx-auto">
                                                        <UploadCloud className="text-primary" size={30} />
                                                        </div>
                                                        <p className="text-xs text-gray-500">
                                                        Click to upload files &#40;files should be under 10 MB &#41;
                                                        </p>
                                                    </div>
                                                    
                                                    <Input
                                                        {...field}
                                                        accept="image/png, image/jpeg"
                                                        type="file"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                    />
                                                    </label>

                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}

                                    
                                    <FormField
                                        control={form.control}
                                        name="petName"
                                        render={({ field }) => (
                                            <FormItem className="mt-4">
                                            <FormLabel>Pet Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter pet name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="species"
                                        render={({ field }) => (
                                            <FormItem className="mt-4">
                                            <FormLabel>Species</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Example: Cat, Dog, Horse and etc." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="breed"
                                        render={({ field }) => (
                                            <FormItem className="mt-4">
                                            <FormLabel>Breed</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Example: Persian, Chihuahua, Poodle and etc." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="age"
                                        render={({ field }) => (
                                            <FormItem className="mt-4">
                                            <FormLabel>Age</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter pet age." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="birthday"
                                        render={({ field }) => (
                                            <FormItem className="mt-4">
                                            <FormLabel>Birthday</FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "PPP") : <span>Select date of birth</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-full p-0 z-[999]" align="start">
                                                        <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={date => field.onChange(date)}
                                                        initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end">
                                        <Button type="submit" className="mt-2" variant="outline" onClick={() => setIsModalOpen(false)}>
                                            Close
                                        </Button>
                                        <Button type="submit" className="mt-2 ml-2">
                                            Register
                                        </Button>
                                    </div>
                                </form>
                                </Form>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetRegistrationForm;
