export default {
  port: 1337,
  origin: "http://localhost:3000",
  dbUri: "mongodb://localhost:27017/rest-api-tutorial",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  privateKey: `-----BEGIN RSA PRIVATE KEY-----

-----END RSA PRIVATE KEY-----`,
  publicKey: `-----BEGIN PUBLIC KEY-----

-----END PUBLIC KEY-----`,
  googleClientId: "",
  googleClientSecret: "",
  googleOauthRedirectUrl: "http://localhost:1337/api/sessions/oauth/google"
}
