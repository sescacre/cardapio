"use client";

import Form from "next/form";
import styles from "./Header.module.css";
import logoutAction from "./logoutAction";

export default function LogoutButton() {
  return (
    <Form action={logoutAction} className={styles.logout}>
      <button className={styles.logoutButton} type="submit">
        Sair
      </button>
    </Form>
  );
}
