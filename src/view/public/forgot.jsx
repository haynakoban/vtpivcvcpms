import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import WelcomePet from "@/assets/welcome_cats_thqn.svg";
import useUsersStore from "@/store/useUsersStore";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function Forgot() {
  const { resetAccount } = useUsersStore();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
    const { email } = values;

    try {
      const response = await resetAccount(email);

      if (response) {
        const { title, description } = response;

        toast({
          title,
          description,
        });
      } else {
        toast({
          title: "Something went wrong!",
          description: "Please try again later.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center space-x-0 md:space-x-20 xl:space-x-32 mt-16 md:mt-32">
      <div className="hidden lg:block">
        <div className="mt-10">
          <img
            src={WelcomePet}
            alt="Welcome Photo"
            className="object-cover w-[500px] aspect-auto"
          />
        </div>
      </div>
      <div>
        <Card className="w-full md:w-[400px]">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Button type="submit" className="mt-2 w-full">
                    Reset Password
                  </Button>
                </div>
                <div>
                  <p className="text-center">
                    Have an account?
                    <Link
                      to="/login"
                      className="text-[#4285F4] hover:opacity-85"
                    >
                      {" "}
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
