# EveryPay Gateway ES6 Bindings API

- [Tokens](#tokens)
  - [createToken](#createToken)
  - [retrieveToken](#retrieveToken)
- [Customers](#customers)
  - [createCustomer](#createCustomer)
  - [retrieveCustomer](#retrieveCustomer)
  - [updateCustomer](#updateCustomer)
  - [deleteCustomer](#deleteCustomer)
  - [listCustomers](#listCustomers)
- [Cards](#cards)
  - [createCard](#createCard)
  - [retrieveCard](#retrieveCard)
  - [deleteCard](#deleteCard)
  - [listCards](#listCards)
- [Payments](#payments)
  - [createPayment](#createPayment)
  - [retrievePayment](#retrievePayment)
  - [capturePayment](#capturePayment)
  - [listPayments](#listPayments)
- [Refunds](#refunds)
  - [createRefund](#createRefund)
  - [retrieveRefund](#retrieveRefund)
  - [listRefunds](#listRefunds)


<a name="tokens"></a>
## [&#167;](#tokens) Tokens

<a name="createToken"></a>
[createToken](#createToken) (NamedParams: Object) : Promise&lt;[TokenObject](https://www.everypay.gr/api-reference/?shell#the-token-object)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PUBLIC_KEY`)</sup><br>
- `card_number` Card number without any separators.
- `expiration_year` Card expiration year (4 digits).
- `expiration_month` Card expiration month (2 digits).
- `holder_name` Cardholder’s name.
- `cvv` The 3 or 4 digits security code of the card.

<a name="retrieveToken"></a>
[retrieveToken](#retrieveToken) (NamedParams: Object) : Promise&lt;[TokenObject](https://www.everypay.gr/api-reference/?shell#the-token-object)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PUBLIC_KEY`)</sup><br>
- `tokenId` The unique [Token ID](https://www.everypay.gr/api-reference/?shell#the-token-object).


<a name="customers"></a>
## [&#167;](#customers) Customers

<a name="createCustomer"></a>
[createCustomer](#createCustomer) (NamedParams: Object) : Promise&lt;[CustomerObject](https://www.everypay.gr/api-reference/?shell#the-customer-object)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `card_number` Card number without any separators.<br>
  <sup>optional (only used if creating with card arguments)</sup>
- `expiration_year` Card expiration year (4 digits).<br>
  <sup>optional (only used if creating with card arguments)</sup>
- `expiration_month` Card expiration month (2 digits).<br>
  <sup>optional (only used if creating with card arguments)</sup>
- `holder_name` Cardholder’s name.<br>
  <sup>optional (only used if creating with card arguments)</sup>
- `token` An unused and non expired [Card Token ID](https://www.everypay.gr/api-reference/?shell#the-token-object).<br>
  <sup>optional</sup>
- `description` A description of your customer object.<br>
  <sup>optional</sup>
- `full_name` Customer’s full name.<br>
  <sup>optional</sup>
- `email` Customer’s email address. This address is used in order to send the payment receipt.<br>
  <sup>optional</sup>

<a name="retrieveCustomer"></a>
[retrieveCustomer](#retrieveCustomer) (NamedParams: Object) : Promise&lt;[CustomerObject](https://www.everypay.gr/api-reference/?shell#the-customer-object)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `customerId` The unique [Customer ID](https://www.everypay.gr/api-reference/?shell#the-customer-object).

<a name="updateCustomer"></a>
[updateCustomer](#updateCustomer) (NamedParams: Object) : Promise&lt;[CustomerObject](https://www.everypay.gr/api-reference/?shell#the-customer-object)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `customerId` The unique [Customer ID](https://www.everypay.gr/api-reference/?shell#the-customer-object).
- `description` A description of your customer object.<br>
  <sup>optional</sup>
- `full_name` Customer’s full name.<br>
  <sup>optional</sup>
- `email` Customer’s email address. This address is used in order to send the payment receipt.<br>
  <sup>optional</sup>
- `card` The [Card ID](https://www.everypay.gr/api-reference/?shell#the-card-object).<br>
  <sup>optional</sup>
- `default_card` Whether to set provided card as default.<br>
  <sup>optional (default: 0)</sup>

<a name="deleteCustomer"></a>
[deleteCustomer](#deleteCustomer) (NamedParams: Object) : Promise&lt;[DeletedCustomerObject](https://www.everypay.gr/api-reference/?shell#delete-a-customer)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `customerId` The unique [Customer ID](https://www.everypay.gr/api-reference/?shell#the-customer-object).

<a name="listCustomers"></a>
[listCustomers](#listCustomers) (NamedParams: Object) : Promise&lt;[CutomersCollectionObject](https://www.everypay.gr/api-reference/?shell#list-all-customers)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `count` The number of records to return back in response. Limit can range between 1 and 20.<br>
<sup>optional (default: 10)</sup>
- `offset` The number of records to skip before adding results to the response.<br>
<sup>optional (default: 0)</sup>
- `date_from` Provide a date from in YYYY-MM-DD format.<br>
<sup>optional</sup>
- `date_to` Provide a date to in YYYY-MM-DD format.<br>
<sup>optional</sup>


<a name="cards"></a>
## [&#167;](#cards) Cards

<a name="createCard"></a>
[createCard](#createCard) (NamedParams: Object) : Promise&lt;[CardObject](https://www.everypay.gr/api-reference/?shell#the-card-object)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `customerId` The unique [Customer ID](https://www.everypay.gr/api-reference/?shell#the-customer-object).
- `card_number` Card number without any separators.<br>
  <sup>optional (only used if creating with card arguments)</sup>
- `expiration_year` Card expiration year (4 digits).<br>
  <sup>optional (only used if creating with card arguments)</sup>
- `expiration_month` Card expiration month (2 digits).<br>
  <sup>optional (only used if creating with card arguments)</sup>
- `holder_name` Cardholder’s name.<br>
  <sup>optional (only used if creating with card arguments)</sup>
- `token` An unused and non expired [Card Token ID](https://www.everypay.gr/api-reference/?shell#the-token-object).<br>
  <sup>optional</sup>
- `default_card` Whether to set provided card as default.<br>
  <sup>optional (default: 0)</sup>

<a name="retrieveCard"></a>
[retrieveCard](#retrieveCard) (NamedParams: Object) : Promise&lt;[CardObject](https://www.everypay.gr/api-reference/?shell#the-card-object)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `customerId` The unique [Customer ID](https://www.everypay.gr/api-reference/?shell#the-customer-object).
- `cardId` The unique [Card ID](https://www.everypay.gr/api-reference/?shell#the-card-object).

<a name="deleteCard"></a>
[deleteCard](#deleteCard) (NamedParams: Object) : Promise&lt;[DeletedCardObject](https://www.everypay.gr/api-reference/?shell#delete-a-card)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `customerId` The unique [Customer ID](https://www.everypay.gr/api-reference/?shell#the-customer-object).
- `cardId` The unique [Card ID](https://www.everypay.gr/api-reference/?shell#the-card-object).

<a name="listCards"></a>
[listCards](#listCards) (NamedParams: Object) : Promise&lt;[CardsCollectionObject](https://www.everypay.gr/api-reference/?shell#list-all-cards)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `count` The number of records to return back in response. Limit can range between 1 and 20.<br>
<sup>optional (default: 10)</sup>
- `offset` The number of records to skip before adding results to the response.<br>
<sup>optional (default: 0)</sup>
- `date_from` Provide a date from in YYYY-MM-DD format.<br>
<sup>optional</sup>
- `date_to` Provide a date to in YYYY-MM-DD format.<br>
<sup>optional</sup>


<a name="payments"></a>
## [&#167;](#payments) Payments

<a name="createPayment"></a>
[createPayment](#createPayment) (NamedParams: Object) : Promise&lt;[PaymentObject](https://www.everypay.gr/api-reference/?shell#the-payment-object)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `amount` A positive integer in the smallest currency unit e.g in cents (e.g 10,99 EUR shall be converted to 1099).<br>
- `card_number` Card number without any separators.<br>
  <sup>optional (only used if creating with card arguments)</sup>
- `expiration_year` Card expiration year (4 digits).<br>
  <sup>optional (only used if creating with card arguments)</sup>
- `expiration_month` Card expiration month (2 digits).<br>
  <sup>optional (only used if creating with card arguments)</sup>
- `holder_name` Cardholder’s name.<br>
  <sup>optional (only used if creating with card arguments)</sup>
- `cvv` The 3 or 4 digits security code of the card.<br>
  <sup>optional (only used if creating with card arguments)</sup>
- `token` It can be either a [Card Token ID](https://www.everypay.gr/api-reference/?shell#the-token-object) or a [Customer ID](https://www.everypay.gr/api-reference/?shell#the-customer-object).<br>
  <sup>optional</sup>
- `card` In case a payment is made with a [Customer ID](https://www.everypay.gr/api-reference/?shell#the-customer-object) you can define which card of the customer will be charged by providing a valid [Card ID](https://www.everypay.gr/api-reference/?shell#the-card-object). If this atrribute is skipped then the customer’s default card will be used.<br>
  <sup>optional</sup>
- `description` A description of the payment.<br>
  <sup>optional</sup>
- `capture` Whether to immediately capture the payment.<br>
  <sup>optional (default: 1)</sup>
- `payee_email` Provide the email address to which a payment receipt will be sent. This will override a customer’s email address in case payment is made with a customer token.<br>
  <sup>optional</sup>
- `payee_phone` Provide the customer’s phone.<br>
  <sup>optional</sup>
- `installments` A positive integer indicating the number of installments which the payer has applied to. Max. installment count is 36 and depends on merchant’s configuration. If card or merchant account doesn’t support installments an [error](https://www.everypay.gr/api-reference/?shell#errors) will be thrown.<br>
  <sup>optional</sup>
- `max_installments` A positive integer indicating the maximum count of allowed installments. This value is taken into account only if in the token parameter a [Token ID](https://www.everypay.gr/api-reference/?shell#the-token-object) is passed. This will ensure that the max. installment value of the token matches the provided value. If a mismatch is encountered then an [error](https://www.everypay.gr/api-reference/?shell#errors) will be thrown.<br>
  <sup>optional</sup>
- `merchant_ref` A unique ID set by the merchant. The merchant reference ID remains the same throughout the lifetime of the payment. Maximum chars 120. If a payment with the same merchant reference ID is again submitted then an [error](https://www.everypay.gr/api-reference/?shell#errors) will be thrown.<br>
  <sup>optional</sup>
- `create_customer` 1 after a successfull payment a customer object is created and the payment card is assigned to it as default card.<br>
  <sup>optional (default: 0)</sup>
- `customer` By providing a [Customer ID](https://www.everypay.gr/api-reference/?shell#the-customer-object) along with the payment details, the payment and the [Card](https://www.everypay.gr/api-reference/?shell#the-card-object) is assigned to the specified customer. This is useful if in case a customer is paying with a new card and you want to avoid multiple API calls.<br>
  <sup>optional</sup>
- `default_card` Shall be used in conjuction with the customer parameter.<br>
  <sup>optional (default: 0)</sup>

<a name="retrievePayment"></a>
[retrievePayment](#retrievePayment) (NamedParams: Object) : Promise&lt;[PaymentObject](https://www.everypay.gr/api-reference/?shell#the-payment-object)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `paymentId` The unique [Payment ID](https://www.everypay.gr/api-reference/?shell#the-payment-object).

<a name="capturePayment"></a>
[capturePayment](#capturePayment) (NamedParams: Object) : Promise&lt;[PaymentObject](https://www.everypay.gr/api-reference/?shell#the-payment-object)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `paymentId` The unique [Payment ID](https://www.everypay.gr/api-reference/?shell#the-payment-object).

<a name="listPayments"></a>
[listPayments](#listPayments) (NamedParams: Object) : Promise&lt;[PaymentsCollectionObject](https://www.everypay.gr/api-reference/?shell#list-all-payments)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `count` The number of records to return back in response. Limit can range between 1 and 20.<br>
<sup>optional (default: 10)</sup>
- `offset` The number of records to skip before adding results to the response.<br>
<sup>optional (default: 0)</sup>
- `date_from` Provide a date from in YYYY-MM-DD format.<br>
<sup>optional</sup>
- `date_to` Provide a date to in YYYY-MM-DD format.<br>
<sup>optional</sup>
- `merchant_ref` Provide the unique merchant reference ID used in the payment creation call.<br>
<sup>optional</sup>


<a name="refunds"></a>
## [&#167;](#refunds) Refunds

<a name="createRefund"></a>
[createRefund](#createRefund) (NamedParams: Object) : Promise&lt;[RefundObject](https://www.everypay.gr/api-reference/?shell#the-refund-object)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `payment` The [Payment ID](https://www.everypay.gr/api-reference/?shell#the-payment-object) of the payment to refund.<br>
- `amount` The amount (in cents) to refund. This must be less or equal to current amount of payment that is being refunded. If no amount is provided then the remaining amount of payment will be used.<br>
  <sup>optional</sup>
- `description` Useful to describe the refund reason.<br>
  <sup>optional</sup>

<a name="retrieveRefund"></a>
[retrieveRefund](#retrieveRefund) (NamedParams: Object) : Promise&lt;[RefundObject](https://www.everypay.gr/api-reference/?shell#the-refund-object)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `refundId` The unique [Refund ID](https://www.everypay.gr/api-reference/?shell#the-refund-object).

<a name="listRefunds"></a>
[listRefunds](#listRefunds) (NamedParams: Object) : Promise&lt;[RefundsCollectionObject](https://www.everypay.gr/api-reference/?shell#list-all-refunds)&gt;<br>
**Parameters** (object with named properties)

- `endPointURL`<br><sup>optional (default `EVERYPAY_APIENDPOINT`)</sup><br>
- `endPointKey`<br><sup>optional (default `EVERYPAY_PRIVATE_KEY`)</sup><br>
- `count` The number of records to return back in response. Limit can range between 1 and 20.<br>
<sup>optional (default: 10)</sup>
- `offset` The number of records to skip before adding results to the response.<br>
<sup>optional (default: 0)</sup>
- `date_from` Provide a date from in YYYY-MM-DD format.<br>
<sup>optional</sup>
- `date_to` Provide a date to in YYYY-MM-DD format.<br>
<sup>optional</sup>
- `payment` Provide the [Payment ID](https://www.everypay.gr/api-reference/?shell#the-payment-object) to fetch refunds only for the specified payment.<br>
<sup>optional</sup>
