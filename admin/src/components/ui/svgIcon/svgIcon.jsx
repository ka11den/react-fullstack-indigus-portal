import React from 'react'

export const SvgIcon = ({ name, ...props }) => (
  <svg {...props}>
    <use href={`/assets/icons/sprite.svg#${name}`} />
  </svg>
)
