# HTML Generator:
#### The purpose of this script is to convert Formio Json to HTML that is used to generate the table in an email body sent to DBI.

###  What to do first:
 Run the following in your command line:
 `curl https://sfds.form.io/buildingpermitapplication -o form.json`

This generates a file that called form.json, which you will load into the HTML Generator

### How to run this:
Run the following in your command line:
`node emailTemplateHtmlGenerator.js`
