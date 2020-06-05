/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51Gq0qrGKcVF5DZH9svsmKaTtZ5zqUdQbbCZxkqk0v9kIVSBhDOqBO2C6dBUp08z3pEPJLBHadSoPNTUGuK2n0EtW00OuqNWbNu'
);

export const bookTour = async tourId => {
  try {
    // 1) Get the checkout session from the Server (API)
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
