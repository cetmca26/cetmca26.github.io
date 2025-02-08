import React from 'react';
import "./Page.css"

function Page() {
  return (
    <>
    <div className="section full-height">
    <div className="absolute-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>
              {'CET MCA 26'.split('').map((char, i) => (
                <span key={i}>{char}</span>
              ))}
            </h1>
            <p style={{ marginTop: '-20px' }}>
              Community
              <br /><br />
              <button className="btn btn-outline-info">Get Started</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default Page