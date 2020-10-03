import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/Table';
import Modal from './components/Modal';
import Filters from './components/Filters'
import './App.css';


function SpaceXHOC() {
  const [launchesPreserve, setLaunchesPreserve] = useState([]);
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [launches, setLaunches] = useState([]);
  const [upcoming, setUpcoming] = useState(false);
  const [past, setPast] = useState(false);
  const [success, setSuccess] = useState(false);
  const [filterDates, setFilterDates] = useState(false)
  const [details, setDetails] = useState({});
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        /*I have made only one server call to get all launches which 
        returns enough information for filtering, so there isn't any need to reach the server again*/
        setLoading(true)
        let data = await axios.get('https://api.spacexdata.com/v3/launches')
        console.log(data)
        setLaunches(data.data)
        setLaunchesPreserve(data.data) /*preserve state for filtering */
        setLoading(false)
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    // filter handling 
    let data = [...launchesPreserve];
    if (upcoming) {
      data = [...data.filter(v => v.upcoming)]
    }
    if (past) {
      data = [...data.filter(v => v.upcoming === false)]
    }
    if (success) {
      data = [...data.filter(v => v.launch_success)]
    }
    if (filterDates) {
      let startTime = new Date(startDate).getTime()
      let endTime = new Date(endDate).getTime()
      data = [...data.filter(v => {
        let time = new Date(new Date(v.launch_date_utc).toDateString()).getTime();
        if (startTime <= time && time <= endTime) {
          return v
        }
      })]
    }
    setLaunches([...data]);
  }, [upcoming, past, success, filterDates])

  const changeUpcomming = () => {
    if (!upcoming) {
      setPast(false)
      setSuccess(false)
    }
    setUpcoming(!upcoming)
  }

  const changePast = () => {
    if (!past) {
      setUpcoming(false)
    }
    setPast(!past)
  }

  const changeSuccess = () => {
    if (!success) {
      setUpcoming(false)
    }
    setSuccess(!success)
  }

  const changeDates = (val, type) => {
    if (type === 'start') {
      setStartDate(val);
      return
    }
    setEndDate(val);
  }

  const changeFilterDates = () => {
    if (!!filterDates) {
      setStartDate('')
      setEndDate('')
    }
    setFilterDates(!filterDates)
  }

  const showModal = (obj) => {
    setDetails({ ...obj })
    setPopup(true)
  }

  return (
    <div className='spacex-dashboard'>
      <p className='number-lister'>Number of Launches : {launches.length}</p>
      {!loading &&
        <Filters
          upcoming={upcoming}
          past={past}
          success={success}
          startDate={startDate}
          endDate={endDate}
          filterDates={filterDates}
          changeUpcomming={changeUpcomming}
          changePast={changePast}
          changeSuccess={changeSuccess}
          changeDates={changeDates}
          changeFilterDates={changeFilterDates}
        />}
      <div className='whole-page'>
        {launches.length ?
          <Table array={launches} showModal={showModal} /> : <p
            className='noData selfCenter'
          >
            {loading ? 'loading...' : 'No Launches found for these filters, Try changing filters'}</p>
        }
      </div>
      {popup ? <Modal data={details} setPopup={setPopup} /> : null}


    </div>
  );
}

export default SpaceXHOC;


