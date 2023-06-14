class Api {
  constructor(token) {
    this.path = "https://api.react-learning.ru";
    this.token = token;
  }
  setHeaders(isCT = false, noToken = false) {
    //все заголовки имеют Bearer, isCT добавляет Content-Type
    const headerObj = {
      Authorization: `Bearer ${this.token}`,
    };
    if (isCT) {
      headerObj["Content-Type"] = "application/json";
    }
    if (noToken) {
      delete headerObj["Authorization"];
    }
    return headerObj;
  }

  setBody(body) {
    return JSON.stringify(body);
  }

  getProduct() {
    return fetch(`${this.path}/products`, {
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }

  //получить один продукт
  getSingleProduct(id) {
    return fetch(`${this.path}/products/${id}`, {
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  addProduct(body) {
    return fetch(`${this.path}/products/`, {
      method: "POST",
      headers: this.setHeaders(true),
      body: this.setBody(body),
    }).then((res) => res.json());
  }
  updProduct(id, body) {
    return fetch(`${this.path}/products/${id}`, {
      method: "PATCH",
      headers: this.setHeaders(true),
      body: this.setBody(body),
    }).then((res) => res.json());
  }
  delProduct(id) {
    return fetch(`${this.path}/products/${id}`, {
      method: "DELETE",
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  setLike(id, isLike) {
    return fetch(`${this.path}/products/likes/${id}`, {
      method: isLike ? "PUT" : "DELETE",
      headers: this.setHeaders(true),
    }).then((res) => res.json());
  }
  addReview(id, body) {
    return fetch(`${this.path}/products/review/${id}`, {
      method: "POST",
      headers: this.setHeaders(true),
      body: this.setBody(body),
    }).then((res) => res.json());
  }
  delReview(productId, reviewId) {
    return fetch(`${this.path}/products/review${productId}/${reviewId}`, {
      method: "DELETE",
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  reg(body) {
    return fetch(`${this.path}/signup`, {
      method: "POST",
      headers: this.setHeaders(true, true),
      body: this.setBody(body),
    }).then((res) => res.json());
  }
  auth(body) {
    return fetch(`${this.path}/signin`, {
      method: "POST",
      headers: this.setHeaders(true, true),
      body: this.setBody(body),
    }).then((res) => res.json());
  }
  getProfile() {
    return fetch(`${this.path}/users/me`, {
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  updProfile(body, updImg = false) {
    return fetch(`${this.path}/users/me/${updImg ? "avatar" : ""}`, {
      method: "PATCH",
      headers: this.setHeaders(true),
      body: this.setBody(body),
    }).then((res) => res.json());
  }
}

export default Api;
