import React from 'react'
import classes from './Button.module.sass'


const Button = (props) => {

   const cls = [classes.container]

   if (props.type)
      cls.push(classes[props.type])

   return (
      <button
         className={cls.join(' ')}
         onClick={e => props.onClick(e)}
         disabled={props.disabled}
         onSubmit={e => props.onSubmit(e)}
      >
         {props.children}
      </button>
   )
}

export default Button