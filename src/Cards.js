const { endPointCall } = require('./utils');


exports.createCard = ({
  endPointURL,
  endPointKey = 'secret',
  customerId,
  ...data /* = {
    card_number,
    expiration_year,
    expiration_month,
    holder_name,

    token,
    default_card
  } */
}) => endPointCall({
  method: 'POST',
  endPointURL,
  endPointKey,
  entity: `customers/${customerId}/cards`,
  data
});

exports.retrieveCard = ({
  endPointURL,
  endPointKey = 'secret',
  customerId,
  cardId
}) => endPointCall({
  method: 'GET',
  endPointURL,
  endPointKey,
  entity: `customers/${customerId}/cards/${cardId}`
});

exports.deleteCard = ({
  endPointURL,
  endPointKey = 'secret',
  customerId,
  cardId
}) => endPointCall({
  method: 'DELETE',
  endPointURL,
  endPointKey,
  entity: `customers/${customerId}/cards/${cardId}`
});

exports.listCards = ({
  endPointURL,
  endPointKey = 'secret',
  customerId,
  ...data /* = {
    count, // default: 10, max: 20
    offset,
    date_from,
    date_to
  } */
}) => endPointCall({
  method: 'GET',
  endPointURL,
  endPointKey,
  entity: `customers/${customerId}/cards`,
  data
});
