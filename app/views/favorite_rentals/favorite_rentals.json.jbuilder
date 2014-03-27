json.(@favorite_rental, :id, :rank, :user_id, :rental_id)

json.rental do
	json.(@favorite_rental.rental, :id, :price, :tagline, :rental_type, :room_type)
	json.images @favorite_rental.rental.images do |image|
		json.(image, :photo_url(image.photo.url(:medium)))
	end
end