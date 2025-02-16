import {bookSerevice} from "../services/books.service.js";
import {googleBookService } from '../services/google-books.service.js'
import{utilService} from '../services/util.service.js'

const { useState, useEffect, useRef } = React
const {useNavigate} = ReactRouterDOM

export function GoogleBook (props) {

    const [search, setSearch] = useState('')
    const [booksRes, setBooksRes] = useState(null)
    const [isSearchLoad, setIsSearchLoad] = useState(false)
    const [isAddBookLoad, setIsAddBookLoad] = useState(null) 
  
    const searchBookDebounceRef = useRef(utilService.debounce(onSearchBook, 1000))
    const navigate = useNavigate()

    useEffect(()=>{
        if(search) setIsSearchLoad(true)
        searchBookDebounceRef.current(search)
    },[search])

    function onAddBook(book) {
        return bookSerevice.isBookInData(book)
        .then(res=> {
            if (res) {
                console.log('The book already exists in Data');
                setIsAddBookLoad(null)
                return
            }

            return bookSerevice.addGoogleBook(book)
            .then(book => navigate(`/books/${book.id}`))
            .catch(error=>console.error(error))
        })
        .catch(error=>console.error(error))
    }

    function onSearchBook(search) {
        if (search.length > 0){
            getSearchRes(search)
        } else{
            setIsSearchLoad(false)
            setBooksRes(null)
        }    
    }

    function getSearchRes(search){
        googleBookService.query(search)
        .then(books => setBooksRes(books))
        .then(() => setIsSearchLoad(false))
    }

    function onSearch({target}) {
        setSearch(target.value)
    }

    function onSetIsAddBookLoad(isbn) {
        console.log(isbn);
        setIsAddBookLoad(isbn)
    }


    return (
        <section className='google-book'>
               <div className='google-book-header flex flex-column align-center'>
            <h3>Search book on Google</h3>
            <input type="text" value={search} onChange={onSearch} placeholder='Enter book name' className='search-book'/>
            </div>
        
            {isSearchLoad && <div className='searching flex justify-center' ></div> }

            {booksRes &&
            <ul>
            {booksRes.map((book,idx )=>{
                  return <li key={idx} className='flex justify-between align-center'> 
                    <img src={book.thumbnail} alt={book.title} className='google-book-thumbnail' />
                    <span>{book.title}</span>
                    <button onClick ={()=>{onAddBook(book);onSetIsAddBookLoad(book.isbn)}}>
                       { isAddBookLoad === book.isbn ? <div className='mini-loader'></div> : ' Add book'}
                    </button>
                  </li>
            })}
            </ul>}
            {booksRes === undefined && 
             <div className='no-res flex justify-center' >No results were found for the book you were looking for</div>
             }
           
        </section>
    )
}