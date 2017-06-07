import {
  RequestMethod,
  URLSearchParams,
  Headers,
  Request
} from '@angular/http';

import {
  RequestItem,
  AnyObject
} from "./index";

class GeneratedRequestItem implements RequestItem {

  public composedUrl: string;

  public body: any;

  public headers: Headers = new Headers();

  public params: URLSearchParams;

  constructor(public url: string,
              public method: RequestMethod = RequestMethod.Get) {}

  replaceUrlParams(params: AnyObject): RequestItem {
    this.composedUrl = this.url;
    for (const key in params) {
      this.composedUrl = this.composedUrl.replace(`<${key}>`, params[key]);
    }
    return this;
  }

  setQueryParams (queryParams: AnyObject): RequestItem {
    this.params = this.params || new URLSearchParams();
    for (const key in queryParams) {
      this.params.set(key, queryParams[key])
    }
    return this;
  }

  deleteQueryParams(...queryParamNames: Array<string>): RequestItem {
    this.params = this.params || new URLSearchParams();
    for (const param of queryParamNames) {
      this.params.delete(param)
    }
    return this;
  }

  appendHeaders (headerParams: AnyObject): RequestItem {
    for(const key in headerParams) {
      this.headers.append(key, headerParams[key])
    }
    return this
  }

  clearHeaders (): RequestItem {
    this.headers = new Headers();
    return this
  }

  deleteHeaders (...keys: Array<string> ): RequestItem {
    for(const header of keys) {
      this.headers.delete(header)
    }
    return this;
  }

  setBody (params: AnyObject): RequestItem {
    this.body = {...params};
    return this;
  }

  clearBody(): RequestItem {
    this.body = null;
    return this;
  }

  updateBody (params: AnyObject): RequestItem {
    this.body = {...this.body, ...params};
    return this;
  }

  generateRequest(): Request {
    return new Request({
      url: this.composedUrl || this.url,
      method: this.method,
      headers: this.headers,
      body: this.body,
      params: this.params
    });
  }

}

const apiRequestFactory = {

  create: (url, method): RequestItem => {
    return new GeneratedRequestItem(url, method)
  }

};

export function CreateRequestItem(url: string, method: RequestMethod = RequestMethod.Get) {

  return function (target: any, propertyKey: string | symbol) {
    target[propertyKey] = apiRequestFactory.create(url, method);
  }

}
