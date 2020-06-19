import React from 'react'

function Navbar() {
  return (
    <nav className="navbar is-success">

      <div className="navbar-brand">
        <div className="navbar-item">
          <div className="title">XYZ.in</div>
        </div>
        <span className="navbar-burger burger" data-target="navbarMenuHeroA">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenuHeroA" className="navbar-menu">
        <div className="navbar-end">
          <a className="navbar-item is-active">
            Products
          </a>
          <a className="navbar-item">
            About Me
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar