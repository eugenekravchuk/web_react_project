export interface ArticleType {
  imageSrc: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  label: string;
  id: string;
}

export interface PodcastType {
  episode: string;
  title: string;
  date: string;
  duration: string;
  imageSrc: string;
}

export interface AuthorType {
  id?: string;
  name: string;
  imageSrc: string;
  job: string;
  city: string;
  bold_info: string;
  info: string;
}
