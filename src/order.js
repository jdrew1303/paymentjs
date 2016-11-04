export default class Order {
  constructor(attrs) {
    this.attributes = Object.assign({
      title: 'Order from PaymentJS',
      description: 'Order from PaymentJS description',
      currency: 'cny',
    }, attrs);
  }
  get id(){
    return this.attributes.id;
  }
  get title(){
    return this.attributes.title;
  }
  get description(){
    return this.attributes.description;
  }
  get items(){
    return this.attributes.items;
  }
  get amount(){
    return this.attributes.amount;
  }
  get currency(){
    return this.attributes.currency;
  }
}
