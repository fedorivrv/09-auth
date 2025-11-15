"use client";
import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
  };
  if (isAuthenticated && user) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/notes/filter/all">Notes</Link>
        </li>
        <li className={css.navigationItem}>
          <Link href="/profile" prefetch={false} className={css.navigationLink}>
            Profile
          </Link>
        </li>
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user?.email}</p>
          <button onClick={handleLogout} className={css.logoutButton}>
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}