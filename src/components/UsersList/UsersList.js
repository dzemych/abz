import React, {useEffect, useState} from 'react'
import classes from './UsersList.module.sass'
import User from "../User/User";
import useHttp from "../../hooks/http.hook";
import Button from "../../forms/Button/Button";


const UsersList = (props) => {

   const { requestJson } = useHttp()

   const [users, setUsers] = useState([])
   const [showMore, setShowMore] = useState(true)

   const showMoreHandler = () => {
      props.setPage(prev => prev + 1)
   }

   useEffect(() => {
      (async () => {
         if (props.page > 1) {
            const data = await requestJson(`users?count=6&page=${props.page}`)
            setUsers(prev => prev.concat(data.users))

            if (data.total_pages === props.page)
               setShowMore(false)
         }

         if (props.page === 1) {
            const data = await requestJson(`users?count=6&page=1`)
            setUsers(data.users)

            if (data.total_pages === props.page)
               setShowMore(false)
         }
      })()
   }, [props.page])

   return (
      <div className={classes.container}>
         <div className={classes.users_list}>
            {users.length > 0 &&
               users.map((el, i) => (
                  <User
                     key={`${el.id}-${i}`}
                     photo={el.photo}
                     name={el.name}
                     email={el.email}
                     position={el.position}
                     tel={el.tel}
                  />
               ))
            }
         </div>

         {showMore &&
            <Button
               onClick={showMoreHandler}
            >
               Show more
            </Button>
         }
      </div>
   )
}

export default UsersList