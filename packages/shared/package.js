Package.describe({
  name: "shared",
  version: "0.0.1",
  summary: "Shared components for the Meteor Wallet App"
});

Package.onUse(function (api) {
  api.versionsFrom("2.7");
  api.use(["ecmascript", "react-meteor-data"]);

  // Add shared files
  api.addFiles(
    ["client/components/ErrorAlert.jsx", "client/components/SuccessAlert.jsx"],
    "client"
  );

  // Export shared components
  api.export(["ErrorAlert", "SuccessAlert"], "client");
});
