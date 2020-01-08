json.extract! note, :id, :message, :latitude, :longitude, :created_at, :updated_at
json.url note_url(note, format: :json)
