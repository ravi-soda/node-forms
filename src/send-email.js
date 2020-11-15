var nodemailer = require ('nodemailer');

const EMAIL_SERVICE = 'gmail';
const EMAIL_HOST = 'smtp.gmail.com';
const EMAIL_PORT = 587;
const EMAIL_USERNAME = '';
const EMAIL_PASSWORD = '';

class SendEmail {
  smtpTransport;

  constructor () {
    this.smtpTransport = nodemailer.createTransport ({
      service: EMAIL_SERVICE,
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  prepareMailOptions = (
    awardType,
    subject,
    text,
    recipientEmailAddress,
    firstName,
    lastName
  ) => {
    if (!awardType || !firstName || !lastName || !recipientEmailAddress) {
      console.log (
        'Invalid Mail Options data',
        awardType,
        recipientEmailAddress,
        subject,
        text,
        firstName,
        lastName
      );
      throw new Error ('Provided data is invalid.');
    }

    const certificateFileName = `${awardType}-${firstName}-${lastName}`;
    var mailOptions = {
      to: recipientEmailAddress,
      cc: ['pawan.dodda@gmail.com'],
      subject: subject,
      text: text,
      html: `<div
          style="margin:0;padding:0;background-color:#F8F8F8;border:1px solid #ddd"
        >
          <div
            style="
              border-radius:5px;
              text-align:justify;
              padding:15px;
              box-shadow: 0px 0px 10px 1px #888888;
              background-image: 'cid:image1@johnson.com';
              margin:0 auto;
              font:16px Helvetica,Arial,sans-serif;
              color:#848484;
              height: 100%;
              background-size: 100%;
              background-repeat: no-repeat;
              width: 60%;
              height: 87%;
              position: relative;
              "
          >
            <b
              style="font-family: system-ui;font-style: oblique;font-size: xx-large;color: goldenrod;"
              >Congratulations!!<br/> ${firstName} ${lastName},</b><br />
            <p style="font-family: system-ui;font-style: oblique;font-size: x-large;color: goldenrod;">
                The best way to predict future is to create it.
            </p>
            <div
              style="position: absolute;bottom: 0px;left: 0px;margin: 15px;color: #eee;"
            >
              Thanks and Regards,
              <br />
              Awards and Recognition team.
            </div>
          </div>
          <hr />
          <div style="height:3%;"></div>
        </div>
        `,
      attachments: [
        {
          filename: 'kat-banner-bg.jpg',
          path: './src/public/Award.jpg',
          cid: 'image1@johnson.com',
        },
        {
          filename: `${certificateFileName}.pdf`,
          path: `./src/public/assets/certificates/${certificateFileName}.pdf`,
        },
      ],
    };

    return mailOptions;
  }

  sendEmail = (mailOptions) => {
    // TODO: stopped sending email. Can be enabled once code is ready.
    this.smtpTransport.sendMail (mailOptions, function (error, response) {
      if (error) {
        console.log (error.message, error.stack);
        return 'ERROR';
      } else {
        console.log ('Message sent: ', JSON.stringify (response));
        return 'SENT';
      }
    });
  }
}

const sendEmailComponent = new SendEmail();
module.exports = sendEmailComponent;