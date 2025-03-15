export type BookInformationType = {
  bookid: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  publisher: string;
  description: string;
  price: number;
  image: string;
};

export interface LoginResponse {
  message?: string;
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role:string
  };
}

export interface BookFormData {
  bookId: string;
  title: string;
  author: string;
  genre: string;
  year?: number;
  pages?: number;
  publisher: string;
  price?: number;
  description: string;
  image: string;
  pdf: string;
  user_id: string;
};

export interface UserType {
  user_id: string;
  name: string;
  email: string;
  role_name: string;
  created_at: string;
}