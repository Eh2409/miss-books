import { BookFilter } from '../cmps/BookFilter.jsx';
import { BookList } from '../cmps/BookList.jsx';
import { Loader } from '../cmps/Loader.jsx';
import { bookSerevice } from '../services/books.service.js'

const { useState, useEffect, useRef } = React
const { Link} = ReactRouterDOM

export function BookIndex (props) {

  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState({...bookSerevice.getDefaultFilterBy()})
  const [isRemoveBookload, setIsRemoveBookload] = useState(null)

  // console.log(books);
  // console.log(selectedBookId);
  console.log(filterBy);

  const removeBtnRef = useRef()
  

  useEffect(()=>{
      laodBooks()
  },[filterBy])


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

  function onSetIsRemoveBookload(id) {
    console.log(id);
    setIsRemoveBookload(id)
  }

  if (!books) return <Loader/>
  return(
    <section>
      <button><Link to='/books/book-add'>Add Book</Link></button>
      <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
      {books.length > 0 ? <BookList books={books} onRemoveBook ={onRemoveBook} onSetIsRemoveBookload={onSetIsRemoveBookload} isRemoveBookload={isRemoveBookload}/> 
      : <h2 className ='book-not-found flex justify-center align-center'>Sorry, the book you were looking for is not found.</h2>}
    </section>
  )
}