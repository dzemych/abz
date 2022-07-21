import React, {useMemo} from 'react'
import classes from './Radio.module.sass'


const Radio = (props) => {

   const id = useMemo(() => {
      return `${new Date()}-${Math.round()}`
   }, [])

   return (
      <div className={classes.container}>
         <input
            type="radio"
            id={id}
            checked={props.checked}
            value={props.value}
            onChange={props.onChange}
         />

         <label htmlFor={id}>
            {props.title}
         </label>
      </div>
   )
}

export default Radio