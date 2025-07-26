
export interface NoteData{
    id: number;
    title: string;
    content: string;
    tag: NoteTag;
}

export interface NewNoteData{
    title: string;
    content?: string;
    tag: NoteTag;
}

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

