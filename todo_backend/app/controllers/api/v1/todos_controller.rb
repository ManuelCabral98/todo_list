class Api::V1::TodosController < ApplicationController
    skip_before_action :verify_authenticity_token

    # GET method
    def index
        @todos = Todo.all
        render json: @todos, include: :category
    end

    # POST method
    def create
        @todo = Todo.new(todo_params)

        if @todo.save
            render json: @todo, include: :category, status: :created
        else
            render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
        end
    end

    # PATCH/PUT method
    def update
        @todo = Todo.find(params[:id])

        if @todo.update(todo_params)
            render json: @todo, include: :category
        else
            render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
        end
    end

    # DELETE method
    def destroy
        @todo = Todo.find(params[:id])
        if @todo.destroy
            render json: { id: @todo.id, message: "Eliminado con éxito!" }, status: :ok
        else    
            render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
        end
    end

    # strong parameters for security. This avoids external injection into the database
    private
    def todo_params
        params.require(:todo).permit(:title, :completed, :category_id)
    end
end
