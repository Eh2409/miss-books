import { BookPreview } from "./BookPreview.jsx"

const { useState, useEffect, useRef } = React

export function BookList ({books,OnSetSelectedBookId}) {
  
    return(
        <section>
        <ul className='book-list clean-list'>
          {books.map(book=>{
            return <li key={book.id} className='book-preview'>
              <BookPreview book={book}/>
              <div className='book-btns'>
                <button onClick={()=>(OnSetSelectedBookId(book.id))}>book details</button>
              </div>
            </li>
          })}
        </ul>
        </section>
    )
}