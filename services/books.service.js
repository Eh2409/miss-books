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
            "thumbnail": "http://ca.org/books-photos/20.jpg",
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
            "thumbnail": "http://ca.org/books-photos/20.jpg",
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
            "thumbnail": "http://ca.org/books-photos/20.jpg",
            "listPrice": {
                "amount": 109,
                "currencyCode": "EUR",
                "isOnSale": false
            }
        },
    ]

    storageService.saveToStorage(BOOK_KEY, books)
}