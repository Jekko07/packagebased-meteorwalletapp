import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { ContactsCollection } from "meteor/contacts/lib/collections/ContactsCollection";
import { WalletsCollection } from "meteor/wallets/lib/collections/WalletsCollection";
import { TransactionsCollections } from "meteor/transactions/lib/collections/TransactionsCollections";
import "meteor/contacts/server/ContactsMethods";
import "meteor/contacts/server/ContactsPublications";
import "meteor/transactions/server/TransactionsMethods";
import "meteor/wallets/server/WalletsPublications";
import "meteor/infra/server/CustomError";

Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
    WalletsCollection.insert({
      createdAt: new Date(),
      currency: "PHP"
    });
  }
});
