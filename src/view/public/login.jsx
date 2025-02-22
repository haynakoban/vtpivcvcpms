/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import SignInWithGoogle from "@/components/auth/sign-in-with-google";
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
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export default function Login() {
  const navigate = useNavigate();
  const { addAudit } = useAuditStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    const { email, password } = values;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (result) {
        addAudit({
          userId: result.user.uid,
          log: "Signed in with email and password",
          action: "Logged In",
          actionId: result.user.uid,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      form.setError("email", {
        type: "manual",
        message: "Invalid Email and Password Combination",
      });
      form.setError("password", {
        type: "manual",
        message: "Invalid Email and Password Combination",
      });
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
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Create your account to get started!</CardDescription>
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
                    Submit
                  </Button>
                </div>
                <div className="text-right">
                  <Link
                    to="/forgot"
                    className="text-[#4285F4] hover:opacity-85"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div>
                  <p className="text-center">
                    Don't have an account?
                    <Link
                      to="/register"
                      className="text-[#4285F4] hover:opacity-85"
                    >
                      {" "}
                      Register
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
