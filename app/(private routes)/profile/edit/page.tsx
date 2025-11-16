"use client";

import { getMe, updateProfile } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { isAxiosError } from "axios";
import { User } from "@/types/user";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfile() {
  const [userEdit, setUserEdit] = useState<User | null>(null);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        if (data) {
          setUserEdit(data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleCancel = () => {
    router.back();
  };
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (formData: FormData) => {
    try {
      const username = formData.get("username") as string;

      if (userEdit?.email) {
        const updatedUser = await updateProfile({
          email: userEdit?.email,
          username: username,
        });

        setUser(updatedUser);

        router.push("/profile");
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        {userEdit?.avatar && (
          <Image
            src={userEdit?.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              id="username"
              type="text"
              className={css.input}
              defaultValue={userEdit?.username}
            />
          </div>

          <p>Email: {userEdit?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}