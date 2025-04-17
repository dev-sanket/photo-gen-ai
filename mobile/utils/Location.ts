import * as Location from 'expo-location'
import { getLocales, Locale } from 'expo-localization'

export type LocationType = {
  location: Location.LocationObject
  locales: Locale[]
}

async function getLocation(): Promise<LocationType | null> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      console.log('Permission to access location was denied')
      return null
    }

    const location = await Location.getCurrentPositionAsync({})
    const locales = await getLocales()
    if (locales && locales.length > 0) {
      // const regionCode = locales[0].regionCode
      console.log('Country code:', locales[0])
      return { location, locales }
    } else {
      console.log("Could not determine user's locale")
      return null
    }
  } catch (error) {
    console.log('Error getting location or locale:', error)
    return null
  }
}

// Call the function to get the country code
export default getLocation
