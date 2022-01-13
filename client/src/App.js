import React from 'react';

const style = {
  center:{
    display: 'flex', 
    justifyContent:'center', 
    alignItems:'center'
  },
  centerWithMargin:{
    display: 'flex', 
    marginTop:'2vh', 
    justifyContent:'center', 
    alignItems:'center'
  },
  // tbl_btn_1:{
  //   margin:"5px",
  //   padding: "10px 15px",
  //   border: "none",
  //   backgroundColor: "blue",
  //   color:"white",
  //   fontSize: "14px",
  //   borderRadius: "5px",
  // },
  // tbl_btn_2:{
  //   margin:"5px",
  //   padding: "10px 15px",
  //   border: "none",
  //   backgroundColor: "red",
  //   fontSize: "14px",
  //   borderRadius: "5px",
  // },
  // formSection:{
  //   padding:"12px 18px",
  //   border: "0.7px solid black",
  //   textAlign:"center"
  // },
  table:{
    borderCollapse: "collapse",
    display:"full"
  },
  tableCell:{
    border: "0.7px solid black",
    padding: "6px 12px",
    width: "max-content",
  },
  addBtn:{
    backgroundColor: 'rgb(0, 128, 0)',
    fontSize: "16px",
    borderRadius: '5px',
    fontWeight: "700",
    color:'white',
    padding:"6px 12px",
  },
  addBtnHover:{
    backgroundColor: "rgb(255, 255, 255)",
    color: "black"
  },
  // cancelBtn:{
  //   backgroundColor: "red",
  //   marginLeft:"15px",
  //   fontSize: "16px",
  //   borderRadius: '5px',
  //   fontWeight: "700",
  //   color:'white',
  //   padding:"6px 12px",
  // },
  // cancelBtnHover:{
  //   backgroundColor: "white",
  //   color: "black"
  // }
}

// function AddForm(props) {

//   const contact = {
//     firstname: "First Name",
//     lastname: "Last Name",
//     phone: "xxx-xxx-xxxx",
//     email: "fdfds@gf"
//   };

//   const [userState, setUserState] = React.useState(contact);

//   const handleUserChange = (e) => {
//     setUserState({
//       ...userState,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!userState.firstname || !userState.lastname || !userState.phone || !userState.email) return;
//     props.addUser(userState);
//     setUserState(contact);
//     props.setShowAdd(false)
//   };

//   const [addHover, setAddHover] = React.useState(false);
//   const [hoverCancel, setHoverCancel] = React.useState(false);
//   return (
//     <section style={style.formSection}>
//     <h3>Add Contact</h3>
//     <form onSubmit={handleSubmit}>
//         <label style = {{marginRight: "8px"}}>First name:</label>
//         <br />
//         <input name="firstname" type="text" value={userState.firstname} onChange={handleUserChange} />
//       <br />
//         <label style = {{marginRight: "8px"}}>Last name:</label>
//         <br />
//         <input name="lastname" type="text" value={userState.lastname} onChange={handleUserChange}/>
//       <br />
//         <label style = {{marginRight: "8px"}}>Phone:</label>
//         <br />
//         <input name="phone" type="text" value={userState.phone} onChange={handleUserChange}/>
//       <br />
//         <label style = {{marginRight: "8px"}}>Email:</label>
//         <br />
//         <input name="email" type="text" value={userState.email} onChange={handleUserChange}/>
//         <br />
//         <br />
//         <input type="submit"
//           onMouseEnter={()=>{
//             setAddHover(true);
//           }}
//           onMouseLeave={()=>{
//             setAddHover(false);
//           }}
//           style={{...style.addBtn,...(addHover ? style.addBtnHover : null)}}
//           value="Add User" 
//         />
//         <button
//           onMouseEnter={()=>{setHoverCancel(true);}}
//           onMouseLeave={()=>{setHoverCancel(false);}}
//           onClick={() =>{props.setShowAdd(false)}}
//           style={{...style.cancelBtn,...(hoverCancel ? style.cancelBtnHover : null)}}
//         >Cancel
//         </button>
//     </form>
//     </section>
//   );
// }

