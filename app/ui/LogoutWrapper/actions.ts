"use server";

import { logout } from "@/app/data/auth";
import { SESSION_COOKIE } from "@/app/data/apiClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logoutAction() {
  console.log("🔁 ACTION - LOGOUT");

  try {
    await logout();
  } catch {
    // ignore API errors on logout
  }

  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);

  redirect("/login");
}
