import React from 'react'
import { Link } from 'react-router-dom'

const HelpHow = () => (
  <div className="container-fluid">
    <div className="section">
      <p>The basics...</p>
      <ol>
        <li>This app needs your permission to access location information. Without this it does nothing.</li>
        <li>
          Your very first <Link to="/login">login</Link> will create a <Link to="/profile">profile</Link> with a
          connection id.
        </li>
        <li>
          To connect with someone you need to know their connection id or they need to know yours. Take a copy and share
          it with them - maybe send an SMS or email.
        </li>
        <li>
          Once you know a connection id, you can <Link to="/connect">connect</Link>.
        </li>
        <li>
          The last known location for each of your connections is shown on the <Link to="/">map</Link>. They need to be
          online with this app running in a browser for their location to be updated.
        </li>
      </ol>
    </div>
    <div className="section">
      <p>And then...</p>
      <ol>
        <li>
          You can give your connections a different name. For example, you might know Gordon Matthew Thomas Summer as
          Sting. You can select any of your connections on the <Link to="/connect">connect</Link> page, change the name
          and Save.
        </li>
        <li>
          You can remove any of your connections. Select one on the <Link to="/connect">connect</Link> page and Remove.
        </li>
      </ol>
    </div>
  </div>
)

export default HelpHow
