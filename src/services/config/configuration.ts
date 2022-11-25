export default () => ({
  port: process.env.PORT || 4000,
  jwt_secret: process.env.JWT_SECRET,
  jwt_access_expired: process.env.JWT_ACCESS_EXPIRED,
  jwt_refresh_expired: process.env.JWT_REFRESH_EXPIRED,
});
