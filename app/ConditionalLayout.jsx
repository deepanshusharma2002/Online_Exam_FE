// "use client";

// import React, { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import Header from "@/src/components/Header/Header";
// import Footer from "@/src/components/Footer/Footer";
// import Loader from "@/src/components/Loader/Loader";

// export default function ConditionalLayout({ children }) {
//   const pathname = usePathname();
//   const [loading, setLoading] = useState(false);

//   const noLayoutRoutes = [
//     "/admin",
//     "/student"
//   ];

//   const hideLayout = noLayoutRoutes.some((route) => pathname?.startsWith(route));

//   useEffect(() => {
//     setLoading(true);

//     const timeout = setTimeout(() => {
//       setLoading(false);
//     }, 600);

//     return () => clearTimeout(timeout);
//   }, [pathname]);

//   // if (loading) {
//   //   return (
//   //     <div
//   //       style={{
//   //         display: "flex",
//   //         alignItems: "center",
//   //         justifyContent: "center",
//   //         height: "100vh",
//   //       }}
//   //     >
//   //       <Loader size={60} />
//   //     </div>
//   //   );
//   // }

//   return (
//     <>
//       {!hideLayout && <Header />}
//       {children}
//       {!hideLayout && <Footer />}
//     </>
//   );
// }
"use client";

import { usePathname } from "next/navigation";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";

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

  return (
    <>
      {!activeLayout.hideHeader && <Header />}
      <main>{children}</main>
      {!activeLayout.hideFooter && <Footer />}
    </>
  );
}
