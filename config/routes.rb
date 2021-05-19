Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  mount ActionCable.server => '/cable'

  namespace :api, defaults: {format: :json} do
    resources :users
    resources :channels
    resources :messages
    resource :session, only: [:create, :destroy]
  end

end
