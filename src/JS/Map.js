import { useRef, useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import styles from '../SCSS/Map.module.scss';
import data from './tourist-attractions.json';
import Point from './Point';

export default function Map() {
  const sidebarRef = useRef(null);
  const screenRef = useRef(null);
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState();
  // initial map viewport
  const [viewport, setViewport] = useState({
    latitude: 1.287466,
    longitude: 103.851424,
    zoom: 15,
  });

  const getSidebarWidth = () => {
    const newWidth = screenRef.current.clientWidth - sidebarRef.current.clientWidth;
    setWidth(newWidth);
  };

  const handleSelected = () => {
    if (!selected) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  const handleOpen = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    getSidebarWidth();
  }, [selected]);

  useEffect(() => {
    window.addEventListener('width', getSidebarWidth);
  }, []);

  return (
    <div ref={screenRef} className={styles.main}>
      <div ref={sidebarRef} id="sidebar" className={styles.sidebar}>
        <ul className={styles.menu}>
          <li className={selected ? styles.browseActive : styles.browseNone} onClick={handleSelected}>
            <span className="material-icons-outlined" style={{ fontSize: '2rem' }}>
              public
            </span>
            Browse
          </li>
          <li>
            Suggest
            <br />
            Attraction
          </li>
          <li>
            <span className="material-icons-outlined" style={{ fontSize: '2rem' }}>
              ondemand_video
            </span>
            Videos
          </li>
          <li>
            <span className="material-icons-outlined" style={{ fontSize: '2rem' }}>
              chat
            </span>
            Blog
          </li>
          <li>
            <span className="material-icons-outlined" style={{ fontSize: '2rem' }}>
              error
            </span>
            About
          </li>
        </ul>
        {selected ? (
          <ul className={styles.browse}>
            <li className={styles.filter}>
              <button>
                Filter by favorite
                <span className="material-icons-outlined" style={{ fontSize: '1rem' }}>
                  arrow_drop_down
                </span>
              </button>
            </li>
            <li className={styles.merlion}>
              <input type="button" value="Merlion" />
            </li>
            <li className={styles.marinaBay}>
              <button onClick={handleOpen}>
                <h4>Marina Bay Sands</h4>
                {open ? (
                  <span className="material-icons-outlined" style={{ fontSize: '1rem' }}>
                    arrow_drop_up
                  </span>
                ) : (
                  <span className="material-icons-outlined" style={{ fontSize: '1rem' }}>
                    arrow_drop_down
                  </span>
                )}
              </button>
              <ul className={open ? styles.subActive : styles.subNone}>
                <li>ArtScience Museum</li>
                <li>Marina Bay Sands Skypark</li>
                <li>Double Helix Bridge</li>
              </ul>
            </li>
            <li>
              <button>
                <h4>Garden by The Bay</h4>
                <span className="material-icons-outlined" style={{ fontSize: '1rem' }}>
                  arrow_drop_down
                </span>
              </button>
            </li>
            <li>
              <button>
                <h4>China town</h4>
                <span className="material-icons-outlined" style={{ fontSize: '1rem' }}>
                  arrow_drop_down
                </span>
              </button>
            </li>
            <li>
              <button>
                <h4>Asian Civilisations Museum</h4>
              </button>
            </li>
            <li>
              <button>
                <h4>Clark Quay</h4>
              </button>
            </li>
            <li>
              <button>
                <h4>Fort Canning Park</h4>
              </button>
            </li>
            <li>
              <button>
                <h4>Singapore Flyer</h4>
              </button>
            </li>
            <li>
              <button>
                <h4>Orchard Road</h4>
              </button>
            </li>
          </ul>
        ) : null}
      </div>
      <div className={styles.container}>
        <header id="header" className={styles.header}>
          <h4>TOP-RATED TOURIST ATTRACTIONS SINGAPORE</h4>
          <ul>
            <li>
              <span className="material-icons" style={{ color: '#647d80' }}>
                settings
              </span>
            </li>
            <li>
              <span className="material-icons" style={{ color: '#647d80' }}>
                help
              </span>
            </li>
            <li>
              <span className="material-icons" style={{ color: '#647d80' }}>
                cancel
              </span>
            </li>
          </ul>
        </header>
        <section className={styles.section}>
          <div className={styles.content}>
            <ReactMapGL
              className={styles.map}
              {...viewport}
              width={width}
              height="86.5vh"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
              mapStyle="mapbox://styles/mdedyfauzi/ckyst89xye8fl15pcqgbpsws3"
              onViewportChange={(viewport) => {
                setViewport(viewport);
              }}
            >
              {data.locations.map((attractions) => (
                <Marker key={attractions.place_name} latitude={attractions.latitude} longitude={attractions.longitude}>
                  <Point name={attractions.place_name} />
                </Marker>
              ))}
            </ReactMapGL>
          </div>
          <div className={styles.modal}>
            <p>tes</p>
          </div>
        </section>
        {/* <aside></aside>
      <footer></footer> */}
      </div>
    </div>
  );
}
