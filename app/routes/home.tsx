import type { Route } from "./+types/home";
import  TagInput  from "~/tag-input/tag-input";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <TagInput />;
}
