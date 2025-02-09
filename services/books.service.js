import { asyncStorageService } from './async-storage.service.js';
import { storageService } from './storage.service.js';
import { utilService } from './util.service.js';

export const bookSerevice = {
    query,
    remove,
    get,
    save,
    getFilterBy,
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
}


function save(book) {
    if (book.id) {
        return asyncStorageService.put(BOOK_KEY, book)
    } else {
        return asyncStorageService.post(BOOK_KEY, book)
    }

}

// function getEmptyBook() {
// }


function _createBooks() {
    const books = storageService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) _creatDemoBooks()
}

function _creatDemoBooks() {
    const ctgs = ['Classic Superheroes', 'Teen Superheroes', 'Dark and Gritty', 'Anti-Heroes', 'Superhero Teams', 'Cosmic Superheroes', 'Mythological Superheroes', 'Magic-Based Superheroes', 'Cyberpunk Superheroes', 'Villain-Turned-Hero']
    const titles = ['Spider-Man', 'Iron Man', 'Captain America', 'Wolverine', 'The Scarlet Witch', 'Deadpool', 'The Avengers', 'Guardians of the Galaxy']
    const books = []
    for (let i = 0; i < 21; i++) {
        const book = {
            id: utilService.makeId(),
            title: titles[utilService.getRandomIntInclusive(0, titles.length - 1)],
            subtitle: utilService.makeLorem(4),
            authors: [
                utilService.makeLorem(1)
            ],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `./assets/img/ComicsCovers/${i + 1}.jpg`,
            language: 'en',
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: 'EUR',
                isOnSale: Math.random() > 0.5
            }
        }
        books.push(book)
    }

    storageService.saveToStorage(BOOK_KEY, books)
}