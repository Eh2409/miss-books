
import {bookSerevice} from "../services/books.service.js";

const { useState, useEffect, useRef } = React

export function BookDetails ({selectedBookId,OnSetSelectedBookId}) {

    const [book, setBook] = useState(null)
    console.log(book);

    useEffect(()=>{
        onGetBook(selectedBookId)
    })

    function onGetBook(selectedBookId) {
        bookSerevice.get(selectedBookId)
        .then(book=>setBook(book))
    }

    if (!book) return 'loading...'

    const {title,description,thumbnail} = book
    const {amount} = book.listPrice

    return (
        <section className = 'book-details'>
            <div className='selected-book-content'>
            <h2><span>title: </span> {title}</h2>
            <h2><span>description: </span> {description}</h2>
            <h2><span>price: </span> ${amount}</h2>
            <button onClick={()=>(OnSetSelectedBookId(null))}>back</button>
            </div>
            <img src={`${thumbnail}`} alt={title} className='book-thumbnail'/>
        </section>
    )
}