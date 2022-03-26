const axios = require("axios");

const apiKey = '3a00ae3e8eac3b5e60f644383ee7c942';

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/"
});

module.exports = { apiKey, api };