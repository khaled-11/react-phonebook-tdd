import React from 'react';
import './App.css';

// Inline React style
const style = {
  center:{
    display: 'flex', 
    justifyContent:'center', 
  },
  centerWithMargin:{
    display: 'flex', 
    marginTop:'3vh', 
    justifyContent:'center', 
    alignItems:'center'
  },
  formSection:{
    padding:"12px 18px",
    border: "0.7px solid black",
    textAlign:"center",
  },
  table:{
    borderCollapse: "collapse",
  },
  tableCell:{
    border: "0.7px solid black",
    padding: "6px 12px",
    width: "max-content",
  },
}

// The entire App is in one function component
function App() {
  // Placeholders for add contact form.
  const gInitialContact = {
    first_name: "First name",
    last_name: "Last name",
    phone: "xxx-xxx-xxxx",
    email: "name@domain.com",
    detail: "N/A",
    id: "0"
  };
  // All contacts data
  const [contacts, setContacts] = React.useState([]);  
  // Global add/edit contact data
  const [gContact, setGContacts] = React.useState(gInitialContact);  
  // State to hide and display add form
  const [showAdd, setShowAdd] = React.useState(false);
  // State to hide and display edit form
  const [showEdit, setShowEdit] = React.useState(false);
  // State to hide and display edit form
  const [showDelete, setShowDelete] = React.useState(false);
  // Used to save the index of the to edit/delete contact
  const [currentContact, setCurrentContact] = React.useState(-1);
  // Global error state for add and edit forms
  const [error, setError] = React.useState("");
  // Error state for the main page on network error.
  const [mainError, setMainError] = React.useState([[],[]]);  
  // Global state to check if add submit is in progress.
  const [submiting, setSubmitting] = React.useState(true); 
  // Global state to check if edit submit is in progress.
  const [editing, setEditing] = React.useState(true);  
  // Global state to check if the data is loaded
  const [isLoaded, setLoading] = React.useState(false);
  
  // Load the contacts from the database and save it.
  React.useEffect(() => {
    fetch("/read_contacts",
    {
       method: 'GET',
       body: null
    })
      .then(res => res.json())
      .then(
        (result) => { 
          setMainError([[],[]])
          setContacts(result.data);
          setLoading(true)
        },
        (error) => {
          setMainError([[`Network Connection Error`],[`Please Refresh!`]])
          setLoading(true)
        }
      )
  }, [])

  // View for Add form and Edit form.
  function AddEdit(props){
    // The placeholders for add/edit contact form
    let initialContact
    if (submiting){
      if (props.type === "add"){
        initialContact = gContact
      } else {
        if (editing){
          initialContact = contacts[`${currentContact}`]
        } else {
          initialContact = gContact
        }
      }
    } else {
      initialContact = gContact
    }
    const [contactData, setContactData] = React.useState(initialContact);
    const [inError, setInError] = React.useState(error);
    
    // Function to set the state of the form inputs
    const setFormData = (e) => {
      setInError("")
      setContactData({
        ...contactData,
        [e.target.name]: e.target.value,
      });
    };

    // Function to handle the form submit
    const handleSubmit = (e) => {
      e.preventDefault();
      setError("")
      // Check if in preogress
      if (submiting){
        // Prevent multiple submits
        setSubmitting(false)
        // Set the global contact data to current input
        setGContacts(contactData)
        // Prevent default and check for errors.
        let cuError = false
        for (let i = 0 ; i < contacts.length ; i++){
          if (contacts[i].first_name === contactData.first_name && contacts[i].last_name === contactData.last_name){
            // Display Error
            if (currentContact > -1){
              if (contacts[i].id !== contacts[currentContact].id){
                setError("This contact data already exists.")
                cuError = true
              }
            } else {
              setError("This contact already exists.")
              cuError = true
            }
          }
        }
        if (!contactData.first_name || !contactData.last_name || !contactData.phone || !contactData.email) {
          setError("Some Fields can't be empty.")
          cuError = true
        }
        // Return to prevent submit and call the API if not.
        if (cuError){
          if (props.type === "edit"){
            setEditing(false)
          }
          setSubmitting(true)
          return
        } else {
          if (props.type === "add"){
            addContact(contactData)
          } else {
            editContact(contactData)
            setEditing(false)
          }
        }
      }
    };

    // The return of the function
    return (
      <div id = "add_section" style={style.formSection}>
      <h3>{props.type === "add"? "Add Contact" : "Edit Contact"}</h3>
      <form id = "add_form" onSubmit={handleSubmit}>
        <label>First name:</label>
        <br />
        <input name="first_name" type="text" value={contactData.first_name} onChange={setFormData}/>
        <br />
        <label>Last name:</label>
        <br />
        <input name="last_name" type="text" value={contactData.last_name} onChange={setFormData}/>
        <br />
        <label>Phone:</label>
        <br />
        <input name="phone" type="text" value={contactData.phone} onChange={setFormData}/>
        <br />
        <label>Email:</label>
        <br />
        <input name="email" type="text" value={contactData.email} onChange={setFormData}/>
        <br />
        <label>Details:</label>
        <br />
        <input name="detail" type="text" value={contactData.detail} onChange={setFormData}/>
        <input name="id" readOnly style = {{display:"none"}} type="text" value={contactData.id}/>
        <br />
        <br />
        <input type="submit"
          className='submit-btn'
          value={props.type === "add"? "Add Contact" : "Save Contact"}
        />
        <input type="button"
            className='cancel-btn'
            value="Cancel" 
            id = "cancel_form"
            onClick={() =>{setShowAdd(false); setShowEdit(false); setCurrentContact(-1); setGContacts(gInitialContact); setError(""); setEditing(true)}}
        />
      </form>
      <h4 style = {{color:'red'}} id = "error_add">{inError}</h4>
    </div>
    )
  }

  // Function to POST new contact data
  function addContact(contactData){
    fetch("/add_contact",
    {
      method: 'POST',
      body: JSON.stringify({data: contactData})
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (!result.error){
          setGContacts(gInitialContact)
          setShowAdd(false)
          setContacts(result.data);
        } else {
          setError("Network Error! Please try again.")
        }
        setSubmitting(true)
      },
      (error) => {
        setError("Network Error! Please try again.")
        setSubmitting(true)
      }
    )
  }

  // Function to POST new contact data
  function editContact(contactData){
    fetch("/edit_contact",
    {
      method: 'POST',
      body: JSON.stringify({data: contactData})
    })
    .then(res => res.json())
    .then(
      (result) => {
        setSubmitting(true)
        if (!result.error){
          setEditing(true)
          setGContacts(gInitialContact)
          setShowEdit(false)
          setContacts(result.data);
        } else {
          setError("Network Error! Please try again.")
        }
      },
      (error) => {
        setError("Network Error! Please try again.")
        setSubmitting(true)
      }
    )
  }

  // Delete Contact funtion
  const delFun = (index) => {
    fetch("/delete_contact",
    {
       method: 'POST',
       body: JSON.stringify({data: contacts[index]})
    })
      .then(res => res.json())
      .then(
        (result) => {
          setContacts(result.data);
        },
        (error) => {
          setMainError([[`There was an error. Please try again.`],[]])
        }
      )
  };
  
  // Function to get the contacts count
  function Count(){
    return contacts.length
  }

  // Function to confirm delete
  function Delete(){    
    return (
      <section>
        <p id = "del_con">Do you want to permanently delete <b>{contacts[currentContact].first_name} {contacts[currentContact].last_name}</b>?</p>
        <div style={style.centerWithMargin}>
        <button
          variant="default"
          className='cancel-btn2'
          id="con_del"
          onClick={() => {setShowDelete(false); delFun(currentContact);  setCurrentContact(-1)}}
        >Delete</button>
        <button
          variant="default"
          className='submit-btn'
          onClick={() => {setShowDelete(false); setCurrentContact(-1)}}
        >Cancel</button>
      </div>
      </section>
    )
  }

  // Display the contacts in the table function
  function Display () {
    return (
      contacts.map((user, index) => (
        <tr key={index}>
          <td style={style.tableCell}>{user.first_name}</td>
          <td style={style.tableCell}>{user.last_name}</td>
          <td style={style.tableCell}>{user.phone}</td>
          <td style={style.tableCell}>{user.email}</td>
          <td style={style.tableCell}>
            <div style={{display: 'flex',  justifyContent:'center'}}>
              <button
              variant="default"
              className = "edit-btn"
              onClick={() => {setShowEdit(true); setCurrentContact(index); setMainError([[],[]])}}
              >Edit</button>
              <button 
              style={style.tbl_btn_2}
              onClick={() => {setShowDelete(true); setCurrentContact(index); setMainError([[],[]])}}
              className = "delete-btn"
              >Delete</button>
            </div>
          </td>
        </tr>
      ))
    )
  };

  // Function for the main page
  function Main(){
    return (
      <section>
      <div style={style.centerWithMargin}>
        <button
          className = "add-btn"
          id = "add_button"
          onClick={()=>{
            setShowAdd(true)
          }}
        >
        Add Contact
        </button>
      </div>
      <br />
      <table className = "table" style={style.table} id = "table">
        <thead>
          <tr>
            <th style={style.tableCell}>First name</th>
            <th style={style.tableCell}>Last name</th>
            <th style={style.tableCell}>Phone</th>
            <th style={style.tableCell}>Email</th>
            <th style={style.tableCell}>Action</th>
          </tr>
        </thead>
        <tbody>
          <Display />
        </tbody>
      </table>
      <h4 style = {{textAlign:"center"}} id = "counter">Total Contacts: <Count /></h4>
      <br />
      <h4 style = {{color:'red',textAlign:"center"}}id = "error_main">{mainError[0]}<br />{mainError[1]}</h4>
    </section>
    )
  }

  // The return of the App function 
  return (
    <section>      
      <div  id = "header" style={style.centerWithMargin}>
        <h1>PhoneBook Tutorial</h1>
      </div>
      {/* Div for the main page */}
      {isLoaded? 
      <div  id = "main" style={style.center}>
        {!showAdd && !showEdit && !showDelete?
          <Main />
        : null}
      </div>
      :
      <div style={style.centerWithMargin}>
        <br />
        <br />
        <p>Loading .....</p>
      </div>
      }

      {/* Div for the add/edit/delete forms */}
      <div style = {style.center}>
        {showAdd ?  
          <AddEdit type = {"add"}/>
          :     
          null
        }
        {showEdit ?  
          <AddEdit type = {"edit"}/>
          :     
          null
        }
        {showDelete ?  
          <Delete/>
          :     
          null
        }
      </div>
    </section>
  );
}

export default App;
