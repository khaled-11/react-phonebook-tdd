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
  // The default data for add contact form
  const initialContact = {
    first_name: "First Name",
    last_name: "Last Name",
    phone: "xxx-xxx-xxxx",
    email: "name@domain.com",
    detail: "N/A"
  };

  // Use state to save contacts data and control the display
  const [contacts, setContacts] = React.useState([]);  
  const [showAdd, setShowAdd] = React.useState(false);
  const [contactData, setContactData] = React.useState(initialContact);
  const [error, setError] = React.useState("");  

  // Load the contacts from the database
  React.useEffect(() => {
    fetch("http://localhost:3370/read_contacts",
    {
       method: 'POST',
       body: null
    })
      .then(res => res.json())
      .then(
        (result) => {
          setContacts(result.data);
        },
        (error) => {
          // Handle Error
        }
      )
  }, [])

  // Function to set the state of the form inputs
  const setFormData = (e) => {
    setError("")
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle the form submit
  const handleSubmit = (e) => {
    // Prevent default and check for errors.
    e.preventDefault();
    let cuError = false
    for (let i = 0 ; i < contacts.length ; i++){
      if (contacts[i].first_name === contactData.first_name && contacts[i].last_name === contactData.last_name){
        // Display Error
        setError("This contact already exists.")
        cuError = true
      }
    }
    if (!contactData.first_name || !contactData.last_name || !contactData.phone || !contactData.email) {
      setError("Some Fields can't be empty.")
      cuError = true
    }
    // Return to prevent submit and call the API if not.
    if (cuError){
      return
    } else {
      fetch("http://localhost:3370/add_contact",
      {
         method: 'POST',
         body: JSON.stringify({data: contactData})
      })
      .then(res => res.json())
      .then(
        (result) => {
          if (!result.error){
            console.log(result)
            setContacts(result.data);
            setShowAdd(false)
            setContactData(initialContact)
          }
        },
        (error) => {
          // Handle Error
        }
      )
    }
  };

  // Delete Contact funtion
  const delFun = (index) => {
    fetch("http://localhost:3370/delete_contact",
    {
       method: 'POST',
       body: JSON.stringify({data: contacts[index]})
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setContacts(result.data);
        },
        // (error) => {
        //   // Handle Error
        // }
      )
  };

  // Edit contact function
  const editFun = (index) => {
    // Will display an edit form
    console.log(index)
  };

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
              onClick={() => editFun(index)}
              >Edit</button>
              <button 
              style={style.tbl_btn_2}
              onClick={() => delFun(index)}
              className = "delete-btn"
              >Delete</button>
            </div>
          </td>
        </tr>
      ))
    )
  };

  // Function to get the contacts count
  function Count(){
    return contacts.length
  }

  // The return of the App function 
  return (
    <section>      
      <div  id = "header" style={style.centerWithMargin}>
        <h1>PhoneBook Tutorial</h1>
      </div>
      <div  id = "addButtonDiv" style={style.center}>
        {!showAdd?
          <button
            className = "add-btn"
            onClick={()=>{
              setShowAdd(true)
            }}
          >
          Add Contact
          </button>
        :null}
      </div>
      <div style={style.centerWithMargin}>
        {!showAdd ? 
          <section>
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
          </section>
          : null
        }
      </div>
      <div style = {style.center}>
        {showAdd ?  
          <div id = "add_section" style={style.formSection}>
            <h3>Add Contact</h3>
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
              <input name="email" type="text"value={contactData.email} onChange={setFormData}/>
              <br />
              <label>Details:</label>
              <br />
              <input name="detail" type="text"value={contactData.detail} onChange={setFormData}/>
              <br />
              <br />
              <input type="submit"
                className='submit-btn'
                value="Add Contact" 
              />
              <input type="button"
                  className='cancel-btn'
                  value="Cancel" 
                  onClick={() =>{setShowAdd(false)}}
              />
            </form>
            <h4 style = {{color:'red'}}id = "error_add">{error}</h4>
          </div>
          :     
          null
        }
      </div>
    </section>
  );
}

export default App;
