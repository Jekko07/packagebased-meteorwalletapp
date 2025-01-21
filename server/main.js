import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "meteor/contacts/lib/collections/ContactsCollection";
import { WalletsCollection } from "meteor/wallets/lib/collections/WalletsCollection";
import { TransactionsCollections } from "meteor/transactions/lib/collections/TransactionsCollections";
import "meteor/contacts/server/ContactsMethods";
import "meteor/contacts/server/ContactsPublications";

Meteor.startup(() => {});
