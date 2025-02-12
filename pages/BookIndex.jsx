
// import { BookDetails } from '../cmps/BookDetails.jsx';
import { BookEdit } from '../cmps/BookEdit.jsx';
import { BookFilter } from '../cmps/BookFilter.jsx';
import { BookList } from '../cmps/BookList.jsx';
import { Loader } from '../cmps/Loader.jsx';
import { bookSerevice } from '../services/books.service.js'

const { useState, useEffect, useRef } = React
const { Link} = ReactRouterDOM

export function BookIndex (props) {

  const [books, setBooks] = useState(null)
  // const [selectedBookId, setSelectedBookId] = useState(null)
  const [editBookId, setEditBookId] = useState(null)

  const [filterBy, setFilterBy] = useState(bookSerevice.getFilterBy())

  console.log(books);
  // console.log(selectedBookId);
  // console.log(filterBy);
  

  useEffect(()=>{
      laodBooks()
  },[filterBy])


  // function OnSetSelectedBookId(bookId) {
  //   setSelectedBookId(bookId)
  // }

  function onSetFilterBy(updateFilterBy) {
    setFilterBy({...updateFilterBy})
  }

  function laodBooks() {
    bookSerevice.query(filterBy)
    .then(books => setBooks(books))
  }

  function onRemoveBook(bookId) {
    bookSerevice.remove(bookId)
    .then(res=>setBooks(books => books.filter(book=>book.id !== bookId)))
  }

  function onEditBook(bookId) {
    setEditBookId(bookId)
  }

  function onSetSevedBook(book) {
    bookSerevice.save(book)
    .then(savedBook => setBooks(prev =>{
      var idx = prev.findIndex(prebook => prebook.id === savedBook.id)
      if (idx<0) {
        return [...prev,book]
      } else{
        return prev.map((book,currIdx)=> currIdx === idx ? savedBook : book)
      }
    }))
    .finally(setEditBookId(null))
  }

  if (!books) return <Loader/>
  return(
    <section>
      <button><Link to='/books/book-add'>Add Book</Link></button>
      <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
      {books.length > 0 ? <BookList books={books} onRemoveBook ={onRemoveBook} onEditBook={onEditBook}/> 
      : <h2 className ='book-not-found flex justify-center align-center'>Sorry, the book you were looking for is not found.</h2>}
      {editBookId && <BookEdit onEditBook={onEditBook} editBookId={editBookId} onSetSevedBook={onSetSevedBook} />}
          {/* {selectedBookId ? 
      (<BookDetails selectedBookId={selectedBookId}OnSetSelectedBookId={OnSetSelectedBookId}/> )
      :(books.length > 0 ? (<BookList books={books} OnSetSelectedBookId={OnSetSelectedBookId} onRemoveBook ={onRemoveBook} onEditBook={onEditBook}/> )
      :(<h2 className ='book-not-found flex justify-center align-center'>Sorry, the book you were looking for is not found.</h2>)
      )}  */}

    </section>
  )
}