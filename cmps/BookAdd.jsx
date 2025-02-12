import {bookSerevice} from "../services/books.service.js";
const { useState, useEffect, useRef } = React

export function BookAdd (props) {

    function onAddBook(ev) {
        const bookTitle = ev.target.previousSibling.textContent
    
        return bookSerevice.isBookInData(bookTitle)
        .then(res=> {
            if (res) return console.log('The book already exists in Data');
            
            const book = bookSerevice.getEmptyBook()
            book.title = bookTitle
            return bookSerevice.addGoogleBook(book)
            .then(res => console.log('The book has been successfully added to Data'))
            .catch(error=>console.error(error))
        })
        .catch(error=>console.error(error))
        
    }
  
    return (
        <section className='book-add'>
        <input type="search" />
        <ul>
            <li className='flex justify-between '>
                <span>Amazing Spider-Man Vol 6 #14</span>
                <button onClick ={onAddBook}>+</button>
                </li>
            <li className='flex justify-between '>
                <span>Fantastic Four Iron Man Big In Japan #2</span>
                <button onClick ={onAddBook}>+</button>
                </li>
            <li className='flex justify-between '>
                <span>Marvel Mutts #1</span>
                <button onClick ={onAddBook}>+</button>
                </li>
            <li className='flex justify-between '>
                <span>Marvel After-School Heroes Ghost-Spiders Unbreakable Mission TP</span>
                <button onClick ={onAddBook}>+</button>
                </li>
        </ul>
        </section>
    )
}