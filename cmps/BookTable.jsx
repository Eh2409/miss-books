import { BookTableRow } from "./BookTableRow.jsx"

export function BookTable({ books, onRemoveBook, onSetIsRemoveBookload, isRemoveBookload }) {

    return (
        <section>
            <table className='book-table'>
                <thead>
                    <tr>
                        <th>read more</th>
                        <th>title</th>
                        <th>price</th>
                        <th>rating</th>
                        <th>btns</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => <BookTableRow
                        key={book.id}
                        book={book}
                        onRemoveBook={onRemoveBook}
                        onSetIsRemoveBookload={onSetIsRemoveBookload}
                        isRemoveBookload={isRemoveBookload}
                    />)}

                </tbody>
            </table>
        </section>
    )

}