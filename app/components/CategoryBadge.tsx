"use client";

import { Category } from "../types/expense";

const COLOR_MAP: Record<Category, string> = {
  Food: "bg-orange-100 text-orange-700",
  Transportation: "bg-blue-100 text-blue-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Shopping: "bg-pink-100 text-pink-700",
  Bills: "bg-red-100 text-red-700",
  Other: "bg-gray-100 text-gray-700",
};

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${COLOR_MAP[category]}`}
    >
      {category}
    </span>
  );
}
