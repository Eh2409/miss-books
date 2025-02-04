const { useState, useEffect, useRef } = React

export function BookList ({books}) {
  
    return(
        <section>
        <ul>
          {books.map(book=>{
            return <li key={book.id}>
              <h4>{book.title}</h4>
            </li>
          })}
        </ul>
        </section>
    )
}