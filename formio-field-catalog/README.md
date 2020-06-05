# Form.io field catalog

This script prints a CSV of field infomation from two Form.io forms:

* https://sfds.form.io/buildingpermitapplication
* https://sfds.form.io/buildingpermitaddendaapplication

The resulting CSV data can be easily opened in a spreadsheet for examination and manipulation.

## Prerequisites

This script needs a recent version of Ruby. It only uses standard libraries.

##  How to run this program:

Enter the following on the command line:

`ruby fields.rb`

It's useful to redirect the output to a file:

`ruby fields.rb > fields.csv`