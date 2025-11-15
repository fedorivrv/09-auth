"use client";
import { useState } from "react";
import css from "./page.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";


import Error from "./error";
import Loading from "@/app/loading";
import Link from "next/link";
interface NotesClientProps {
  category: string | undefined;
}
export default function NotesClient({ category }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["notes", { search: topic, tag: category, page: page }],
    queryFn: () => fetchNotes(topic, page, category),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });



  const handleSearch = useDebouncedCallback((topic: string) => {
    setTopic(topic);
    setPage(1);
  }, 1000);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} searchQuery={topic} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages}
            currentPage={page}
            onPageChange={(page) => setPage(page)}
          />
        )}
        <Link href="/notes/action/create" className={css.button} > Create note +</Link>
      </header>
      {isLoading && <Loading />}
      {isError && <Error error={error} />}
      {data && <NoteList notes={data.notes} />}
    </div>
  );
}