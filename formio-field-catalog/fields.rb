require "json"
require "csv"

# This file needs to be able to load a form's JSON from a files called form.json, and 
# the addenda form's JSON from a file called addenda.json. The following two lines will
# create these files if they don't exist.

`curl https://sfds.form.io/buildingpermitapplication -o form.json` unless File.exist?("form.json")
`curl https://sfds.form.io/buildingpermitaddendaapplication -o addenda.json` unless File.exist?("addenda.json")

json = File.read("form.json")
form = JSON.parse(json, symbolize_names: true)

IGNORE = %w{well htmlelement panel submit button fieldset columns}

def load_components(components, form:, panel:nil, conditional:false, array:[])
  return array unless components

  components.each do |component|
    conditional ||= component.dig(:conditional, :show)
    conditional = false if conditional == ""
    unless IGNORE.include? component[:type]
      key = component[:key]
      label = component[:label]
      required = component.dig(:validate, :required)
      type = component[:type]
      array << [form, panel, label, key, type, required, conditional, false]
    end
    if component[:components]
      panel = component[:label] if component[:type] == "panel"
      load_components(component[:components], form: form, panel: panel, conditional: conditional, array: array)
    end
  end
  return array
end

addenda_json = File.read("addenda.json")
addenda = JSON.parse(addenda_json, symbolize_names: true)
addenda_fields = load_components(addenda[:components], form: "addenda")

fields = load_components(form[:components], form: "3/8&1/2")

addenda_fields.each do |row|
  fields.each do |fr|
    if fr[2] == row[2] && fr[3] == row[3]
      fr[7] = true
      break
    end
  end
  row[7] = true
  fields << row
end

csv = CSV.generate do |csv|
  csv << %w{form page label key type required conditional addenda}
  fields.each do |row|
    csv << row
  end
end

puts csv
