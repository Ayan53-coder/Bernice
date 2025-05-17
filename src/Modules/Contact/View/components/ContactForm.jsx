import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import InteriorImg from '../../../../assets/images/pictures/interiorfluid.png'
import ButtonStyle from '../../../../components/ButtonStyle'
import ScrollYMotion from '../../../../assets/scss/animations/ScrollYMotion'
import SloganAnimation from '../../../../assets/scss/animations/SloganAnim'

const ContactForm = () => {
  const [data, setData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    message: '',
  })

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    message: '',
  })

  const onSubmit = (e) => {
    e.preventDefault()

    setErrorMessages({
      name: '',
      surname: '',
      phone: '',
      email: '',
      message: '',
    })

    let isValid = true

    // First name
    if (!data.name) {
      setErrorMessages(prev => ({ ...prev, name: 'First name is required' }))
      isValid = false
    } else if (/\d/.test(data.name)) {
      setErrorMessages(prev => ({ ...prev, name: 'First name cannot contain numbers' }))
      isValid = false
    }

    // Last name
    if (!data.surname) {
      setErrorMessages(prev => ({ ...prev, surname: 'Last name is required' }))
      isValid = false
    } else if (/\d/.test(data.surname)) {
      setErrorMessages(prev => ({ ...prev, surname: 'Last name cannot contain numbers' }))
      isValid = false
    }

    // Phone
    if (!data.phone) {
      setErrorMessages(prev => ({ ...prev, phone: 'Phone number is required' }))
      isValid = false
    } else if (!/^\d+$/.test(data.phone)) {
      setErrorMessages(prev => ({ ...prev, phone: 'Please enter a valid phone number (numbers only)' }))
      isValid = false
    }

    // Email
    if (!data.email) {
      setErrorMessages(prev => ({ ...prev, email: 'Email is required' }))
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      setErrorMessages(prev => ({ ...prev, email: 'Please enter a valid email address' }))
      isValid = false
    }

    // Message
    if (!data.message) {
      setErrorMessages(prev => ({ ...prev, message: 'Message is required' }))
      isValid = false
    }

    if (isValid) {
      console.log(data)
      toast.success('Message successfully sent!')
      setData({
        name: '',
        surname: '',
        phone: '',
        email: '',
        message: '',
      })
    }
  }

  const text = "Contact us"

  return (
    <section className='formsection'>
      <div className="container">
        <div className="row">
          <div className='formSide'>
            <h2 className='contactTitle'>
              <SloganAnimation text={text} />
            </h2>

            <form className='form' onSubmit={onSubmit}>
              <div className='inputBox'>
                <input
                  type='text'
                  placeholder='FIRST NAME'
                  id='name'
                  value={data.name}
                  className={errorMessages.name ? 'error' : ''}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                {errorMessages.name && <span className="errorText">{errorMessages.name}</span>}
              </div>

              <div className='inputBox'>
                <input
                  type='text'
                  placeholder='LAST NAME'
                  id='surname'
                  value={data.surname}
                  className={errorMessages.surname ? 'error' : ''}
                  onChange={(e) => setData({ ...data, surname: e.target.value })}
                />
                {errorMessages.surname && <span className="errorText">{errorMessages.surname}</span>}
              </div>

              <div className='inputBox'>
                <input
                  type='text'
                  placeholder='PHONE NUMBER'
                  id='phone'
                  value={data.phone}
                  className={errorMessages.phone ? 'error' : ''}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
                {errorMessages.phone && <span className="errorText">{errorMessages.phone}</span>}
              </div>

              <div className='inputBox'>
                <input
                  type='text'
                  placeholder='EMAIL'
                  id='email'
                  value={data.email}
                  className={errorMessages.email ? 'error' : ''}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                {errorMessages.email && <span className="errorText">{errorMessages.email}</span>}
              </div>

              <div className='messageBox'>
                <textarea
                  placeholder='Tell us what you need'
                  id='message'
                  value={data.message}
                  className={errorMessages.message ? 'error' : ''}
                  onChange={(e) => setData({ ...data, message: e.target.value })}
                />
                {errorMessages.message && <span className="errorText">{errorMessages.message}</span>}
              </div>

              <ScrollYMotion as="div" from={0} to={1000} startY={50} endY={-50}>
                <ButtonStyle
                  text="SEND"
                  textColor="#f8f8f2"
                  hoverText="#112229"
                  borderColor="#112229"
                  hoverColor="#f8f8f2"
                  className="mainButtonStyle"
                />
              </ScrollYMotion>
            </form>
          </div>

          <div className='imgSide'>
            <ScrollYMotion
              as="img"
              src={InteriorImg}
              alt="interior"
              from={0}
              to={1000}
              startY={80}
              endY={-110}
            />
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-left" autoClose={3000} />
    </section>
  )
}

export default ContactForm
