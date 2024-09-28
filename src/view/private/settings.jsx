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

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export const description =
  "A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings.";

export default function Settings() {
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
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-10">
          <div className="flex min-h-screen w-full flex-col">
            <div className="grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <nav className="grid gap-4 text-sm text-muted-foreground">
                <Link href="#" className="font-semibold text-primary">
                  General
                </Link>
                <Link href="#">Security</Link>
                <Link to="/auth/settings/availability">Availability</Link>
                <Link href="#">Support</Link>
                <Link href="#">Advanced</Link>
              </nav>
              <div className="grid gap-6">
                <Card x-chunk="dashboard-04-chunk-1">
                  <CardHeader>
                    <CardTitle>Store Name</CardTitle>
                    <CardDescription>
                      Used to identify your store in the marketplace.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <Input placeholder="Store Name" />
                    </form>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-04-chunk-2">
                  <CardHeader>
                    <CardTitle>Plugins Directory</CardTitle>
                    <CardDescription>
                      The directory within your project, in which your plugins
                      are located.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="flex flex-col gap-4">
                      <Input
                        placeholder="Project Name"
                        defaultValue="/content/plugins"
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include" defaultChecked />
                        <label
                          htmlFor="include"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Allow administrators to change the directory.
                        </label>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </SecureMainLayout>
  );
}
