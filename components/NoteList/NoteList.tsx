import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

import { useId } from "react";
import { deleteNote } from "@/lib/api";
import Link from "next/link";
interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const id = useId();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        return (
          <li key={`${id}${note.id}`} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`}>View details</Link>
              <button
                className={css.button}
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
