import { Meteor } from "meteor/meteor";
import { WalletsCollection } from "../lib/collections/WalletsCollection";

Meteor.publish("wallets", function publishWallets() {
  return WalletsCollection.find();
});
