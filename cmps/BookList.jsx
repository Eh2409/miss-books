import { BookPreview } from "./BookPreview.jsx"

const { useState, useEffect, useRef } = React
const {Link , NavLink} = ReactRouterDOM

export function BookList ({books,onRemoveBook,onSetIsRemoveBookload,isRemoveBookload}) {
 
    return(
        <section>
        <ul className='book-list clean-list'>
          {books.map(book=>{
            return <li key={book.id} className='book-preview'>
              <BookPreview book={book}/>
              <div className='book-btns flex'>
                
                <button><Link to={`/books/${book.id}`}>book details</Link></button>
                <button onClick={()=>{onRemoveBook(book.id);onSetIsRemoveBookload(book.id)}}>
                  {isRemoveBookload === book.id ? <div className='mini-loader'></div> : 'remove'}</button>
                <button><Link to={`/books/book-edit/${book.id}`}>edit</Link></button>
              </div>
            </li>
          })}
        </ul>
        </section>
    )
}