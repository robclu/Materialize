import axios from 'axios';

export const FETCH_SITE_INFO = 'FETCH_SITE_INFO';
export const FETCH_PAGE      = 'FETCH_PAGE';

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
  const request = axois.get(`${ROOT_URL}${url}${title}.json`);
  return {
    type    : FETCH_PAGE,
    payload : {
      promise : request
    }
  };
}