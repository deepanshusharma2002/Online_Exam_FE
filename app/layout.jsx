import React from "react";
import "@/styles/global.scss";
import "./slick.css";
import ConditionalLayout from "./ConditionalLayout";

export const metadata = {
  title: "Job Portal",
  description: "Job Portal",
  // other: {
  //   "google-site-verification": "X0u6l-Br75HnrXhf4UlKLYCKdH3vfqSHpRq-97GpbWE",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Add meta tag directly inside <head> (for immediate effect) */}
        <meta
          name="google-site-verification"
          content="X0u6l-Br75HnrXhf4UlKLYCKdH3vfqSHpRq-97GpbWE"
        />
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
