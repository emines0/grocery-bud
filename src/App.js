import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'danger', 'please enter value')

      /*
       * if there is nothing
       * display alert
       */
    } else if (name && isEditing) {
      /*
       * if there is something in the name but is editing
       * deal with edit
       */
    } else {
      /*
       * if there existing value in the name
       * show alert
       * create new item
       */
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      /*
       * set list to everything what were in the list and add newItem
       */
      setName('')
      /*
       * when item is added to the list clear input
       */
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        {/*
         * If alert.show is true display Alert component
         */}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='eg. eggs'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            /*
             * On change set name to e.target.value (what user type in the input field)
             */
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} />
          <button className='clear-btn'>clear items</button>
        </div>
      )}
    </section>
  )
}

export default App
