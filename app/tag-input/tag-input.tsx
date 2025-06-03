import { useRef, useState } from "react";

interface TagInputProps {
  arrayData: string[];
  setArrayData: React.Dispatch<React.SetStateAction<string[]>>;
  maxTagLength: number | undefined;
  placeholder?: string;
  separators?: string[];
}


const TagInput = (props: TagInputProps) => {

  const tagInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tagInput, setTagInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const CheckSomeMaxTag = (textTag: string) => {
    const trimmedTextTag = textTag.trim();
    const checkSome = props.arrayData.some((item) => item === trimmedTextTag);
    const CheckSomeMaxTag = props.arrayData.length < (props.maxTagLength ?? Infinity);
    if(!checkSome && CheckSomeMaxTag && trimmedTextTag) {
      props.setArrayData((prevArray) => [...prevArray, textTag]);
      setTagInput("");
    } else {
      setTagInput("");
    }
  };

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const checkSeparator = props.separators?.some((item) => item === e.key);
    if (checkSeparator || e.key === "Enter") {
      e.preventDefault();
      CheckSomeMaxTag(tagInput)
    } 
  };

  const handleDelete = (index: number) => {
    const updatedArray = [...props.arrayData];
    updatedArray.splice(index, 1);
    props.setArrayData(updatedArray);
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
    <div>
      <div
        ref={containerRef}
        onClick={handleClick}
        className={` ${
          isFocused
            ? "border-red-500 ring-1 ring-red-500"
            : "border-gray-300"
        } flex flex-wrap gap-1 w-full border rounded px-3 py-2 bg-white cursor-text`}
      >
        {props.arrayData.map((item, index) => (
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
          placeholder={props.arrayData.length === 0 ? props.placeholder : ""}
          value={tagInput}
          className="border-white border-2 flex-1 min-w-[120px] outline-none bg-transparent text-gray-900 placeholder-gray-400"
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleChange}
          onBlur={handleInputBlur}
          onFocus={() => setIsFocused(true)}
        />
      </div>
        <p className="text-red-400">จำนวน Tag ไม่เกิน {props.arrayData.length} / {props.maxTagLength} Tag</p>  
    </div>
  );
};

export default TagInput;
