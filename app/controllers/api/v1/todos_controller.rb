class Api::V1::TodosController < ApplicationController
    # GET method
    def index
        @todos = Todo.all
        render json: @todos, include: :category
    end
end
