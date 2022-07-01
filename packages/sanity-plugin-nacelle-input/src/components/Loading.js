import React, { useState } from 'react'

import { useInterval } from '../hooks'

const Loading = () => {
  const [ellipses, setEllipses] = useState('.')

  useInterval(
    () =>
      ellipses.length < 3 ? setEllipses(ellipses + '.') : setEllipses('.'),
    400
  )

  return <p>Loading{ellipses}</p>
}

export default Loading
