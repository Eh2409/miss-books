import { BookPreview } from "./BookPreview.jsx"

const { useState, useEffect, useRef } = React

export function BookList ({books,OnSetSelectedBookId,onRemoveBook,onEditBook}) {
  
    return(
        <section>
        <ul className='book-list clean-list'>
          {books.map(book=>{
            return <li key={book.id} className='book-preview'>
              <BookPreview book={book}/>
              <div className='book-btns flex'>
                <button onClick={()=>(OnSetSelectedBookId(book.id))}>book details</button>
                <button onClick={()=>(onRemoveBook(book.id))}>remove</button>
                <button onClick={()=>(onEditBook(book.id))}>edit</button>
              </div>
            </li>
          })}
        </ul>
        </section>
    )
}