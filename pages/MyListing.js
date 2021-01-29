import React from 'react';
import Destinations from '../components/Destinations';
import Slider2 from '../components/Slider2';
import './Styles.css'


function MyListing() {
  return (
    <div >
      <Slider2 className='slider'/>
      <Destinations  />
    </div>
  );
}

export default MyListing;