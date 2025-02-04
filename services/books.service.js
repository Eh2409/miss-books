import { asyncStorageService } from "./async-storage.service.js";
import { storageService } from "./storage.service.js";

export const bookSerevice = {
    query,
    remove,
    get,
    save,
}

const BOOK_KEY = 'book_key'
_createBooks()

function query() {
    return asyncStorageService.query(BOOK_KEY)
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
    const books = [
        {
            "id": "OXeMG8wNskc",
            "title": "metus hendrerit",
            "description": "placerat nisi sodales suscipit tellus",
            "thumbnail": "../assets/img/BooksImages/1.jpg",
            "listPrice": {
                "amount": 109,
                "currencyCode": "EUR",
                "isOnSale": false
            }
        },
        {
            "id": "OXeM23G8wNskc",
            "title": "metus hendrerit",
            "description": "placerat nisi sodales suscipit tellus",
            "thumbnail": "../assets/img/BooksImages/2.jpg",
            "listPrice": {
                "amount": 109,
                "currencyCode": "EUR",
                "isOnSale": false
            }
        },
        {
            "id": "OXe4MG8wNskc",
            "title": "metus hendrerit",
            "description": "placerat nisi sodales suscipit tellus",
            "thumbnail": "../assets/img/BooksImages/3.jpg",
            "listPrice": {
                "amount": 109,
                "currencyCode": "EUR",
                "isOnSale": false
            }
        },
        {
            "id": "OXeMG84wNskc",
            "title": "metus hendrerit",
            "description": "placerat nisi sodales suscipit tellus",
            "thumbnail": "../assets/img/BooksImages/4.jpg",
            "listPrice": {
                "amount": 109,
                "currencyCode": "EUR",
                "isOnSale": false
            }
        },
        {
            "id": "OXeM23G5438wNskc",
            "title": "metus hendrerit",
            "description": "placerat nisi sodales suscipit tellus",
            "thumbnail": "../assets/img/BooksImages/5.jpg",
            "listPrice": {
                "amount": 109,
                "currencyCode": "EUR",
                "isOnSale": false
            }
        },
        {
            "id": "OXe4MG8w34Nskc",
            "title": "metus hendrerit",
            "description": "placerat nisi sodales suscipit tellus",
            "thumbnail": "../assets/img/BooksImages/6.jpg",
            "listPrice": {
                "amount": 109,
                "currencyCode": "EUR",
                "isOnSale": false
            }
        },
    ]

    storageService.saveToStorage(BOOK_KEY, books)
}