class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.string :message
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
