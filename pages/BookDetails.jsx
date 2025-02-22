
import { bookSerevice } from "../services/books.service.js";
import { Loader } from "../cmps/Loader.jsx";
import { utilService } from "../services/util.service.js";
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx";
import { ReviewsList } from "../cmps/ReviewsList.jsx";
import { reviewsService } from "../services/reviews.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect, useRef } = React

const { useParams, Link, useNavigate } = ReactRouterDOM

export function BookDetails(props) {

    const [book, setBook] = useState(null)
    const [isLoad, setIsLoad] = useState(false)
    console.log(book);

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        onGetBook(params.bookId)
    }, [params.bookId])


    function onGetBook(bookId) {
        bookSerevice.get(bookId)
            .then(book => setBook(book))
            .catch(error => {
                console.error(error)
                showErrorMsg('An error occurred while loading the book')
                navigate(`/books`)
            })
            .finally(() => setIsLoad(false))
    }

    function onSetPageCountType(pageCount) {
        if (pageCount > 500) return 'Serious Reading'
        else if (pageCount > 200) return 'Descent Reading'
        else return 'Light Reading'
    }

    function onSetPublishedDateType(publishedDate) {
        const date = new Date()
        const timePase = date.getFullYear() - publishedDate
        if (timePase > 10) return 'Vintage'
        else return 'New'
    }

    function setColorAmount(amount) {
        if (amount > 150) return 'red'
        else if (amount < 20) return 'green'
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
        reviewsService.addReview(params.bookId, review)
            .then(res => {
                book.reviews.unshift(review)
                const currReviews = book.reviews
                setBook(prev => ({ ...prev, reviews: currReviews }))
                updateRating(book)
                setIsLoad(false)
            })
            .then(() => showSuccessMsg('The review was successfully added'))
            .catch(error => console.error(error))
            .catch(() => showErrorMsg('There was an error adding the review'))
    }

    function onRemoveReview(reviewId) {
        setIsLoad(true)
        reviewsService.removeReview(params.bookId, reviewId)
            .then(res => {
                book.reviews = book.reviews.filter(review => review.id !== reviewId)
                setBook(prev => ({ ...prev, reviews: book.reviews }))
                updateRating(book)
            })
            .then(() => setIsLoad(false))
            .then(() => showSuccessMsg('The review has been successfully deleted'))
            .catch(error => console.error(error))
            .catch(() => showErrorMsg('There was an error removing the review'))
    }

    function updateRating(book) {
        var currRating = 0
        if (book.reviews.length > 0) {
            currRating = Math.floor(book.reviews.reduce((acc, review) => review.rating + acc, 0) / book.reviews.length)
        }
        setBook(prev => ({ ...prev, rating: currRating }))
    }

    function onEditBook(bookId) {
        navigate(`/books/book-edit/${bookId}`)
    }


    if (!book) return <Loader />
    const { id, title, rating, authors, description, thumbnail, publishedDate, pageCount, categories, language, nextBook, prevBook, reviews } = book
    const { amount, currencyCode, isOnSale } = book.listPrice
    return (
        <React.Fragment>
            {isLoad && <Loader />}
            <section className='book-details'>

                <div className='thumbnail-wrapper'>
                    <img src={`${thumbnail}`} alt={title} className='book-thumbnail' />
                    {isOnSale && <span className='ribbon'>On Sale</span>}
                    <button onClick={() => onEditBook(id)} className='edit-book-btn' title='Edit book'><span className='fa pen'></span></button>
                </div>

                <div className='selected-book-content flex flex-column'>
                    <div className='book-title'><span className='tag'>title: </span> {title}</div>
                    <div><span className='tag'>rating: </span> {reviews.length > 0 ? (`⭐`).repeat(rating) : 'Not rated'}</div>
                    <div><span className='tag'>by: </span>{authors.map((author, idx) => (<span key={idx}>{author}, </span>))}</div>
                    <div><span className='tag'>price: </span> <span className={setColorAmount(amount)}>
                        {utilService.setCurrency(currencyCode)}{amount}</span></div>
                    <div><span className='tag'>categories: </span>
                        {categories.map((category, idx) => <span key={idx}>{category}</span>)}
                    </div>
                    <div className='description'><span className='tag'>description: </span>
                        <LongTxt description={description} length={100} /></div>

                    <div className="book-info flex space-around">
                        <div className='book-data flex flex-column align-center'>
                            <span className='tag'>page Count</span>
                            <span className='fa page'></span>
                            <span>{pageCount} pages</span>
                            <span>{onSetPageCountType(pageCount)}</span>
                        </div>
                        <div className='book-data flex flex-column align-center'>
                            <span className='tag'>published Date</span>
                            <span className='fa date'></span>
                            <span>{publishedDate}</span>
                            <span>{onSetPublishedDateType(publishedDate)}</span>
                        </div>
                        <div className='book-data flex flex-column align-center'>
                            <span className='tag'>language</span>
                            <span className='fa lang'></span>
                            <span>{setLanguage(language)}</span>
                        </div>
                    </div>

                    <div className='flex justify-center justify-between'>
                        <button><Link to={`/books/${prevBook}`} onClick={() => { setIsLoad(true) }}>prev book</Link></button>
                        <button><Link to='/books'>back to books</Link></button>
                        <button><Link to={`/books/${nextBook}`} onClick={() => { setIsLoad(true) }}>next book</Link></button>
                    </div>

                </div>

            </section>

            <ReviewsList reviews={reviews} onRemoveReview={onRemoveReview} />

            <AddReview onAddReview={onAddReview} />
        </React.Fragment>
    )
}