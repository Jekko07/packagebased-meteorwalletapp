import { ContactsCollection } from "../lib/collections/ContactsCollection";

Meteor.methods({
  'contacts.insert'({ name, email, imageUrl }) {
    return ContactsCollection.insert({ name, email, imageUrl });
  }
});
