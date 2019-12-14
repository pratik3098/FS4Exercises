import './App.css'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

import fetchData from './fetchData'

// Copy list of province codes and names from:
//   https://gist.githubusercontent.com/amsul/9a651de3f5ee24bf7e85d33bb7f201d3/raw/7a1af47d634d27d6c8a442d0671a9c67a9077b52/provinces.json
//
// Copy images of province flags from:
//   https://en.wikipedia.org/wiki/List_of_Canadian_flags#Provincial
//
// Fetch Trump's quotes from:
//   https://api.whatdoestrumpthink.com/api/v1/quotes

export default function App() {
  return (
    <div className='App'>
      <div className='App-Content'>
        <h1 className='App-Title'>Exercise 2: Random Form</h1>
        <Form />
      </div>
    </div>
  )
}

function Form() {
  // Put your answers here 👇
  const [provinceData, setprovinceData] = React.useState({})
  const [provincesList, setProvincesList] = React.useState([])
  const [provinceCode, setProvinceCode] = React.useState("")
  const onChangeSetProvinceCode = event => { setProvinceCode(event.target.value)}
  const provinceDataUrl = "https://gist.githubusercontent.com/amsul/9a651de3f5ee24bf7e85d33bb7f201d3/raw/7a1af47d634d27d6c8a442d0671a9c67a9077b52/provinces.json"
  const [nonPersonalizedMsgs, setNonPersonalizedMsgs] = React.useState("")
  const [userQuotes, setUserQuote] = React.useState("")
  const onChangeSetMessage = event => {
    setUserQuote(event.target.value)
    console.log(userQuotes)
  }

  React.useEffect(() => {fetchData(provinceDataUrl).then(res=> {
        setprovinceData(res)
        setProvincesList(Object.values(res))
      })}, [])

  React.useEffect(() => {fetchData("https://api.whatdoestrumpthink.com/api/v1/quotes").then(res => {
        console.log(res)
        setNonPersonalizedMsgs(res.messages.non_personalized)})}, [])

  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const onChangeFirstName = event => {setFirstName(event.target.value)}
  const onChangeLastName = event => { setLastName(event.target.value)}
  const [resultStatus, setresultStatus] = React.useState(false)
  const onFormSubmit = () => {
    setresultStatus(true)
  }
  const provinceFlag = {
    AB: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Flag_of_Alberta.svg/200px-Flag_of_Alberta.svg.png",
    BC: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Flag_of_British_Columbia.svg/200px-Flag_of_British_Columbia.svg.png",
    OC: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Flag_of_Quebec.svg/200px-Flag_of_Quebec.svg.png",
    ON: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Flag_of_Quebec.svg/200px-Flag_of_Quebec.svg.png",
    MB: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Flag_of_Manitoba.svg/200px-Flag_of_Manitoba.svg.png",
    NB: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Flag_of_New_Brunswick.svg/200px-Flag_of_New_Brunswick.svg.png",
    NL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Newfoundland_and_Labrador.svg/200px-Flag_of_Newfoundland_and_Labrador.svg.png",
    NS: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Nova_Scotia.svg/200px-Flag_of_Nova_Scotia.svg.png",
    NT: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_the_Northwest_Territories.svg/200px-Flag_of_the_Northwest_Territories.svg.png",
    NU: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Flag_of_Nunavut.svg/200px-Flag_of_Nunavut.svg.png",
    PE: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Flag_of_Prince_Edward_Island.svg/200px-Flag_of_Prince_Edward_Island.svg.png",
    SK: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Flag_of_Saskatchewan.svg/200px-Flag_of_Saskatchewan.svg.png",
    YT: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Flag_of_Yukon.svg/200px-Flag_of_Yukon.svg.png"
  }
  return (
    <div>
      {!resultStatus && <div>
        <Grid container direction="column" justify="center" alignItems="stretch">
        <TextField id="outlined-basic" label="First Name" variant="outlined" onChange={onChangeFirstName} /> <br />
        <TextField id="outlined-basic" label="Last Name" variant="outlined" onChange={onChangeLastName} /><br />

          <p>
            <label>Select a province</label>
            <select id="myList" onChange={onChangeSetProvinceCode}>
              {provincesList.length > 0 ? Object.entries(provinceData).map(([key, value]) => (
                <option key={key} value={key}>{value}</option> )) : ""}
            </select>
          </p>

          <p>
            <label>Select a Trump Quote</label>
            <select id="quotesList" onChange={onChangeSetMessage}>
              {nonPersonalizedMsgs.length > 0 ? nonPersonalizedMsgs.map((message, index) => (
                <option key={index} value={message}>{message}</option>
              )) : ""}
            </select>
          </p>

          <Button disableFocusRipple={true} size="medium" variant="outlined" disabled={firstName === "" || lastName === "" || provinceCode === "" ||  userQuotes === "" ? true : false} onClick={onFormSubmit}>Submit</Button>

        </Grid>
      </div>}

      {resultStatus && <div>
        <form>
          <p>Full Name: {firstName} {lastName}</p>
          <p>Trump Quote: {userQuotes}</p>
          <p> Province <p> Code: {provinceCode}</p>
          <p> Name: {provinceData[provinceCode.toString()]} </p>
          <p> <label>Flag: <img src={provinceFlag[provinceCode.toString()]} alt=''></img></label></p>
          </p>
        </form>
      </div>}
    </div>
  )
}
