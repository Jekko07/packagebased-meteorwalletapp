import { Meteor } from "meteor/meteor";
<<<<<<< HEAD
import SimpleSchema from "simpl-schema";
=======
>>>>>>> 95e6e2e95b0b52215b90974c7cb8a20404e747bc
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
<<<<<<< HEAD
        optional: !args.isTransferring
      },
      amount: {
        type: Number,
        min: 1
=======
        optional: args.isTransferring
      },
      amount: {
        type: Number,
        min: 0
>>>>>>> 95e6e2e95b0b52215b90974c7cb8a20404e747bc
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
