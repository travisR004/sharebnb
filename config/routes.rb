Sharebnb::Application.routes.draw do
  root to: "static_pages#root"
  get "static_pages/root"

  namespace :api, defaults: {format: :json} do
    resources :rentals
  end

  resources :users, only: [:new, :create]
  resource :sessions, only: [:new, :create, :destroy]
end
