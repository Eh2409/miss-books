
export function RateByTextbox({ onInpitReview }) {

    return (
        <input type="number" min='1' max='5' name='rating' className='text-rating' onChange={onInpitReview} placeholder='Rate' />
    )
}