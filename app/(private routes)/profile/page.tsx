
import Link from "next/link";
import css from "./ProfilePage.module.css"
import Image from 'next/image';
import { IMG_URL, SITE_URL } from "@/lib/constants";
import { Metadata } from "next";
import { getMe } from "@/lib/api/serverApi";


export const metadata: Metadata = {
  title: "User Profile | NoteHub",
  description: "View and manage your NoteHub profile. Update personal details, view account information, and manage your notes in one place.",
  openGraph: {
    title: "User Profile | NoteHub",
    description:
      "Manage your NoteHub account settings and profile information. Stay organized and productive with NoteHub.",
    url: SITE_URL+"/profile",

    images: [
      {
        url: IMG_URL,
        width: 1200,
        height: 630,
        alt: "NoteHub — online note-taking app",
      },
    ],
  },
};

export default async function Profile() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          {user.avatar && (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          )}
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}