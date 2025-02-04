import { BookPreview } from "./BookPreview.jsx"

const { useState, useEffect, useRef } = React

export function BookList ({books}) {
  
    return(
        <section>
        <ul className='book-list clean-list'>
          {books.map(book=>{
            return <li key={book.id} className='book-preview'>
              <BookPreview book={book}/>
            </li>
          })}
        </ul>
        </section>
    )
}