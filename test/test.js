require('dotenv').config();
const should = require('chai').should();
const expect = require('chai').expect;
const colors = require('colors');
const faker = require('faker');
const { Cards } = require('./helpers/TestCards');

// Gateway API functions

// Token API calls
const {
  createToken,
  retrieveToken
} = require('../src/Tokens');

// Customer API calls
const {
  createCustomer,
  retrieveCustomer,
  updateCustomer,
  deleteCustomer,
  listCustomers
} = require('../src/Customers');

// Cards API calls
const {
  createCard,
  retrieveCard,
  deleteCard,
  listCards
} = require('../src/Cards');

// Payments API calls
const {
  createPayment,
  retrievePayment,
  capturePayment,
  listPayments
} = require('../src/Payments');

// Refunds API calls
const {
  createRefund,
  retrieveRefund,
  listRefunds
} = require('../src/Refunds');


// Check environment variables gateway credentials
before(function() {
  let envVarsNotFound = 0;
  const EnvVars = [
    'EVERYPAY_APIENDPOINT',
    'EVERYPAY_PUBLIC_KEY',
    'EVERYPAY_PRIVATE_KEY',
    'EVERYPAY_SHARED_KEY'
  ];

  EnvVars.forEach(key => {
    if(process.env[key]) {
      console.log(`  ✓ ${key}`.green);
    } else {
      console.error(`  ✗ ${key}`.red);
      envVarsNotFound++;
    }
  })

  if(envVarsNotFound > 0) {
    console.error(`\n  Not all EveryPay environment credentials found; Skipping tests\n`.red);
    this.skip();
  } else {
    console.log(`\n  All EveryPay environment credentials found\n`.cyan);
    this.timeout(5000);
  }
});

// Initialise global data
// Some test cases are dependent to previous results
let createdTokenId = null;
let customerId = null;
let customerIdByToken = null;
let cardId = null;
let cardTokenId = null;
let cardNumber = null;
let customerName = faker.name.findName();
let customerEmail = faker.internet.email();
let customerDescription = faker.name.jobDescriptor();
let paymentId = null;
let paymentAmount = null;
let refundId = null;


// Test Tokens API _______________________________________________________________

describe('Tokens', function() {
  it('Should create a valid card token', function() {
    return createToken({
      card_number: Cards.Success.MasterCard,
      expiration_year: Cards.ValidYear,
      expiration_month: Cards.ValidMonth,
      cvv: Cards.ValidCVV,
      holder_name: faker.name.findName().toUpperCase()
    })
    .then(token => {
      expect(token).to.have.nested.include({
        is_used: false,
        has_expired: false
      });
      expect(token).to.have.property('token').match(/^ctn_/, 'card token id seems valid');
      'token' in token && (createdTokenId = token.token);
    });
  });

  it('Should retreive created token', function() {
    if(createdTokenId) {
      return retrieveToken({ tokenId: createdTokenId }).then(function(token) {
        expect(token).to.have.property('token').equal(createdTokenId);
        expect(token).to.have.nested.include({
          is_used: false,
          has_expired: false
        });
        expect(token.card.last_four).to.equal(Cards.Success.MasterCard.slice(-4));
      })
    } else {
      this.skip();
    }
  });
});

// Test Customers API ____________________________________________________________

