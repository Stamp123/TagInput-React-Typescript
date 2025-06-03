import { useState } from "react";
import type { Route } from "./+types/home";
import TagInput from "~/tag-input/tag-input";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Tag Input" }];
}

export default function Home() {
  const [arrayData, setArrayData] = useState<string[]>([]);
  const [maxTagLength, setMaxTagLength] = useState(5);
  const [separatorInput, setSeparatorInput] = useState(["Enter", ","]);

  const handleChangeSeparatorInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const separators = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    setSeparatorInput(separators);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-indigo-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-600 to-green-600 p-8 text-white">
            <h1 className="text-4xl font-bold text-center mb-2">Tag Input</h1>
          </div>

          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  จำนวนแท็กสูงสุด
                </label>
              </div>

              <div className="relative">
                <input
                  type="number"
                  value={maxTagLength}
                  onChange={(e) => setMaxTagLength(Number(e.target.value))}
                  className={`w-full p-4 border-2 rounded-xl text-lg font-medium transition-all duration-300 bg-white border-gray-200 text-gray-800 focus:border-yellow-400 focus:shadow-lg`}
                     
           
                  min={1}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                กำหนด Separators
              </label>

              <div className="space-y-3">
                <input
                  type="text"
                  value={separatorInput.join(",")}
                  onChange={handleChangeSeparatorInput}
                  placeholder="เช่น Enter,Tab,,"
                  className="w-full p-4 border-2 border-gray-200 text-gray-800 rounded-xl text-lg focus:border-green-400 focus:shadow-lg transition-all duration-300"
                />
                <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border-l-4 border-yellow-400">
                  แยกแต่ละตัวด้วยเครื่องหมายจุลภาค (,) เช่น Enter,Tab,,;
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-4 rounded-xl border border-green-100">
                <span className="text-sm font-semibold text-gray-700 block mb-2">
                  ตัวแยกปัจจุบัน:
                </span>
                <div className="flex flex-wrap gap-2">
                  {separatorInput.map((sep, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full text-xs font-medium shadow-sm"
                    >
                      {sep === "Enter" ? "⏎ Enter" : sep}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                Tag Input
              </label>

              <div className="relative">
                <TagInput
                  arrayData={arrayData}
                  setArrayData={setArrayData}
                  maxTagLength={maxTagLength}
                  separators={separatorInput}
                  placeholder="placeholder..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
