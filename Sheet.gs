function Sheet(sheetName, spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId()){
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
        obj['row'] = Number(indx) + 2
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
    },

    getRowDataAsObjectById(recordId){
      if (!_ws) return null
      const arr = this.getDataAsArrayOfObjects()
      const records = arr.filter(v => v.id == recordId)
      return records.length === 0 ? null : records[0]
    },

    appendRow(arr){
      let response = false
      if (!_ws) return response
      try {
        _ws.appendRow(arr.flat())
        response = true
      } catch(er) {console.error(er)}
      return response
    }
  }
}
