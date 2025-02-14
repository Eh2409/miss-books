import {bookSerevice} from "../services/books.service.js";
import { googleBookService } from '../services/google-books.service.js'
import{utilService} from '../services/util.service.js'
const { useState, useEffect, useRef } = React
const {Link} = ReactRouterDOM

export function BookAdd (props) {

    const [search, setSearch] = useState('')
    const [booksRes, setBooksRes] = useState(null)
    const [isLoad, setIsLoad] = useState(false)
    // console.log(booksRes)
    // console.log(isLoad)

    const searchBookDebounceRef = useRef(utilService.debouce(onSearchBook, 1000))

    useEffect(()=>{
        searchBookDebounceRef.current(search)
    },[search])

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

    function onSearchBook(search) {
        setIsLoad(true)
     
        if (search.length > 0){
            getSearchRes(search)
        } else{
            setIsLoad(false)
        }    
    }

    function getSearchRes(search){
        googleBookService.query(search)
        .then(books => setBooksRes(books))
        .then(setIsLoad(false))
    }

    function onSearch({target}) {
        setSearch(target.value)
    }
   

    return (
        <section className='book-add'>
               <button className='go-back-btn'><Link to='/books'>back to books</Link></button>
               <div className='book-add-header flex flex-column align-center'>
            <h2>Add Book</h2>
            <input type="text" value={search} onChange={onSearch} placeholder='Search book' className='search-book'/>
            </div>
        
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