
import { BookDetails } from '../cmps/BookDetails.jsx';
import { BookFilter } from '../cmps/BookFilter.jsx';
import { BookList } from '../cmps/BookList.jsx';
import { bookSerevice } from '../services/books.service.js'

const { useState, useEffect, useRef } = React

export function BookIndex (props) {

  const [books, setBooks] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)

  const [filterBy, setFilterBy] = useState(bookSerevice.getFilterBy())

  // console.log(books);
  // console.log(selectedBookId);
  // console.log(filterBy);
  

  useEffect(()=>{
      laodBooks()
  },[filterBy])

  function OnSetSelectedBookId(bookId) {
    setSelectedBookId(bookId)
  }

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

  if (!books) return 'loading...'
  return(
    <section>
        <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
        {selectedBookId
         ? <BookDetails 
         selectedBookId={selectedBookId} OnSetSelectedBookId={OnSetSelectedBookId} /> 
         : <BookList books={books} OnSetSelectedBookId={OnSetSelectedBookId}
         onRemoveBook ={onRemoveBook}/>} 

    </section>
  )
}