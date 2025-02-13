import { asyncStorageService } from './async-storage.service.js';
import { storageService } from './storage.service.js';
import { utilService } from './util.service.js';

export const bookSerevice = {
    query,
    remove,
    get,
    save,
    getFilterBy,
    isBookInData,
    getEmptyBook,
    addGoogleBook,
    addReview,
    removeReview,
}

const BOOK_KEY = 'book_key'
_createBooks()

function query(filterBy) {
    return asyncStorageService.query(BOOK_KEY)
        .then(books => {
            if (!filterBy) {
                return books
            }

            if (filterBy.title) {
                books = books.filter(book => book.title.toLowerCase().includes(filterBy.title.toLowerCase()))
            }

            if (filterBy.authors) {
                books = books.filter(book => book.authors.toString().toLowerCase().includes(filterBy.authors.toLowerCase()))
            }

            if (filterBy.categories) {
                books = books.filter(book => {
                    return book.categories.toString().toLowerCase().includes(filterBy.categories.toLowerCase())
                })
            }

            if (filterBy.isOnSale) {
                books = books.filter(book => book.listPrice.isOnSale === filterBy.isOnSale)
            }

            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }

            if (filterBy.pageCount) {
                books = books.filter(book => book.pageCount >= filterBy.pageCount)
            }

            if (filterBy.publishedDate) {
                console.log('Here:', filterBy.publishedDate)
                books = books.filter(book => book.publishedDate === filterBy.publishedDate)
            }

            return books
        })
}

function getFilterBy() {
    return { title: '', price: '', authors: '', publishedDate: '', isOnSale: '', categories: '' }
}

function remove(bookId) {
    return asyncStorageService.remove(BOOK_KEY, bookId)
}

function get(bookId) {
    return asyncStorageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
}


function save(book) {
    if (book.id) {
        return asyncStorageService.put(BOOK_KEY, book)
    } else {
        return asyncStorageService.post(BOOK_KEY, book)
    }

}

function isBookInData(newBook) {
    return asyncStorageService.query(BOOK_KEY)
        .then(books => {
            const res = books.some(book => book.isbn === newBook.isbn)
            return res
        })
}

function addGoogleBook(book) {
    return asyncStorageService.post(BOOK_KEY, book)
}

function getEmptyBook() {
    return {
        isbn: '',
        title: '',
        rating: 0,
        subtitle: '',
        authors: [],
        publishedDate: 0,
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: '',
        language: '',
        listPrice: {
            amount: 0,
            currencyCode: '',
            isOnSale: false,
        },
        reviews: [],
    }
}


function _setNextPrevBookId(book) {
    return asyncStorageService.query(BOOK_KEY).then(books => {
        const idx = books.findIndex(currBook => currBook.id === book.id)
        const nextBook = books[idx + 1] ? books[idx + 1] : books[0]
        const prevBook = books[idx - 1] ? books[idx - 1] : books[books.length - 1]

        book.nextBook = nextBook.id
        book.prevBook = prevBook.id
        return book
    })

}

function _createBooks() {
    const books = storageService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) _creatDemoBooks()
}

function _creatDemoBooks() {
    const books = _demoData()
    storageService.saveToStorage(BOOK_KEY, books)
}

function addReview(bookId, review) {
    return get(bookId)
        .then(book => {
            review.id = utilService.makeId()
            book.reviews.push(review)
            book.rating = updateRating(book)
            save(book)
        })
        .catch(error => console.error(error))
}

function removeReview(bookId, reviewId) {
    return get(bookId)
        .then(book => {
            const updateBooke = {
                ...book,
                reviews: book.reviews.filter(review => review.id !== reviewId)
            }
            updateBooke.rating = updateRating(updateBooke)
            save(updateBooke)
        })
        .catch(error => console.error(error))
}

function updateRating(book) {
    if (book.reviews.length === 0) return 0
    const rating = Math.floor(book.reviews.reduce((acc, review) => review.rating + acc, 0) / book.reviews.length)
    return rating
}


