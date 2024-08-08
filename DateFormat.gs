class DateFormat {
  // Enum for date formats
  static get Locale() {
    return {
      ISO: 'yyyy-MM-dd',
      EU: 'dd.MM.yyyy',
      US: 'MM/dd/yyyy',
      // Add more formats if needed
    }
  }

  // Enum for timezones
  static get Timezone() {
    return {
      UTC: 'UTC',
      PST: 'America/Los_Angeles',  // Pacific Standard Time
      EST: 'America/New_York',     // Eastern Standard Time
      CET: 'Europe/Paris',         // Central European Time
      GMT: 'Europe/London',        // Greenwich Mean Time
      JST: 'Asia/Tokyo',           // Japan Standard Time
      AEST: 'Australia/Sydney',    // Australian Eastern Standard Time
      IST: 'Asia/Kolkata',         // Indian Standard Time
      CST: 'America/Chicago',      // Central Standard Time
      MST: 'America/Denver',       // Mountain Standard Time
      // Add more timezones if needed
    }
  }

  // Method for formatting date
  static date(dateInput = new Date(), locale = this.Locale.ISO, timezone = this.Timezone.CET) {
    let dateObj

    if (typeof dateInput === 'number' || /^\d+$/.test(dateInput)) {
      dateObj = new Date(parseInt(dateInput))
    } else if (typeof dateInput === 'string') {
      dateObj = new Date(dateInput)
    } else if (dateInput instanceof Date) {
      dateObj = dateInput
    }

    // Check if the date object is defined
    if (!dateObj) {
      console.warn('Invalid date input, defaulting to epoch time.')
      dateObj = new Date(0)
    }

    // Validate locale
    if (!Object.values(DateFormat.Locale).includes(locale)) {
      console.warn(`Invalid locale provided. Defaulting to ${DateFormat.Locale.ISO}.`)
      locale = DateFormat.Locale.ISO
    }

    // Validate timezone
    if (!Object.values(DateFormat.Timezone).includes(timezone)) {
      console.warn(`Invalid timezone provided. Defaulting to ${DateFormat.Timezone.GMT}.`)
      timezone = DateFormat.Timezone.GMT
    }

    return Utilities.formatDate(dateObj, timezone, locale)
  }

  // Method for formatting date
  static dateTime(dateInput = new Date(), locale = this.Locale.ISO, timezone = this.Timezone.CET, isSeconds = false) {
    let dateObj

    if (typeof dateInput === 'number' || /^\d+$/.test(dateInput)) {
      dateObj = new Date(parseInt(dateInput))
    } else if (typeof dateInput === 'string') {
      dateObj = new Date(dateInput)
    } else if (dateInput instanceof Date) {
      dateObj = dateInput
    }

    // Check if the date object is defined
    if (!dateObj) {
      console.warn('Invalid date input, defaulting to epoch time.')
      dateObj = new Date(0)
    }

    // Validate locale
    if (!Object.values(DateFormat.Locale).includes(locale)) {
      console.warn(`Invalid locale provided. Defaulting to ${DateFormat.Locale.ISO}.`)
      locale = DateFormat.Locale.ISO
    }

    // Validate timezone
    if (!Object.values(DateFormat.Timezone).includes(timezone)) {
      console.warn(`Invalid timezone provided. Defaulting to ${DateFormat.Timezone.GMT}.`)
      timezone = DateFormat.Timezone.GMT
    }

    return Utilities.formatDate(dateObj, timezone, `${locale} HH:mm${isSeconds ? ':ss' : ''}`)
  }
}


function testDateFormat() {
  console.log(1, DateFormat.date('2000-05-17 22:00 -05:00'))
  console.log(2, DateFormat.date())
  console.log(3, DateFormat.date(0))
  console.log(4, DateFormat.date('thu 17.05.2000'))
  console.log(5, DateFormat.date('sdf'))
  console.log(6, DateFormat.date(' // 17/5/2000'))
  console.log(7, DateFormat.date('17/5/2000'))
  console.log(8, DateFormat.date('5/17/2000'))
  console.log(9, DateFormat.date(new Date(132543532543), DateFormat.Locale.EU))
  console.log(10, DateFormat.date(0, DateFormat.Locale.EU))
  console.log(11, DateFormat.date(Date.now(), DateFormat.Locale.ISO, DateFormat.Timezone.AEST))
  console.log(12, DateFormat.date('321543532543', DateFormat.Locale.EU, DateFormat.Timezone.AEST))
  console.log(13, DateFormat.date('325431532543', 'dfhgsdf', DateFormat.Timezone.CET))
  console.log(14, DateFormat.date('312543532543', DateFormat.Locale.EU, 4655456))

  console.log(15, DateFormat.dateTime('178954353254', DateFormat.Locale.EU, DateFormat.Timezone.CET, true))
  console.log(16, DateFormat.dateTime(Date.now()))
  console.log(17, DateFormat.dateTime('5/17/2000', DateFormat.Locale.EU, DateFormat.Timezone.AEST))
  console.log(18, DateFormat.dateTime('2000-05-17 22:12:56 -05:00', '', '', true))
}

