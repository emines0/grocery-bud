import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
  /*
   * if list exist return item list from the local storage
   * if list doesn't exist return empty object
   */
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
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
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
            /*
             * return all what is in item but change title to name
             */
          }
          return item
        })
      )
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'item edited')
    } else {
      /*
       * if there existing value in the name
       * show alert
       * create new item
       */
      showAlert(true, 'success', 'item added to the list')
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

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item) => item.id !== id))
    /*
     * if item.id = id don't return it
     * return only ids which doesn't match
     */
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    /*
     * return item from list when item.id = id
     */
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)

    /*
     * setIsEditing to true to know that user is editing
     * setEditId to id to kno which item is editing
     * setName to current editing item
     */
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  /*
   * everytime if something change in the list change it in the local storage
   */
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
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
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
