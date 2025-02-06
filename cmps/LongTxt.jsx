const { useState, useEffect, useRef } = React

export function LongTxt ({description,length = 100}) {
  
    const [text, setText] = useState(description)
    const [readMore, setReadMore] = useState(false)

    useEffect(()=>{
        setText(splitText(description) )
    },[readMore,description])


    function splitText(text) {
        if (text.length > length && !readMore) {  
            var text = text.slice(0,length) + '...'
            return  text
        } else{
            return text + ' '
        }
    }

    function onsetReadMore() {
        setReadMore(prev => prev = !readMore)
    }

    if (!text) return ''
    return (
        <section >
            {text}
            {text.length >= length && 
            <span className = {`read-bth ${readMore ? 'less' : 'more'}`} href="#" onClick={onsetReadMore}>
                {readMore ? 'read less' : 'read more'}
            </span>}
        </section>
    )
}