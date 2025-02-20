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
  const [displayType, setDisplayType] = useState('list')


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

  function onSetDisplayType(type) {
    setDisplayType(type)
  }

  if (!books) return <Loader />
  return (
    <section>

      <div className='filter-wrapper'>
        <div className='books-btns'>
          <button className='add-book-btn' ><Link to='/books/book-add'>Add Book</Link></button>
          <div>display:</div>
          <button className={`fa list ${displayType === 'list' ? 'active' : ''}`} onClick={() => onSetDisplayType('list')}></button>
          <button className={`fa table ${displayType === 'table' ? 'active' : ''}`} onClick={() => onSetDisplayType('table')}></button>
        </div>
        <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} defaultFilterBy={bookSerevice.getDefaultFilterBy()} />
      </div>

      <DynamicDisplay
        displayType={displayType}
        books={books}
        onRemoveBook={onRemoveBook}
        onSetIsRemoveBookload={onSetIsRemoveBookload}
        isRemoveBookload={isRemoveBookload}
      />
    </section >
  )
}


function DynamicDisplay({ displayType, books, ...props }) {

  if (books.length > 0 && displayType === 'list') {
    return <BookList books={books} {...props} />
  } else if (books.length > 0 && displayType === 'table') {
    return <BookTable books={books} {...props} />
  } else if (books.length <= 0) {
    return <h2 className='book-not-found flex justify-center align-center'>Sorry, the book you were looking for is not found.</h2>
  } else {
    return null
  }
}