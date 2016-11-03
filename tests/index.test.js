import { Alipay, Stripe } from '../src/gateways'
import Order from '../src/order'

async function alipay() {
  const gateway = new Alipay({
    partner: '123',
    seller_id: 'garbinh@gmail.com',
    key: '321',
    notify_url: 'http://haha',
    return_url: 'http://hehe',
  });

  let response = await gateway.purchase(new Order({
    id: '1',
    title: 'Test',
    contents: 'Tesla Model S',
    amount: 100000.00
  }));
  try {
    if (response.isRedirect()) {
      let form = await response.redirect();
      console.log(form);
    } else if (await response.isSuccess()) {
      console.log('success');
    } else {
      console.log(response.getMessage());
    }
  } catch (e) {
    console.log(e);
  }
  try {
    let response = gateway.response({notify_id:111});
    if (await response.isSuccess()) {
      console.log('success')
    } else {
      console.log(response.errors, '=======');
    }
  } catch (e) {
    console.log(e);
  }
}
async function stripe() {
  let gateway = new Stripe({
    key: 'sk_test_LPIE20HyBixCrxjCpwC9zLlI'
  });
  let card = await gateway.stripe.tokens.create({
    card: {
      "number": '4242424242424242',
      "exp_month": 12,
      "exp_year": 2017,
      "cvc": '123'
    }
  });
  let response = await gateway.purchase(new Order({
    id: '1212',
    amount: 100,
    currency: 'usd',
  }), { source: card.id });
  if (await response.isSuccess()) {
    console.log('success', '==-stripe-==', response.body);
  } else {
    console.log(response.body);
  }
}
alipay();
stripe();
