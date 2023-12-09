import React from 'react'
import '../stylesheets/InfoParticle.css'

export const InfoParticle = (props: { keyV: number, onClick: Function }) => {
  const handleClick = () => {
    props.onClick(props.keyV)
  }
  return (
    <button className="info-particle" onClick={ handleClick }/>
  )
}
