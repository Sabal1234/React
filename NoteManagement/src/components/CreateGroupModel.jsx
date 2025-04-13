import React, { useState } from "react";

export const CreateGroupModal = ({ groupName, setGroupName, addGroup, setIsCreatingGroup }) => {
  const [selectedColor, setSelectedColor] = useState("#007bff"); 


  const colors = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6c757d"];

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create New Group</h3>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          className="modal-input"
        />

        <div className="color-selection">
          <p>Choose a color:</p>
          <div className="color-options">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`color-circle ${selectedColor === color ? "selected" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
              ></div>
            ))}
          </div>
        </div>


        <div className="modal-buttons">
          <button
            className="modal-btn"
            onClick={() => {
              if (groupName.trim()) {
                addGroup({ name: groupName, color: selectedColor }); 
                setIsCreatingGroup(false);
              }
            }}
          >
            Create
          </button>
          <button className="modal-btn cancel-btn" onClick={() => setIsCreatingGroup(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};