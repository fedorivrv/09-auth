import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/serverApi";
import { SITE_URL, IMG_URL } from "@/lib/constants";

interface NotePageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const slugArr = slug ?? ["all"];
  const rawTag = slugArr[0] ?? "all";

  const tagLabel = rawTag === "all" || rawTag === "" ? "All notes" : rawTag;

  const title = tagLabel === "All notes" ? "Notes — All" : `Notes — ${tagLabel}`;

  const description =
    tagLabel === "All notes"
      ? "Browse all notes."
      : `Notes filtered by "${tagLabel}".`;

  const url = `${SITE_URL}notes/${rawTag}`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: IMG_URL,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;

  const queryClient = new QueryClient();


  const tag = slug[0] === "all" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", tag, page: 1 }],
    queryFn: () => fetchNotes("", tag, 1), 
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} /> 
    </HydrationBoundary>
  );
}
