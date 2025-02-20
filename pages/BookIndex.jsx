import { BookFilter } from '../cmps/BookFilter.jsx';
import { BookList } from '../cmps/BookList.jsx';
import { BookTable } from '../cmps/BookTable.jsx';
import { Loader } from '../cmps/Loader.jsx';
import { bookSerevice } from '../services/books.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect, useRef } = React
const { Link, useSearchParams } = ReactRouterDOM

export function BookIndex() {


  const [searchParams, setSearchParams] = useSearchParams()

  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState({ ...bookSerevice.getFilterFromSearchParams(searchParams) })
  const [isRemoveBookload, setIsRemoveBookload] = useState(null)


  // console.log(books);
  // console.log(selectedBookId);
  // console.log(filterBy);


  useEffect(() => {
    setSearchParams(filterBy)
    laodBooks()
  }, [filterBy])


  function onSetFilterBy(updateFilterBy) {
    setFilterBy({ ...updateFilterBy })
  }

  function laodBooks() {
    bookSerevice.query(filterBy)
      .then(books => setBooks(books))
      .catch(error => console.error(error))
  }

  function onRemoveBook(bookId) {
    bookSerevice.remove(bookId)
      .then(res => setBooks(books => books.filter(book => book.id !== bookId)))
      .then(() => showSuccessMsg('The book was successfully removed'))
      .catch(() => showErrorMsg('Failed to remove the book'))
  }

  function onSetIsRemoveBookload(id) {
    setIsRemoveBookload(id)
  }

  // function onResetFilterBy() {
  //   setSearchParams({})
  // }


  if (!books) return <Loader />
  return (
    <section>
      <button><Link to='/books/book-add'>Add Book</Link></button>
      <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} defaultFilterBy={bookSerevice.getDefaultFilterBy()} />
      {/* {books.length > 0 ? <BookList books={books} onRemoveBook={onRemoveBook} onSetIsRemoveBookload={onSetIsRemoveBookload} isRemoveBookload={isRemoveBookload} />
        : <h2 className='book-not-found flex justify-center align-center'>Sorry, the book you were looking for is not found.</h2>} */}
      {books.length > 0 ? <BookTable books={books} onRemoveBook={onRemoveBook} onSetIsRemoveBookload={onSetIsRemoveBookload} isRemoveBookload={isRemoveBookload} />
        : <h2 className='book-not-found flex justify-center align-center'>Sorry, the book you were looking for is not found.</h2>}
    </section>
  )
}