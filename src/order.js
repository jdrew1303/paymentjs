export default class Order {
  constructor(attrs) {
    this.attributes = attrs;
  }
  get id(){
    return this.attributes.id;
  }
  get title(){
    return this.attributes.title;
  }
  get contents(){
    return this.attributes.contents;
  }
  get amount(){
    return this.attributes.amount;
  }
  get currency(){
    return this.attributes.currency;
  }
}
