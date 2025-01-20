function DateFormat() {
  // Enum for date formats
  const Locale = {
    ISO: 'yyyy-MM-dd',
    EU: 'dd.MM.yyyy',
    US: 'MM/dd/yyyy',
    FULL: 'EEE MMM dd yyyy',
  }

  // Enum for timezones
  const Timezone = {
    UTC: 'UTC',
    PST: 'America/Los_Angeles',
    EST: 'America/New_York',
    CET: 'Europe/Paris',
    GMT: 'Europe/London',
    JST: 'Asia/Tokyo',
    AEST: 'Australia/Sydney',
    IST: 'Asia/Kolkata',
    CST: 'America/Chicago',
    MST: 'America/Denver',
  }


  // Helper function to convert input into a Date object
  function parseDateInput(dateInput) {
    let dateObj

    if (typeof dateInput === 'number' || /^\d+$/.test(dateInput)) {
      dateObj = new Date(parseInt(dateInput))
    } else if (typeof dateInput === 'string') {
      dateObj = new Date(dateInput)
    } else if (dateInput instanceof Date) {
      dateObj = dateInput
    }
    return dateObj
  }

  // Function for formatting date
  function date(dateInput = new Date(), locale = Locale.ISO, timezone = Timezone.CET) {
    let dateObj = parseDateInput(dateInput)
    // Check if the date object is defined
    if (!dateObj) {
      console.warn('Invalid date input, defaulting to epoch time.')
      dateObj = new Date(0)
    }


    // Validate locale
    if (!Object.values(Locale).includes(locale)) {
      console.warn(`Invalid locale provided. Defaulting to ${Locale.ISO}.`)
      locale = Locale.ISO
    }

    // Validate timezone
    if (!Object.values(Timezone).includes(timezone)) {
      console.warn(`Invalid timezone provided. Defaulting to ${Timezone.GMT}.`)
      timezone = Timezone.GMT
    }

    return Utilities.formatDate(dateObj, timezone, locale)
  }


  // Function for formatting date and time
  function dateTime(dateInput = new Date(), locale = Locale.ISO, timezone = Timezone.CET, isSeconds = false) {
    let dateObj = parseDateInput(dateInput)

    // Check if the date object is defined
    if (!dateObj) {
      console.warn('Invalid date input, defaulting to epoch time.')
      dateObj = new Date(0)
    }

    // Validate locale
    if (!Object.values(Locale).includes(locale)) {
      console.warn(`Invalid locale provided. Defaulting to ${Locale.ISO}.`)
      locale = Locale.ISO
    }

    // Validate timezone
    if (!Object.values(Timezone).includes(timezone)) {
      console.warn(`Invalid timezone provided. Defaulting to ${Timezone.GMT}.`)
      timezone = Timezone.GMT
    }

    return Utilities.formatDate(dateObj, timezone, `${locale} HH:mm${isSeconds ? ':ss' : ''}`)
  }

  // Return the functions that should be exposed by the closure.
  return {
    Locale,
    Timezone,
    date,
    dateTime
  }
}

function testDateFormat() {
  const dateFormat = DateFormat()
  console.log(
    dateFormat.dateTime('2022-5-15 12:32', dateFormat.Locale.EU, dateFormat.Timezone.PST)
  )
}
