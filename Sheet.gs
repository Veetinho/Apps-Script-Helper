// class Sheet {
//   constructor(spreadsheetId, sheetName) {
//     this.spreadsheetId = spreadsheetId
//     this.sheetName = sheetName
//     this.spreadsheet = this.getSpreadsheet()
//     this.sheet = this.getSheet()
//   }

//   getSpreadsheet() {
//     let spreadsheet = null
//     try {
//       spreadsheet = SpreadsheetApp.openById(this.spreadsheetId)
//     } catch (er){}
//     if(!spreadsheet) console.error(`Spreadsheet with spreadsheet id "${this.spreadsheetId}" not found`)
//     return spreadsheet
//   }
  
//   getSheet() {
//     let sheet = null
//     try {
//       sheet = this.spreadsheet?.getSheetByName(this.sheetName)
//     } catch (er){}
//     if(!sheet) console.error(`Sheet with name "${this.sheetName}" not found`)
//     return sheet
//   }

//   getDataAsArrayOfArrays() {
//     return !this.sheet ? [] : this.sheet.getDataRange().getValues()
//   }
  
//   getDataAsArrayOfObjects() {
//     const data = !this.sheet ? [] : this.sheet.getDataRange().getValues()
//     if(data.length < 2) return []
//     const headers = data.shift()
//     return data.map(row => {
//       const obj = new Object()
//       for(const col in row) if(headers[col] !== '') obj[headers[col]] = row[col]
//       return obj
//     })
//   }

//   appendData(data) {
//     this.sheet.appendRow(data)
//   }
// }

// function Sheet(spreadsheetId, sheetName){
//   try {
//     var _ss = SpreadsheetApp.openById(spreadsheetId)
//   } catch (er) {
//     console.error(`Spreadsheet with spreadsheet id "${spreadsheetId}" not found`)
//   }
  
//   try {
//     var _ws = _ss?.getSheetByName(sheetName)
//   } catch (er) {
//     console.error(`Sheet with name "${sheetName}" not found`)
//   }

//   return class Sheet {
//     getDataAsArrayOfObjects() {
//       if(!_ws) return []
//       const data = _ws.getDataRange().getValues()
//       if(data.length < 2) return []
//       const headers = data.shift()
//       return data.map(row => {
//         const obj = new Object()
//         for(const col in row) if(headers[col] !== '') obj[headers[col]] = row[col]
//         return obj
//       })
//     }

//     getDataAsArrayOfArrays() {
//       if(!_ws) return []
//       return _ws.getDataRange().getValues()
//     }

//     get name(){
//       return !_ws ? null : _ws.getSheetName()
//     }
//   }
// }

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
    }
  }
}
