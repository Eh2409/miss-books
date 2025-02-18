
export function MoreFilters({ onSetEditFilterBy, filterBy }) {

    const { pageCount, authors, publishedDate, isOnSale, categories, rating } = filterBy

    return (
        <React.Fragment>
            <label htmlFor="pageCount">min page Count:</label>
            <input type="number" name='pageCount' id='pageCount' value={+pageCount || ''} onChange={onSetEditFilterBy} placeholder='Enter book page count number' />
            <label htmlFor="publishedDate">min published Date:</label>
            <input type="number" min="1900" max="2099" step="1" name='publishedDate' id='publishedDate' value={+publishedDate || ''} onChange={onSetEditFilterBy} placeholder='Enter book publish year' />
            <label htmlFor="authors">authors:</label>
            <input type="search" name='authors' id='authors' value={authors} onChange={onSetEditFilterBy} placeholder='Enter book authors name' />
            <label htmlFor="categories">category:</label>
            <input type="search" name='categories' id='categories' value={categories} onChange={onSetEditFilterBy} placeholder='Enter book category name' />
            <label htmlFor="isOnSale">on sale:</label>
            <input type="checkbox" name='isOnSale' id='isOnSale' checked={isOnSale} onChange={onSetEditFilterBy} />
            <label htmlFor="rating">min rating{` (${rating}) `}:</label>
            <input type="range" min="0" max="5" step="1" value={rating || 0} name='rating' id='rating' onChange={onSetEditFilterBy} placeholder='Enter book publish year' />
        </React.Fragment>
    )
}