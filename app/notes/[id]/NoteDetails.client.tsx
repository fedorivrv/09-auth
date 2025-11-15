"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import css from "./NoteDetails.client.module.css";

export default function NoteDetailsClient() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id as string),
    refetchOnMount: false,
    enabled: !!id,
  });

  return (
    <>
      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Something went wrong.</p>}
      {data && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data.title}</h2>
            </div>
            <p className={css.content}>{data.content}</p>
            <p className={css.date}>{data.createdAt}</p>
          </div>
        </div>
      )}
    </>
  );
}
