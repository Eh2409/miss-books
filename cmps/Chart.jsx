

export function Chart({ filedData, field }) {

    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF", "#33FFF5", "#F5FF33", "#FF8C33", "#8C33FF", "#33FF8C"];

    return (
        <section className='chart'>
            <h2 className='chart-name'>books by {field} chart</h2>
            <div className='chart-wrapper'>
                <ul className='chart-stats clean-list flex '>
                    {filedData.map(({ title, value }, idx) => <li key={title} style={{ width: Math.round(100 / filedData.length) - 5 + '%', }}>
                        <span title={title} className='value-name' style={{
                            height: value + '%',
                            filter: `hue-rotate(${value}deg)`,
                            backgroundColor: colors[idx]
                        }}>{value}%</span>
                    </li>)}
                </ul>
                <ul className='percentage clean-list'>
                    {['100%', '90%', '80%', '70%', '60%', '50%', '40%', '30%', '20%', '10%',]
                        .map((percentage, idx) => <li key={idx} title={percentage}></li>)}
                </ul>
            </div>
        </section>
    )
}