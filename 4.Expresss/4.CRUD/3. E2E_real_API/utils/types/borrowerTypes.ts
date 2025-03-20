import { UserRequest } from "./userTypes";

export interface Borrower {
  borrower_id: number;
  user_id: string;
  copy_id: number;
  librarian_id: number;
  borrow_date: string;
  return_date: string;
  status: string;
}


export interface BorrowerRequest extends UserRequest {
  params: {
    borrower_id: string;
  };
}