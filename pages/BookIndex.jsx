
import { BookDetails } from '../cmps/BookDetails.jsx';
import { BookList } from '../cmps/BookList.jsx';
import { bookSerevice } from '../services/books.service.js'

const { useState, useEffect, useRef } = React

export function BookIndex (props) {

  const [books, setBooks] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)
  console.log(books);
  console.log(selectedBookId);
  
  
  useEffect(()=>{
      laodBooks()
  },[])

  function OnSetSelectedBookId(bookId) {
    setSelectedBookId(bookId)
  }

  function laodBooks() {
    bookSerevice.query()
    .then(books => setBooks(books))
  }

  if (!books) return 'loading...'
  return(
    <section>
        <h2>books</h2>
        {selectedBookId
         ? <BookDetails selectedBookId={selectedBookId} OnSetSelectedBookId={OnSetSelectedBookId}/> 
         : <BookList books={books} OnSetSelectedBookId={OnSetSelectedBookId}/>} 

    </section>
  )
}