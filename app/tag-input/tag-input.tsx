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
    <div className="w-full mb-7">
      <div
        ref={containerRef}
        onClick={handleClick}
        className={`w-full p-4 border-2 ${isFocused ? "border-green-400 shadow-lg" : ""} border-gray-200 rounded-xl text-lg transition-all duration-300`}
      >
        {props.arrayData.map((item: string, index: number) => (
          <div
            key={index}
            className={`${index === props.arrayData.length - 1 ? "mt-3" : "mt-0"} inline-flex mr-2 items-center px-3 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full text-xs font-medium shadow-sm`}
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
        {props.maxTagLength && (
        <div className="absolute -bottom-8 right-0 text-lg text-gray-500">
          {props.arrayData.length}/{props.maxTagLength} tags
        </div>
      )}
    </div>
  );
};

export default TagInput;
