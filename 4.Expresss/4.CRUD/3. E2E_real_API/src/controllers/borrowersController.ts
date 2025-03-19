import asyncHandler from "../middlewares/asyncHandler";


export const BorrowBook = asyncHandler(
  async (req, res) => {
    // implement borrowing logic here
    // validate book id and user id
    // check if the book is available
    // update the book status
    // update the user's borrowed books list
    // return success message
    // handle any errors
    const {user_id,book_id,librarian_id,return_Date}=req.body
  }
)