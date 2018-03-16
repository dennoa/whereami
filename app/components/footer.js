import React from 'react'

const Footer = () => (
  <footer className="footer bg-dark text-white section">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <nav className="nav flex-column">
            <h4 className="footer-title">About</h4>
            <a href="/" className="footer-item">
              Why
            </a>
            <a href="/" className="footer-item">
              How
            </a>
          </nav>
        </div>
        <div className="col-md-6 text-right">
          <nav className="nav flex-column">
            <h4 className="footer-title">Support</h4>
            <p className="footer-item mb-0">There is no support this sorry</p>
          </nav>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
