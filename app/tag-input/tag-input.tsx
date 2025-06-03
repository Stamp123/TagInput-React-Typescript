import { useRef, useState } from "react";

const TagInput = () => {
  const maxTagLength = 5;
  const tagInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tagInput, setTagInput] = useState("");
  const [arrayData, setArrayData] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const CheckSomeMaxTag = (textTag: string) => {
    const checkSome = arrayData.some((item) => item === textTag);
    const CheckSomeMaxTag = arrayData.length < maxTagLength;
    if(!checkSome && CheckSomeMaxTag){
      setArrayData((prevArray) => [...prevArray, textTag]);
      setTagInput("");
    } else {
      setTagInput("");
    }
  };

  const handleChange = (e: any) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      CheckSomeMaxTag(tagInput)
    }
  };

  const handleDelete = (index: number) => {
    const updatedArray = [...arrayData];
    updatedArray.splice(index, 1);
    setArrayData(updatedArray);
  };

  const handleClick = () => {
    tagInputRef.current?.focus();
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    if (tagInput.trim()) {
       CheckSomeMaxTag(tagInput)
    }
  };

  return (
    <div className="flex flex-col justify-center items-start h-screen w-screen px-110">
      <h1 className="text-lg font-medium mb-2">Tag Input</h1>
      <div
        ref={containerRef}
        onClick={handleClick}
        className={` ${
          isFocused
            ? "border-yellow-500 ring-1 ring-yellow-500"
            : "border-gray-300"
        } flex flex-wrap gap-1 w-full border rounded px-3 py-2 bg-white cursor-text`}
      >
        {arrayData.map((item, index) => (
          <div
            key={index}
            className="flex gap-1 pl-3 text-gray-800 items-center bg-gray-300 rounded"
          >
            <p>{item}</p>
            <button className="p-2" onClick={() => handleDelete(index)}>
              X
            </button>
          </div>
        ))}
        <input
          ref={tagInputRef}
          type="text"
          placeholder={arrayData.length === 0 ? "Placeholder" : ""}
          value={tagInput}
          className="border-white border-2 flex-1 min-w-[120px] outline-none bg-transparent text-gray-900 placeholder-gray-400"
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleChange}
          onBlur={handleInputBlur}
          onFocus={() => setIsFocused(true)}
        />
      </div>
      {/* {arrayData.length === maxTagLength && (
        <p className="text-red-400">จํานวน Tag ไม่เกิน {maxTagLength} Tag</p>
      )} */}
    </div>
  );
};

export default TagInput;
