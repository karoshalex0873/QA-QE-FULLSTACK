import Navigation from "../componets/Navigation"

const landing = () => {
  return (
    <>
    {/* landig page of bookStore app */}
    <div className="border-2">
      <div>
        {/* Navigation goes here */}
        <Navigation/>
        <h1>Welcome to the Book Store!</h1>
        <p>Select a book from the menu to get started.</p>
      </div>
    </div>
    </>
  )
}

export default landing