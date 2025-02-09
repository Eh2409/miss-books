const { useState, useEffect, useRef } = React

export function SliderImage (props) {

    const [activeImg, setActiveImg] = useState(0)
    
    const wrapperRef = useRef()
    const imagesRef = useRef([])
    const sliderInterval = useRef(null)
    const activeImgRef = useRef(0)
    

    useEffect(()=>{
        sliderInterval.current = setInterval(onAutoSlide,1000 * 8)
        window.addEventListener('resize', onResize)
        return (()=>{
        clearInterval(sliderInterval.current)
        window.removeEventListener('resize', onResize)
        })
    },[])

    useEffect(()=>{
        activeImgRef.current = activeImg
        onSlide()
    },[activeImg])


function onAutoSlide() {
    setActiveImg( prev => {
        const currActiveImg = prev + 1
         return currActiveImg > imagesRef.current.length -1 ? 0  : currActiveImg
    })
}

function onResize() {
    onSlide(activeImgRef.current)
}

function onSetActiveImg(activeImg) {
    if (sliderInterval.current) {
        clearInterval(sliderInterval.current)
        sliderInterval.current = null
        setTimeout(()=>{
            sliderInterval.current = setInterval(onAutoSlide,1000 * 8)
        },1000 * 10)
    }

    setActiveImg(activeImg)
}

function onSlide(activeImgRef) {
    var move = 0
    if (activeImgRef) {
         move = imagesRef.current[activeImgRef].offsetWidth * activeImgRef 
         console.log(imagesRef.current[activeImgRef].offsetWidth); 
    } else{
         move = imagesRef.current[activeImg].offsetWidth * activeImg 
    }
   
    wrapperRef.current.scrollLeft = move
}

  return(
    <div className='slider'>
        <div ref={wrapperRef} className="wrapper flex">
            {[1, 2, 3, 4].map((num, idx) => (
                <img 
          key={num} 
          ref={(el) => (imagesRef.current[idx] = el)}
          src={`../../assets/img/${num}.jpg`}
          />
        ))} 
        </div>
        <div className='btns'>
            <button onClick={()=>(onSetActiveImg(0))} className={`dot ${activeImg === 0 ? 'active' : ''}`}></button>
            <button onClick={()=>(onSetActiveImg(1))} className={`dot ${activeImg === 1 ? 'active' : ''}`}></button>
            <button onClick={()=>(onSetActiveImg(2))} className={`dot ${activeImg === 2 ? 'active' : ''}`}></button>
            <button onClick={()=>(onSetActiveImg(3))} className={`dot ${activeImg === 3 ? 'active' : ''}`}></button>
        </div>
    </div>
  )
}