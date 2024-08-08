function Sheet(spreadsheetId, sheetName){
  try {
    var _ss = SpreadsheetApp.openById(spreadsheetId)
  } catch (er) {
    console.error(`Spreadsheet with spreadsheet id "${spreadsheetId}" not found`)
  }
  
  try {
    var _ws = _ss?.getSheetByName(sheetName)
  } catch (er) {
    console.error(`Sheet with name "${sheetName}" not found`)
  }

  return {
    getDataAsArrayOfObjects() {
      if(!_ws) return []
      const data = _ws.getDataRange().getValues()
      if(data.length < 2) return []
      const headers = data.shift()
      return data.map(row => {
        const obj = new Object()
        for(const col in row) if(headers[col].toString().replace(/\s/g, '') !== '') obj[headers[col]] = row[col]
        return obj
      })
    },

    getDataAsArrayOfArrays() {
      if(!_ws) return []
      return _ws.getDataRange().getValues()
    },

    getDataAsCSV() {
      if (!_ws) return ''
      const data = _ws.getDataRange().getValues()
      return data.map(row => 
        row.map(item => {
          if (typeof item === 'string') {
            item = item.replace(/"/g, '""')
            return `"${item}"`
          }
          return item
        }).join(',')
      ).join('\n')
    }
  }
}