function _demoData() {
    return [{
        id: utilService.makeId(),
        isbn: '9781302504601',
        title: 'Amazing Spider-Man',
        rating: 0,
        subtitle: 'Worldwide Vol. 8',
        authors: [
            "Dan Slott",
            "David Hein",
            "Christos Gage"
        ],
        publishedDate: 2018,
        description: 'Collects Amazing Spider-Man #794-796, Annual #42 and material from Amazing Spider-Man (2015) #25. Nearly a year ago, Spider-Man hurled the dangerous madman called Zodiac a full year into the future. That means Zodiacs had a whole year to prepare for their rematch! And when the web-slinger pays Doctor Stranges Sanctum Sanctorum a visit looking for a consult, he finds theres a new Sorcerer Supreme in town: Loki! And this newest Master of the Mystic Arts has his own unique brand of magic! Meanwhile, Norman Osborn has scoured the globe for a cure to the genetic tampering that prevents him from becoming the Green Goblin  and at long last, hes about to find it! Plus: Betty Brant searches for answers when she receives a voicemail from her late husband, Ned Leeds! All this and the uncanny threat of Clash!',
        pageCount: 129,
        categories: [
            "Comics & Graphic Novels"
        ],
        thumbnail: 'assets/img/ComicsCovers/1.jpg',
        language: 'en',
        listPrice: {
            amount: 9.99,
            currencyCode: 'USD',
            isOnSale: false,
        },
        reviews: [],
    },
    {
        id: utilService.makeId(),
        isbn: '9781302507206',
        title: 'Amazing Spider-Man By Nick Spencer Vol. 1',
        rating: 0,
        subtitle: 'Back To Basics',
        authors: [
            "Nick Spencer"
        ],
        publishedDate: 2018,
        description: 'Collecting Amazing Spider-Man (2018) #1-5 And Material From Free Comic Book Day 2018 (Amazing Spider-Man). Its a new beginning for the Amazing Spider-Man! Peter Parkers life is turned upside down when a revelation from the past puts his job, relationships and whole life in jeopardy! And as if thats not enough, Spidey must deal with an alien invasion (with a mysterious twist), a new roommate (whos secretly the villainous Boomerang), new wrinkles in his love life  and a dangerous new enemy! But are you ready for Peter Parker vs. Spider-Man? Someone out there is impersonating Peter but why? Be here as Nick Spencer and Ryan Ottley kick off a brand new era in Spider-Mans life!',
        pageCount: 159,
        categories: [
            "Comics & Graphic Novels"
        ],
        thumbnail: 'assets/img/ComicsCovers/2.jpg',
        language: 'en',
        listPrice: {
            amount: 8.99,
            currencyCode: 'USD',
            isOnSale: false,
        },
        reviews: [],
    }, {
        id: utilService.makeId(),
        isbn: '9781302513399',
        title: 'Amazing Spider-Man Epic Collection',
        rating: 0,
        subtitle: 'Assassin Nation',
        authors: [
            "David Michelinie",
            "Gerry Conway"
        ],
        publishedDate: 2019,
        description: 'Collects Amazing Spider-Man (1963) #311-325 and Annual #23 and Marvel Graphic Novel: Amazing Spider-Man  Parallel Lives. Archenemies, assassins and Inferno! David Michelinie and Todd McFarlanes fan-favorite run continues as the superstar artist takes on classic Spidey villains Mysterio, Green Goblin, Hobgoblin, Lizard, Rhino and Scorpion  and Spider-Man faces a brutal rematch with Venom, his newest and deadliest enemy! As Manhattan goes mad, the web-slinger must contend with the demonic threat of Inferno  but Peters powers cant save him and MJ from a Christmastime eviction! Then, Spidey tackles international espionage when hes drawn into the Assassin Nation Plot alongside Silver Sable, roguish gun-for-hire Paladin and Captain America! But when the assassin is revealed, who will survive? Plus: As Atlantis Attacks, Spidey and She-Hulk battle the Abomination! And a classic graphic novel sheds new light on Peter and Mary Janes lives!',
        pageCount: 501,
        categories: [
            "Comics & Graphic Novels"
        ],
        thumbnail: 'assets/img/ComicsCovers/3.jpg',
        language: 'en',
        listPrice: {
            amount: 19.99,
            currencyCode: 'USD',
            isOnSale: false,
        },
        reviews: [],
    },]
}



// function _creatDemoBooks() {
//     const ctgs = ['Classic Superheroes', 'Teen Superheroes', 'Dark and Gritty', 'Anti-Heroes', 'Superhero Teams', 'Cosmic Superheroes', 'Mythological Superheroes', 'Magic-Based Superheroes', 'Cyberpunk Superheroes', 'Villain-Turned-Hero']
//     const titles = ['Spider-Man', 'Iron Man', 'Captain America', 'Wolverine', 'The Scarlet Witch', 'Deadpool', 'The Avengers', 'Guardians of the Galaxy']
//     const books = []
//     for (let i = 0; i < 21; i++) {
//         const book = {
//             id: utilService.makeId(),
//             title: titles[utilService.getRandomIntInclusive(0, titles.length - 1)],
//             subtitle: utilService.makeLorem(4),
//             authors: [
//                 utilService.makeLorem(1)
//             ],
//             publishedDate: utilService.getRandomIntInclusive(1950, 2024),
//             description: utilService.makeLorem(20),
//             pageCount: utilService.getRandomIntInclusive(20, 600),
//             categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
//             thumbnail: `assets/img/ComicsCovers/${i + 1}.jpg`,
//             language: 'en',
//             listPrice: {
//                 amount: utilService.getRandomIntInclusive(80, 500),
//                 currencyCode: 'EUR',
//                 isOnSale: Math.random() > 0.5
//             }
//         }
//         books.push(book)
//     }

//     storageService.saveToStorage(BOOK_KEY, books)
// }
