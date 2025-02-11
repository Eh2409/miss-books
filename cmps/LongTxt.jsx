const { useState, useEffect, useRef } = React

export function LongTxt ({description,length = 100}) {

    const [isReadMore, setIsReadMore] = useState(false)

    const text = isReadMore ? description + ' ' : description.substring(1, length) + '... '

    function onsetReadMore() {
        setIsReadMore(prev => prev = !isReadMore)
    }

    if (!text) return ''
    return (
        <section >
            {text}
            {text.length >= length && 
            <span className = {`read-bth ${isReadMore ? 'less' : 'more'}`} href="#" onClick={onsetReadMore}>
                {isReadMore ? 'read less' : 'read more'}
            </span>}
        </section>
    )
}