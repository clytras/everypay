const { endPointCall } = require('./utils');

exports.createToken = ({
  endPointURL,
  endPointKey = 'public',
  ...data
  /* = {
      card_number, // Card number without any separators.
      cvv, // The 3 or 4 digits security code of the card.
      expiration_month, // Card expiration month (2 digits)
      expiration_year, // Card expiration year (4 digits)
      holder_name // Cardholder’s name
  } */
}) =>
  endPointCall({
    data,
    endPointKey,
    endPointURL,
    entity: `tokens`,
    method: 'POST'
  });

exports.retrieveToken = ({ endPointKey = 'public', endPointURL, tokenId }) =>
  endPointCall({
    endPointKey,
    endPointURL,
    entity: `tokens/${tokenId}`,
    method: 'GET'
  });
