import { FormValues, Note } from "@/types/note";
import { CheckSession, nextServer, NotesHttpResponse } from "./api";
import { RegisterLoginData, User } from "@/types/user";

export const fetchNotes = async (
  topic: string,
  page: number,
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> => {
  const response = await nextServer.get<NotesHttpResponse>("/notes", {
    params: {
      search: topic,
      perPage: 12,
      tag,
      page,
    },
  });
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);

  return response.data;
};
export const createNote = async (note: FormValues): Promise<Note> => {
  const response = await nextServer.post<Note>(`/notes`, note);

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);

  return response.data;
};

export const register = async (registerData: RegisterLoginData) => {
  const { data } = await nextServer.post<User>(`/auth/register`, registerData);
  return data;
};
export const login = async (loginData: RegisterLoginData) => {
  const { data } = await nextServer.post<User>(`/auth/login`, loginData);
  return data;
};

export const logout = async () => {
  const { data } = await nextServer.post(`/auth/logout`);
  return data;
};

interface EditProfile {
  email: string;
  username: string;
}

export const updateProfile = async (editUser: EditProfile) => {
  const { data } = await nextServer.patch<User>(`/users/me`, editUser);
  return data;
};
export const checkSession = async () => {
  const res = await nextServer.get<CheckSession>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};