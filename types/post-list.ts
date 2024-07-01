import { TFrontmatter } from "./frontmatter.type";

export type TPostListItem = {
  id: string;
  frontMatter: TFrontmatter;
};

export type TPostsByTag = {
  [tagName: string]: TPostListItem[];
};

export interface FrontMatter {
  title: string;
  summary: string;
  slug: string;
  date: string;
  image: string;
  authorName: string;
  categoryName: string;
  tags?: string[];  // Assuming tags are optional
}

export interface Article {
  id: string;
  frontMatter: FrontMatter;
}