const { endPointCall } = require('./utils');


exports.createToken = ({
  endPointURL,
  endPointKey = 'public',
  ...data /* = {
    card_number,
    expiration_year,
    expiration_month,
    cvv,
    holder_name,
    amount
  } */
}) => endPointCall({
  method: 'POST',
  endPointURL,
  endPointKey,
  entity: `tokens`,
  data
});

exports.retrieveToken = ({
  endPointURL,
  endPointKey = 'public',
  tokenId
}) => endPointCall({
  method: 'GET',
  endPointURL,
  endPointKey,
  entity: `tokens/${tokenId}`
});
