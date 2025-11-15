import { Note } from "@/types/note";
import { cookies } from "next/headers";
import { CheckSession, nextServer, NotesHttpResponse } from "./api";
import { User } from "@/types/user";

export const getMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>(`/users/me`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNotes = async (
  topic: string,
  page: number,
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<NotesHttpResponse>("/notes", {
    params: {
      search: topic,
      perPage: 12,
      tag,
      page,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSession>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};