describe('Customers', function() {
  it('Should create a customer with Card Arguments', function() {
    return createCustomer({
      card_number: Cards.Success.Visa,
      expiration_year: Cards.ValidYear,
      expiration_month: Cards.ValidMonth,
      holder_name: customerName.toUpperCase(),

      description: customerDescription,
      full_name: customerName,
      email: customerEmail
    }).then(customer => {
      expect(customer).to.have.property('token').match(/^cus_/, 'customer id is invalid');
      expect(customer.is_active).to.be.true;
      expect(customer.email).to.equal(customerEmail);
      expect(customer.full_name).to.equal(customerName);
      expect(customer).to.have.nested.property('card.token').match(/^crd_/, 'card id is invalid');
      expect(customer.card.last_four).to.equal(Cards.Success.Visa.slice(-4));
      expect(customer.cards.count).to.equal(1);

      'token' in customer && (customerId = customer.token);
      'token' in customer.card && (cardId = customer.card.token);
    });
  });

  it('Should retrieve customer', function() {
    if(customerId) {
      return retrieveCustomer({ customerId }).then(customer => {
        expect(customer).to.have.property('token').equal(customerId);
        expect(customer.is_active).to.be.true;
        expect(customer.email).to.equal(customerEmail);
        expect(customer.full_name).to.equal(customerName);
        expect(customer.description).to.equal(customerDescription);
      });
    } else {
      this.skip();
    }
  });

  it('Should update customer', function() {
    if(customerId) {
      customerName = faker.name.findName();
      customerEmail = faker.internet.email();
      customerDescription = faker.name.jobDescriptor();

      return updateCustomer({
        customerId,
        description: customerDescription,
        full_name: customerName,
        email: customerEmail
      }).then(customer => {
        expect(customer).to.have.property('token').equal(customerId);
        expect(customer.is_active).to.be.true;
        expect(customer.email).to.equal(customerEmail);
        expect(customer.full_name).to.equal(customerName);
        expect(customer.description).to.equal(customerDescription);
      });
    } else {
      this.skip();
    }
  });

  it('Should create a customer with Card Token', function() {
    if(createdTokenId) {
      const customerName = faker.name.findName();
      const customerEmail = faker.internet.email();
      const customerDescription = faker.name.jobDescriptor();

      return createCustomer({
        token: createdTokenId,
        description: customerDescription,
        full_name: customerName,
        email: customerEmail
      }).then(customer => {
        expect(customer).to.have.property('token').match(/^cus_/, 'customer id is invalid');
        expect(customer.is_active).to.be.true;
        expect(customer.email).to.equal(customerEmail);
        expect(customer.full_name).to.equal(customerName);
        expect(customer.cards.count).to.equal(1);

        'token' in customer && (customerIdByToken = customer.token);
      });
    } else {
      this.skip();
    }
  });

  it('Should get a list with customers', function() {
    return listCustomers().then(result => {
      expect(result.total_count).to.be.at.least(2);
    });
  });


  it('Should delete customer created with Card Token', function() {
    if(customerIdByToken) {
      return deleteCustomer({ customerId: customerIdByToken }).then(result => {
        expect(result).to.have.property('token').equal(customerIdByToken);
        expect(result).to.have.property('is_active').to.be.false;
      });
    } else {
      this.skip();
    }
  });
});

// Test Cards API ________________________________________________________________

describe('Cards', function() {
  before(function() {
    if(customerId) {
      cardId = null;
      cardNumber = null;
      createdTokenId = null;
    } else {
      this.skip();
    }
  });

  it('Should create a card with Card Arguments', function() {
    return createCard({
      customerId,
      card_number: Cards.Success.Visa,
      expiration_year: Cards.ValidYear,
      expiration_month: Cards.ValidMonth,
      holder_name: customerName.toUpperCase(),
      cvv: Cards.ValidCVV
    }).then(card => {
      expect(card).to.have.property('token').match(/^crd_/, 'card id is invalid');
      expect(card.customer).to.equal(customerId);
      expect(card.status).to.equal('valid');
      expect(card.last_four).to.equal(Cards.Success.Visa.slice(-4));

      if('token' in card) {
        cardId = card.token;
        cardNumber = Cards.Success.Visa;
      }
    });
  });

  it('Should create a valid Card Token', function() {
    return createToken({
      card_number: Cards.Success.MasterCard,
      expiration_year: Cards.ValidYear,
      expiration_month: Cards.ValidMonth,
      cvv: Cards.ValidCVV,
      holder_name: faker.name.findName().toUpperCase()
    })
    .then(token => {
      expect(token).to.have.property('token').match(/^ctn_/, 'card token id seems valid');
      expect(token).to.have.nested.include({
        is_used: false,
        has_expired: false
      });

      'token' in token && (createdTokenId = token.token);
    });
  });

  it('Should create a card with Card Token', function() {
    if(createdTokenId) {
      return createCard({
        customerId,
        token: createdTokenId,
      }).then(card => {
        expect(card).to.have.property('token').match(/^crd_/, 'card id is invalid');
        expect(card.customer).to.equal(customerId);
        expect(card.status).to.equal('valid');
        expect(card.last_four).to.equal(Cards.Success.MasterCard.slice(-4));

        if('token' in card) {
          cardId = card.token;
          cardNumber = Cards.Success.MasterCard;
        }
      });
    } else {
      this.skip();
    }
  });

  it('Should retreive a card', function() {
    if(cardId && cardNumber) {
      return retrieveCard({
        customerId,
        cardId
      }).then(card => {
        expect(card).to.have.property('token').match(/^crd_/, 'card id is invalid');
        expect(card.customer).to.equal(customerId);
        expect(card.status).to.equal('valid');
        expect(card.last_four).to.equal(cardNumber.slice(-4));
      });
    } else {
      this.skip();
    }
  });

  it('Should get a list with cards', function() {
    return listCards({ customerId }).then(result => {
      expect(result.total_count).to.be.at.least(2);
    });
  });


  it('Should delete a card', function() {
    if(cardId) {
      return deleteCard({
        customerId,
        cardId
      }).then(result => {
        expect(result).to.have.property('token').equal(cardId);
        expect(result).to.have.property('is_deleted').to.be.true;
      });
    } else {
      this.skip();
    }
  });
});

