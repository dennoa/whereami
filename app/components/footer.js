import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="footer bg-dark text-white">
    <div className="container-fluid section">
      <Link to="/help" className="footer-item">
        Help
      </Link>
    </div>
  </footer>
)

export default Footer
