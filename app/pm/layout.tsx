"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./pm.module.scss";

export default function PmLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.brand}>Property Management</div>
        <div className={styles.links}>
          <Link
            className={isActive("/pm/properties") ? styles.active : ""}
            href="/pm/properties"
          >
            Properties
          </Link>
          <Link
            className={isActive("/pm/tenants") ? styles.active : ""}
            href="/pm/tenants"
          >
            Tenants
          </Link>
        </div>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
