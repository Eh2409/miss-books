
import {bookSerevice} from "../services/books.service.js";
import { Loader } from "./Loader.jsx";
import { utilService } from "../services/util.service.js";

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

    function setLanguage(language) {
        switch (language) {
            case 'en': return 'English'
            case 'he': return 'Hebrew'
            case 'es': return 'Spanish'
            case 'ru': return 'Russian'
            case 'ar': return 'Arabic'
            case 'ja': return 'Japanese'
            case 'zh': return 'Chinese'
        }
    }

    if (!book) return <Loader/>
    const {title,authors,description,thumbnail,publishedDate,pageCount,categories,language} = book
    const {amount,currencyCode,isOnSale} = book.listPrice
    return (
        <section className = 'book-details'>
                
            <div className='thumbnail-wrapper'>
            <img src={`${thumbnail}`} alt={title} className='book-thumbnail'/>
            {isOnSale && <span className='ribbon'>On Sale</span> }
            </div>

            <div className='selected-book-content flex flex flex-column'>
            <div className='book-title'><span className='tag'>title: </span> {title}</div>
            <div><span className='tag'>by: </span>{authors.toString()}</div>
            <div><span className='tag'>price: </span> <span className={setColorAmount(amount)}>
            {utilService.setCurrency(currencyCode)}{amount}</span></div>
            <div><span className='tag'>categories: </span>
                {categories.map((category,idx)=><span key={idx}>{category}</span>)}
            </div>
            <div className='description'><span className='tag'>description: </span> {description}</div>

            <div className="book-info flex space-around align-center">
                <div className = 'book-data flex flex-column align-center'>
                    <span className='tag'>page Count</span>
                    <span className='fa page'></span>
                    <span>{pageCount} pages</span>
                    <span>{onSetPageCountType(pageCount)}</span>
                </div>
                <div className = 'book-data flex flex-column align-center'>
                    <span className='tag'>published Date</span>
                    <span className='fa date'></span>
                    <span>{publishedDate}</span>
                    <span>{onSetPublishedDateType(publishedDate)}</span>
                </div>
                <div className = 'book-data flex flex-column align-center'>
                    <span className='tag'>language</span>
                    <span className='fa lang'></span>
                    <span>{setLanguage(language)}</span>
                </div> 
            </div>

            <button onClick={()=>(OnSetSelectedBookId(null))}>back</button>
            </div>
            
        </section>
    )
}