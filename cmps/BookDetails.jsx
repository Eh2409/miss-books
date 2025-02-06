
import {bookSerevice} from "../services/books.service.js";
import { Loader } from "./Loader.jsx";

const { useState, useEffect, useRef } = React

export function BookDetails ({selectedBookId,OnSetSelectedBookId}) {

    const [book, setBook] = useState(null)
    console.log(book);

    useEffect(()=>{
        onGetBook(selectedBookId)
    },[])

    function onGetBook(selectedBookId) {
        bookSerevice.get(selectedBookId)
        .then(book=>setBook(book))
    }

    function onSetPageCountType(pageCount) {
        if (pageCount > 500) return 'Serious Reading'
        else if(pageCount > 200) return 'Descent Reading'
        else return 'Light Reading'
    }

    function onSetPublishedDateType(publishedDate) {
        const date = new Date()
        const timePase = date.getFullYear() - publishedDate
        if(timePase > 10) return 'Vintage'
        else return 'New'
    }

    function setColorAmount(amount) {
        if (amount > 150) return 'red'
        else if(amount < 20) return 'green'
        else return ''
    }

    if (!book) return <Loader/>

    const {title,authors,description,thumbnail,publishedDate,pageCount,categories,language} = book
    const {amount,isOnSale} = book.listPrice

    return (
        <section className = 'book-details'>
                
            <div className='thumbnail-wrapper'>
            <img src={`${thumbnail}`} alt={title} className='book-thumbnail'/>
            {isOnSale && <span className='ribbon'>On Sale</span> }
            </div>

            <div className='selected-book-content flex flex flex-column'>
            <h2><span>title: </span> {title}</h2>
            <h3><span>by:</span>{authors.toString()}</h3>
            <h5 className='categories flex'>
                {categories.map((category,idx)=><button key={idx}>{category}</button>)}
                <button>{onSetPageCountType(pageCount)}</button>
                <button>{onSetPublishedDateType(publishedDate)}</button>
                {isOnSale && <button>On Sale!</button> }
            </h5>
            
            <h2><span>price: </span> <span className={setColorAmount(amount)}>${amount}</span></h2>
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
            
        </section>
    )
}