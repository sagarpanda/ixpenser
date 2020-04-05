const config = {
  statusCodes: {
    ok: 200,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    intServerErr: 500, // Internal Server Error
    serviceUnavailable: 503
  },
  jwtExpiresIn: '10h', // Eg: "60s", "2 days", "10h", "7d"
  eMailFrom: 'info@snoopy.in'
};

export default config;
