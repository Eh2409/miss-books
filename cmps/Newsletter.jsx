const { useState, useEffect, useRef } = React

export function Newsletter (props) {

    const formRef = useRef()

    function onSubmit(ev) {
        ev.preventDefault();
        formRef.current.reset()
    }

    return (
     <section className='newsletter'>
        <h2>Join the Miss Comics Newsletter!</h2>
        <p>Get the latest Marvel news, deals and exclusive comics.</p>

        <form ref={formRef} onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Enter Your Email" required/>
        <button>Subscribe</button>
        </form>

    </section>
    )
}