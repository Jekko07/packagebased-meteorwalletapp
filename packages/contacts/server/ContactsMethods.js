import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ContactsCollection } from "../lib/collections/ContactsCollection";

Meteor.methods({
  "contacts.insert"({ name, email, imageUrl }) {

    check(name, String);
    check(email, String);
    check(imageUrl, String);

    if (!name || !email || !imageUrl) {
      throw new Meteor.Error("All fields are required");
    }

    return ContactsCollection.insert({ name, email, imageUrl });
  },
  "contacts.remove"({ contactId }) {
    check(contactId, String);
    return ContactsCollection.remove(contactId);
  }
});
