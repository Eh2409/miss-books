
export function UserReview ({reviews,onRemoveReview}) {
  
    return (
        <section>
             {reviews && reviews.map((review,idx)=> {
            const {id,avatar,color,fullname,readAt,rating,comment} = review
          return  <div key={idx} className='user-review'>
            <button onClick={()=>(onRemoveReview(id))} className='remove-btn'>x</button>
            <img src={avatar} alt="user-avatar" className='user-avatar'   style={{ backgroundColor: color }}  />
            <div className='review-content'>
                <div className='full-name'><span>Name:</span> {fullname}</div>
                <div className='read-at'><span>Read At: </span> {new Date(readAt).toLocaleDateString()}</div>
                <div className='rating'> <span>Rating:</span>{(`⭐`).repeat(rating)}</div>
                <pre className='comment'>{comment}</pre>
            </div>
            </div>
        })}
        </section>
    )
}