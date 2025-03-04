export const fetchBooksFilter = async (queryParams:string= "") =>{
try {
  const response =await fetch(`http://localhost:3001/api/books/filter${queryParams}`,{
    method:"GET",
    headers:{
      "Content-Type": "application/json"
    }
  })

  if(!response.ok){
    throw new Error(`Failed to fecthc books`)
  }

  return await response.json()
  
} catch (error) {
  console.error("Error fecting events",error)
  return [];
}
}