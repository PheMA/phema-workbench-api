const PHEX_DEFAULT_BASE_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/v1`;

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

  async run(url, body, headers) {
    return this.post(url, body, headers).then(async res => {
      let body, type;
      if (res.headers.get("Content-Type") === "application/json") {
        body = await res.json();
        type = "json";
      } else {
        if (res.headers.get("Content-Type") === "application/xml") {
          body = await res.text();
          type = "xml";
        } else {
          body = await res.text();
          type = "xml";
        }

        if (!res.ok) {
          body = {
            status: res.status,
            statusText: res.statusText
          };
        }
      }

      return {
        ok: res.ok,
        type,
        body
      };
    });
  }

  async post(url, body, headers) {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers
    });
  }

  async get(url, headers) {
    return fetch(url, {
      headers
    });
  }
}

export default PhEx;
