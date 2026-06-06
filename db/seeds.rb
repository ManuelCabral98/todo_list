# db/seeds.rb for create categories and tasks

puts "######### Cleaning database ######### "
Todo.destroy_all
Category.destroy_all

puts "Creting records for 'Category'..."
work = Category.create!(name: "Work")
home = Category.create!(name: "Home")
studies = Category.create!(name: "Studies")

puts "Creating record for 'Todo'..."
task1 = Todo.create!(title: "Go to the supermarket", completed: false, category: home)
task2 = Todo.create!(title: "Clean my bedroom", completed: false, category: home)
task3 = Todo.create!(title: "Study for Calculus exam", completed: false, category: studies)
task4 = Todo.create!(title: "Finish bank module", completed: true, category: work)
task5 = Todo.create!(title: "Make power BI dashboard", completed: false, category: work)