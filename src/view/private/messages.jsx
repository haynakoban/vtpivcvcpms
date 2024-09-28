// import { Link } from "react-router-dom";
import SecureMainLayout from "@/layout/private";
import { ContentLayout } from "@/layout/private/content-layout";
import MessagesPanel from "@/components/messages/messages-panel";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

export default function Messages() {
  return (
    <SecureMainLayout>
      <ContentLayout title="Messages">
        <MessagesPanel />
      </ContentLayout>
    </SecureMainLayout>
  );
}
