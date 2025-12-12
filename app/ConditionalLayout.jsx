"use client";

import { usePathname } from "next/navigation";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import StudentHeader from "@/src/components/students/StudentHeader";
import StudentFooter from "@/src/components/students/StudentFooter";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  const layoutConfig = [
    {
      match: ["/admin", "/student"],
      hideHeader: true,
      hideFooter: true,
    },
    {
      match: ["/exam"],
      hideHeader: true,
      hideFooter: true,
    },
    {
      match: ["/auth"],
      hideHeader: true,
      hideFooter: true,
    },
    {
      match: ["/"],
      hideHeader: false,
      hideFooter: false,
    },
  ];

  // Find matching layout rule
  const activeLayout =
    layoutConfig.find((config) =>
      config.match.some((route) => pathname?.startsWith(route))
    ) || {
      hideHeader: false,
      hideFooter: false,
    };

  const isStudent = pathname?.startsWith("/student") && pathname !== "/student/login" && pathname !== "/student/signup" && !pathname?.startsWith("/student/verify-otp");
  console.log(isStudent, "Active Layout:", activeLayout, "Pathname:", pathname);

  return (
    <>
      {isStudent ? <StudentHeader /> : !activeLayout.hideHeader && <Header />}
      <main>{children}</main>
      {isStudent ? <StudentFooter /> : !activeLayout.hideFooter && <Footer />}
    </>
  );
}
