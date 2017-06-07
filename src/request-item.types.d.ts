import {
  RequestMethod,
  Request
} from '@angular/http';

export declare interface AnyObject {
  [key: string]: any
}

export declare interface RequestItem {
  composedUrl: string;
  body: any;
  headers: Headers;
  params: URLSearchParams;
  url: string;
  method: RequestMethod;
  replaceUrlParams(params: AnyObject): RequestItem;
  setQueryParams(queryParams: AnyObject): RequestItem;
  deleteQueryParams(...queryParamNames: Array<string>): RequestItem;
  appendHeaders(headerParams: AnyObject): RequestItem;
  clearHeaders(): RequestItem;
  deleteHeaders(...keys: Array<string> ): RequestItem;
  setBody(params: AnyObject): RequestItem;
  clearBody(): RequestItem;
  updateBody (params: AnyObject): RequestItem;
  generateRequest(): Request;
}
