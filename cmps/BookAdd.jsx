import {bookSerevice} from "../services/books.service.js";
import { googleBookService } from '../services/google-books.service.js'
const { useState, useEffect, useRef } = React
const {Link} = ReactRouterDOM

export function BookAdd (props) {

    const [booksRes, setBooksRes] = useState(null)
    const [isLoad, setIsLoad] = useState(false)
    console.log(booksRes)
    console.log(isLoad)

    const searchRef = useRef()
    

    useEffect(()=>{
        const onInputTypeDebouce = debouce(onSearchBook, 500)
        searchRef.current.addEventListener('input', onInputTypeDebouce)
        
        return(()=>{
        if (searchRef.current) {
            searchRef.current.removeEventListener('input', onInputTypeDebouce);
        }
        })
    })

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
        setIsLoad(true)
        
        const txt = ev.target.value
        console.log(txt);
        
        if (txt.length > 0){
            getSearchRes(txt)
        } else{
            setIsLoad(false)
        }    
    }

    function getSearchRes(txt){
        googleBookService.query(txt)
        .then(books => setBooksRes(books))
        .then(setIsLoad(false))
    }

    function debouce(func, wait) {
        let timeout
        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                clearTimeout(timeout)
                func(...args)
            }, wait)
        }
    }

    return (
        <section className='book-add'>
            <h2>Add Book</h2>
            <button className='go-back-btn'><Link to='/books'>back to books</Link></button>
        
            <input type="text" ref={searchRef} placeholder='Search book' className='search-book flex'/>

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