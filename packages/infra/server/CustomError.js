import SimpleSchema from "simpl-schema";

SimpleSchema.defineValidationErrorTransform((error) => {
<<<<<<< HEAD
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = "validation error";
  ddpError.details = error.details;
  return ddpError;
});
=======
    const ddpError = new Meteor.Error(error.message);
    ddpError.error = "validation-error";
    ddpError.details = error.details;
    return ddpError;
})
>>>>>>> 95e6e2e95b0b52215b90974c7cb8a20404e747bc
