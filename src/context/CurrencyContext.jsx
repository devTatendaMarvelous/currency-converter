import { createContext, useState } from 'react'

export const CurrencyContext = createContext()

const CurrencyPovider = ({ children }) => {
     const [fromCurrency, setFromCurrency] = useState('🇺🇸 USD - United States')
     const [toCurrency, setToCurrency] = useState('🇫🇷 EUR - France')
     const [firstAmount, setFirstAmount] = useState("")
     const value = {
          fromCurrency,
          setFromCurrency,
          toCurrency,
          setToCurrency,
          firstAmount,
          setFirstAmount
     }
     return (
          <CurrencyContext.Provider value={value}>
               {children}
          </CurrencyContext.Provider>
     )
}
export default CurrencyPovider 