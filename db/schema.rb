# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140321042348) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "rental_requests", force: true do |t|
    t.integer  "rental_id"
    t.integer  "user_id"
    t.date     "start_date"
    t.date     "end_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status",     default: "PENDING"
    t.integer  "guests"
    t.text     "message"
  end

  create_table "rentals", force: true do |t|
    t.integer  "owner_id",       null: false
    t.integer  "zipcode",        null: false
    t.string   "address",        null: false
    t.string   "description",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "unit"
    t.integer  "allowed_guests"
    t.string   "rental_type"
    t.string   "room_type"
    t.integer  "price"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.string   "password_digest"
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
