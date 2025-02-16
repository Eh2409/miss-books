

const { useState, useEffect, useRef } = React

export function ContactUs(props) {

    const formRef = useRef()

    function onSubmit(ev) {
        ev.preventDefault();
        formRef.current.reset()
    }

    return (
        <section className='contact-us'>

            <h2>Contact Miss Comics</h2>
            <p>Email: <a href="mailto:support@misscomics.space">support@misscomics.space</a></p>

            <p>Hours of Operation:</p>
            <ul>
                <li>Standard Days: 10:00 - 22:00</li>
                <li>Holidays: 10:00 - 15:00</li>
            </ul>

            <form ref={formRef} onSubmit={onSubmit}>
                <h2>Send Us a Message</h2>

                <label htmlFor="name">Name:</label>
                <input type="text" id='name' placeholder="Enter Your Name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id='email' placeholder="Enter Your Email" required />

                <label htmlFor="message">Message:</label>
                <textarea name="message" id="message" rows="5" placeholder="Enter Your Message" required></textarea>

                <button>Send</button>
            </form>

        </section>

    )
}