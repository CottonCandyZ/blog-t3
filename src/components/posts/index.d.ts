export interface PostFrontmatter {
  title: string;
  date: string;
  abstract?: string;
  updateOn?: string;
  tags?: string[];
  cover?: string[];
  draft?: boolean;
}