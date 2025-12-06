import React from "react";
import "@/styles/global.scss";
import "./slick.css";
import ConditionalLayout from "./ConditionalLayout";

export const metadata = {
  title: "Online Exam",
  description: "Online Exam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
