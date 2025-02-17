const { useState, useEffect, useRef } = React

export function Slider(props) {

    const [activeImg, setActiveImg] = useState(0)
    const [isPause, setisPause] = useState(false)

    const wrapperRef = useRef()
    const sliderInterval = useRef(null)
    const activeImgRef = useRef(0)

    console.log(sliderInterval);


    useEffect(() => {
        PausePlaySlider()
        window.addEventListener('resize', onResize)
        return (() => {
            clearInterval(sliderInterval.current)
            window.removeEventListener('resize', onResize)
        })
    }, [isPause])

    useEffect(() => {
        activeImgRef.current = activeImg
        onSlide()
    }, [activeImg])


    function onAutoSlide() {
        const imagesContainer = wrapperRef.current.querySelectorAll('.image-container')

        setActiveImg(prev => {
            const currActiveImg = prev + 1
            return currActiveImg > imagesContainer.length - 1 ? 0 : currActiveImg
        })
    }

    function onResize() {
        onSlide(activeImgRef.current)
    }

    function onSetActiveImg(activeImg) {
        if (!isPause) {
            clearInterval(sliderInterval.current)
            sliderInterval.current = setInterval(onAutoSlide, 1000 * 8)

            // setTimeout(() => {
            //     sliderInterval.current = setInterval(onAutoSlide, 1000 * 8)
            // }, 1000 * 10)
        }

        setActiveImg(activeImg)
    }

    function onSlide(activeImgRef) {
        const imagesContainer = wrapperRef.current.querySelectorAll('.image-container')
        var move = 0
        if (activeImgRef) {
            move = imagesContainer[activeImgRef].offsetWidth * activeImgRef
            console.log(imagesContainer[activeImgRef].offsetWidth);
        } else {
            move = imagesContainer[activeImg].offsetWidth * activeImg
        }
        wrapperRef.current.scrollLeft = move
    }

    function onPause() {
        setisPause(prev => prev = !isPause)
    }

    function PausePlaySlider() {
        if (isPause) {
            console.log('stop');
            clearInterval(sliderInterval.current)
            console.log(sliderInterval.current);
        } else {
            console.log('play');
            sliderInterval.current = setInterval(onAutoSlide, 1000 * 8)
        }
    }

    return (
        <div className='slider'>
            <div ref={wrapperRef} className="wrapper flex">

                <div className='image-container'>
                    <div className='image-content'>
                        <div className='title'>Welcome to Miss Comics</div>
                        <div className='subtitle'>The best comics selling site in the Multiverse!</div>
                    </div>
                    <img src="assets/img/5.jpg" alt="" />
                </div>
                <div className='image-container'>
                    <img src="assets/img/2.jpg" alt="" />
                </div>
                <div className='image-container'>
                    <img src="assets/img/3.jpg" alt="" />
                </div>
                <div className='image-container'>
                    <img src="assets/img/4.jpg" alt="" />
                </div>

            </div>
            <div className='btns'>
                <button onClick={() => (onSetActiveImg(0))} className={`dot ${activeImg === 0 ? 'active' : ''}`}></button>
                <button onClick={() => (onSetActiveImg(1))} className={`dot ${activeImg === 1 ? 'active' : ''}`}></button>
                <button onClick={() => (onSetActiveImg(2))} className={`dot ${activeImg === 2 ? 'active' : ''}`}></button>
                <button onClick={() => (onSetActiveImg(3))} className={`dot ${activeImg === 3 ? 'active' : ''}`}></button>
                <button className='pause-btn' onClick={onPause}><span className={`fa ${isPause ? 'play' : 'pause'}`}></span></button>
            </div>
        </div>
    )
}