// Test Payments API _____________________________________________________________

describe('Payments', function() {
  before(function() {
    cardId = null;
    cardNumber = null;
    cardTokenId = null;
  });

  it('Should create a valid Card Token', function() {
    return createToken({
      card_number: Cards.Success.MasterCard,
      expiration_year: Cards.ValidYear,
      expiration_month: Cards.ValidMonth,
      cvv: Cards.ValidCVV,
      holder_name: faker.name.findName().toUpperCase()
    })
    .then(token => {
      expect(token).to.have.property('token').match(/^ctn_/, 'card token id seems valid');
      expect(token).to.have.nested.include({
        is_used: false,
        has_expired: false
      });

      if('token' in token) {
        cardTokenId = token.token
        cardNumber = Cards.Success.MasterCard
      }
    });
  });

  it('Should create a payment using a Card Token', function() {
    paymentAmount = 285;
    
    if(cardTokenId) {
      return createPayment({
        amount: paymentAmount, 
        token: cardTokenId,
        description: faker.lorem.sentence(),
        merchant_ref: `Ref: ${faker.random.uuid()}`,
      }).then(payment => {
        expect(payment).to.have.property('token').match(/^pmt_/, 'payment id is invalid');
        expect(payment.amount).to.equal(paymentAmount);
        expect(payment.status).to.equal('Captured');
        expect(payment.card.last_four).to.equal(Cards.Success.MasterCard.slice(-4));
        expect(payment.card.status).to.equal('valid');
  
        if('token' in payment) {
          paymentId = payment.token;
        } else {
          paymentAmount = null;
        }
      });
    }
  });

  it('Should create a direct payment', function() {
    paymentAmount = 285;

    return createPayment({
      amount: paymentAmount, 

      card_number: Cards.Success.MasterCard,
      expiration_year: Cards.ValidYear,
      expiration_month: Cards.ValidMonth,
      cvv: Cards.ValidCVV,
      holder_name: faker.name.findName().toUpperCase(),
  
      description: faker.lorem.sentence(),
      payee_email: faker.internet.email(),
      payee_phone: faker.phone.phoneNumber("69# ### ####"),
      merchant_ref: `Ref: ${faker.random.uuid()}`,
    }).then(payment => {
      expect(payment).to.have.property('token').match(/^pmt_/, 'payment id is invalid');
      expect(payment.amount).to.equal(paymentAmount);
      expect(payment.status).to.equal('Captured');
      expect(payment.card.last_four).to.equal(Cards.Success.MasterCard.slice(-4));
      expect(payment.card.status).to.equal('valid');

      if('token' in payment) {
        paymentId = payment.token;
      } else {
        paymentAmount = null;
      }
    });
  });

  it('Should retreive direct payment', function() {
    if(paymentId && paymentAmount !== null) {
      return retrievePayment({ paymentId }).then(payment => {
        expect(payment).to.have.property('token').match(/^pmt_/, 'payment id is invalid');
        expect(payment.amount).to.equal(paymentAmount);
        expect(payment.status).to.equal('Captured');
        expect(payment.card.last_four).to.equal(Cards.Success.MasterCard.slice(-4));
        expect(payment.card.status).to.equal('valid');
      });
    } else {
      this.skip();
    }
  });

  before(function() {
    paymentId = null;
  });

  it('Should create a valid Card Token for payment capture', function() {
    return createToken({
      card_number: Cards.Success.MasterCard,
      expiration_year: Cards.ValidYear,
      expiration_month: Cards.ValidMonth,
      cvv: Cards.ValidCVV,
      holder_name: faker.name.findName().toUpperCase()
    })
    .then(token => {
      expect(token).to.have.property('token').match(/^ctn_/, 'card token id seems valid');
      expect(token).to.have.nested.include({
        is_used: false,
        has_expired: false
      });

      if('token' in token) {
        cardTokenId = token.token
        cardNumber = Cards.Success.MasterCard
      }
    });
  });

  before(function() {
    paymentId = null;
  });

  it('Should create a capture payment using a Card Token', function() {
    paymentAmount = 396;

    if(cardTokenId) {
      return createPayment({
        amount: paymentAmount, 
        token: cardTokenId,
        description: faker.lorem.sentence(),
        capture: 0,
        merchant_ref: `Ref: ${faker.random.uuid()}`,
      }).then(payment => {
        expect(payment).to.have.property('token').match(/^pmt_/, 'payment id is invalid');
        expect(payment.amount).to.equal(paymentAmount);
        expect(payment.status).to.equal('Pre Authorized');
        expect(payment.card.last_four).to.equal(Cards.Success.MasterCard.slice(-4));
        expect(payment.card.status).to.equal('valid');
  
        if('token' in payment) {
          paymentId = payment.token;
        } else {
          paymentAmount = null;
        }
      });
    }
  });

  it('Should capture a payment with "Pending" status', function() {
    if(paymentId && paymentAmount !== null) {
      return capturePayment({ paymentId }).then(payment => {
        expect(payment).to.have.property('token').match(/^pmt_/, 'payment id is invalid');
        expect(payment.amount).to.equal(paymentAmount);
        expect(payment.status).to.equal('Captured');
        expect(payment.card.last_four).to.equal(Cards.Success.MasterCard.slice(-4));
        expect(payment.card.status).to.equal('valid');
      });
    } else {
      this.skip();
    }
  });

  it('Should get a list with payments', function() {
    return listPayments().then(result => {
      expect(result.total_count).to.be.at.least(2);
    });
  });
});

