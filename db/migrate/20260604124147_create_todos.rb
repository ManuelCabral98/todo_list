class CreateTodos < ActiveRecord::Migration[8.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.boolean :completed
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
