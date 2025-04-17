const countryCurrencyMapper = {
  IN: 'INR',
  EUR: [
    'AS',
    'AD',
    'AT',
    'BE',
    'FI',
    'FR',
    'GF',
    'TF',
    'DE',
    'GR',
    'GP',
    'IE',
    'IT',
    'LU',
    'MQ',
    'YT',
    'MC',
    'NL',
    'PT',
    'RE',
    'WS',
    'SM',
    'SI',
    'ES',
    'VA'
  ],
  USD: ['GS', 'GB', 'JE', 'US'] // Defaulting to USD for less common currencies
}

const defaultCountry = 'US'
const defaultCurrency = 'USD'

export default {
  countryCurrencyMapper,
  defaultCountry,
  defaultCurrency
}
