import { bookSerevice } from "./books.service.js";
import { utilService } from "./util.service.js";
import { asyncStorageService } from "./async-storage.service.js";

export const googleBookService = {
    query,
}

const BOOK_RES_KEY = 'bookRes'
var gBooks = {}
_loadResBooks()
console.log('Here:', gBooks)

function _loadResBooks() {
    return asyncStorageService.query(BOOK_RES_KEY)
        .then(res => gBooks = res)
}

function query(txt) {
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}&country=US`

    console.log('Here:', gBooks)

    if (gBooks[txt]) {
        console.log('from CACH')
        return Promise.resolve(gBooks[txt])
    }

    return fetch(url).then(res => res.json())
        .then(books => {

            if (books.items === undefined) {
                return undefined
            }

            const booksWithISBN = books.items.filter(book => book.volumeInfo.industryIdentifiers)
            const newBooks = setBookData(booksWithISBN)
            console.log('from FETCH')
            gBooks[txt] = newBooks
            utilService.saveToStorage(BOOK_RES_KEY, gBooks)
            return newBooks
        })


    // return Promise.resolve().then(() => {
    //     const books = demoData()
    //     const booksWithISBN = books.items.filter(book => book.volumeInfo.industryIdentifiers)
    //     const newBooks = setBookData(booksWithISBN)
    //     return newBooks
    // })
}


function setBookData(books) {
    return books.map(book => {
        const emptyBook = bookSerevice.getEmptyBook()
        const { industryIdentifiers, title, subtitle, authors, publishedDate, description, pageCount, categories, imageLinks, language } = book.volumeInfo
        const { saleability, listPrice } = book.saleInfo
        emptyBook.isbn = industryIdentifiers[0].identifier
        emptyBook.title = (title) ? title : ''
        emptyBook.subtitle = (subtitle) ? subtitle : ''
        emptyBook.authors = (authors) ? authors : []
        emptyBook.publishedDate = _getPublishedYear(publishedDate)
        emptyBook.description = (description) ? description : ''
        emptyBook.pageCount = (pageCount) ? pageCount : 0
        emptyBook.categories = (categories) ? categories : []
        emptyBook.thumbnail = (imageLinks) ? imageLinks.thumbnail : 'assets/img/ComicsCovers/1.jpg'
        emptyBook.language = language
        if (saleability === "FOR_SALE") {
            emptyBook.listPrice.amount = listPrice.amount
            emptyBook.listPrice.currencyCode = listPrice.currencyCode
        } else {
            emptyBook.listPrice.amount = utilService.getRandomIntInclusive(80, 500)
            emptyBook.listPrice.currencyCode = 'USD'
        }
        emptyBook.isOnSale = Math.random() > 0.5
        return emptyBook
    })
}

function _getPublishedYear(publishedDate) {
    const dateArry = publishedDate.split('-')
    const year = +dateArry[0]
    return year
}



function demoData() {
    return {
        "kind": "books#volumes",
        "totalItems": 659,
        "items": [
            {
                "kind": "books#volume",
                "id": "bQbwAQAAQBAJ",
                "etag": "FpKC+o1y4uc",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/bQbwAQAAQBAJ",
                "volumeInfo": {
                    "title": "Naruto, Vol. 1",
                    "subtitle": "Uzumaki Naruto",
                    "authors": [
                        "Masashi Kishimoto"
                    ],
                    "publisher": "VIZ Media LLC",
                    "publishedDate": "2010-11-02",
                    "description": "Twelve years ago the Village Hidden in the Leaves was attacked by a fearsome threat. A nine-tailed fox spirit claimed the life of the village leader, the Hokage, and many others. Today, the village is at peace and a troublemaking kid named Naruto is struggling to graduate from Ninja Academy. His goal may be to become the next Hokage, but his true destiny will be much more complicated. The adventure begins now! -- VIZ Media",
                    "industryIdentifiers": [
                        {
                            "type": "ISBN_13",
                            "identifier": "9781421544328"
                        },
                        {
                            "type": "ISBN_10",
                            "identifier": "1421544326"
                        }
                    ],
                    "readingModes": {
                        "text": true,
                        "image": false
                    },
                    "pageCount": 190,
                    "printType": "BOOK",
                    "categories": [
                        "Comics & Graphic Novels"
                    ],
                    "averageRating": 5,
                    "ratingsCount": 1,
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": true,
                    "contentVersion": "2.2.3.0.preview.2",
                    "panelizationSummary": {
                        "containsEpubBubbles": true,
                        "containsImageBubbles": true,
                        "epubBubbleVersion": "ce71b09c591e62ae",
                        "imageBubbleVersion": "ce71b09c591e62ae"
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=bQbwAQAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=bQbwAQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=bQbwAQAAQBAJ&dq=naruto&hl=&as_pt=BOOKS&cd=1&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=bQbwAQAAQBAJ&dq=naruto&hl=&as_pt=BOOKS&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Naruto_Vol_1.html?hl=&id=bQbwAQAAQBAJ",
                    "seriesInfo": {
                        "kind": "books#volume_series_info",
                        "shortSeriesBookTitle": "Uzumaki Naruto",
                        "bookDisplayNumber": "1",
                        "volumeSeries": [
                            {
                                "seriesId": "p2rcFwAAABB6fM",
                                "seriesBookType": "COLLECTED_EDITION",
                                "orderNumber": 1
                            }
                        ]
                    }
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": true
                    },
                    "pdf": {
                        "isAvailable": true
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=bQbwAQAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                },
                "searchInfo": {
                    "textSnippet": "Twelve years ago the Village Hidden in the Leaves was attacked by a fearsome threat."
                }
            },
            {
                "kind": "books#volume",
                "id": "3bdbiVvMph4C",
                "etag": "EKNc8wE/b7M",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/3bdbiVvMph4C",
                "volumeInfo": {
                    "title": "Naruto Forever",
                    "subtitle": "The Unofficial Guide",
                    "authors": [
                        "Kazuhisa Fujie",
                        "Ivan Rorick"
                    ],
                    "publisher": "DH Publishing Inc",
                    "publishedDate": "2008-03",
                    "description": "In this must-have for anime fans of \"Naruto,\" otaku researchers have dug deep to find the answers to a plethora of questions that this complex and endlessly fascinating story has raised, as well as uncovering the many secrets surrounding Naruto on his quest to become the number-one ninja.",
                    "industryIdentifiers": [
                        {
                            "type": "ISBN_13",
                            "identifier": "9781932897258"
                        },
                        {
                            "type": "ISBN_10",
                            "identifier": "1932897259"
                        }
                    ],
                    "readingModes": {
                        "text": false,
                        "image": true
                    },
                    "pageCount": 189,
                    "printType": "BOOK",
                    "categories": [
                        "Comics & Graphic Novels"
                    ],
                    "averageRating": 4,
                    "ratingsCount": 10,
                    "maturityRating": "MATURE",
                    "allowAnonLogging": true,
                    "contentVersion": "0.3.3.0.preview.1",
                    "panelizationSummary": {
                        "containsEpubBubbles": false,
                        "containsImageBubbles": false
                    },
                    "comicsContent": true,
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=3bdbiVvMph4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=3bdbiVvMph4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=3bdbiVvMph4C&printsec=frontcover&dq=naruto&hl=&as_pt=BOOKS&cd=2&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=3bdbiVvMph4C&dq=naruto&hl=&as_pt=BOOKS&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Naruto_Forever.html?hl=&id=3bdbiVvMph4C",
                    "seriesInfo": {
                        "kind": "books#volume_series_info",
                        "shortSeriesBookTitle": "The Unofficial Guide",
                        "bookDisplayNumber": "17",
                        "volumeSeries": [
                            {
                                "seriesId": "VJn3GgAAABCigM",
                                "seriesBookType": "ISSUE",
                                "orderNumber": 4
                            }
                        ]
                    }
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "PARTIAL",
                    "embeddable": true,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": false
                    },
                    "pdf": {
                        "isAvailable": true,
                        "acsTokenLink": "http://books.google.com/books/download/Naruto_Forever-sample-pdf.acsm?id=3bdbiVvMph4C&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=3bdbiVvMph4C&hl=&as_pt=BOOKS&source=gbs_api",
                    "accessViewStatus": "SAMPLE",
                    "quoteSharingAllowed": false
                },
                "searchInfo": {
                    "textSnippet": "In this must-have for anime fans of &quot;Naruto,&quot; otaku researchers have dug deep to find the answers to a plethora of questions that this complex and endlessly fascinating story has raised, as well as uncovering the many secrets surrounding ..."
                }
            },
            {
                "kind": "books#volume",
                "id": "85iumE19cQYC",
                "etag": "NVsfxMsikWM",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/85iumE19cQYC",
                "volumeInfo": {
                    "title": "Naruto, Vol. 10",
                    "subtitle": "A Splendid Ninja",
                    "authors": [
                        "Masashi Kishimoto"
                    ],
                    "publisher": "VIZ Media LLC",
                    "publishedDate": "2011-01-25",
                    "description": "With only a few matches left to be fought in the preliminaries to the third portion of the Journeyman Ninja Selection Exams, the highly anticipated bout between mysterious Sand ninja Gaara and intense, earnest Konoha ninja Rock Lee begins. Will Gaara’s bloodlust and his strange powers of sand manipulation be too much for Lee to handle? Or could Lee prove that dedication and an amazing work ethic are enough to make him a splendid ninja? -- VIZ Media",
                    "industryIdentifiers": [
                        {
                            "type": "ISBN_13",
                            "identifier": "9781421544496"
                        },
                        {
                            "type": "ISBN_10",
                            "identifier": "1421544490"
                        }
                    ],
                    "readingModes": {
                        "text": true,
                        "image": false
                    },
                    "pageCount": 178,
                    "printType": "BOOK",
                    "categories": [
                        "Comics & Graphic Novels"
                    ],
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": true,
                    "contentVersion": "1.4.4.0.preview.2",
                    "panelizationSummary": {
                        "containsEpubBubbles": true,
                        "containsImageBubbles": true,
                        "epubBubbleVersion": "054ab48c11bcc292",
                        "imageBubbleVersion": "054ab48c11bcc292"
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=85iumE19cQYC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=85iumE19cQYC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=85iumE19cQYC&dq=naruto&hl=&as_pt=BOOKS&cd=3&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=85iumE19cQYC&dq=naruto&hl=&as_pt=BOOKS&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Naruto_Vol_10.html?hl=&id=85iumE19cQYC",
                    "seriesInfo": {
                        "kind": "books#volume_series_info",
                        "shortSeriesBookTitle": "A Splendid Ninja",
                        "bookDisplayNumber": "10",
                        "volumeSeries": [
                            {
                                "seriesId": "p2rcFwAAABB6fM",
                                "seriesBookType": "COLLECTED_EDITION",
                                "orderNumber": 10
                            }
                        ]
                    }
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": true
                    },
                    "pdf": {
                        "isAvailable": true
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=85iumE19cQYC&hl=&as_pt=BOOKS&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                },
                "searchInfo": {
                    "textSnippet": "With only a few matches left to be fought in the preliminaries to the third portion of the Journeyman Ninja Selection Exams, the highly anticipated bout between mysterious Sand ninja Gaara and intense, earnest Konoha ninja Rock Lee begins."
                }
            },
            {
                "kind": "books#volume",
                "id": "rs1CDwAAQBAJ",
                "etag": "D+IngNEagyc",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/rs1CDwAAQBAJ",
                "volumeInfo": {
                    "title": "Focus On: 100 Most Popular Fantasy Anime and Manga",
                    "authors": [
                        "Wikipedia contributors"
                    ],
                    "publisher": "e-artnow sro",
                    "readingModes": {
                        "text": true,
                        "image": true
                    },
                    "pageCount": 1062,
                    "printType": "BOOK",
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": false,
                    "contentVersion": "1.2.3.0.preview.3",
                    "panelizationSummary": {
                        "containsEpubBubbles": false,
                        "containsImageBubbles": false
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=rs1CDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=rs1CDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=rs1CDwAAQBAJ&pg=PA2&dq=naruto&hl=&as_pt=BOOKS&cd=4&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=rs1CDwAAQBAJ&dq=naruto&hl=&as_pt=BOOKS&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Focus_On_100_Most_Popular_Fantasy_Anime.html?hl=&id=rs1CDwAAQBAJ"
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "PARTIAL",
                    "embeddable": true,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": true,
                        "acsTokenLink": "http://books.google.com/books/download/Focus_On_100_Most_Popular_Fantasy_Anime-sample-epub.acsm?id=rs1CDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                    },
                    "pdf": {
                        "isAvailable": true,
                        "acsTokenLink": "http://books.google.com/books/download/Focus_On_100_Most_Popular_Fantasy_Anime-sample-pdf.acsm?id=rs1CDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=rs1CDwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
                    "accessViewStatus": "SAMPLE",
                    "quoteSharingAllowed": false
                },
                "searchInfo": {
                    "textSnippet": "... <b>Naruto</b> – Best Hit Collection 2 w / DVD , Limited Pressing &quot; . CDJapan . Archived from the original January 24 , 2016 . on 131. ^ &quot; <b>Naruto</b> in Rock -The Very Best Hit Collection Instrumental Version- &quot; . CDJapan . Archived from the&nbsp;..."
                }
            },
            {
                "kind": "books#volume",
                "id": "HNhCpMNmu58C",
                "etag": "itdUF9Sgcds",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/HNhCpMNmu58C",
                "volumeInfo": {
                    "title": "Anime and Manga",
                    "publisher": "PediaPress",
                    "readingModes": {
                        "text": false,
                        "image": true
                    },
                    "pageCount": 1563,
                    "printType": "BOOK",
                    "averageRating": 5,
                    "ratingsCount": 1,
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": false,
                    "contentVersion": "0.1.0.0.preview.1",
                    "panelizationSummary": {
                        "containsEpubBubbles": false,
                        "containsImageBubbles": false
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=HNhCpMNmu58C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=HNhCpMNmu58C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=HNhCpMNmu58C&pg=PA1418&dq=naruto&hl=&as_pt=BOOKS&cd=5&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=HNhCpMNmu58C&dq=naruto&hl=&as_pt=BOOKS&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Anime_and_Manga.html?hl=&id=HNhCpMNmu58C"
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "PARTIAL",
                    "embeddable": true,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": false
                    },
                    "pdf": {
                        "isAvailable": true,
                        "acsTokenLink": "http://books.google.com/books/download/Anime_and_Manga-sample-pdf.acsm?id=HNhCpMNmu58C&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=HNhCpMNmu58C&hl=&as_pt=BOOKS&source=gbs_api",
                    "accessViewStatus": "SAMPLE",
                    "quoteSharingAllowed": false
                },
                "searchInfo": {
                    "textSnippet": "... <b>Naruto</b> , Volume 23. Viz Media . ISBN 1-4215- 1859-7 . 6495 Kishimoto , Masashi ( 2006 ) . &quot; Chapter 325 &quot; . <b>Naruto</b> , Volume 36. Shueisha . ISBN 4-08-874288- 5 . 6496 Kishimoto , Masashi ( 2007 ) . &quot; Chapter 338 &quot; . <b>Naruto</b> , Volume 37&nbsp;..."
                }
            },
            {
                "kind": "books#volume",
                "id": "fRTwAQAAQBAJ",
                "etag": "4aaCNDxyyB0",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/fRTwAQAAQBAJ",
                "volumeInfo": {
                    "title": "Naruto, Vol. 42",
                    "subtitle": "The Secret of the Mangekyo",
                    "authors": [
                        "Masashi Kishimoto"
                    ],
                    "publisher": "VIZ Media LLC",
                    "publishedDate": "2011-07-25",
                    "description": "To truly end the Akatsuki's reign of pain, Naruto's teacher Jiraiya must delve deep into the past to uncover the secret of Pain's origin. At the same time, Sasuke moves toward the final battle of the Uchiha brothers when he closes in on the elusive Itachi! -- VIZ Media",
                    "industryIdentifiers": [
                        {
                            "type": "ISBN_13",
                            "identifier": "9781421545226"
                        },
                        {
                            "type": "ISBN_10",
                            "identifier": "1421545225"
                        }
                    ],
                    "readingModes": {
                        "text": true,
                        "image": false
                    },
                    "pageCount": 190,
                    "printType": "BOOK",
                    "categories": [
                        "Comics & Graphic Novels"
                    ],
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": true,
                    "contentVersion": "1.2.2.0.preview.2",
                    "panelizationSummary": {
                        "containsEpubBubbles": true,
                        "containsImageBubbles": true,
                        "epubBubbleVersion": "33890fdabe88a3e3",
                        "imageBubbleVersion": "33890fdabe88a3e3"
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=fRTwAQAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=fRTwAQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=fRTwAQAAQBAJ&dq=naruto&hl=&as_pt=BOOKS&cd=6&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=fRTwAQAAQBAJ&dq=naruto&hl=&as_pt=BOOKS&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Naruto_Vol_42.html?hl=&id=fRTwAQAAQBAJ",
                    "seriesInfo": {
                        "kind": "books#volume_series_info",
                        "shortSeriesBookTitle": "The Secret of the Mangekyo",
                        "bookDisplayNumber": "42",
                        "volumeSeries": [
                            {
                                "seriesId": "p2rcFwAAABB6fM",
                                "seriesBookType": "COLLECTED_EDITION",
                                "orderNumber": 42
                            }
                        ]
                    }
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": true
                    },
                    "pdf": {
                        "isAvailable": true
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=fRTwAQAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                },
                "searchInfo": {
                    "textSnippet": "To truly end the Akatsuki&#39;s reign of pain, Naruto&#39;s teacher Jiraiya must delve deep into the past to uncover the secret of Pain&#39;s origin."
                }
            },
            {
                "kind": "books#volume",
                "id": "CnabBgAAQBAJ",
                "etag": "FR4mlpZ2t1w",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/CnabBgAAQBAJ",
                "volumeInfo": {
                    "title": "Naruto, Vol. 69",
                    "subtitle": "The Start of a Crimson Spring",
                    "authors": [
                        "Masashi Kishimoto"
                    ],
                    "publisher": "VIZ Media LLC",
                    "publishedDate": "2015-03-03",
                    "description": "With Obito finally defeated, all attention now turns to the man behind everything bad that has happened, Madara. Naruto and Sasuke will need to work together if they have any chance of stopping this fearsome foe. But what will happen when the Nine Tails fox demon is forcibly removed from Naruto?! -- VIZ Media",
                    "industryIdentifiers": [
                        {
                            "type": "ISBN_13",
                            "identifier": "9781421582900"
                        },
                        {
                            "type": "ISBN_10",
                            "identifier": "1421582902"
                        }
                    ],
                    "readingModes": {
                        "text": true,
                        "image": false
                    },
                    "pageCount": 209,
                    "printType": "BOOK",
                    "categories": [
                        "Comics & Graphic Novels"
                    ],
                    "averageRating": 5,
                    "ratingsCount": 1,
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": true,
                    "contentVersion": "1.3.3.0.preview.2",
                    "panelizationSummary": {
                        "containsEpubBubbles": true,
                        "containsImageBubbles": true,
                        "epubBubbleVersion": "cad99c891297bf4b",
                        "imageBubbleVersion": "cad99c891297bf4b"
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=CnabBgAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=CnabBgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=CnabBgAAQBAJ&dq=naruto&hl=&as_pt=BOOKS&cd=7&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=CnabBgAAQBAJ&dq=naruto&hl=&as_pt=BOOKS&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Naruto_Vol_69.html?hl=&id=CnabBgAAQBAJ",
                    "seriesInfo": {
                        "kind": "books#volume_series_info",
                        "shortSeriesBookTitle": "The Start of a Crimson Spring",
                        "bookDisplayNumber": "69",
                        "volumeSeries": [
                            {
                                "seriesId": "p2rcFwAAABB6fM",
                                "seriesBookType": "COLLECTED_EDITION",
                                "orderNumber": 69
                            }
                        ]
                    }
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": true
                    },
                    "pdf": {
                        "isAvailable": true
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=CnabBgAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                },
                "searchInfo": {
                    "textSnippet": "With Obito finally defeated, all attention now turns to the man behind everything bad that has happened, Madara."
                }
            },
            {
                "kind": "books#volume",
                "id": "HQvwAQAAQBAJ",
                "etag": "mm5hj0CHALo",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/HQvwAQAAQBAJ",
                "volumeInfo": {
                    "title": "Naruto, Vol. 20",
                    "subtitle": "Naruto vs. Sasuke",
                    "authors": [
                        "Masashi Kishimoto"
                    ],
                    "publisher": "VIZ Media LLC",
                    "publishedDate": "2011-04-04",
                    "description": "It’s ninja vs. ninja! And Sakura is caught in the middle! With the Sound Four looming close and Lee in the hospital, all three friends hurl toward an uncertain future and find that growing up sometimes means growing apart. -- VIZ Media",
                    "industryIdentifiers": [
                        {
                            "type": "ISBN_13",
                            "identifier": "9781421544700"
                        },
                        {
                            "type": "ISBN_10",
                            "identifier": "1421544709"
                        }
                    ],
                    "readingModes": {
                        "text": true,
                        "image": false
                    },
                    "pageCount": 188,
                    "printType": "BOOK",
                    "categories": [
                        "Comics & Graphic Novels"
                    ],
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": true,
                    "contentVersion": "2.2.2.0.preview.2",
                    "panelizationSummary": {
                        "containsEpubBubbles": true,
                        "containsImageBubbles": true,
                        "epubBubbleVersion": "08f228bfef815f26",
                        "imageBubbleVersion": "08f228bfef815f26"
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=HQvwAQAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=HQvwAQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=HQvwAQAAQBAJ&dq=naruto&hl=&as_pt=BOOKS&cd=8&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=HQvwAQAAQBAJ&dq=naruto&hl=&as_pt=BOOKS&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Naruto_Vol_20.html?hl=&id=HQvwAQAAQBAJ",
                    "seriesInfo": {
                        "kind": "books#volume_series_info",
                        "shortSeriesBookTitle": "Naruto vs. Sasuke",
                        "bookDisplayNumber": "20",
                        "volumeSeries": [
                            {
                                "seriesId": "p2rcFwAAABB6fM",
                                "seriesBookType": "COLLECTED_EDITION",
                                "orderNumber": 20
                            }
                        ]
                    }
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": true
                    },
                    "pdf": {
                        "isAvailable": true
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=HQvwAQAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                },
                "searchInfo": {
                    "textSnippet": "It’s ninja vs. ninja! And Sakura is caught in the middle! With the Sound Four looming close and Lee in the hospital, all three friends hurl toward an uncertain future and find that growing up sometimes means growing apart. -- VIZ Media"
                }
            },
            {
                "kind": "books#volume",
                "id": "pQBeCgAAQBAJ",
                "etag": "QCBMe2swzBk",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/pQBeCgAAQBAJ",
                "volumeInfo": {
                    "title": "Naruto 42",
                    "authors": [
                        "Masashi Kishimoto"
                    ],
                    "publisher": "Carlsen Manga",
                    "publishedDate": "2015-08-28",
                    "description": "Naruto ist ein junger Shinobi mit einem unverbesserlichen Hang zum Unfug. Er hat einen wilden Sinn für Humor, aber Naruto nimmt seine Mission, der größte Ninja der Welt zu werden, absolut ernst! Pain, der in Amegakure als Gott angesehen wird – das sind in Wirklichkeit sechs Krieger mit Rin'negan. Zu dieser Erkenntnis gelangt Jiraiya, nachdem er unter ihnen seinen einstigen Schüler Yahiko entdeckt. Doch ist das wirklich schon Pains ganzes Geheimnis?! Sasuke sieht derweil Itachi wieder – und ein heftiger Kampf unter Brüdern entbrennt!",
                    "industryIdentifiers": [
                        {
                            "type": "ISBN_13",
                            "identifier": "9783646703825"
                        },
                        {
                            "type": "ISBN_10",
                            "identifier": "3646703822"
                        }
                    ],
                    "readingModes": {
                        "text": true,
                        "image": false
                    },
                    "pageCount": 188,
                    "printType": "BOOK",
                    "categories": [
                        "Comics & Graphic Novels"
                    ],
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": true,
                    "contentVersion": "1.12.15.0.preview.2",
                    "panelizationSummary": {
                        "containsEpubBubbles": true,
                        "containsImageBubbles": true,
                        "epubBubbleVersion": "5a39e195e056b71b",
                        "imageBubbleVersion": "5a39e195e056b71b"
                    },
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=pQBeCgAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=pQBeCgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "de",
                    "previewLink": "http://books.google.com/books?id=pQBeCgAAQBAJ&dq=naruto&hl=&as_pt=BOOKS&cd=9&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=pQBeCgAAQBAJ&dq=naruto&hl=&as_pt=BOOKS&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Naruto_42.html?hl=&id=pQBeCgAAQBAJ"
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": true
                    },
                    "pdf": {
                        "isAvailable": true
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=pQBeCgAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                },
                "searchInfo": {
                    "textSnippet": "Naruto ist ein junger Shinobi mit einem unverbesserlichen Hang zum Unfug."
                }
            },
            {
                "kind": "books#volume",
                "id": "sBkergEACAAJ",
                "etag": "AJYIVVva/Z4",
                "selfLink": "https://www.googleapis.com/books/v1/volumes/sBkergEACAAJ",
                "volumeInfo": {
                    "title": "Naruto",
                    "authors": [
                        "Masashi Kishimoto"
                    ],
                    "publisher": "VIZ Media LLC",
                    "publishedDate": "2015-10-06",
                    "description": "Naruto is a young shinobi with an incorrigible knack for mischief. He's got a wild sense of humor, but Naruto is completely serious about his mission to be the world's greatest ninja! The peace following Kaguya's defeat is short-lived as Sasuke tries to take total control. Can Naruto change his old friend's mind and bring true peace to the ninja world in the final volume of Naruto?",
                    "industryIdentifiers": [
                        {
                            "type": "ISBN_10",
                            "identifier": "1421582848"
                        },
                        {
                            "type": "ISBN_13",
                            "identifier": "9781421582849"
                        }
                    ],
                    "readingModes": {
                        "text": false,
                        "image": false
                    },
                    "pageCount": 205,
                    "printType": "BOOK",
                    "categories": [
                        "Comics & Graphic Novels"
                    ],
                    "maturityRating": "NOT_MATURE",
                    "allowAnonLogging": false,
                    "contentVersion": "preview-1.0.0",
                    "comicsContent": true,
                    "imageLinks": {
                        "smallThumbnail": "http://books.google.com/books/content?id=sBkergEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                        "thumbnail": "http://books.google.com/books/content?id=sBkergEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "language": "en",
                    "previewLink": "http://books.google.com/books?id=sBkergEACAAJ&dq=naruto&hl=&as_pt=BOOKS&cd=10&source=gbs_api",
                    "infoLink": "http://books.google.com/books?id=sBkergEACAAJ&dq=naruto&hl=&as_pt=BOOKS&source=gbs_api",
                    "canonicalVolumeLink": "https://books.google.com/books/about/Naruto.html?hl=&id=sBkergEACAAJ"
                },
                "saleInfo": {
                    "country": "IL",
                    "saleability": "NOT_FOR_SALE",
                    "isEbook": false
                },
                "accessInfo": {
                    "country": "IL",
                    "viewability": "NO_PAGES",
                    "embeddable": false,
                    "publicDomain": false,
                    "textToSpeechPermission": "ALLOWED",
                    "epub": {
                        "isAvailable": false
                    },
                    "pdf": {
                        "isAvailable": false
                    },
                    "webReaderLink": "http://play.google.com/books/reader?id=sBkergEACAAJ&hl=&as_pt=BOOKS&source=gbs_api",
                    "accessViewStatus": "NONE",
                    "quoteSharingAllowed": false
                },
                "searchInfo": {
                    "textSnippet": "The peace following Kaguya&#39;s defeat is short-lived as Sasuke tries to take total control. Can Naruto change his old friend&#39;s mind and bring true peace to the ninja world in the final volume of Naruto?"
                }
            }
        ]
    }
}

