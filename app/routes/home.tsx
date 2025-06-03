import { useState } from "react";
import type { Route } from "./+types/home";
import TagInput from "~/tag-input/tag-input";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Tag Input" }];
}

export default function Home() {
  const [arrayData, setArrayData] = useState<string[]>([]);
  const [useMaxTagLength, setUseMaxTagLength] = useState(true);
  const [maxTagLength, setMaxTagLength] = useState(5);
  const [separatorInput, setSeparatorInput] = useState([
    "Enter",
    ",",
  ]);


  const handleChangeSeparatorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const separators = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    setSeparatorInput(separators);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen px-4 md:px-40 ">
      <div className="bg-white text-black p-6 rounded shadow w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Tag Input</h1>

        <div className="mb-6">
          <label className="flex items-center space-x-3 mb-2">
            <span className="text-lg font-medium">จำนวนแท็ก</span>
          </label>
          <input
            type="number"
            disabled={!useMaxTagLength}
            value={maxTagLength}
            onChange={(e) => setMaxTagLength(Number(e.target.value))}
            className={`w-full p-2 border border-gray-300 rounded ${
              useMaxTagLength ? "bg-transparent" : "bg-gray-500"
            }`}
            min={1}
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center space-x-3 mb-2">
            <span className="text-lg font-medium">กำหนด Separators</span>
          </label>
          <input
            type="text"
            value={separatorInput.join(",")}
            onChange={handleChangeSeparatorInput}
            placeholder="เช่น Enter,Tab,,"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="text-sm text-gray-500 mt-1">
            แยกแต่ละตัวด้วยเครื่องหมายจุลภาค (,) เช่น Enter,Tab,,;
          </p>
          <div className="mt-2">
            <span className="text-sm font-medium">ตัวแยกปัจจุบัน: </span>
            {separatorInput.map((sep, index) => (
              <span key={index} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-1">
                {sep}
              </span>
            ))}
          </div>
        </div>

        <TagInput
          arrayData={arrayData}
          setArrayData={setArrayData}
          maxTagLength={useMaxTagLength ? maxTagLength : undefined}
          separators={separatorInput}
          placeholder="placeholder..."
        />
      </div>
    </div>
  );
}
