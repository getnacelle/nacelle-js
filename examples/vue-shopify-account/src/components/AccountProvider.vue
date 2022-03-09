<script>
import { ref, provide } from 'vue';
import fetch from 'isomorphic-unfetch';
import { encode } from 'js-base64';

import {
  set as setCookie,
  get as getCookie,
  remove as removeCookie
} from 'es-cookie';
import {
  CUSTOMER_ACCESS_TOKEN_CREATE,
  CUSTOMER_ACCESS_TOKEN_RENEW,
  CUSTOMER_ACCESS_TOKEN_DELETE,
  CUSTOMER_CREATE,
  CUSTOMER_RECOVER,
  CUSTOMER_RESET,
  CUSTOMER_ACTIVATE,
  GET_CUSTOMER,
  CUSTOMER_UPDATE,
  GET_CUSTOMER_ADDRESSES,
  CUSTOMER_ADDRESS_CREATE,
  CUSTOMER_ADDRESS_UPDATE,
  CUSTOMER_ADDRESS_DELETE,
  CUSTOMER_DEFAULT_ADDRESS_UPDATE,
  transformEdges
} from '../gql';

export default {
  setup() {
    // The strict mode withholds the cookie from any kind of cross-site usage (including inbound links from external sites).
    const sameSite = 'strict';

    const myshopifyDomain = import.meta.env.VITE_MYSHOPIFY_DOMAIN;
    const shopifyToken = import.meta.env.VITE_SHOPIFY_TOKEN;

    const loginStatus = ref('loggedOut');
    const userErrors = ref([]);
    const customer = ref(null);
    const customerAccessToken = ref(null);
    const orders = ref([]);
    const defaultAddress = ref(null);
    const addresses = ref([]);
    const fetchingOrders = ref(null);
    const countries = ref([]);
    const provinces = ref(null);

    const accountClientPost = async ({ query, variables }) => {
      if (!myshopifyDomain) {
        throw new Error(`Missing 'myshopifyDomain'`);
      }

      if (!shopifyToken) {
        throw new Error(`Missing 'shopifyToken'`);
      }
      const url = `https://${myshopifyDomain}/api/2022-01/graphql`;
      const body = JSON.stringify({ query, variables });

      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Shopify-Storefront-Access-Token': shopifyToken
        },
        body
      });
      return response.json();
    };

    const apiPost = async (endpoint, payload) => {
      const body =
        payload && payload.data ? JSON.stringify(payload.data) : null;
      return await fetch(endpoint, {
        method: 'POST',
        body
      }).then((res) => {
        const contentType = res.headers.get('content-type');

        if (contentType.startsWith('text/html')) {
          return res.text();
        }

        if (contentType.startsWith('application/json')) {
          return res.json();
        }
      });
    };

    const setErrors = (errors) => {
      if (errors) {
        userErrors.value =
          errors.map((err) => {
            if (err.message === 'Unidentified customer') {
              err.message = 'Incorrect email/password';
            }
            return err;
          }) || [];
      }
    };

    const fetchCustomer = async () => {
      try {
        const variables = {
          customerAccessToken: customerAccessToken.value.accessToken
        };
        const query = GET_CUSTOMER;
        const response = await accountClientPost({
          query,
          variables
        });
        const { customer: customerData, userErrors } = response.data;

        if (customerData) {
          customer.value = customerData;
        }
        setErrors(userErrors);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const updateCustomerAccessToken = (token) => {
      const { accessToken, expiresAt } = token;
      const expires = new Date(expiresAt);
      expires.setHours(expires.getHours());
      setCookie('customerAccessToken', accessToken, {
        expires,
        secure: 'development', // TODO FIX THAT
        sameSite
      });
      customerAccessToken.value = token;
    };

    const login = async ({ email, password }) => {
      try {
        const variables = { input: { email, password } };
        const query = CUSTOMER_ACCESS_TOKEN_CREATE;

        loginStatus.value = 'loggingIn';
        const response = await accountClientPost({
          query,
          variables
        });
        const { customerAccessToken, userErrors } =
          response.data.customerAccessTokenCreate;

        if (customerAccessToken) {
          updateCustomerAccessToken(customerAccessToken);
          await fetchCustomer();
          loginStatus.value = 'loggedIn';
        } else {
          setErrors(userErrors);
          loginStatus.value = 'loggedOut';
        }
      } catch (error) {
        loginStatus.value = 'loggedOut';

        throw error;
      }
    };

    const logout = async () => {
      const accessToken =
        (customerAccessToken && customerAccessToken.value.accessToken) ||
        getCookie('customerAccessToken');
      const variables = { customerAccessToken: accessToken };
      const query = CUSTOMER_ACCESS_TOKEN_DELETE;
      const response = await accountClientPost({
        query,
        variables
      });
      const { deletedAccessToken, userErrors } =
        response.data.customerAccessTokenDelete;
      if (deletedAccessToken) {
        removeCustomerAccessToken();
        loginStatus.value = 'loggedOut';
      }
      commit('setErrors', userErrors);
    };

    const register = async ({ firstName, lastName, email, password }) => {
      try {
        const variables = { input: { firstName, lastName, email, password } };
        const query = CUSTOMER_CREATE;
        const response = await accountClientPost({
          query,
          variables
        });
        const { data, errors } = response;
        if (errors && errors.length) {
          throw new Error(JSON.stringify(errors));
        }
        const { customerUserErrors } = data.customerCreate;
        setErrors(customerUserErrors);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const recover = async ({ email }) => {
      try {
        const variables = { email };
        const query = CUSTOMER_RECOVER;
        const response = await accountClientPost({
          query,
          variables
        });
        const { data, errors } = response;
        if (errors && errors.length) {
          setErrors(errors);

          throw new Error(JSON.stringify(errors));
        }
        const { customerUserErrors } = data.customerRecover;
        setErrors(customerUserErrors);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const reset = async ({ password, resetToken, customerId }) => {
      try {
        const id = encode(`gid://shopify/Customer/${customerId}`);

        const variables = { id, input: { password, resetToken } };
        const query = CUSTOMER_RESET;
        const response = await accountClientPost({
          query,
          variables
        });
        const { data, errors } = response;
        if (errors && errors.length) {
          throw new Error(JSON.stringify(errors));
        }
        const { customerUserErrors } = data.customerReset;
        setErrors(customerUserErrors);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const activate = async ({ password, activationUrl }) => {
      try {
        const variables = { password, activationUrl };
        const query = CUSTOMER_ACTIVATE;
        const response = await accountClientPost({
          query,
          variables
        });
        const { data, errors } = response;
        if (errors && errors.length) {
          throw new Error(JSON.stringify(errors));
        }
        const { customerAccessToken, customerUserErrors } =
          data.customerActivateByUrl;

        setErrors(customerUserErrors);

        if (customerAccessToken) {
          updateCustomerAccessToken(customerAccessToken);

          await fetchCustomer();
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const updateCustomer = async (payload) => {
      try {
        const { firstName, lastName, email, password, acceptsMarketing } =
          payload.customer;

        const variables = {
          customerAccessToken: customerAccessToken.value.accessToken,
          customer: { firstName, lastName, email, password, acceptsMarketing }
        };
        const query = CUSTOMER_UPDATE;
        const response = await accountClientPost({
          query,
          variables
        });
        const { data, errors } = response;
        if (errors && errors.length) {
          throw new Error(JSON.stringify(errors));
        }
        const {
          customer: customerData,
          customerAccessToken: tokenData,
          customerUserErrors
        } = data.customerUpdate;

        if (customerData) {
          customer.value = customerData;
        }

        if (tokenData) {
          updateCustomerAccessToken(tokenData);
        }

        setErrors(customerUserErrors);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const readCustomerAccessToken = async ({ accessToken }) => {
      if (accessToken) {
        customerAccessToken.value = { accessToken, expiresAt: null };
        await renewCustomerAccessToken(accessToken);
      }
    };

    const renewCustomerAccessToken = async (payload) => {
      try {
        const variables = { customerAccessToken: payload };
        const query = CUSTOMER_ACCESS_TOKEN_RENEW;
        const response = await accountClientPost({
          query,
          variables
        });
        const { customerAccessToken, userErrors } =
          response.data.customerAccessTokenRenew;
        if (customerAccessToken && customerAccessToken.accessToken) {
          updateCustomerAccessToken(customerAccessToken);
          fetchCustomer();
        } else {
          // access token does not exist
          removeCustomerAccessToken();
        }
        setErrors(userErrors);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const removeCustomerAccessToken = () => {
      removeCookie('customerAccessToken');
      removeCookie('ncl');
      customer.value = null;
      customerAccessToken.value = null;
    };

    const stayLoggedIn = async () => {
      const accessToken =
        getCookie('customerAccessToken') || customerAccessToken.value;
      await readCustomerAccessToken({ accessToken });

      if (accessToken) {
        await Promise.all([fetchCustomer(), fetchOrders(), fetchAddresses()]);
        loginStatus.value = 'loggedIn';
      }
    };

    const fetchOrders = async () => {
      try {
        fetchingOrders.value = true;

        if (!customer.value || !customer.value.id) {
          await fetchCustomer();
        }

        const ordersResponse = await apiPost('/api/customer-orders', {
          data: { customerID: customer.value.id }
        });
        orders.value = ordersResponse;
        fetchingOrders.value = false;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const fetchTransactions = async ({ orderID }) => {
      try {
        if (!orders.value.length) {
          await fetchOrders();
        }

        const transactionsResponse = await apiPost(
          '/api/customer-transactions',
          {
            data: { orderID }
          }
        );
        if (transactionsResponse.length) {
          const transactionIDs = transactionsResponse.map(
            (transaction) => transaction.id
          );

          const transactions = Promise.all(
            transactionIDs.map((transactionID) =>
              apiPost('/api/customer-transactions', {
                data: { orderID, transactionID }
              })
            )
          );
          setTransactions({ transactions, orderID });
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const setTransactions = ({ transactions, orderID }) => {
      const orderIndex = orders.value.findIndex(
        (order) => order.id === orderID
      );
      const order = orders.value[orderIndex];
      const orderWithTransactions = { ...order, transactions };
      const updatedOrders = [...orders.value];
      updatedOrders[orderIndex] = orderWithTransactions;
      orders.value = updatedOrders;
    };

    const fetchAddresses = async () => {
      try {
        const variables = {
          customerAccessToken: customerAccessToken.value.accessToken
        };
        const query = GET_CUSTOMER_ADDRESSES;
        const response = await accountClientPost({
          query,
          variables
        });
        const { customer: customerData, userErrors } = response.data;
        if (customerData) {
          addresses.value = transformEdges(customerData.addresses);
          defaultAddress.value = customerData.defaultAddress;
        }
        setErrors(userErrors);
      } catch (error) {
        console.error(error);

        throw error;
      }
    };

    const removeAddress = (addressId) => {
      // addressId is already decoded from Shopify response
      const id = addressId.split('?')[0];
      addresses.value = addresses.value.filter(
        (item) => atob(item.id).split('?')[0] !== id
      );
    };

    const setAddress = (address) => {
      const addressId = atob(address.id).split('?')[0];

      addresses.value = addresses.value.map((item) => {
        const itemId = atob(item.id).split('?')[0];
        if (itemId === addressId) {
          return (item = address);
        } else {
          return item;
        }
      });
    };

    const fetchCountries = async () => {
      if (!countries.value.length) {
        try {
          const countryResponse = await apiPost('/api/countries');

          if (countryResponse) {
            countries.value = countryResponse;
          }
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
    };

    const fetchProvince = async ({ countryShortName }) => {
      try {
        const provinceResponse = await apiPost('/api/provinces', {
          data: { countryShortName }
        });
        if (provinceResponse) {
          provinces.value = provinceResponse;
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const createAddress = async ({ address }) => {
      try {
        const variables = {
          customerAccessToken: customerAccessToken.value.accessToken,
          address
        };
        const query = CUSTOMER_ADDRESS_CREATE;
        const response = await accountClientPost({
          query,
          variables
        });
        const { data, errors } = response;
        if (errors && errors.length) {
          throw new Error(JSON.stringify(errors));
        }
        const { customerAddress, customerUserErrors } =
          data.customerAddressCreate;
        if (customerAddress) {
          addresses.value = [customerAddress].concat(addresses.value);
        }
        setErrors(customerUserErrors);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const updateAddress = async ({ address, id }) => {
      try {
        const variables = {
          customerAccessToken: customerAccessToken.value.accessToken,
          address,
          id
        };
        const query = CUSTOMER_ADDRESS_UPDATE;
        const response = await accountClientPost({
          query,
          variables
        });
        const { data, errors } = response;
        if (errors && errors.length) {
          throw new Error(JSON.stringify(errors));
        }
        const { customerAddress, customerUserErrors } =
          data.customerAddressUpdate;
        if (customerAddress) {
          setAddress(customerAddress);
        }
        setErrors(customerUserErrors);

        await fetchAddresses();
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const deleteAddress = async ({ id }) => {
      try {
        const variables = {
          customerAccessToken: customerAccessToken.value.accessToken,
          id
        };
        const query = CUSTOMER_ADDRESS_DELETE;
        const response = await accountClientPost({
          query,
          variables
        });
        const { data, errors } = response;
        if (errors && errors.length) {
          throw new Error(JSON.stringify(errors));
        }
        const { deletedCustomerAddressId, customerUserErrors } =
          data.customerAddressDelete;
        if (deletedCustomerAddressId) {
          removeAddress(deletedCustomerAddressId);
        }
        setErrors(customerUserErrors);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const updateDefaultAddress = async ({ address }) => {
      try {
        const variables = {
          customerAccessToken: customerAccessToken.value.accessToken,
          addressId: address.id
        };
        const query = CUSTOMER_DEFAULT_ADDRESS_UPDATE;
        const response = await accountClientPost({
          query,
          variables
        });
        const { data, errors } = response;
        if (errors && errors.length) {
          throw new Error(JSON.stringify(errors));
        }
        const { userErrors } = data.customerDefaultAddressUpdate;
        setErrors(userErrors);
        await fetchAddresses();
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    provide('login', login);
    provide('logout', logout);
    provide('loginStatus', loginStatus);
    provide('register', register);
    provide('recover', recover);
    provide('reset', reset);
    provide('activate', activate);
    provide('customer', customer);
    provide('userErrors', userErrors);
    provide('customerAccessToken', customerAccessToken);
    provide('updateCustomer', updateCustomer);
    provide('stayLoggedIn', stayLoggedIn);
    provide('fetchAddresses', fetchAddresses);
    provide('createAddress', createAddress);
    provide('updateAddress', updateAddress);
    provide('deleteAddress', deleteAddress);
    provide('updateDefaultAddress', updateDefaultAddress);
    provide('readCustomerAccessToken', readCustomerAccessToken);
    provide('addresses', addresses);
    provide('defaultAddress', defaultAddress);
    provide('countries', countries);
    provide('provinces', provinces);
    provide('fetchCountries', fetchCountries);
    provide('fetchProvince', fetchProvince);
    provide('fetchCustomer', fetchCustomer);
    provide('fetchOrders', fetchOrders);
    provide('orders', orders);
    provide('fetchTransactions', fetchTransactions);
  }
};
</script>

<template>
  <slot></slot>
</template>
