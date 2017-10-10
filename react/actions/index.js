import axios from 'axios';

export const FETCH_SITE_INFO = 'FETCH_SITE_INFO';
export const FETCH_PAGE      = 'FETCH_PAGE';
export const FETCH_JSON_INFO = 'FETCH_JSON_INFO';

const ROOT_URL = 'http://127.0.0.1:4000';
const API_URL  = '/api/v1/';

const siteInfoRequest = axios.get(`${ROOT_URL}${API_URL}config.json`);

export function fetchSiteInfo() {
  return {
    type    : FETCH_SITE_INFO,
    payload : {
      promise: siteInfoRequest
    }
  };
}

export function fetchPage(title, url) {
  const request = axios.get(`${ROOT_URL}${url}${title}.json`);
  return {
    type    : FETCH_PAGE,
    payload : {
      promise : request
    }
  };
}

export function fetchJsonInfo(component) {
  const path    = `${ROOT_URL}/info/${component}.json`;
  const request = axios.get(path);
  return {
    type    : FETCH_JSON_INFO,
    payload : {
      promise: request
    }
  }
}