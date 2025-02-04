import { Meteor } from "meteor/meteor";
import { TransactionsCollections } from "../lib/collections/TransactionsCollections";
import SimpleSchema from "simpl-schema";

Meteor.methods({
  "transactions.insert"(args) {
    const schema = new SimpleSchema({
      isTransferring: {
        type: Boolean
      },
      sourceWalletId: {
        type: String
      },
      destinationWalletId: {
        type: String,
        optional: args.isTransferring
      },
      amount: {
        type: Number,
        min: 0
      }
    });

    const cleanArgs = schema.clean(args);
    schema.validate(cleanArgs);
    const { isTransferring, sourceWalletId, destinationWalletId, amount } =
      args;
    return TransactionsCollections.insert({
      type: isTransferring ? "TRANSFER" : "ADD",
      sourceWalletId,
      destinationWalletId: isTransferring ? destinationWalletId : null,
      amount,
      createdAt: new Date()
    });
  }
});
