"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Loader from "@/src/components/Loader/Loader";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const noLayoutRoutes = [
    "/admin/login",
    "/admin/dashboard",
    "/admin/contact",
    "/admin/section",
    "/admin/job",
    "/admin/questions",
    "/admin/student",
    "/admin/home-links",
    "/admin/government-jobs",
    "/admin/job-priority",
    "/student/login",
    "/student/signup",
    "/student/dashboard",
    "/student/exam",
    "/student/verify-otp"
  ];

  const hideLayout = noLayoutRoutes.some((route) => pathname?.startsWith(route));

  // Handle loader on route change
  useEffect(() => {
    setLoading(true);

    // Simulate small loading duration or wait for render
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 600); // adjust duration if needed

    return () => clearTimeout(timeout);
  }, [pathname]);

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <Loader size={60} />
  //     </div>
  //   );
  // }

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
