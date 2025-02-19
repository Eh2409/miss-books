
export function RateByStars({ onSetIsChecked, isChecked, onInpitReview }) {
    return (
        <div className="star-rating">
            <input type="radio" name="rating" id="star-5" value="5" checked={isChecked === '5'}
                onChange={(event) => { onInpitReview(event); onSetIsChecked(event) }} />
            <label htmlFor="star-5" className="fa star" ></label>
            <input type="radio" name="rating" id="star-4" value="4" checked={isChecked === '4'}
                onChange={(event) => { onInpitReview(event); onSetIsChecked(event) }} />
            <label htmlFor="star-4" className="fa star"></label>
            <input type="radio" name="rating" id="star-3" value="3" checked={isChecked === '3'}
                onChange={(event) => { onInpitReview(event); onSetIsChecked(event) }} />
            <label htmlFor="star-3" className="fa star"></label>
            <input type="radio" name="rating" id="star-2" value="2" checked={isChecked === '2'}
                onChange={(event) => { onInpitReview(event); onSetIsChecked(event) }} />
            <label htmlFor="star-2" className="fa star"></label>
            <input type="radio" name="rating" id="star-1" value="1" checked={isChecked === '1'}
                onChange={(event) => { onInpitReview(event); onSetIsChecked(event) }} />
            <label htmlFor="star-1" className="fa star"></label>
        </div>
    )
}