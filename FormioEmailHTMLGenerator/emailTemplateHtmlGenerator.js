// This file needs to be able to load a form's JSON from a files called form.json.
// You can get it using `curl https://sfds.form.io/buildingpermitapplication -o form.json`.

const fs = require('fs');

let jsonData = JSON.parse(fs.readFileSync('form.json', 'utf-8'))

const ignore = "well htmlelement panel submit button fieldset columns".split(" ")

function printComponents(components) {
    if (!components) {
        return;
    }

    components.forEach(component => {
        if (!ignore.includes(component.type)) {
            var key = component.key;
            console.log(
                `<tr><th style="padding: 5px 10px">{{ label("${key}") }}</th><td style="width: 100%; padding: 5px 10px">{{ value("${key}") }}</td></tr>`
            );
        }
        if (component.components) {
            printComponents(component.components)
        }

    });
}

console.log(`<table border="1" style="width: 100%">`)
printComponents(jsonData.components)
console.log(`</table>`)
