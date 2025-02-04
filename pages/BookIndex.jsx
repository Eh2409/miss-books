
import { BookList } from '../cmps/BookList.jsx';
import { bookSerevice } from '../services/books.service.js'

const { useState, useEffect, useRef } = React

export function BookIndex (props) {

  const [books, setBooks] = useState(null)
  console.log(books);
  

  useEffect(()=>{
      laodBooks()
  },[])

  function laodBooks() {
    bookSerevice.query()
    .then(books => setBooks(books))
  }

  if (!books) return 'loading...'
  return(
    <section>
        <h2>books</h2>
        <BookList books={books}/>
    </section>
  )
}