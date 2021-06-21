
let mainTableName = "Storefront Grants"
let mainTableLookupColName = "BAN"
let mainTableValueColName = "W9 Form"
let lookupTableName = "W9 Form"
let lookupTableColName = "BAN"
let lookupTableValueColName = "w9Form"

let mainTable = base.getTable(mainTableName);
let mainTableRecords = await mainTable.selectRecordsAsync();

let lookupTable = base.getTable(lookupTableName);
let lookupRangeRecords = await lookupTable.selectRecordsAsync();

for (let record of mainTableRecords.records) {  
    let existingValue = record.getCellValue(mainTableValueColName)
    if (!existingValue){
        let lookupValue = record.getCellValue(mainTableLookupColName);

        for (let rangeRecord of lookupRangeRecords.records) {
            if (rangeRecord.getCellValue(lookupTableColName) === lookupValue) {
                let returnValue = rangeRecord.getCellValue(lookupTableValueColName);
                let updatedFields = {
                    [mainTableValueColName]: returnValue
                }
                await mainTable.updateRecordAsync(record, updatedFields);
            }
        }
    }
}