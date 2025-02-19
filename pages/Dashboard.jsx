import { Chart } from '../cmps/Chart.jsx';
import { Loader } from '../cmps/Loader.jsx';
import { bookSerevice } from '../services/books.service.js'

const { useState, useEffect, useRef } = React

export function Dashboard() {

    const [chartsData, setChartsData] = useState({
        categories: null, rating: null, publishedDate: null,
    })
    console.log(chartsData);
    console.log(!chartsData.categoriesData);



    useEffect(() => {
        getCategoriesPercentages()
        getRatingPercentages()
        getPublishedDatePercentages()
    }, [])

    function getCategoriesPercentages() {
        bookSerevice.getBookFieldPercentages('categories')
            .then(data => setChartsData(prev => ({ ...prev, categories: data })))
    }

    function getRatingPercentages() {
        bookSerevice.getBookFieldPercentages('rating')
            .then(data => setChartsData(prev => ({ ...prev, rating: data })))
    }
    function getPublishedDatePercentages() {
        bookSerevice.getBookFieldPercentages('publishedDate')
            .then(data => setChartsData(prev => ({ ...prev, publishedDate: data })))
    }

    const { categories, rating, publishedDate } = chartsData
    if (!categories || !rating || !publishedDate) return <Loader />

    return (
        <section className='dashboard'>
            {Object.keys(chartsData).map((field, idx) => <Chart key={idx} filedData={chartsData[field]} field={field} />)}
        </section>
    )
}