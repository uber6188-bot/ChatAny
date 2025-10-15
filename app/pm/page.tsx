"use client";
import Link from "next/link";
import styles from "./pm.module.scss";

export default function PmHome() {
  return (
    <div className={styles.landing}>
      <h1>Property Management</h1>
      <p>Manage properties and tenants. Choose a module to begin.</p>
      <div className={styles.cards}>
        <Link className={styles.card} href="/pm/properties">
          <h3>Properties</h3>
          <p>Create, edit, and organize properties.</p>
        </Link>
        <Link className={styles.card} href="/pm/tenants">
          <h3>Tenants</h3>
          <p>Manage tenant details and leases.</p>
        </Link>
      </div>
    </div>
  );
}
