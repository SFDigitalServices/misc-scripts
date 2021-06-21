let inputConfig = input.config();
let recordId = inputConfig.record

let table = base.getTable("Equity Grants");
let queryResult = await table.selectRecordsAsync();
let record = queryResult.getRecord(recordId);

let url_ttx_sup = "https://data.sfgov.org/resource/g8m3-pdis.json?$select=supervisor_district&ttxid="

let field_lin = record.getCellValue("LIN");
let url_fetch = url_ttx_sup + field_lin;

let getOptions = {
    method: "GET",
    headers: {
        "Accept": "application/json"
    }
}

await fetch(url_fetch, getOptions).then(resp => resp.json()).then(data =>
    {
        console.log(data)
        if(data.length > 0){
            console.log(data[0]["supervisor_district"])
            table.updateRecordAsync(record, {
                "ttx.supervisorial": parseInt(data[0]["supervisor_district"])
            }); 
        }
    }
)
