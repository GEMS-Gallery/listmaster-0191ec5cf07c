import Bool "mo:base/Bool";
import List "mo:base/List";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor ShoppingList {
  // Define the structure of a shopping list item
  public type Item = {
    id: Nat;
    text: Text;
    completed: Bool;
  };

  // Use a stable variable to store the shopping list items
  stable var items: [Item] = [];
  stable var nextId: Nat = 0;

  // Add a new item to the shopping list
  public func addItem(text: Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let newItem: Item = {
      id = id;
      text = text;
      completed = false;
    };
    items := Array.append(items, [newItem]);
    id
  };

  // Mark an item as completed or not completed
  public func toggleComplete(id: Nat) : async Bool {
    items := Array.map<Item, Item>(items, func (item) {
      if (item.id == id) {
        return {
          id = item.id;
          text = item.text;
          completed = not item.completed;
        };
      };
      item
    });
    Option.get(Array.find<Item>(items, func(item) { item.id == id }), {id=0;text="";completed=false}).completed
  };

  // Delete an item from the shopping list
  public func deleteItem(id: Nat) : async () {
    items := Array.filter<Item>(items, func (item) { item.id != id });
  };

  // Get all items in the shopping list
  public query func getItems() : async [Item] {
    items
  };
}