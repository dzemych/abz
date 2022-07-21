import React from 'react'
import classes from './User.module.sass'
import {ReactComponent as NoPhoto} from '../../assets/img/photo-cover.svg'


const User = (props) => {
   return (
      <div className={classes.container}>
         <div className={classes.img_container}>
            {props.photo ?
               <img src={props.photo} alt=""/> :
               <NoPhoto/>
            }
         </div>

         <span className={classes.name}>
            {props.name}
         </span>

         <div className={classes.main_data}>
            <p>{props.position}</p>
            <p>{props.email}</p>
            <p>{props.tel}</p>
         </div>
      </div>
   )
}

export default User