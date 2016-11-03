import _ from 'lodash'
import ejs from 'ejs'

export default class Response {
  constructor(body, options, config) {
    this.body = body;
    this.options = options;
    this.config = config;
  }

  async isSuccess(){
    return false;
  }

  isRedirect(){
    return this.options.redirect;
  }
  redirect(){
    return new Promise((resolve, reject)=>{
      let { redirect } = this.options;
      if (redirect) {
        resolve(ejs.render('<form method="<%=method%>" action="<%=url%>" id="payment"><% for (let k in body){ %><input type="hidden" name="<%=k%>" value="<%=body[k]%>" /><% } %></form><script type="text/javascript">document.getElementById("payment").submit();</script>', {
            url: redirect.url,
            method: redirect.method,
            body: this.body
          }));
      } else {
        reject();
      }
    })
  }
}
