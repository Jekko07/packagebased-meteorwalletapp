// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by wallets.js.
import { name as packageName } from "meteor/wallets";

// Write your tests here!
// Here is an example.
Tinytest.add('wallets - example', function (test) {
  test.equal(packageName, "wallets");
});
