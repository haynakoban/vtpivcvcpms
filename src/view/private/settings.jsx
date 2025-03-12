import { Link, useNavigate } from "react-router-dom";
import SecureMainLayout from "@/layout/private";
import { ContentLayout } from "@/layout/private/content-layout";

import { Button } from "@/components/ui/button";
import {
  Card
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/store/useAuthStore";
import { z } from "zod";


import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUsersStore from "@/store/useUsersStore";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  contactNumber: z.string().regex(/^[+]?[0-9]{7,15}$/, { message: "Invalid contact number" }),
  fullName: z.string(),
});

export default function Settings() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { updateUserProfile } = useUsersStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.displayName || "",
      email: user?.email || "",
      contactNumber: user?.contactNumber || "",
    },
  });

  useEffect(() => {
    if(user === undefined) return;
    if (!user) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    form.reset({ 
      fullName: user?.displayName || "",
      email: user?.email || "",
      contactNumber: user?.contactNumber || "",
     })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function onUpdateProfile(values) {
    const { fullName, email, contactNumber } = values;
    try {
      setIsLoading(true);
      const result = await updateUserProfile(fullName, email, contactNumber, user.id).finally(() => setIsLoading(false));
      if(result?.err) toast({ title: 'Error', description: result.err })
      if(result?.success) toast({ title: 'Success', description: result.success })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SecureMainLayout>
      <ContentLayout title="Settings and Privacy">
        <div>
          <div className="flex min-h-screen w-full flex-col">
            <div className="grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <nav className="grid gap-4 text-sm text-muted-foreground">
                <Link to="#" className="font-semibold text-primary">
                  General
                </Link>
                <Link to="/auth/settings/security">Security</Link>
                {user?.userType == 1 &&
                  <Link to="/auth/settings/availability">Availability</Link>
                }
              </nav>
              <div className="grid gap-6">
                <Card className="mt-2">
                  <div className="p-5">
                    <div>Profile Information</div>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onUpdateProfile)}
                        className="space-y-5"
                      >
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem className="mt-4">
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Full Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contactNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Contact Number" {...field} />
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
                                <Input placeholder="Email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div>
                          <Button type="submit" className="mt-2" disabled={isLoading}>
                            <LoadingSpinner isLoading={isLoading} />
                            Update
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