// Test Refunds API ______________________________________________________________

describe('Refunds', function() {
  before(function() {
    cardId = null;
    cardNumber = null;
    cardTokenId = null;
    paymentId = null;
    paymentAmount = null;
  });

  it('Should create a valid Card Token', function() {
    return createToken({
      card_number: Cards.Success.MasterCard,
      expiration_year: Cards.ValidYear,
      expiration_month: Cards.ValidMonth,
      cvv: Cards.ValidCVV,
      holder_name: faker.name.findName().toUpperCase()
    })
    .then(token => {
      expect(token).to.have.property('token').match(/^ctn_/, 'card token id seems valid');
      expect(token).to.have.nested.include({
        is_used: false,
        has_expired: false
      });

      if('token' in token) {
        cardTokenId = token.token
        cardNumber = Cards.Success.MasterCard
      }
    });
  });

  it('Should create a payment using a Card Token', function() {
    paymentAmount = 427;
    
    if(cardTokenId) {
      return createPayment({
        amount: paymentAmount, 
        token: cardTokenId,
        description: faker.lorem.sentence(),
        merchant_ref: `Ref: ${faker.random.uuid()}`,
      }).then(payment => {
        expect(payment).to.have.property('token').match(/^pmt_/, 'payment id is invalid');
        expect(payment.amount).to.equal(paymentAmount);
        expect(payment.status).to.equal('Captured');
        expect(payment.card.last_four).to.equal(Cards.Success.MasterCard.slice(-4));
        expect(payment.card.status).to.equal('valid');
  
        if('token' in payment) {
          paymentId = payment.token;
        } else {
          paymentAmount = null;
        }
      });
    }
  });

  before(function() {
    refundId = null;
  });

  it('Should create a refund', function() {
    if(paymentId && paymentAmount !== null) {
      return createRefund({
        payment: paymentId,
        amount: paymentAmount,
        description: `Refund "${paymentAmount}" of ${paymentId}`
      }).then(refund => {
        expect(refund).to.have.property('token').match(/^ref_/, 'refund id is invalid');
        expect(refund.amount).to.equal(paymentAmount);
        expect(refund.status).to.equal('Captured');

        'token' in refund && (refundId = refund.token);
      });
    } else {
      this.skip();
    }
  });

  it('Should retrieve a refund', function() {
    if(refundId) {
      return retrieveRefund({ refundId }).then(refund => {
        expect(refund).to.have.property('token').equal(refundId);
        expect(refund.amount).to.equal(paymentAmount);
        expect(refund.status).to.equal('Captured');
      });
    } else {
      this.skip();
    }
  });

  it('Should get a list with refunds', function() {
    return listRefunds().then(result => {
      expect(result.total_count).to.be.at.least(1);
    });
  });
});
