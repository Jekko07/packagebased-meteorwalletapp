import { ContactsCollection } from "../lib/collections/ContactsCollection";
import { Meteor } from "meteor/meteor";

Meteor.publish('contacts', function publishAllContacts() {
  return ContactsCollection.find(); // Live Query
});
