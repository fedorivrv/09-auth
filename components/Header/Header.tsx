import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation" className={css.navigation}>
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
        <ul className={css.navigation}>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}