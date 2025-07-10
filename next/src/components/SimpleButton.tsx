import React from 'react'

const SimpleButton: React.FC = () => {
  const handleClick = () => {
    console.log('Clicked!')
  }
  return <button onClick={handleClick}>Click Me</button>
}

export default SimpleButton
