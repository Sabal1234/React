export const Sidebar = ({ groups, selectedGroup, setSelectedGroup, setIsCreatingGroup }) => {
  return (
    <div className="sidebar">
      <h2>Pocket Notes</h2>
      <button className="create-group-btn" onClick={() => setIsCreatingGroup(true)}>
        + Create Notes Group
      </button>
      <ul className="group-list">
        {groups.map((group) => (
          <li
            key={group.id}
            className={`group-item ${selectedGroup?.id === group.id ? "active" : ""}`}
            onClick={() => setSelectedGroup(group)}
          >
       
            <div
              className="group-initial-circle"
              style={{ backgroundColor: group.color }} 
            >
              {group.name.charAt(0).toUpperCase()}
            </div>
            <span className="group-name">{group.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};