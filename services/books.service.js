import { asyncStorageService } from "./async-storage.service.js";
import { storageService } from "./storage.service.js";
import { utilService } from "./util.service.js";

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
                books = books.filter(book => book.title.includes(filterBy.title.toLowerCase()))
            }

            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }

            return books
        })
}

function getFilterBy() {
    return { title: '', price: '' }
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
    _creatDemoBooks()
    const books = storageService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) _creatDemoBooks()
}

function _creatDemoBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []
    for (let i = 0; i < 20; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [
                utilService.makeLorem(1)
            ],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
            language: "en",
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            }
        }
        books.push(book)
    }

    storageService.saveToStorage(BOOK_KEY, books)

}

// function _creatDemoBooks() {
//     const books = [
//         {
//             "id": "OXeMG8wNskc",
//             "title": "metus hendrerit",
//             "subtitle": "mi est eros convallis auctor arcu dapibus himenaeos",
//             "authors": [
//                 "Barbara Cartland"
//             ],
//             "publishedDate": 1999,
//             "description": "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
//             "pageCount": 713,
//             "categories": [
//                 "Computers",
//                 "Hack"
//             ],
//             "thumbnail": "../assets/img/BooksImages/1.jpg",
//             "language": "en",
//             "listPrice": {
//                 "amount": 109,
//                 "currencyCode": "EUR",
//                 "isOnSale": false
//             }
//         },
//         {
//             "id": "JYOJa2NpSCq",
//             "title": "morbi",
//             "subtitle": "lorem euismod dictumst inceptos mi",
//             "authors": [
//                 "Barbara Cartland"
//             ],
//             "publishedDate": 1978,
//             "description": "aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor",
//             "pageCount": 129,
//             "categories": [
//                 "Computers",
//                 "Hack"
//             ],
//             "thumbnail": "../assets/img/BooksImages/2.jpg",
//             "language": "sp",
//             "listPrice": {
//                 "amount": 44,
//                 "currencyCode": "EUR",
//                 "isOnSale": true
//             }
//         },
//         {
//             "id": "1y0Oqts35DQ",
//             "title": "at viverra venenatis",
//             "subtitle": "gravida libero facilisis rhoncus urna etiam",
//             "authors": [
//                 "Dr. Seuss"
//             ],
//             "publishedDate": 1999,
//             "description": "lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant",
//             "pageCount": 972,
//             "categories": [
//                 "Computers",
//                 "Hack"
//             ],
//             "thumbnail": "../assets/img/BooksImages/3.jpg",
//             "language": "he",
//             "listPrice": {
//                 "amount": 108,
//                 "currencyCode": "ILS",
//                 "isOnSale": false
//             }
//         },
//         {
//             "id": "kSnfIJyikTP",
//             "title": "dictum",
//             "subtitle": "augue eu consectetur class curabitur conubia ligula in ullamcorper",
//             "authors": [
//                 "Danielle Steel"
//             ],
//             "publishedDate": 1978,
//             "description": "interdum inceptos mauris habitant primis neque tempus lacus morbi auctor cras consectetur euismod vehicula neque netus enim vivamus augue molestie imperdiet tincidunt aliquam",
//             "pageCount": 303,
//             "categories": [
//                 "Computers",
//                 "Hack"
//             ],
//             "thumbnail": "../assets/img/BooksImages/4.jpg",
//             "language": "en",
//             "listPrice": {
//                 "amount": 30,
//                 "currencyCode": "EUR",
//                 "isOnSale": true
//             }
//         },
//         {
//             "id": "f4iuVmbuKCC",
//             "title": "sem himenaeos aptent",
//             "subtitle": "interdum per habitasse luctus purus est",
//             "authors": [
//                 "Dr. Seuss"
//             ],
//             "publishedDate": 2011,
//             "description": "et vehicula faucibus amet accumsan lectus cras nulla cubilia arcu neque litora mi habitasse quis amet augue facilisis sed",
//             "pageCount": 337,
//             "categories": [
//                 "Computers",
//                 "Hack"
//             ],
//             "thumbnail": "../assets/img/BooksImages/5.jpg",
//             "language": "sp",
//             "listPrice": {
//                 "amount": 19,
//                 "currencyCode": "USD",
//                 "isOnSale": false
//             }
//         },
//         {
//             "id": "U2rfZO6oBZf",
//             "title": "mi ante posuere",
//             "subtitle": "sapien curae consectetur ultrices fringilla blandit ipsum curae faucibus",
//             "authors": [
//                 "Leo Tolstoy"
//             ],
//             "publishedDate": 1978,
//             "description": "senectus habitant nam imperdiet nostra elit dapibus nisl adipiscing in",
//             "pageCount": 748,
//             "categories": [
//                 "Computers",
//                 "Hack"
//             ],
//             "thumbnail": "../assets/img/BooksImages/6.jpg",
//             "language": "en",
//             "listPrice": {
//                 "amount": 91,
//                 "currencyCode": "USD",
//                 "isOnSale": true
//             }
//         },
//         {
//             "id": "xI0wrXaaAcq",
//             "title": "non",
//             "subtitle": "leo tortor per dapibus mattis ut conubia porttitor ligula viverra",
//             "authors": [
//                 "Leo Tolstoy"
//             ],
//             "publishedDate": 2011,
//             "description": "nec scelerisque id cursus platea sit ullamcorper bibendum ultrices tempus ante mi aliquet cras tortor dapibus dictum scelerisque",
//             "pageCount": 65,
//             "categories": [
//                 "Computers",
//                 "Hack"
//             ],
//             "thumbnail": "../assets/img/BooksImages/7.jpg",
//             "language": "he",
//             "listPrice": {
//                 "amount": 90,
//                 "currencyCode": "USD",
//                 "isOnSale": false
//             }
//         },
//         {
//             "id": "9laHCEdSpFy",
//             "title": "tristique",
//             "subtitle": "consectetur a eu tincidunt condimentum amet nisi",
//             "authors": [
//                 "Dr. Seuss"
//             ],
//             "publishedDate": 1999,
//             "description": "magna quisque venenatis laoreet purus in semper habitant proin pellentesque sed egestas cursus faucibus nam enim id sit mi ligula risus curabitur senectus curabitur sodales fames sem",
//             "pageCount": 299,
//             "categories": [
//                 "Computers",
//                 "Hack"
//             ],
//             "thumbnail": "../assets/img/BooksImages/8.jpg",
//             "language": "he",
//             "listPrice": {
//                 "amount": 176,
//                 "currencyCode": "EUR",
//                 "isOnSale": false
//             }
//         },
//         {
//             "id": "nGhVwZvGCGp",
//             "title": "urna ornare gravida",
//             "subtitle": "sem vestibulum semper convallis pharetra tempor himenaeos ut",
//             "authors": [
//                 "Jin Yong"
//             ],
//             "publishedDate": 2011,
//             "description": "porttitor nisl sodales id eu tellus venenatis laoreet auctor dictumst nulla",
//             "pageCount": 803,
//             "categories": [
//                 "Computers",
//                 "Hack"
//             ],
//             "thumbnail": "../assets/img/BooksImages/9.jpg",
//             "language": "sp",
//             "listPrice": {
//                 "amount": 116,
//                 "currencyCode": "USD",
//                 "isOnSale": true
//             }
//         },
//         {
//             "id": "Q8Q9Lsd03BD",
//             "title": "consequat neque volutpat",
//             "subtitle": "vel quis taciti fermentum feugiat ullamcorper curae praesent",
//             "authors": [
//                 "Dr. Seuss"
//             ],
//             "publishedDate": 1978,
//             "description": "curabitur bibendum in dolor neque magna phasellus arcu nulla cubilia senectus maecenas ullamcorper neque accumsan facilisis dictumst ornare",
//             "pageCount": 891,
//             "categories": [
//                 "Computers",
//                 "Hack"
//             ],
//             "thumbnail": "../assets/img/BooksImages/10.jpg",
//             "language": "en",
//             "listPrice": {
//                 "amount": 145,
//                 "currencyCode": "EUR",
//                 "isOnSale": false
//             }
//         },
//     ]

//     storageService.saveToStorage(BOOK_KEY, books)
// }