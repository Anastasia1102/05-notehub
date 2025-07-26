import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery,keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  return [isOpen, () => setIsOpen(true), () => setIsOpen(false)] as const;
};

export default function App() {
  const [isModalOpen, openModal, closeModal] = useToggle();
  const [searchQuery, setSearchQuery] = useState("");
  const updateSearchQuery = useDebouncedCallback(setSearchQuery, 300);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", searchQuery, page],
    queryFn: () => fetchNotes(searchQuery, page),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={searchQuery} onSearch={updateSearchQuery} />
          {data && data.totalPages > 1 && (
            <Pagination totalPages={data.totalPages} page={page} setPage={setPage} />
          )}
          <button className={css.button} onClick={openModal}>Create note +</button>
        </header>
        {isLoading && <strong className={css.loading}>Loading notes...</strong>}
        {data && !isLoading && <NoteList notes={data.notes} />}
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} onCancel={closeModal} />
        </Modal>
      )}
    </>
  );
}