import { Link } from "react-router-dom";
import SecureMainLayout from "@/layout/private";
import { ContentLayout } from "@/layout/private/content-layout";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "@/store/useAuthStore";
import useUsersStore from "@/store/useUsersStore";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  fullName: z.string(),
});

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

export default function Account() {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { updateUserProfile, updateUserPassword } = useUsersStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const form2 = useForm({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      password: "",
      oldPassword: "",
      confirmPassword: "",
    },
  });

  async function onUpdateProfile(values) {
    const { fullName, email } = values;
    try {
      const result = await updateUserProfile(fullName, email, user.id);
      if(result?.err) toast({ title: 'Error', description: result.err })
      if(result?.success) toast({ title: 'Success', description: result.success })
    } catch (error) {
      console.log(error);
    }
  }

  async function onUpdatePassword(values) {
    const {  password, confirmPassword, oldPassword } = values;

    try {
      const result = await updateUserPassword(user?.email, password, confirmPassword, oldPassword);
      if(result?.err) {
        toast({ title: 'Error', description: result.err });
      }
      if(result?.success){
        toast({ title: 'Success', description: result.success });
        form2.reset();
      }
    } catch (error) {
      console.log(error);
      toast({ title: 'Error', description: 'Password incorrects.' });
    }
  }

  return (
    <SecureMainLayout>
      <ContentLayout title="Messages">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/auth/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Account</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-5">Account</div>
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
                  <Button type="submit" className="mt-2">
                    Update Profile
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Card>
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
                  <Button type="submit" className="mt-2">
                    Update Password
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Card>
      </ContentLayout>
    </SecureMainLayout>
  );
}
