
export function RateBySelect({ onInpitReview }) {

    return (
        <select name="rating" id="select-rating" onChange={onInpitReview}>
            <option value="">Rate</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    )
}