import React, {useRef, useState} from 'react'
import classes from './Textarea.module.sass'


const Textarea = (props) => {

   const [isPhoto, setIsPhoto] = useState(false)

   const inputRef = useRef()

   const changeHandler = e => {
      e.preventDefault()

      const photo = inputRef.current.files[0]

      if (photo) {
         setIsPhoto(true)
         props.onChange(photo)
      }
   }

   return (
      <div className={classes.container}>
         <div
            className={[
               classes.wrapper,
               props.error ? classes.errorBorder : ''
            ].join(' ')}
         >
            <span className={classes.title}>
               Upload
            </span>

            <span
               className={[
                  classes.text,
                  isPhoto ? classes.filled : ''
               ].join(' ')}
               onClick={() => inputRef.current.click()}
            >
               {!isPhoto ? 'Upload your photo' : 'Item'}
            </span>

            <input
               ref={inputRef}
               type="file"
               accept="image/*"
               onChange={e => changeHandler(e)}
            />
         </div>

         {props.error &&
            <span className={classes.error}>
               {props.error}
            </span>
         }
      </div>
   )
}

export default Textarea