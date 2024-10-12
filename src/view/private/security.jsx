/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import SecureMainLayout from "@/layout/private";
import { ContentLayout } from "@/layout/private/content-layout";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import useAuthStore from "@/store/useAuthStore";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useUsersStore from "@/store/useUsersStore";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";

const formSchema2 = z.object({
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
  confirmPassword: z.string(),
  oldPassword: z.string(),
});

export default function Security() {
  const { toast } = useToast();
  const { user, isChanged } = useAuthStore();
  const { updateUserPassword } = useUsersStore();
  const [isLoading, setIsLoading] = useState(false);

  const form2 = useForm({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      password: "",
      oldPassword: "",
      confirmPassword: "",
    },
  });

  async function onUpdatePassword(values) {
    const { password, confirmPassword, oldPassword } = values;

    try {
      setIsLoading(true);
      const result = await updateUserPassword(
        user?.email,
        password,
        confirmPassword,
        oldPassword
      ).finally(() => setIsLoading(false));
      if (result?.err) {
        toast({ title: "Error", description: result.err });
      }
      if (result?.success) {
        toast({ title: "Success", description: result.success });
        form2.reset();
      }
    } catch (error) {
      console.log(error);
      toast({ title: "Error", description: "Password incorrects." });
    }
  }

  return (
    <SecureMainLayout>
      <ContentLayout title="Settings and Privacy">
        <div>
          <div className="flex min-h-screen w-full flex-col">
            <div className="grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <nav className="grid gap-4 text-sm text-muted-foreground">
                <Link to="/auth/settings">General</Link>
                <Link to="#" className="font-semibold text-primary">
                  Security
                </Link>
                {user?.userType == 1 && (
                  <Link to="/auth/settings/availability">Availability</Link>
                )}
              </nav>
              <div className="grid gap-6">
                <Card className="mt-4">
                  <div className="p-5">
                    <div>Change Password</div>
                    <Form {...form2}>
                      <form
                        onSubmit={form2.handleSubmit(onUpdatePassword)}
                        className="space-y-5"
                      >
                        <FormField
                          control={form2.control}
                          name="oldPassword"
                          render={({ field }) => (
                            <FormItem className="mt-4">
                              <FormLabel>Old Password</FormLabel>
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
                        <FormField
                          control={form2.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
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
                        <FormField
                          control={form2.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
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
                          <Button
                            type="submit"
                            className="mt-2"
                            disabled={isLoading}
                          >
                            <LoadingSpinner isLoading={isLoading} />
                            Update Password
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </SecureMainLayout>
  );
}
