import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "meteor/contacts/lib/collections/ContactsCollection";
import "meteor/contacts/server/ContactsMethods";

Meteor.startup(() => {
  Meteor.publish("contacts.all", function () {
    console.log("Publishing contacts..."); // Debug log
    return ContactsCollection.find();
  });
});
