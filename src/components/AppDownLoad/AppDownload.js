import React from 'react'
import './AppDownload.css'
import appimg from '../../assets/app_store.png'
import playstoreimg from '../../assets/app_store.png'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experince Download <br /> Rider Food App</p>
        <div className='app-download-platforms'>
            <img src={appimg} alt="" />
            <img src={playstoreimg} alt="" />
        </div>
    </div>
  )
}

export default AppDownload