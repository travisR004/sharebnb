# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)
#  password_digest :string(255)
#  session_token   :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  attr_reader :password
    validates :email, :session_token, presence: true
    validates :password, presence: true, on: :create
    validates :password, length: {minimum: 6, allow_nil: true}
    before_validation :ensure_session_token

    has_many :rentals, foreign_key: :owner_id
    has_many :made_rental_requests, class_name: "RentalRequest"
    has_many :received_rental_requests, through: :rentals, source: :rental_requests
    has_many :received_messages, foreign_key: :receiver_id, class_name: "Message"
    has_many :sent_messages, foreign_key: :sender_id, class_name: "Mesage"


    def password=(pt)
      @password = pt
      self.password_digest = BCrypt::Password.create(pt)
    end

    def is_password?(pt)
      BCrypt::Password.new(self.password_digest).is_password?(pt)
    end

    def self.find_by_credentials(params)
      user = User.find_by(email: params[:email])
      user.try(:is_password?, params[:password]) ? user :nil
    end

    def self.generate_session_token
      SecureRandom::urlsafe_base64
    end

    def reset_session_token!
      self.session_token = self.class.generate_session_token
      self.save!
      self.session_token
    end

    private
    def ensure_session_token
      self.session_token ||= self.class.generate_session_token
    end
  end
