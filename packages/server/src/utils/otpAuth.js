import speakeasy from 'speakeasy';

const generate = () => {
  const secret = speakeasy.generateSecret({length: 20});
  return secret;
};

const verify = (otp, secret) => {
  const tokenValidate = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: 'base32',
    token: otp,
    window: 6
  });
  return tokenValidate;
}

export default { generate, verify };
