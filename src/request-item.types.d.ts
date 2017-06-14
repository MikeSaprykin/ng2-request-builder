import {
  RequestMethod,
  Request,
  Headers,
  URLSearchParams
} from '@angular/http';

export interface AnyObject {
  [key: string]: any
}

export interface RequestBuilder {
  composedUrl: string;
  body: any;
  headers: Headers;
  params: URLSearchParams;
  url: string;
  method: RequestMethod;
  updatedMethod: RequestMethod;
  setInitialData(): void;
  setRequestMethod(method: RequestMethod): RequestBuilder;
  replaceUrlParams(params: AnyObject): RequestBuilder;
  setQueryParams(queryParams: AnyObject): RequestBuilder;
  deleteQueryParams(...queryParamNames: Array<string>): RequestBuilder;
  appendHeaders(headerParams: AnyObject): RequestBuilder;
  clearHeaders(): RequestBuilder;
  deleteHeaders(...keys: Array<string> ): RequestBuilder;
  setBody(params: AnyObject): RequestBuilder;
  clearBody(): RequestBuilder;
  updateBody (params: AnyObject): RequestBuilder;
  generateRequest(): Request;
}
