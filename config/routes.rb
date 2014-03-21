Sharebnb::Application.routes.draw do
  root to: "static_pages#root"
  get "static_pages/root"

  namespace :api, defaults: {format: :json} do
    resources :rentals, only: [:show, :update, :create, :destroy]
    resources :users, only: [:create, :show, :update, :destroy]
    resources :rental_requests
  end


  resource :sessions, only: [:new, :create, :destroy]
end
