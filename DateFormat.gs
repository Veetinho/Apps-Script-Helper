class DateFormat {
  // Enum for date formats
  static get Locale() {
    return {
      ISO: 'yyyy-MM-dd',
      EU: 'dd.MM.yyyy',
      US: 'MM/dd/yyyy',
      FULL: 'EEE MMM dd yyyy',
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
