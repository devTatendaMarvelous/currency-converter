
import { Box, Container, Grid, Typography } from '@mui/material';
import InputAmount from './components/InputAmount';
import SelectCountry from './components/SelectCountry';
import SwitchCurrency from './components/SwitchCurrency';
import { CurrencyContext } from './context/CurrencyContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const { fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount
  } = useContext(CurrencyContext)

  const codeFromCurrency = fromCurrency.split(' ')[1]
  const codeToCurrency = toCurrency.split(' ')[1]

  const [resultCurrency, setResultCurrency] = useState(0)

  useEffect(() => {
    if (firstAmount) {
      axios('https://api.freecurrencyapi.com/v1/latest', {
        params: {
          apikey: 'zeLYLwkrZlrGAW92KJL8ffRm9UIGaDbfkbm1yAeb',
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      }).then(response => setResultCurrency(response.data.data[codeToCurrency])).catch(error => console.log(error))
    }
  }, [firstAmount,
    toCurrency,
    setToCurrency])

  const boxStyles = {
    marginTop: '10rem',
    background: "#fdfdfd",
    textAlign: 'center',
    color: '#222',
    minHeight: '20rem',
    borderRadius: 2,
    padding: '4rem 2rem',
    boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
    position: 'relative'
  }
  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant='h5' sx={{
        marginBottom: "2rem"
      }}>
        Stay Ahead With Accurate Conversions
      </Typography>
      <Grid container spacing={2}>
        <InputAmount />
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label='From' />
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label='To' />
      </Grid>
      {firstAmount ? (
        <Box sx={{ textAlign: 'left', marginTop: '1rem' }}>
          <Typography >
            {firstAmount} {fromCurrency} =
          </Typography>
          <Typography >
            {resultCurrency * fromCurrency} {toCurrency}
          </Typography>
        </Box>
      ) : ''}
    </Container>
  )
}

export default App
