export interface PostFrontmatter {
  title: string;
  date: string;
  updateOn?: string;
  tags?: string[];
  cover?: string[];
  draft?: boolean;
}