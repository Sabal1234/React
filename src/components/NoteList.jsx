
export const NoteList = ({ notes }) => {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note.id} className="note-item">
              <small className="note-timestamp"> {note.createdAt}</small>
          <p>{note.text}</p>
      
        </div>
      ))}
    </div>
  );
};