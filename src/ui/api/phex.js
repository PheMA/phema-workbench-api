const PHEX_DEFAULT_BASE_URL = "http://localhost:8083/api/v1";

class PhEx {
  constructor(baseUrl = PHEX_DEFAULT_BASE_URL) {
    this._baseUrl = baseUrl;
  }

  get baseUrl() {
    return this._baseUrl;
  }

  set baseUrl(url) {
    if (!url) {
      throw new Error("baseUrl cannot be blank");
    }
    if (typeof url !== "string") {
      throw new Error("baseUrl must be a string");
    }

    this._baseURL = url;
  }

  async getPhenotypeList() {
    return this.get(`${this.baseUrl}/phenotype`).then(res => res.json());
  }

  async get(url) {
    return fetch(url);
  }
}

export default PhEx;
