json.(rental, :id, :owner_id, :address, :description, :unit, :allowed_guests, :rental_type, :room_type, :price, :lat, :long, :tagline)
json.images rental.images.sort{|x ,y| x.rank <=> y.rank } do |image|
	json.(image, :id, :rank, :rental_id)
	json.photo_url(image.photo.url(:large))
	json.photo_url_small((image.photo.url(:medium)))
end

json.requests rental.rental_requests do |request|
	json.(request, :id, :start_date, :end_date, :status)
end

