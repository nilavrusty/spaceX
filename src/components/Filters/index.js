import React, { useState } from 'react'

const Filters = ({ upcoming, past, success, startDate, endDate, filterDates, changeUpcomming, changePast, changeSuccess, changeDates, changeFilterDates, clearDates }) => {

    const [toggler, setToggler] = useState(false)
    const dateComparison = new Date(startDate).getTime() > new Date(endDate).getTime()
    return (
        <div className={`filters ${toggler ? ' open' : ' close'}`}>
            <button onClick={() => { setToggler(!toggler) }} className='filters-floating'> {toggler ? 'Close' : 'Filters'}</button>
            <p><input type="checkbox" onChange={changeUpcomming} checked={upcoming} /><span>:upcomming</span> </p>
            <p><input type="checkbox" onChange={changePast} checked={past} /><span>:past</span></p>
            <p><input type="checkbox" onChange={changeSuccess} checked={success} /><span>:success</span></p>
            <div>
                <div>
                    <p><input value={startDate} onChange={(e) => { changeDates(e.target.value, 'start') }} type="date" />:Start&nbsp;</p>
                    <br />
                    <p><input value={endDate} onChange={(e) => { changeDates(e.target.value, 'end') }} type="date" />:End &nbsp;</p>
                </div>

                <button
                    className='filter-dates'
                    title={dateComparison ? 'End Date cannot be earlier in comparison to Start Date' : null}
                    onClick={changeFilterDates}
                    disabled={(dateComparison || startDate.length === 0 || endDate.length === 0)}
                > {filterDates ? 'Clear Dates' : 'Filter Dates'}
                </button>

            </div>
        </div>
    )
}

export default Filters;