"use client";

import { useState } from "react";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { RegisterLoginData } from "@/types/user";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const userData = Object.fromEntries(
        formData
      ) as unknown as RegisterLoginData;
      const user = await login(userData);
      if (user) {
        setUser(user);
        router.push("/profile");
      }
    } catch {
      setError("Oops... some error");
    }
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}