import { cloneDeep } from 'lodash';
import { update, ref as dbRef } from 'firebase/database';
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';

import { mockedCustomer } from 'src/_mock/customer';
import { db, storage } from 'src/config/firebaseConfig';

export const addNewCustomer = ({ data, notification, onSuccess, onError }) => {
  // Fill the rest of the object properties with default values
  const customerData = cloneDeep(mockedCustomer);

  customerData.id = data.id;
  customerData.sex = data.sex;
  customerData.created_at = data.created_at;
  customerData.first_name = data.firstName;
  customerData.last_name = data.lastName;
  customerData.contacts.phone_number = data.phoneNumber;
  customerData.contacts.email = data.email;
  customerData.address.street = data.address;
  customerData.payment_info.iban = data.iban;

  const updates = {};
  updates[`/customers/${data.id}`] = customerData;

  if (data.imageUpload) {
    const storageRefLocal = storageRef(storage, `files/${data.imageUpload.name}`);
    const uploadTask = uploadBytesResumable(storageRefLocal, data.imageUpload);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Handle state change if needed
      },
      (error) => {
        console.log(error);
        notification({
          message: 'Something went wrong while uploading the image. Please try again later.',
          type: 'error',
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Update avatar properties
          customerData.avatar.url = downloadURL;
          customerData.avatar.name = data.imageUpload.name;
          customerData.avatar.type = data.imageUpload.type;

          // Add new customer with image to DB
          update(dbRef(db), updates)
            .then(() => {
              notification({
                message: 'New customer created successfully!',
                type: 'success',
              });
              onSuccess();
            })
            .catch(() => {
              onError();
              notification({
                message: 'Something went wrong. Please try again later.',
                type: 'error',
              });
            });
        });
      }
    );
  } else {
    // Add new customer to DB
    update(dbRef(db), updates)
      .then(() => {
        notification({
          message: 'New customer created successfully!',
          type: 'success',
        });
        onSuccess();
      })
      .catch(() => {
        onError();
        notification({
          message: 'Something went wrong. Please try again later.',
          type: 'error',
        });
      });
  }
};

export const updateExistingCustomer = ({ data, notification, onSuccess, onError }) => {
  // Fill the rest of the object properties with default values
  const customerData = cloneDeep(mockedCustomer);

  customerData.id = data.id;
  customerData.sex = data.sex;
  customerData.created_at = data.created_at;
  customerData.first_name = data.firstName;
  customerData.last_name = data.lastName;
  customerData.contacts.phone_number = data.phoneNumber;
  customerData.contacts.email = data.email;
  customerData.address.street = data.address;
  customerData.payment_info.iban = data.iban;

  const updates = {};
  updates[`/customers/${data.id}`] = customerData;

  if (data.imageUpload) {
    const storageRefLocal = storageRef(storage, `files/${data.imageUpload.name}`);
    const uploadTask = uploadBytesResumable(storageRefLocal, data.imageUpload);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Handle state change if needed
      },
      (error) => {
        onError(error);
        notification({
          message: 'Something went wrong while uploading the image. Please try again later.',
          type: 'error',
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Update avatar properties
          customerData.avatar.url = downloadURL;
          customerData.avatar.name = data.imageUpload.name;
          customerData.avatar.type = data.imageUpload.type;

          // Add new customer with image to DB
          update(dbRef(db), updates)
            .then(() => {
              notification({
                message: 'Customer updated successfully!',
                type: 'success',
              });
              onSuccess();
            })
            .catch((error) => {
              onError(error);
              notification({
                message:
                  'Something went wrong while updating the customer. Please try again later.',
                type: 'error',
              });
            });
        });
      }
    );
  } else {
    // Add new customer to DB
    update(dbRef(db), updates)
      .then(() => {
        notification({
          message: 'Customer updated successfully!',
          type: 'success',
        });
        onSuccess();
      })
      .catch((error) => {
        onError(error);
        notification({
          message: 'Something went wrong while updating the customer. Please try again later.',
          type: 'error',
        });
      });
  }
};
