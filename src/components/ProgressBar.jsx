import React from 'react'
import useStorage from '../hooks/useStorage'

const ProgressBar = ({ file, setFile }) => {
    const { progress, url } = useStorage(file)
    console.log(progress, url)

  return (
    <div>ProgressBar</div>
  )
}

export default ProgressBar