const { endPointCall } = require('./utils');

exports.createCard = ({
  endPointURL,
  endPointKey = 'secret',
  customerId,
  ...data
  /* = {
    card_number, // optional (only used if creating with card arguments)
    default_card, // optional (default: 0)
    expiration_month, optional (only used if creating with card arguments)
    expiration_year, // optional (only used if creating with card arguments)
    holder_name, // optional (only used if creating with card arguments)
    token // optional
  } */
}) =>
  endPointCall({
    data,
    endPointKey,
    endPointURL,
    entity: `customers/${customerId}/cards`,
    method: 'POST'
  });

// eslint-disable-next-line
exports.retrieveCard = ({ cardId, customerId, endPointKey = 'secret', endPointURL }) =>
  endPointCall({
    endPointKey,
    endPointURL,
    entity: `customers/${customerId}/cards/${cardId}`,
    method: 'GET'
  });

// eslint-disable-next-line
exports.deleteCard = ({ cardId, customerId, endPointKey = 'secret', endPointURL }) =>
  endPointCall({
    endPointKey,
    endPointURL,
    entity: `customers/${customerId}/cards/${cardId}`,
    method: 'DELETE'
  });

exports.listCards = ({
  customerId,
  endPointKey = 'secret',
  endPointURL,
  ...data
  /* = {
    count // optional (default: 10, max: 20)
    date_from, // optional
    date_to // optional
    offset, // optional (default: 0)
  } */
}) =>
  endPointCall({
    data,
    endPointKey,
    endPointURL,
    entity: `customers/${customerId}/cards`,
    method: 'GET'
  });
