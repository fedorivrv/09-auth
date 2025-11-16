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
  const rawCategory = slugArr[0] ?? "all";

  const category =
    rawCategory === "all" || rawCategory === "" ? "All notes" : rawCategory;

  const title =
    category === "All notes" ? "Notes — All" : `Notes — ${category}`;

  const description =
    category === "All notes"
      ? "Browse all notes."
      : `Notes filtered by "${category}".`;

  const url = `${SITE_URL}notes/${rawCategory}`;

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
  const category = slug[0] === "all" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", tag: category, page: 1 }],
    queryFn: () => fetchNotes("", 1, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
}
