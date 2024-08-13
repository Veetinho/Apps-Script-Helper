function getPdf(ssId, sheet, newFileName, lr, lc, fr = '1', fc = '1') {
  const response = { success: false, blob: null }
  const url = "https://docs.google.com/spreadsheets/d/" + ssId + "/export" +
    "?format=pdf&" +
    "portrait=false&" +
    "pagenum=UNDEFINED&" +
    "attachment=true&" +
    "gid=" + sheet.getSheetId() + '&' +
    "r1=" + fr + "&c1=" + fc + "&r2=" + lr.toString() + "&c2=" + lc.toString()

  const params = { method: "GET", headers: { "authorization": "Bearer " + ScriptApp.getOAuthToken() } }
  try {
    const blob = UrlFetchApp.fetch(url, params).getBlob().setName(newFileName + '.pdf')
    Utilities.sleep(500)
    response.success = true
    response.blob = blob
  } catch (err) {
    console.error(err)
  }
  return response
}