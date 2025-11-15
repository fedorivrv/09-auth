import axios from "axios";
import type { FormValues, Note } from "../types/note";

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  topic: string,
  page: number,
  tag?: string,

): Promise<{ notes: Note[]; totalPages: number }> => {
  const response = await axios.get<NotesHttpResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        search: topic,
        perPage: 12,
        tag,
        page,
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        accept: "application/json",
      },
    }
  );
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
};

export const createNote = async (note: FormValues): Promise<Note> => {
  const response = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    note,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        Accept: "application/json",
      },
    }
  );

  return response.data;
};
export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        Accept: "application/json",
      },
    }
  );

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  return response.data;
};
