import './App.css'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import sendTransaction from './etherTransaction'

export default function App() {
  return (
    <div className='App'>
      <div className='App-Content'>
        <AppHeader />
        <Box m={4} />
        <AppBody />
      </div>
    </div>
  )
}

function AppHeader() {
  return (
    <div className='AppHeader'>
      <Typography component='h1'>Alice & Bob</Typography>
    </div>
  )
}

function AppBody() {
  const [val, setval] = React.useState('')
  const [dest, setdest] = React.useState('')
  const [tx_msg, settx_msg] = React.useState('')

  const onClick = async () => {
    await sendTransaction({
      toAddress: dest,
      valueInEth: val,
      gas: 5000000,
      message: tx_msg,
    })
  }

  return (
    <Grid container={true} direction='column'>
      <TextField  label='To Address' value={dest} onChange={event => setdest(event.target.value)} />
      <Box m={1} />
      <TextField label='Enter ETH amount' value={val} onChange={event => setval(event.target.value)} />
      <Box m={1} />
      <TextField label='Message (optional)' value={tx_msg} onChange={event => settx_msg(event.target.value)} />
      <Box m={3} />
      <Button onClick={onClick} variant='contained' color='primary'> Send ETH </Button>
    </Grid>
  )
}
