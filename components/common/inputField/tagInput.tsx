import React, { useState } from "react";

const TagInput: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior like form submission
      addTag(); // Call addTag function to add the new tag
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "10px",
        }}
      >
        {tags.map((tag, index) => (
          <div
            key={index}
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#e0e0e0",
              padding: "5px 10px",
              borderRadius: "20px",
            }}
          >
            <span>{tag}</span>
            <button
              onClick={() => handleRemoveTag(index)}
              style={{
                background: "none",
                border: "none",
                marginLeft: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type something and press Enter"
        style={{
          padding: "10px",
          width: "100%",
          boxSizing: "border-box",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default TagInput;
