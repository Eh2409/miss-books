import { asyncStorageService } from './async-storage.service.js';
import { storageService } from './storage.service.js';
import { utilService } from './util.service.js';

export const bookSerevice = {
    query,
    remove,
    get,
    save,
    getDefaultFilterBy,
    isBookInData,
    getEmptyBook,
    addGoogleBook,
    getFilterFromSearchParams,
    getBookFieldPercentages
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
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }

            if (filterBy.authors) {
                const regex = new RegExp(filterBy.authors, 'i')
                books = books.filter(book => regex.test(book.authors))
            }

            if (filterBy.categories) {
                const regex = new RegExp(filterBy.categories, 'i')
                books = books.filter(book => regex.test(book.categories))
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

            if (filterBy.rating) {
                books = books.filter(book => book.rating >= filterBy.rating)
            }

            if (filterBy.publishedDate) {
                books = books.filter(book => book.publishedDate >= filterBy.publishedDate)
            }

            return books
        })
}

function getDefaultFilterBy() {
    return { title: '', price: '', pageCount: '', authors: '', publishedDate: '', isOnSale: false, categories: '', rating: 0 }
}


function getFilterFromSearchParams(searchParams) {

    const defaultFilterBy = { ...getDefaultFilterBy() }
    const filterBy = {}

    for (const field in defaultFilterBy) {
        if (field === 'isOnSale') {
            filterBy[field] = searchParams.get(`${field}`) === 'true' ? true : false
        } else {
            filterBy[field] = searchParams.get(`${field}`) || defaultFilterBy[field]
        }
    }

    return filterBy
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
        language: 'en',
        listPrice: {
            amount: 0,
            currencyCode: 'USD',
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


function getBookFieldPercentages(field) {
    return asyncStorageService.query(BOOK_KEY)
        .then(books => {
            const fieldCounts = countBooksByField(books, field)
            const fieldPercentages = Object.keys(fieldCounts).map(title =>
            ({
                title: title,
                value: Math.round((fieldCounts[title] / books.length) * 100)
            })
            )
            return fieldPercentages
        })
}

function countBooksByField(books, field) {
    return books.reduce((acc, book) => {
        const bookField = book[field]
        console.log(bookField);
        if (!acc[bookField]) acc[bookField] = 1
        else acc[bookField]++
        return acc
    }, {})
}


function _createBooks() {
    const books = storageService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) _creatDemoBooks()
}

function _creatDemoBooks() {
    const books = _demoData()
    storageService.saveToStorage(BOOK_KEY, books)
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
        rating: 4,
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
        reviews: [
            {
                "avatar": "http://127.0.0.1:5500/assets/img/avatar/1.png",
                "color": "#e66465",
                "fullname": "iron man",
                "readAt": 1739664000000,
                "rating": 4,
                "comment": "Great comic\n",
                "id": "YqE5Zn"
            }, {
                "avatar": "assets/img/avatar/3.png",
                "color": "#66beea",
                "fullname": "captain america",
                "readAt": 1739664000000,
                "rating": 5,
                "comment": "The best comic in the world, cool spedman!\n",
                "id": "ReGxav"
            }
        ],
    },
    {
        "isbn": "9780785178446",
        "title": "Invincible Iron Man Vol. 5",
        "rating": 0,
        "subtitle": "Stark Resilient Book 1",
        "authors": [
            "Matt Fraction"
        ],
        "publishedDate": 2011,
        "description": "The Hammer Girls unleash DETROIT STEEL on a world hardly ready for that much metal and chrome, and God help anyone that gets in his way. Tony keeps sifting through the ashes of his old life and tries to rebuild who he is and what he does. Rhodey struggles to be a man of war in a peacetime empire. COLLECTING: Invincible Iron Man #25-28",
        "pageCount": 131,
        "categories": [
            "Comics & Graphic Novels"
        ],
        "thumbnail": "assets/img/ComicsCovers/4.jpg",
        "language": "en",
        "listPrice": {
            "amount": 6.99,
            "currencyCode": "USD",
            "isOnSale": false
        },
        "reviews": [],
        "isOnSale": false,
        "id": "v860X",
        "nextBook": "yNxrrf",
        "prevBook": "kuWjKn"
    }, {
        "isbn": "9781803367712",
        "title": "Captain America: The Shield of Sam Wilson",
        "rating": 0,
        "subtitle": "",
        "authors": [
            "Gloria J. Browne-Marshall",
            "Sheree Renée Thomas",
            "Alex Simmons",
        ],
        "publishedDate": 2025,
        "description": "The new Captain America has a big shield to carry. Is he up to the task? Find out in these subversive, exciting and uplifting short stories inspired by the Marvel comic book universe, written by celebrated Black authors. The new Captain America has a heavy shield to hold. As a black man in America, Sam Wilson knows he has to be twice as good to get half as much credit. He must be a paragon of virtue for a nation that has mixed feelings towards him. In these thirteen brand-new stories, the all-new Captain America must thwart an insurrectionist plot, travel back in time, foil a racist conspiracy, and save the world over and over again. As the Falcon, Sam Wilson was the first African-American superhero in mainstream comic books. Sam's trials and tribulations reflect the struggles many Black Americans go through today, as Sam balances fighting supervillains and saving the world with the difficulties of being the first Black Captain America. This action-packed anthology inspired by the Marvel comic book universe, will see Sam team up with familiar friends like Steve Rogers, Redwing and Nomad, while fighting HYDRA, Sabretooth, Kingpin, and other infamous villains. These are stories of death-defying courage, Black love and self-discovery. These are the stories of a super hero learning what it means to be a symbol. These are the stories of Sam Wilson. Featuring original stories by L.L. McKinney, Maurice Broaddus, Jesse J. Holland, Gar Anthony Haywood, Nicole Givens Kurtz, Kyoko M., Sheree Renee Thomas, Gary Phillips, Danian Jerry, Gloria J. Browne Marshall, Glenn Parris, Christopher Chambers, Alex Simmons.",
        "pageCount": 302,
        "categories": [
            "Fiction"
        ],
        "thumbnail": "assets/img/ComicsCovers/5.jpg",
        "language": "en",
        "listPrice": {
            "amount": 313,
            "currencyCode": "USD",
            "isOnSale": false
        },
        "reviews": [],
        "isOnSale": true,
        "id": "RoXIT",
        "nextBook": "LNqYLZ",
        "prevBook": "v860X"
    }, {
        "isbn": "9781302531591",
        "title": "Scarlet Witch By Steve Orlando Vol. 4",
        "rating": 0,
        "subtitle": "Queen Of Chaos",
        "authors": [
            "Steve Orlando"
        ],
        "publishedDate": 2025,
        "description": "Collects Scarlet Witch (2024) #1-5 and material from Crypt Of Shadows (2023) #1. Steve Orlando's spellbinding saga is full of surprises! The Scarlet Witch has carved out a haven for herself in upstate New York, but it's all about to go up in flames. Wanda's newfound peace has drawn the wrath of a primal force unlike anything she's ever faced before, and it won't stop until it razes Wanda's world. A clash of titans awaits as Wanda and her allies fight for all she holds dear! But what happens when an unstoppable force meets the end of all things? When pure chaos meets pure destruction? Wanda's about to find out - if she survives long enough! Trapped in the realm of the Queen of Nevers, the Scarlet Witch fights to reach the land of the living - and comes face to face with Lore, her necromantic multiversal counterpart! Plus: Wanda teams up with Daredevil to exorcise a murderous spirit from the subway tunnels of Hell's Kitchen!",
        "pageCount": 143,
        "categories": [
            "Comics & Graphic Novels"
        ],
        "thumbnail": "assets/img/ComicsCovers/6.jpg",
        "language": "en",
        "listPrice": {
            "amount": 304,
            "currencyCode": "USD",
            "isOnSale": false
        },
        "reviews": [],
        "isOnSale": false,
        "id": "4LouT",
        "nextBook": "YX6dig",
        "prevBook": "RoXIT"
    }, {
        "isbn": "9781302530563",
        "title": "Deadpool By Cody Ziglar Vol. 1",
        "rating": 0,
        "subtitle": "Blood Bond",
        "authors": [
            "Cody Ziglar"
        ],
        "publishedDate": 2024,
        "description": "Collects Deadpool (2024) #1-5. A new era for the Merc with a Mouth - and a gun, and a sword! CODY ZIGLAR (Futurama, MILES MORALES: SPIDER-MAN) has a wild ride planned for the regenerating degenerate - beginning by introducing a terrifying new villain who won't stop until he catches Wade Wilson in his Death Grip! But Deadpool has had (well, stolen) the great idea to start his own boutique mercenary agency. A startup is a lot of work though, so Wade asks Taskmaster to run it! Their first assignment? Finding out who this Death Grip is and why he's so interested in Deadpool. Their next problem? Someone has hired Crossbones to hunt them down! Plus: A surprising new recruit joins the fun, and that calls for a training montage! And Deadpool's healing factor is tested to its limits. At what point will the Merc's mouth stop growing back?",
        "pageCount": 135,
        "categories": [
            "Comics & Graphic Novels"
        ],
        "thumbnail": "assets/img/ComicsCovers/7.jpg",
        "language": "en",
        "listPrice": {
            "amount": 8.99,
            "currencyCode": "USD",
            "isOnSale": false
        },
        "reviews": [],
        "isOnSale": false,
        "id": "apSeo",
        "nextBook": "mf5Gs4",
        "prevBook": "DD2LU"
    }, {
        "isbn": "9781506742656",
        "title": "Marvel's Spider-Man: Miles Morales",
        "rating": 0,
        "subtitle": "",
        "authors": [],
        "publishedDate": 2024,
        "description": "Marvel’s Spider-Man: Miles Morales returns! Relive the adventure of the award-winning video game Marvel’s Spider-Man: Miles Morales with this gorgeous poster collection featuring key moments from the game! With perforated edges, these iconic images are easy to remove for display purposes.",
        "pageCount": 46,
        "categories": [
            "Art"
        ],
        "thumbnail": "assets/img/ComicsCovers/8.jpg",
        "language": "en",
        "listPrice": {
            "amount": 208,
            "currencyCode": "USD",
            "isOnSale": false
        },
        "reviews": [],
        "isOnSale": true,
        "id": "Ecg6a",
        "nextBook": "mjUGrO",
        "prevBook": "apSeo"
    }, {
        "isbn": "1302934627",
        "title": "Spider-Punk",
        "rating": 0,
        "subtitle": "Battle of the Banned",
        "authors": [
            "Cody Ziglar"
        ],
        "publishedDate": 2023,
        "description": "Collects Spider-Punk #1-5. Anarchy in the Spider-Verse! Hobie Brown is the head-spiked Spider-Punk - all set to protect Earth-138 with his ax in hand and his chaotic band of punk-rockin' heroes backing him! But even though the Norman Osborn of Hobie's dimension is dead, will the chaos he created be too much for Spider-Punk and the gang to handle? What secrets lie under the community center Spidey and his crew call home base? And why is Taskmaster crashing the party to stomp out Spider-Punk? It all ties back to one thing, and Hobie had better figure it out fast. It's time to take to the road in the Spider-Van, but Hobie and crew will soon end up joining Daredevil in the giant shadow of the Kingpin! Prepare for an arachnid adventure like you've never seen before! Kick it!",
        "pageCount": 0,
        "categories": [
            "Comics & Graphic Novels"
        ],
        "thumbnail": "assets/img/ComicsCovers/9.jpg",
        "language": "en",
        "listPrice": {
            "amount": 272,
            "currencyCode": "USD",
            "isOnSale": false
        },
        "reviews": [],
        "isOnSale": false,
        "id": "kYpHT",
        "nextBook": "mjUGrO",
        "prevBook": "Ecg6a"
    }, {
        "isbn": "9781302504823",
        "title": "Wolverine",
        "rating": 0,
        "subtitle": "Savage Origins",
        "authors": [
            "Ben Acker",
            "Ben Blacker",
            "Mark Millar"
        ],
        "publishedDate": 2018,
        "description": "Collects Wolverine: Season One, Wolverine (2003) #20. Discovered as a feral mutant prowling the wilds! Recruited as a covert operative by a secretive government agency! Destined to pursue a dream of peaceful coexistence between man and mutant! Witness the birth of the Wolverine as the man called Logan makes his journey from animalistic wildling to beloved X-Man. Including Logans first blockbuster battle with the Hulk, as well as pivotal appearances by Sabretooth and Wendigo, this blood-splattered tale features a contemporary retelling of the Clawed Canucks formative years! Plus: A brainwashed Wolverine slices and dices his way through foes and friends alike in WOLVERINE (2003) #20!",
        "pageCount": 141,
        "categories": [
            "Comics & Graphic Novels"
        ],
        "thumbnail": "assets/img/ComicsCovers/23.jpg",
        "language": "en",
        "listPrice": {
            "amount": 325,
            "currencyCode": "USD",
            "isOnSale": false
        },
        "reviews": [],
        "isOnSale": false,
        "id": "DKHPj",
        "nextBook": "u1HMkb",
        "prevBook": "kYpHT"
    }]
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
