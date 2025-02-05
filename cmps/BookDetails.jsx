
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

    const {title,authors,description,thumbnail,publishedDate,pageCount,categories,language} = book
    const {amount} = book.listPrice

    return (
        <section className = 'book-details'>
            <div className='selected-book-content flex flex flex-column'>
            <h2><span>title: </span> {title}</h2>
            <h3><span>by:</span>{authors}</h3>
            <h5 className='categories flex'><button>{categories}</button></h5>
            
            <h2><span>price: </span> ${amount}</h2>
            <h2 className='description'><span>description: </span> {description}</h2>

            <div className="book-info flex space-around">
                <div className = 'book-data flex flex-column align-center'>
                    <span>page Count</span>
                    <span className='fa page'></span>
                    <span>{pageCount} pages</span>
                </div>
                <div className = 'book-data flex flex-column align-center'>
                    <span>published Date</span>
                    <span className='fa date'></span>
                    <span>{publishedDate}</span>
                </div>
                <div className = 'book-data flex flex-column align-center'>
                    <span>language</span>
                    <span className='fa lang'></span>
                    <span>{language}</span>
                </div> 
            </div>

            <button onClick={()=>(OnSetSelectedBookId(null))}>back</button>
            </div>
            <img src={`${thumbnail}`} alt={title} className='book-thumbnail'/>
        </section>
    )
}