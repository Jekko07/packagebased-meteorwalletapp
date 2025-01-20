import { ContactsCollection } from "../lib/collections/ContactsCollection";
import { Meteor } from "meteor/meteor";

Meteor.publish('allContacts', function publishAllContacts() {
  return ContactsCollection.find(); // Live Query
});
