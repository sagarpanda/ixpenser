import cfg from '../../config/config';

const welcomeMail = ({ to, data_url, secret }) => {
  return eMail({
    from: cfg.eMailFrom,
    to: emailId,
    subject: 'Hi there!',
    body: `
      <html>
        <body>
          <h2>Welcome to Snoopy</h2>
          <p>Please scan this QR code in google authenticator app</p>
          <img src="${data_url}" alt="${secret.base32}" />
        </body>
      </html>
    `
  });
};

export default welcomeMail;
