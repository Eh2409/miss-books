import { bookSerevice } from './books.service.js'
import { utilService } from './util.service.js'

export const reviewsService = {
    addReview,
    removeReview,
    getEmptyReview,
}

function addReview(bookId, review) {
    return bookSerevice.get(bookId)
        .then(book => {
            review.id = utilService.makeId()
            book.reviews.push(review)
            book.rating = updateRating(book)
            bookSerevice.save(book)
        })
        .catch(error => console.error(error))
}

function removeReview(bookId, reviewId) {
    return bookSerevice.get(bookId)
        .then(book => {
            const updateBooke = {
                ...book,
                reviews: book.reviews.filter(review => review.id !== reviewId)
            }
            updateBooke.rating = updateRating(updateBooke)
            bookSerevice.save(updateBooke)
        })
        .catch(error => console.error(error))
}

function updateRating(book) {
    if (book.reviews.length === 0) return 0
    const rating = Math.floor(book.reviews.reduce((acc, review) => review.rating + acc, 0) / book.reviews.length)
    return rating
}


function getEmptyReview() {
    return {
        avatar: '',
        color: '',
        fullname: '',
        readAt: new Date().toISOString().slice(0, 10),
        rating: 0,
        comment: ''
    }
}