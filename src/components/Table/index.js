import React, { useRef } from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

const Table = ({ array, showModal }) => {

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  return (<AutoSizer>
    {({ width, height }) => (
      <List
        width={width}
        height={height}
        rowHeight={cache.current.rowHeight}
        deferredMeasurementCache={cache.current}
        rowCount={array.length}
        rowRenderer={({ key, index, style, parent }) => {
          const launch = array[index];
          const dates = new Date(launch.launch_date_utc);
          return (
            <CellMeasurer
              key={key}
              cache={cache.current}
              parent={parent}
              columnIndex={0}
              rowIndex={index}
            >
              <div
                className='flex flex-center eachwhole'
                style={{ ...style }}
              >
                <div onClick={() => { showModal(launch) }} className='eachLaunch flex'>
                  {/* Left Text Part */}
                  <div className='flex-column-100'>
                    <h1>#{launch.flight_number}&nbsp;{launch.mission_name}</h1>
                    <p>Launched :- {`${dates.getDate()}-${dates.getMonth() + 1}-${dates.getFullYear()}`}</p>
                    <p>Launched Successfully :- {launch.launch_success ? 'Yes' : 'No'}</p>
                  </div>
                  {/* Left Text Part */}
                  {/* Right Image Part */}
                  <div
                    className='flex flex-center align-center img-wrapper'
                  >
                    {launch.links.mission_patch ?
                      <img
                        className='image-transition'
                        // loading="lazy" 
                        src={launch.links.mission_patch_small}
                        alt="logos" /> : null}
                  </div>
                  {/* Right Image Part */}
                </div>
              </div>
            </CellMeasurer>
          );
        }}
      />
    )}
  </AutoSizer>)
}

export default Table;