function App() {
  // const [users, setUser] = React.useState([]);  
  const [hover, setHover] = React.useState(false);
  // const [showAdd, setShowAdd] = React.useState(false);

  // const addUser = (user) => {
  //   setUser([...users, user]);
  // };

  // const delFun = (index) => {
  //   // Will call server and delete from database
  //   users.splice(index,1)
  //   setUser([...users]);
  // };
  // const editFun = (index) => {
  //   // Will display an edit form
  //   console.log(index)
  // };
  
  // let tt2 = {firstName:"khalfgdged", lastName:"Abgfdgous", phone:"323", email:"re@"}

  // setUser([...users, tt2]);

  // function addUser2 () {

  // let tt = [{firstname:"khssdaled", lastname:"Abous", phone:"32dfs3", email:"fdsre@"},{firstname:"khaled", lastname:"Abofdsfus", phone:"323", email:"re@"}]
  // for (let j = 0 ; j < tt.length; j++){
  //   setUser([...users, tt[j]]);
  // }
  // }

  // addUser2()

  // React.useEffect(() => {
  //   fetch("http://localhost:3370/read_contact",
  //   {
  //      method: 'POST',
  //      body: null
  //   })
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setUser(result.data);
  //       },
  //       (error) => {
  //         console.log(error)
  //       }
  //     )
  // }, [])

  // const sortedContacts = users.sort((a, b) => a.lastname.localeCompare(b.lastname));
  // const display =
  // sortedContacts.length > 0 ? (
  //   sortedContacts.map((user, index) => (
  //     <tr key={index}>
  //       <td style={style.tableCell}>{user.firstname}</td>
  //       <td style={style.tableCell}>{user.lastname}</td>
  //       <td style={style.tableCell}>{user.phone}</td>
  //       <td style={style.tableCell}>{user.email}</td>
  //       <td style={style.tableCell}>
  //         <div style={{display: 'flex',  justifyContent:'center'}}>
  //           <button style = {style.tbl_btn_1} onClick={() => editFun(index)}>Edit</button>
  //           <button style = {style.tbl_btn_2} onClick={() => delFun(index)}>Delete</button>
  //         </div>
  //       </td>
  //     </tr>
  //   ))
  // ) : (
  //   <tr>
  //     <td colSpan={3}>&nbsp;</td>
  //   </tr>
  // );

  return (
    <section>
      <div  id = "header" style={style.centerWithMargin}>
        <h1>PhoneBook Tutorial</h1>
      </div>
      <div  id = "addButtonDiv" style={style.center}>
      <button
        onMouseEnter={()=>{
          setHover(true);
        }}
        onMouseLeave={()=>{
          setHover(false);
        }}
        id={(hover? "btn_hover":"btn_normal")}
        style={{...style.addBtn,...(hover ? style.addBtnHover : null)}}
      >
        Add Contact
        </button>
      </div>
      <div style={style.centerWithMargin}>
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
          <tbody></tbody>
        </table>
      </div>


      {/* { showAdd ? null: 
      <section>
      <div style={style.PhoneBook_App}>
        <button 
          onMouseEnter={()=>{
            setHover(true);
          }}
          onMouseLeave={()=>{
            setHover(false);
          }}
          onClick={() =>{
            setHover(false)
            setShowAdd(true)
          }}
          style={{...style.addBtn,...(hover ? style.addBtnHover : null)}}
        >
          Add Contact
        </button>
      </div>
      <div style={style.PhoneBook_App}>
        <table style={style.table} id = "table">
          <thead>
            <tr>
              <th style={style.tableCell}>First name</th>
              <th style={style.tableCell}>Last name</th>
              <th style={style.tableCell}>Phone</th>
              <th style={style.tableCell}>Email</th>
              <th style={style.tableCell}>Action</th>
            </tr>
          </thead>
          <tbody>{display}</tbody>
        </table>
      </div>
      </section>
      }

      <div style={style.PhoneBook_App}>
        { showAdd ? <AddForm addUser= {addUser} setShowAdd={setShowAdd}/> : null }
      </div> */}
    </section>
  );
}

export default App;
