import React from 'react';
import "./loader.css";
import Logo from '../../assets/logonobg.png'
function loader() {
  return (
    <>
    <div className='loader' >
       
    
         <img src={Logo}  alt="React logo" />
     </div>

    </>
   
  )
}

export default loader