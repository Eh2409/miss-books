import { eventBusService } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'
const { useState, useEffect, useRef } = React

export function UserMsg(props) {

    const [msg, setMsg] = useState(null)
    const timeOutRef = useRef()
    const msgRef = useRef()



    useEffect(() => {
        const onRemoveListener = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)

            // setTimeout(()=>{
            //     utilService.animateCSS(msgRef.current,'fadeIn', false)
            // },0)

            // setTimeout(()=>{
            //     if (msgRef.current) {
            //         utilService.animateCSS(msgRef.current,'fadeOut', false)
            //     }
            // },2500)

            timeOutRef.current = setTimeout(onCloseUsrMsg, 3000)
        })
        return (() => {
            onRemoveListener()
        })
    },)



    function onCloseUsrMsg() {
        clearTimeout(timeOutRef.current)
        setMsg(null)
    }

    if (!msg) return
    return (
        <section ref={msgRef} className={'user-msg flex justify-center ' + msg.type}>
            <p>{msg.txt}</p>
            <button onClick={onCloseUsrMsg}>X</button>
        </section>
    )
}