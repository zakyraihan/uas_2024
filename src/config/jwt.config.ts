export const jwt_config1 = {
  access_token_secret: 'belajar_jwt',
  expired: 3600,
  refresh_token_secret: 'zahid_token',
};

export const jwt_config = {
  secret: process.env.JWT_SECRET,
  expired: process.env.JWT_EXPIRED,
  refresh: process.env.JWT_REFRESH,
};
