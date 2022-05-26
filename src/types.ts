export type Item = {
  itemType: "image" | "video" | "note" | "task";
  title: string;
  content: string;
}