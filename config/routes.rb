Sharebnb::Application.routes.draw do
  root to: "static_pages#root"
  get "static_pages/root"

  namespace :api, defaults: {format: :json} do
    resources :rentals, only: [:create, :show, :update, :destroy, :index]
    get "rentals_in_range", to: 'rentals#rental_range'
    resources :users, only: [:create, :show, :update, :destroy]
    resources :messages, only: [:create, :update]
    resources :rental_requests, only: [:create, :show, :update, :destroy] do
      post "approve", on: :member
      post "deny", on: :member
    end
    resources :favorite_rentals, only: [:create, :destroy, :show]
    resources :images, only: [:create, :show, :update, :destroy]
  end

  resource :sessions, only: [:new, :create, :destroy]
end
