import React, {useMemo} from 'react'
import classes from './Input.module.sass'


const Input = (props) => {

   const id = useMemo(() => {
      return `${new Date()}-${Math.round()}`
   }, [])

   return (
      <div className={classes.container}>
         <label htmlFor={id}>
            {props.title}
         </label>

         <input
            id={id}
            className={props.error ? classes.errorBorder : ''}
            type="text"
            placeholder={props.placeholder}
            value={props.value}
            onChange={e => props.onChange(e)}
            onSubmit={e => props.onSubmit(e)}
         />

         {(!props.error && props.subtitle) &&
            <span className={classes.subtitle}>
               {props.subtitle}
            </span>
         }

         {props.error &&
            <span className={classes.error}>
               {props.error}
            </span>
         }
      </div>
   )
}

export default Input