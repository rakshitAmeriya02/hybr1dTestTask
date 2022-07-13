interface Hit {
  author: string;
  comment_text: string | null;
  created_at: string;
  created_at_i: number;
  num_comments: number;
  objectID: string;
  parent_id: string | null;
  points: number;
  relevancy_score: number;
  story_id: string | null;
  story_text: string | null;
  story_title: string | null;
  story_url: string | null;
  title: string;
  url: string;
}

export interface SearchResult {
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  hits: Hit[];
  hitsPerPage: number;
  nbHits: number;
  nbPages: number;
  page: number;
  params: string;
  processingTimeMS: number;
  query: string;
}

export interface Story {
  author: string;
  children: Story[];
  created_at: string;
  created_at_i: number;
  id: number;
  options: [];
  parent_id: number | null;
  points: number;
  story_id: number | null;
  text: string;
  title: string;
  type: string | null;
  url: string;
}
