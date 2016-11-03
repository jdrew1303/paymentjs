import Response from './response';

export default class Payment {
  constructor(config) {
    this.config = this.initialize(config);
  }
  get Response(){
    return Response;
  }
  initialize(config){
    return config;
  }
  async purchase(order, options){
    return this.response(order, {});
  }
  response(body, options){
    return new this.Response(body, options, this.config);
  }
}
