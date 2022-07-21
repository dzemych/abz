import React from 'react'
import classes from './Header.module.sass'
import {ReactComponent as Logo} from '../../assets/img/Logo.svg'
import Button from "../../forms/Button/Button";


const Header = (props) => {
   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <Logo className={classes.icon}/>

            <div className={classes.buttons_container}>
               <Button
                  onClick={props.usersClick}
               >
                  Users
               </Button>

               <Button
                  onClick={props.signClick}
               >
                  Sign up
               </Button>
            </div>
         </div>
      </div>
   )
}

export default Header