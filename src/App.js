import classes from './App.module.sass';
import Button from "./forms/Button/Button";
import Textarea from "./forms/Textarea/Textarea";
import Input from "./forms/Input/Input";
import Header from "./containers/Header/Header";
import UsersList from "./components/UsersList/UsersList";
import {useEffect, useRef, useState} from "react";
import Radio from "./forms/Radio/Radio";
import useHttp from "./hooks/http.hook";
import validator from 'validator'


function App() {

   const postRef = useRef()
   const getRef = useRef()

   const {requestJson} = useHttp()

   const [formError, setFormError] = useState({})
   const [form, setForm] = useState({
      name: '',
      email: '',
      phone: ''
   })

   const [page, setPage] = useState(1)

   const [photo, setPhoto] = useState(null)
   const [selectedPosition, setSelectedPosition] = useState('')
   const [positions, setPositions] = useState([])

   const checkForm = () => {
      const newError = {}

      if (!validator.isEmail(form.email))
         newError.email = 'Invalid email'

      if (form.name < 2 || form.name > 20)
         newError.name = 'User name, should be 2-60 characters'

      if (!/^\+380(\d{9})$/.test(form.phone))
         newError.phone = 'User phone number, should start with code of Ukraine +380'

      if (!selectedPosition)
         newError.position = 'Choose your position'

      if (photo) {
         if (photo.size > 5242880)
            newError.photo = 'Img size must not exceed 5MB'

         const img = new Image()
         img.onload = function() {
            if (this.width < 70 && this.height < 70)
               newError.photo = 'Img resolution should be at least 70x70'
         }
         img.src = URL.createObjectURL(photo)
      } else {
         newError.photo = 'Upload your img'
      }

      setFormError(newError)
      return Object.keys(newError).length ? newError : false
   }

   const onSubmit = async e => {
      e.preventDefault()
      const newError = checkForm()

      if (!newError) {
         try {
            const token = await requestJson('token')

            const formObj = {
               ...form,
               position_id: selectedPosition,
               photo: photo
            }
            const formData = new FormData()

            for (const key in formObj) {
               formData.set(key, formObj[key])
            }

            const data = await requestJson(
               'users',
               'POST',
               formData,
               {
                  'Token': token.token,
               }
            )

            if (data.success) {
               usersClick()
               setPage(1)
            }
         } catch (e) {
            console.log(e)
         }
      }
   }

   const changeForm = (val, type) => {
      setForm(prev => ({...prev, [type]: val}))
   }

   const usersClick = () => {
      getRef.current.scrollIntoView()
   }

   const signClick = () => {
      postRef.current.scrollIntoView()
   }

   useEffect(() => {
      (async () => {
         const data = await requestJson('positions')
         setPositions(data.positions)
      })()
   }, [])

   const inputs = [
      {
         placeholder: 'Your name',
         value: form.name,
         onChange: e => changeForm(e.target.value, 'name'),
         error: formError.name
      },
      {
         placeholder: 'Email',
         value: form.email,
         onChange: e => changeForm(e.target.value, 'email'),
         error: formError.email
      },
      {
         placeholder: 'Phone',
         value: form.phone,
         onChange: e => changeForm(e.target.value, 'phone'),
         subtitle: '+38 (XXX) XXX - XX - XX',
         error: formError.phone
      },
   ]

  return (
    <div className={classes.container}>
      <Header
         usersClick={usersClick}
         signClick={signClick}
      />

       <div className={classes.title_section}>
          <h1>Test assignment for front-end developer</h1>

          <p>
             Lorem ipsum dolor sit amet, consectetur
             adipisicing elit. Aperiam cum deserunt distinctio dolor
             dolore earum eligendi itaque iure, molestias nam necessitatibus
             possimus quibusdam quo rem sint temporibus tenetur totam velit.
             Aperiam cum deserunt distinctio dolor
             dolore earum eligendi itaque iure.
          </p>

          <Button
             onClick={signClick}
          >
             Sign up
          </Button>
       </div>

       <div className={classes.get_section} ref={getRef}>
          <h1>
             Working with GET request
          </h1>

          <UsersList
             page={page}
             setPage={setPage}
          />
       </div>

       <div className={classes.post_section} ref={postRef}>
          <h1>
             Working with POST request
          </h1>

          <div className={classes.post_wrapper}>
             <form className={classes.inputs_form}>
                {inputs.map((el, i) => (
                   <Input
                      key={i}
                      value={el.value}
                      onChange={e => el.onChange(e)}
                      placeholder={el.placeholder}
                      subtitle={el.subtitle}
                      error={el.error}
                   />
                ))}
             </form>

             <div className={classes.radio_container}>
                <p>
                   Select your position
                </p>

                {positions.map((el, i) => (
                   <Radio
                      key={`${el.id}-${i}`}
                      value={el.id}
                      title={el.name}
                      onChange={() => setSelectedPosition(el.id)}
                      checked={selectedPosition === el.id}
                   />
                ))}

                {formError.position &&
                   <span className={classes.position_error}>
                  {formError.position}
               </span>
                }
             </div>

             <div className={classes.img_container}>
                <Textarea
                   error={formError.photo}
                   onChange={photo => setPhoto(photo)}
                />
             </div>

             <Button
                onClick={onSubmit}
             >
                Sign up
             </Button>
          </div>
       </div>
    </div>
  );
}

export default App;
