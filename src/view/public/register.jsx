import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import SignInWithGoogle from "@/components/auth/sign-in-with-google";
import useUsersStore from "@/store/useUsersStore";
import useAuditStore from "@/store/useAuditStore";

import { Separator } from "@/components/ui/separator";
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

const formSchema = z.object({
  fullName: z
    .string()
    .min(4, { message: "Full name must be at least 4 characters long" })
    .max(50, { message: "Full name must be no more than 50 characters long" })
    .regex(/^[a-zA-Z]/, { message: "Full name must start with a letter" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#;]/, {
      message: "Password must contain at least one special character",
    }),
});

export default function Register() {
  const navigate = useNavigate();
  const { createUser } = useUsersStore();
  const { addAudit } = useAuditStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    const { email, fullName, password } = values;

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      createUser({
        fullName,
        user: {
          uid: result.user.uid,
          email: result.user.email || "",
          emailVerified: result.user.emailVerified,
          photoURL: result.user.photoURL || "",
          refreshToken: result.user.refreshToken,
        },
      });

      addAudit({
        userId: result.user.uid,
        log: "Registered and Signed in with email and password",
        action: "Registered/Logged In",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex justify-center space-x-0 md:space-x-20 xl:space-x-32 mt-16 md:mt-32">
      <div className="hidden lg:block">
        <div className="mt-20">
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
            <CardTitle>Create new account</CardTitle>
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
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e,g. John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e,g. johndoe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Button type="submit" className="mt-2 w-full">
                    Create account
                  </Button>
                </div>
                <div>
                  <p className="text-center">
                    Already have an account?
                    <Link
                      to="/login"
                      className="text-[#4285F4] hover:opacity-85"
                    >
                      {" "}
                      Login
                    </Link>
                  </p>
                </div>

                <div className="flex justify-center items-center space-x-5">
                  <Separator className="w-36" />
                  <span>or</span>
                  <Separator className="w-36" />
                </div>

                <div>
                  <SignInWithGoogle />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
