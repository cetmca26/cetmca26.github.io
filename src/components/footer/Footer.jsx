import React from 'react';
import "./Footer.css";

function Footer() {
  return (
    <>
 <footer className="bg-light py-4">
      <div className="container-fluid mt-5">
        <div className="mx-1">
          <div className="row mb-4">
            <div className="col-md-4 col-sm-4 col-xs-4 mb-4">
              <div className="footer-text">
                <div className="d-flex">
                  <h1 className="font-weight-bold mr-2 px-3">MCA</h1>
                  <h1 style={{ color: '#28cee3' }}>26</h1>
                </div>
                <p className="card-text">
                  We are a vibrant group of tech enthusiasts, innovators, and learners united by our journey in the MCA program at CET. Our mission is to foster collaboration, share knowledge, and build a strong foundation in the world of technology.
                </p>
              </div>
            </div>

            <div className="col-md-2 col-sm-2 col-xs-2"></div>

            <div className="col-md-2 col-sm-2 col-xs-2 pt-2">
              <h5 className="heading">Community</h5>
              <ul className="list-unstyled">
                <li>About CET MCA 26</li>
                <li>Our Mission</li>
                <li>Team Member</li>
                <li>Support</li>
              </ul>
            </div>

            <div className="col-md-2 col-sm-2 col-xs-2 pt-2">
              <h5 className="heading">Resources</h5>
              <ul className="list-unstyled card-text">
                <li>Study Materials</li>
                <li>Syllabus</li>
                <li>Research Projects</li>
                <li>Lab Programs</li>
              </ul>
            </div>

            <div className="col-md-2 col-sm-2 col-xs-2 pt-2">
              <h5 className="heading">Connect</h5>
              <ul className="list-unstyled card-text">
                <li>GitHub Community</li>
                <li>Discord Server</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>

          <div className="divider mb-4"></div>

          <div className="row" style={{ fontSize: '10px' }}>
            
            <div className="col-md-6 col-sm-6 col-xs-6 d-flex justify-content-end policy">
              <p className='me-auto'>&copy; Haplle</p>
              
              <div className="mx-2 ml-auto">Terms of Use</div>
              <div className="mx-2 ml-auto">Privacy Policy</div>
              <div className="mx-2 ml-auto">Cookie Policy</div>
             
             
            </div>
          </div>
        </div>
      </div>
    </footer>

    </>
  )
}

export default Footer