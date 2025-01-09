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
    getHeaders() {
      if (!_ws) return []
      const data = _ws.getDataRange().getValues()
      if (data.length === 0) return []
      return data.shift()
    },

    getLastRow(){
      if (!_ws) return -1
      return _ws.getLastRow()
    },

    getRowByFields(obj){
      if (!_ws) return -1
      const arr = this.getDataAsArrayOfObjects()
      const record = arr.find(v => {
        let flag = true
        for(const key in obj) if(obj[key] != v[key]){
          flag = false
          break
        }
        return flag === true
      })
      return record === undefined ? -1 : record.row
    },

    getDataAsArrayOfObjects() {
      if(!_ws) return []
      const data = _ws.getDataRange().getValues()
      if(data.length < 2) return []
      const headers = data.shift()
      return data.map((row, indx) => {
        const obj = new Object()
        obj['row'] = Number(indx) + 2
        for(const col in row){
          if(String(headers[col]).replace(/\s/g, '') == '') continue
          if(String(headers[col]).toLowerCase().endsWith('edat')){
            obj[headers[col]] = row[col] == '' ? '' : Utilities.formatDate(new Date(row[col]), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm')
            continue
          }
          if(String(headers[col]).toLowerCase().includes('date')){
            obj[headers[col]] = row[col] == '' ? '' : Utilities.formatDate(new Date(row[col]), Session.getScriptTimeZone(), 'yyyy-MM-dd')
            continue
          }
          obj[headers[col]] = row[col]
        }
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
    },

    addRecord(obj){
      let response = false
      if (!_ws) return response
      try {
        const headers = this.getHeaders()
        if(headers.length === 0) return response
        const arrToSet = headers.map(v => obj[v] || '')
        this.appendRow(arrToSet)
        response = true
      } catch (er) { console.error(er) }
      return response
    },

    addRecords(arr){
      let response = false
      if (!_ws) return response
      try {
        const headers = this.getHeaders()
        let row = this.getLastRow()
        if(headers.length === 0 || row < 0) return response
        const arrToSet = arr.map(item => {
          return headers.map(v => item[v] || '')
        })
        this.setValues(++row, 1, arrToSet.length, arrToSet[0].length, arrToSet)
        response = true
      } catch (er) { console.error(er) }
      return response
    },

    updateFieldsById(id, obj) {
      let response = false
      if (!_ws) return response
      try {
        const headers = this.getHeaders()
        if(headers.length === 0) return response
        const row = this.getRowDataAsObjectById(id)?.row
        if (row === undefined) return response
        for (const key in Object(obj)) {
          const col = 1 + headers.indexOf(key)
          if (col === 0) return response
          _ws.getRange(row, col).setValue(obj[key])
        }
        response = true
      } catch (er) { console.error(er) }
      return response
    },

    updateRecordById(id, obj) {
      let response = false
      if (!_ws) return response
      try {
        const headers = this.getHeaders()
        if(headers.length === 0) return response
        const row = this.getRowDataAsObjectById(id)?.row
        if (row === undefined) return response
        const arrToSet = headers.map(v => {
          const value = obj[v] === undefined ? [] : [obj[v]]
          return value
        })
        this.setValues(row, 1, 1, arrToSet.length, [arrToSet])
        response = true
      } catch (er) { console.error(er) }
      return response
    },

    setValue(row, col, value){
      let response = false
      if (!_ws) return response
      try {
        _ws.getRange(row, col).setValue(value)
        response = true
      } catch (er) { console.error(er) }
      return response
    },
    
    setValues(row, col, rows = 1, cols = 1, arr){
      let response = false
      if (!_ws) return response
      try {
        _ws.getRange(row, col, rows, cols).setValues(arr)
        response = true
      } catch (er) { console.error(er) }
      return response
    },
  }
}
