
import {bookSerevice} from "../services/books.service.js";
import { Loader } from "./Loader.jsx";
import { utilService } from "../services/util.service.js";
import { LongTxt } from "./LongTxt.jsx"
import { AddReview } from "./AddReview.jsx";
import { ReviewsList } from "./ReviewsList.jsx";
import { reviewsService } from "../services/reviews.service.js";

const { useState, useEffect, useRef } = React

const {useParams,Link} = ReactRouterDOM

export function BookDetails () {

    const [book, setBook] = useState(null)
    const [isLoad,setIsLoad] = useState(false)
    console.log(book);

    const params = useParams()

    useEffect(()=>{
        onGetBook(params.bookId)
    },[params.bookId])


    function onGetBook(bookId) {
        bookSerevice.get(bookId)
        .then(book=>setBook(book))
        .finally(res=>setIsLoad(false))
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

    function onAddReview(review) {
        setIsLoad(true)
        reviewsService.addReview(params.bookId,review)
        .then(res=> {
            book.reviews.unshift(review)
            const currReviews = book.reviews
            setBook(prev=>({...prev,reviews:currReviews}))
            updateRating(book)
            setIsLoad(false)
        })
    }

    function onRemoveReview(reviewId) {
        setIsLoad(true)
        reviewsService.removeReview(params.bookId,reviewId)
        .then(res=>{
            book.reviews = book.reviews.filter(review => review.id !== reviewId)
            setBook(prev=>({...prev,reviews: book.reviews}))
            updateRating(book)
            setIsLoad(false)
        })
    }

    function updateRating(book) {
        var currRating = 0
        if (book.reviews.length > 0) {
            currRating = Math.floor(book.reviews.reduce((acc, review) => review.rating + acc, 0) / book.reviews.length)
        }
        setBook(prev => ({...prev,rating: currRating}))
    }


    if (!book ) return <Loader/>
    const {title, rating ,authors,description,thumbnail,publishedDate,pageCount,categories,language ,nextBook,prevBook,reviews} = book
    const {amount,currencyCode,isOnSale} = book.listPrice
    return (
        <React.Fragment> 
        {isLoad && <Loader/>}
        <section className = 'book-details'>
                
            <div className='thumbnail-wrapper'>
            <img src={`${thumbnail}`} alt={title} className='book-thumbnail'/>
            {isOnSale && <span className='ribbon'>On Sale</span> }
            </div>

            <div className='selected-book-content flex flex-column'>
            <div className='book-title'><span className='tag'>title: </span> {title}</div>
            <div><span className='tag'>rating: </span> {reviews.length>0 ? (`⭐`).repeat(rating): 'Not rated'}</div>
            <div><span className='tag'>by: </span>{authors.map((author,idx)=> (<span key={idx}>{author}, </span>))}</div>
            <div><span className='tag'>price: </span> <span className={setColorAmount(amount)}>
            {utilService.setCurrency(currencyCode)}{amount}</span></div>
            <div><span className='tag'>categories: </span>
                {categories.map((category,idx)=><span key={idx}>{category}</span>)}
            </div>
            <div className='description'><span className='tag'>description: </span> 
            <LongTxt description={description} length={100}/></div>

            <div className="book-info flex space-around">
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

            <div className='flex justify-center justify-between'>
            <button onClick ={()=>{setIsLoad(true)}}><Link to={`/books/${prevBook}`}>prev book</Link></button>
            <button><Link to='/books'>back to books</Link></button>
            <button onClick ={()=>{setIsLoad(true)}}><Link to={`/books/${nextBook}`}>next book</Link></button>
            </div>

            </div>
            
        </section>

       <ReviewsList reviews={reviews} onRemoveReview = {onRemoveReview}/>

        <AddReview onAddReview={onAddReview}/>
        </React.Fragment> 
    )
}