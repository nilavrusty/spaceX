import React from 'react';
import ReactDOM from 'react-dom';
import close from '../../close.svg'

const Modal = ({ data, setPopup }) => {
    return (ReactDOM.createPortal(
        <div className='modalBackDrop whole-page'>
            <div>
                <p><span>Flight Number:&nbsp;#{data.flight_number}</span></p>
                <p><span>Mission Name:</span> {data.mission_name}</p>
                {data.details ? <p><span>Details:</span> {data.details}</p> : null}
                <p><span>Launch Site:</span> {data.launch_site.site_name}</p>
                <p><span>Launch Success:</span> {data.launch_success ? 'Yes' : 'No'}</p>
                <p><span>Rocket Name:</span> {data.rocket.rocket_name}</p>
                <p><span>Rocket Type:</span> {data.rocket.rocket_type}</p>
                {data.links?.wikipedia ? <p><a href={data.links.wikipedia} target="_blank">Read More Here</a></p> : null}
                {data.links?.video_link ? <p><a href={data.links.video_link} target="_blank">Watch Here</a></p> : null}
                <button onClick={() => setPopup(false)}><img src={close} /></button>
            </div>
        </div>
        , document.getElementById('modalWrapper')))
}

export default Modal