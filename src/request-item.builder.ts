import {
  RequestMethod,
  URLSearchParams,
  Headers,
  Request
} from '@angular/http';

import {
  RequestBuilder,
  AnyObject
} from "./index";

class RequestBuilderItem implements RequestBuilder {

  public composedUrl: string;
  public body: any;
  public headers: Headers = new Headers();
  public params: URLSearchParams;
  public updatedMethod: RequestMethod;

  constructor(public url: string,
              public method: RequestMethod = RequestMethod.Get) {}

  private setInitialData(): void {
    this.updatedMethod = null;
    this.composedUrl = '';
    this.params = null;
    this.headers = new Headers();
    this.body = null;
  }

  replaceUrlParams(params: AnyObject): RequestBuilder {
    this.composedUrl = this.url;
    Object.keys(params).forEach(key => {
      this.composedUrl = this.composedUrl.replace(`<${key}>`, params[key])
    });
    return this;
  }

  setQueryParams (queryParams: AnyObject): RequestBuilder {
    this.params = this.params || new URLSearchParams();
    Object.keys(queryParams).forEach(key => this.params.set(key, queryParams[key]));
    return this;
  }

  deleteQueryParams(...queryParamNames: Array<string>): RequestBuilder {
    this.params = this.params || new URLSearchParams();
    queryParamNames.map(param => this.params.delete(param));
    return this;
  }

  appendHeaders (headerParams: AnyObject): RequestBuilder {
    Object.keys(headerParams).forEach(key => {
      this.headers.has(key) ? this.headers.set(key, headerParams[key]) :
          this.headers.append(key, headerParams[key]);
    });
    return this;
  }

  clearHeaders (): RequestBuilder {
    this.headers = new Headers();
    return this
  }

  deleteHeaders (...keys: Array<string> ): RequestBuilder {
    for(const header of keys) {
      this.headers.delete(header)
    }
    return this;
  }

  setBody (params: any): RequestBuilder {
    this.body = params;
    return this;
  }

  clearBody(): RequestBuilder {
    this.body = null;
    return this;
  }

  updateBody (params: AnyObject): RequestBuilder {
    this.body = {...this.body, ...params};
    return this;
  }

  setRequestMethod(method: RequestMethod): RequestBuilder {
    this.updatedMethod = method;
    return this;
  }

  generateRequest(): Request {
    const request = new Request({
      url: this.composedUrl || this.url,
      method: this.updatedMethod || this.method,
      headers: this.headers,
      body: this.body,
      params: this.params
    });
    this.setInitialData();
    return request;
  }

}

const requestBuilderFactory = {

  create: (url, method): RequestBuilder => {
    return new RequestBuilderItem(url, method)
  }

};

export function CreateRequestBuilder(url: string, method: RequestMethod = RequestMethod.Get) {

  return function (target: any, propertyKey: string | symbol) {
    target[propertyKey] = requestBuilderFactory.create(url, method);
  }

}
