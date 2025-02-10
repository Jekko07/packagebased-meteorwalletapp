import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { ContactsCollection } from "meteor/contacts/lib/collections/ContactsCollection";
import { WalletsCollection } from "meteor/wallets/lib/collections/WalletsCollection";
import { TransactionsCollections } from "meteor/transactions/lib/collections/TransactionsCollections";
import "meteor/contacts/server/ContactsMethods"; // Methods related to Contacts
import "meteor/contacts/server/ContactsPublications"; // Publications for Contacts
import "meteor/transactions/server/TransactionsMethods"; // Methods related to Transactions
import "meteor/wallets/server/WalletsPublications"; // Publications for Wallets
import "meteor/infra/server/CustomError"; // Custom error handling module

Meteor.startup(() => {
  // At startup checks if the WalletsCollection is empty
  if (!WalletsCollection.find().count()) {
    // If empty insert a default wallet entry with PHP currency
    WalletsCollection.insert({
      createdAt: new Date(), // Store date and time upon creation
      currency: 'PHP',
    });
  }
});
