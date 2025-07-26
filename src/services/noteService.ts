import axios from "axios";
import type { NoteData, NewNoteData } from "../types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";
const NOTES_ENDPOINT = "/notes";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${myKey}`,
  },
});

interface FetchNotesResp {
  page: number;
  notes: NoteData[];
  totalPages: number;
  perPage: number;
}

export const fetchNotes = async (query: string, page: number): Promise<FetchNotesResp> => {
  const params: { page: number; perPage: number; search?: string } = { page, perPage: 12 };
  if (query.trim()) params.search = query;

  const res = await axiosInstance.get<FetchNotesResp>(NOTES_ENDPOINT, { params });
  return res.data;
};

export const createNote = async (noteData: NewNoteData): Promise<NoteData> => {
  const res = await axiosInstance.post<NoteData>(NOTES_ENDPOINT, noteData);
  return res.data;
};

export const deleteNote = async (noteId: number): Promise<NoteData> => {
  const res = await axiosInstance.delete<NoteData>(`${NOTES_ENDPOINT}/${noteId}`);
  return res.data;
};