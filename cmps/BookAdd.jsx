import {bookSerevice} from "../services/books.service.js";
import { googleBookService } from '../services/google-books.service.js'
const { useState, useEffect, useRef } = React
const {Link} = ReactRouterDOM

export function BookAdd (props) {

    const [booksRes, setBooksRes] = useState(null)
    const [isLoad, setIsLoad] = useState(false)
    console.log(booksRes)
    console.log(isLoad)

    function onAddBook(book) {
        return bookSerevice.isBookInData(book)
        .then(res=> {
            if (res) return console.log('The book already exists in Data');

            return bookSerevice.addGoogleBook(book)
            .then(res => console.log('The book has been successfully added to Data'))
            .catch(error=>console.error(error))
        })
        .catch(error=>console.error(error))
    }

    function onSearchBook(ev) {
        ev.preventDefault()
        setIsLoad(true)
        const txt = ev.target[0].value
        googleBookService.query(txt)
        .then(books => setBooksRes(books))
        .then(setIsLoad(false))
    }
  
    return (
        <section className='book-add'>
            <h2>Add Book</h2>
            <button className='go-back-btn'><Link to='/books'>back to books</Link></button>
            <form onSubmit={onSearchBook} className='flex justify-center'>
                <input type="search"  placeholder='Search book'/>
                <button>search</button>
            </form>
            {isLoad && <div className='searching flex justify-center' ></div> }
            
            {booksRes &&
            <ul>
            {booksRes.map((book,idx )=>{
                  return <li key={idx} className='flex justify-between align-center'> 
                    <img src={book.thumbnail} alt={book.title} />
                    <span>{book.title}</span>
                    <button onClick ={()=>{onAddBook(book)}}>Add Book</button>
                  </li>
            })}
            </ul>}
            {booksRes === undefined && 
             <div className='no-res flex justify-center' >No results were found for the book you were looking for</div>
             }
           
        </section>
    )
}