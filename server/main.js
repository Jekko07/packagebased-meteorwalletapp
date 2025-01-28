import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "meteor/contacts/lib/collections/ContactsCollection";
import { WalletsCollection } from "meteor/wallets/lib/collections/WalletsCollection";
import { TransactionsCollections } from "meteor/transactions/lib/collections/TransactionsCollections";
import "meteor/contacts/server/ContactsMethods";
import "meteor/contacts/server/ContactsPublications";
import "meteor/transactions/server/TransactionsMethods";
import "meteor/wallets/server/WalletsPublications";

Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
    WalletsCollection.insert({
      balance: 0,
      currency: "PHP",
      createdAt: new Date()
    });
  } 
});
