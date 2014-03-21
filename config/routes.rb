Sharebnb::Application.routes.draw do
  root to: "static_pages#root"
  get "static_pages/root"

  namespace :api, defaults: {format: :json} do
    resources :rentals, only: [:create, :show, :update, :destroy]
    resources :users, only: [:create, :show, :update, :destroy]
    resources :rental_requests, only: [:create] do
      post "approve", on: :member
      post "deny", on: :member
    end
  end


  resource :sessions, only: [:new, :create, :destroy]
end
