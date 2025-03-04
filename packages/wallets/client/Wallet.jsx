import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { Modal } from './Modal'; // Import modal for add/transfer of money
import { SelectContact } from './SelectContact';
import { ContactsCollection } from 'meteor/contacts/lib/collections/ContactsCollection';
import { WalletsCollection } from 'meteor/wallets/lib/collections/WalletsCollection';
import { Loading } from 'meteor/shared/client/components/Loading';

export const Wallet = () => {
  const isLoadingContacts = useSubscribe('contacts');
  const isLoadingWallets = useSubscribe('wallets');

  // Fetch the list of contacts from the ContactsCollection
  const contacts = useFind(() => {
    return ContactsCollection.find({}, { sort: { createdAt: -1 } });
  });

  // Fetch the wallet data
  const [wallet] = useFind(() => WalletsCollection.find());

  // State management
  const [open, setOpen] = React.useState(false);
  const [isTransferring, setIsTransferring] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [destinationWallet, setDestinationWallet] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState('');

  // Function to handle adding or transferring money
  const addTransaction = () => {
    // Validate the amount before proceeding
    if (!amount || amount < 1) {
      setErrorMessage('Please enter a valid amount greater than 0.');
      return;
    }

    // Validate destination wallet if transferring money
    if (isTransferring && !destinationWallet?.walletId) {
      setErrorMessage('Please select a destination wallet.');
      return;
    }

    // Call a Meteor method to handle transaction
    Meteor.call(
      'transactions.insert',
      {
        isTransferring,
        sourceWalletId: wallet._id,
        destinationWalletId: destinationWallet?.walletId || '',
        amount: Number(amount),
      },
      (errorResponse) => {
        if (errorResponse) {
          setErrorMessage('Something went wrong. Please try again.');
        } else {
          // Reset form and close modal on success
          setOpen(false);
          setDestinationWallet({});
          setAmount(0);
          setErrorMessage('');
        }
      }
    );
  };

  if (isLoadingContacts() || isLoadingWallets() || !wallet) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex my-10 font-sans shadow-md">
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <div className="flex-none w-full text-sm font-medium text-gray-500">
              Main Account
            </div>
            <div className="flex-none w-full mt-2 text-sm font-medium text-gray-500">
              Wallet ID:
            </div>
            {/* Display wallet ID */}
            <h1 className="flex-auto text-lg font-semibold text-gray-700">
              {wallet._id}
            </h1>
            {/* Display wallet balance and currency */}
            <div className="text-2xl font-bold text-gray-700">
              {`${wallet.balance} ${wallet.currency}`}
            </div>
          </div>
          <div className="flex space-x-4 text-sm font-medium">
            <div className="flex flex-auto mt-4 space-x-4">
              {/* Button to add money */}
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransferring(false); // Set operation to 'Add Money'
                  setErrorMessage('');
                  setOpen(true); //opens the modal
                }}
              >
                Add Money
              </button>
              {/* Button to transfer money */}
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransferring(true); // Set operation to 'Transfer Money'
                  setErrorMessage('');
                  setOpen(true);
                }}
              >
                Transfer Money
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Modal component for adding or transferring money */}
      <Modal
        open={open}
        setOpen={setOpen}
        title={
          isTransferring
            ? 'Transfer money to other wallet'
            : 'Add money to your wallet'
        }
        body={
          <>
            {/* If transferring, show SelectContact to choose destination wallet */}
            {isTransferring && (
              <div className="mt-2">
                <SelectContact
                  title="Destination contact"
                  contacts={contacts}
                  selectedContact={destinationWallet}
                  setContact={setDestinationWallet}
                />
              </div>
            )}

            <div className="mt-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                min={0}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
          </>
        }
        footer={
          // Button to trigger transaction (add or transfer)
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            onClick={addTransaction}
          >
            {isTransferring ? 'Transfer' : 'Add'}
          </button>
        }
        errorMessage={errorMessage} // Pass error message for display
      />
    </div>
  );
};
