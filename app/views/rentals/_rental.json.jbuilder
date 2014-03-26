json.(rental, :id, :owner_id, :address, :description, :unit, :allowed_guests, :rental_type, :room_type, :price, :lat, :long, :tagline)
json.images rental.images do |image|
	json.(image, :id, :rank, :rental_id)
	json.photo_url(image.photo.url(:large))
end


