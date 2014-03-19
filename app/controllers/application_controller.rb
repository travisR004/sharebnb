class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    if session[:session_token]
      @current_user = User.find_by(session_token: session[:session_token])
    end
  end

  def logged_in?
    !!current_user
  end

  def login!
    session[:session_token] = @user.reset_session_token!
  end

  def logout!
    session[:session_token] = nil
    @user.reset_session_token
  end

  helper_method :logged_in?, :current_user

end
