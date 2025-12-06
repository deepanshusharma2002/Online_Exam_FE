"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.scss";

export default function NavLink({ setMenuOpen, href, children }) {
    const path = usePathname();
    const isActive = path === href;
    const handleClick = () => {
        if (setMenuOpen) {
            setMenuOpen(false);
        }
    };

    return (
        <Link href={href} onClick={handleClick} className={isActive ? styles.active : ''}>{children}</Link>
    );
}