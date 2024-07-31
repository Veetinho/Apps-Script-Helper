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
  static shortDate(dateInput = new Date(), locale = this.Locale.ISO, timezone = this.Timezone.CET) {
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
}


function testDateFormat() {
  console.log(1, DateFormat.shortDate('2000-05-17 22:00 -05:00'))
  console.log(2, DateFormat.shortDate())
  console.log(3, DateFormat.shortDate(0))
  console.log(4, DateFormat.shortDate('thu 17.05.2000'))
  console.log(5, DateFormat.shortDate('sdf'))
  console.log(6, DateFormat.shortDate(' // 17/5/2000'))
  console.log(7, DateFormat.shortDate('17/5/2000'))
  console.log(8, DateFormat.shortDate('5/17/2000'))
  console.log(9, DateFormat.shortDate(new Date(132543532543), DateFormat.Locale.EU))
  console.log(10, DateFormat.shortDate(0, DateFormat.Locale.EU))
  console.log(11, DateFormat.shortDate(Date.now(), DateFormat.Locale.US))
  console.log(12, DateFormat.shortDate('321543532543', DateFormat.Locale.EU, DateFormat.Timezone.AEST))
  console.log(13, DateFormat.shortDate('325431532543', 'dfhgsdf', DateFormat.Timezone.AEST))
  console.log(14, DateFormat.shortDate('312543532543', DateFormat.Locale.EU, 4655456))
}
