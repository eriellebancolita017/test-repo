import React, { useState, useRef, useEffect } from "react";

const CustomTagInput: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag();
    } else if (event.key === "Backspace" && !inputValue) {
      // Remove the last tag if the input is empty and Backspace is pressed
      setTags(tags.slice(0, -1));
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  // Focus the input when the wrapper div is clicked
  useEffect(() => {
    inputRef.current?.focus();
  }, [tags]);

  return (
    <div
      className=" h-10 flex items-center flex-wrap px-3 rounded-md border border-slate-200 w-full dark:bg-[rgb(18,18,18)] dark:border-slate-700"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex mr-1 items-center bg-primaryMain text-white px-3 py-0 rounded-md"
        >
          {tag}
          <button
            onClick={() => handleRemoveTag(index)}
            className="ml-2 text-white hover:text-red-400"
          >
            &times;
          </button>
        </div>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Seprate options with a comma"
        className="flex-grow min-w-[100px] bg-transparent outline-none"
      />
    </div>
  );
};

export default CustomTagInput;
