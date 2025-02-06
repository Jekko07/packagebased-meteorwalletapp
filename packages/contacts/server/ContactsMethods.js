import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ContactsCollection } from "../lib/collections/ContactsCollection";

Meteor.methods({
  "contacts.insert"({ name, email, imageUrl, walletId }) {
    check(name, String);
    check(email, String);
    check(imageUrl, String);
    check(walletId, String);

    if (!name || !email || !imageUrl || !walletId) {
      throw new Meteor.Error("All fields are required");
    }

    return ContactsCollection.insert({
      name,
      email,
      imageUrl,
      walletId,
      createdAt: new Date()
    });
  },

  "contacts.update"({ contactId, name, email, imageUrl, walletId }) {
    check(contactId, String);
    check(name, String);
    check(email, String);
    check(imageUrl, String);
    check(walletId, String);

    return ContactsCollection.update(
      { _id: contactId },
      {
        $set: {
          name,
          email,
          imageUrl,
          walletId,
          updatedAt: new Date()
        }
      }
    );
  },

  "contacts.remove"({ contactId }) {
    check(contactId, String);
    return ContactsCollection.remove(contactId);
  }
});
