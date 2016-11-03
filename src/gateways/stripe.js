import Payment from '../payment'
import Response from '../response'
import stripe from 'stripe'

export class StripeResponse extends Response {
  async isSuccess(){
    return this.options.error !== true;
  }
}

export default class Stripe extends Payment {
  get Response(){
    return StripeResponse;
  }

  constructor(config){
    super(config);
    this.stripe = stripe(config.key);
  }

  async purchase(order, options){
    try {
      let charge = Object.assign({
        amount: order.amount,
        currency: order.currency,
      }, options);
      let response = await this.stripe.charges.create(charge);
      if (response.statusCode >= 200 && response.statusCode <300) {
        return this.response(response);
      } else {
        return this.response(response, { error:true });
      }
    } catch (e) {
      return this.response(e, { error:true });
    }
  }
}
