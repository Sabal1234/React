// App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import { Sidebar } from "./components/SideBar.jsx";
import { CreateGroupModal } from "./components/CreateGroupModel.jsx";
import { NoteList } from "./components/NoteList";

function App() {
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem("pocket-notes-groups");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newNoteText, setNewNoteText] = useState("");
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groupName, setGroupName] = useState("");

  
  useEffect(() => {
    localStorage.setItem("pocket-notes-groups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    if (selectedGroup) {
      localStorage.setItem("selected-group-id", selectedGroup.id);
    }
  }, [selectedGroup]);


  useEffect(() => {
    const id = localStorage.getItem("selected-group-id");
    if (id && groups.length > 0) {
      const group = groups.find((g) => g.id === Number(id));
      if (group) setSelectedGroup(group);
    }
  }, [groups]);

  const addGroup = (newGroup) => {
    if (newGroup.name.trim() === "") return;
    const groupToAdd = {
      id: Date.now(),
      name: newGroup.name,
      color: newGroup.color,
      notes: [],
    };
    setGroups([...groups, groupToAdd]);
  };

  const addNote = () => {
    if (newNoteText.trim() === "" || !selectedGroup) return;

    const newNote = {
      id: Date.now(),
      text: newNoteText,
      createdAt: new Date().toLocaleString(),
    };

    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id
        ? { ...group, notes: [...group.notes, newNote] }
        : group
    );

    setGroups(updatedGroups);
    setSelectedGroup(updatedGroups.find((g) => g.id === selectedGroup.id));
    setNewNoteText("");
  };

  return (
    <div className="app-container">
      <Sidebar
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        setIsCreatingGroup={setIsCreatingGroup}
      />

      <div className="content">
        {selectedGroup ? (
          <>
            <h3>{selectedGroup.name}</h3>
            <textarea
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Write a new note..."
              className="note-textarea"
            />
            <button className="add-note-btn" onClick={addNote}>
              Add Note
            </button>
            <NoteList notes={selectedGroup.notes} />
          </>
        ) : (
          <>
            <img
              src="image.png"
              className="Image"
              style={{
                height: "20rem",
                width: "20rem",
                marginTop: "10rem",
                marginLeft: "25rem",
              }}
              alt="Pocket Notes"
            />
            <h1 style={{ textAlign: "center" }}>Pocket Notes</h1>
            <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
              Send and receive messages without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
            </p>
          </>
        )}
      </div>

      {isCreatingGroup && (
        <CreateGroupModal
          groupName={groupName}
          setGroupName={setGroupName}
          addGroup={addGroup}
          setIsCreatingGroup={setIsCreatingGroup}
        />
      )}
    </div>
  );
}

export default App;
