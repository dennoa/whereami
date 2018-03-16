import React from 'react'

import WhereMap from 'Components/whereMap'

const Home = () => (
  <div>
    <div className="container">
      <WhereMap
        containerElement={<div style={{ height: '800px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        isMarkerShown={false}
      />
    </div>
  </div>
)

export default Home
