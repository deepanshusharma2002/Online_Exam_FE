import React from "react";
import Link from "next/link";
import style from "./index.module.scss";

const JobsChip = ({ title, url }) => {
  return (
    <div className={style.chipWrapp}>
      <Link href={url || "#"} target="_blank" rel="noopener noreferrer">
        <p>{title || "UKPSC Pre Online Form 2025"}</p>
      </Link>
    </div>
  );
};

export default JobsChip;