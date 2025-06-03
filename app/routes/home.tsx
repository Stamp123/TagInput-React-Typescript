import { useState } from "react";
import type { Route } from "./+types/home";
import TagInput from "~/tag-input/tag-input";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Tag Input" }];
}

export default function Home() {
    const [arrayData, setArrayData] = useState<string[]>([]);

  return (
    <TagInput
    arrayData={arrayData}
     setArrayData={setArrayData}
     maxTagLength={5}
     placeholder="Placeholder"
     separators={["Enter", ","]}
    />
  );
}
