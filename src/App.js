import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';

import './App.css';
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet'

import arrow from './images/icon-arrow.svg'
import mapIcon from './util/mapIcon'
import { useEffect, useState } from 'react';

import api from './services/api'

function App() {
  const [ip, setIp] = useState(0)
  const [data, setData] = useState({
    ip_address: '',
    city: '',
    regionName: '',
    country: '',
    timezone: '',
    isp: '',
    lat: 51.505, 
    long: -0.09,
  })

  useEffect(() => {
    fetchData(0)
  }, [])

  async function fetchData(ipValue) {
    let dt;
    if(ipValue === 0) {
      dt = await api.get('')
      setData({
        ip_address: dt.data.query,
        city: dt.data.city,
        regionName: dt.data.regionName,
        country: dt.data.country,
        timezone: dt.data.timezone,
        isp: dt.data.isp,
        lat: dt.data.lat, 
        long: dt.data.lon,
      })
    }else{
      dt = await api.get(ipValue)

      if(dt.data.status === 'fail') {
        alert("Invalid Ip address")
      }else{
        setData({
          ip_address: dt.data.query,
          city: dt.data.city,
          regionName: dt.data.regionName,
          country: dt.data.country,
          timezone: dt.data.timezone,
          isp: dt.data.isp,
          lat: dt.data.lat, 
          long: dt.data.lon,
        })
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    fetchData(ip)
  }

  function MyComponent() {
    const map = useMap()
    map.setView([data.lat, data.long], 13)
    return null
  }

  return (
    <div className="container">
      <header>
        <h1 className="title">IP Address Tracker</h1>

        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor="ip"></label>
          <input type="text" id="ip" pattern="\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b" onChange={e => setIp(e.target.value)} name="ip" placeholder="Search for any IP address or domain"/>
          <button>
            <img src={arrow} alt="send"/>
          </button>
        </form>

        <div className="infos">
          <div className="ip-address">
            <h1>IP ADDRESS</h1>
            <p>{data.ip_address}</p>
          </div>
          <div className="location">
            <h1>LOCATION</h1>
            <p>{`${data.city} - ${data.regionName} - ${data.country}`}</p>
          </div>
          <div className="timezone">
            <h1>TIMEZONE</h1>
            <p>{data.timezone}</p>
          </div>
          <div className="isp">
            <h1>ISP</h1>
            <p>{data.isp}</p>
          </div>
        </div>
      </header>      

      <div id="mapid">
        <MapContainer 
          style={{width: "100%", height: "100%"}} 
          center={[data.lat, data.long]} 
          zoom={13}
        >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker 
              position={[data.lat, data.long]}
              icon={mapIcon}  
            >
            <MyComponent />
            </Marker>
        </MapContainer>
      </div>

      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>. 
        Coded by <a href="https://github.com/santos-jadson">Jadson dos Santos</a>.
      </div>
    </div>
  );
}

export default App;
