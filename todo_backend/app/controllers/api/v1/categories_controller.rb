class Api::V1::CategoriesController < ApplicationController
    skip_before_action :verify_authenticity_token

    # GET method
    def index
       @categories = Category.all
       render json: @categories, status: :ok
    end

end
