import { ReviewPreview } from "./ReviewPreview.jsx"

export function ReviewsList({ reviews, onRemoveReview }) {

  return (
    <section className='reviews-list'>

      <h2>Users Reviews</h2>

      <ul>
        {reviews && reviews.map((review, idx) => {
          return <li key={idx} className='user-review'>
            <ReviewPreview review={review} />
            <button onClick={() => (onRemoveReview(review.id))} className='remove-btn'>x</button>
          </li>
        })}
      </ul>
    </section>
  )
}