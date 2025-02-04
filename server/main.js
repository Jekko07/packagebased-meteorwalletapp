import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { ContactsCollection } from "meteor/contacts/lib/collections/ContactsCollection";
import { WalletsCollection } from "meteor/wallets/lib/collections/WalletsCollection";
import { TransactionsCollections } from "meteor/transactions/lib/collections/TransactionsCollections";
import "meteor/contacts/server/ContactsMethods";
import "meteor/contacts/server/ContactsPublications";
import "meteor/transactions/server/TransactionsMethods";
import "meteor/wallets/server/WalletsPublications";
import "meteor/infra/server/CustomError"

const walletSchema = new SimpleSchema({
  balance: {
    type: Number,
    min: 0,
    defaultValue: 0
  },
  currency: {
    type: String,
    allowedValues: "PHP",
    defaultValue: "PHP"
  },
  createdAt: {
    type: Date
  }
});

Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
    const walletData = {
      createdAt: new Date()
    };
    const cleanWallet = walletSchema.clean(walletData);
    walletSchema.validate(cleanWallet);
    WalletsCollection.insert(cleanWallet);
  }
});
