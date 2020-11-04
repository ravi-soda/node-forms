const express = require ('express');
var nodemailer = require ('nodemailer');
const {check, validationResult} = require ('express-validator/check');
const {matchedData} = require ('express-validator/filter');

const router = express.Router ();
const smtpTransport = nodemailer.createTransport ({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: '',
    pass: '',
  },
});

let awards = [
  {
    id: 'gameChanger1',
    name: 'Game Changer 1',
    recipientEmailAddress: 'raviprasad38@gmail.com',
    subject: 'Test',
    text: 'Test text',
    isSentEmail: false,
  },
  {
    id: 'gameChanger2',
    name: 'Game Changer 2',
    recipientEmailAddress: 'raviprasad38@gmail.com',
    subject: 'Test',
    text: 'Test text',
    isSentEmail: false,
  },
  {
    id: 'gameChanger3',
    name: 'Game Changer 3',
    recipientEmailAddress: 'raviprasad38@gmail.com',
    subject: 'Test',
    text: 'Test text',
    isSentEmail: false,
  },
  {
    id: 'gameChanger4',
    name: 'Game Changer 4',
    recipientEmailAddress: 'raviprasad38@gmail.com',
    subject: 'Test',
    text: 'Test text',
    isSentEmail: false,
  },
];

router.get ('/', (req, res) => {
  res.render ('index', {
    data: {
      awards,
      status: {
        statusCode: '',
      },
    },
  });
});

router.post ('/send-email', (req, res) => {
  console.log (req.body);
  const reqBody = req.body;
  const selectedAwardId = reqBody.awardId;
  let selectedAward;
  console.log(`Selected Award : ${selectedAwardId}`);
  if (!selectedAwardId) {
    console.log('No proper award selected.');
    
    res.render ('index', {
      data: {
        awards,
        status: {
          statusCode: 'FAIL',
          statusMessage: 'Please select a valid award.',
        },
      },
    });

    return res;
  }

  awards = awards.map (award => {
    if (award.id === selectedAwardId) {
      award.isSentEmail = true;
      selectedAward = award;
    }
    return award;
  });

  console.log ('Entering into Send Mail opstions');
  var mailOptions = {
    to: selectedAward.recipientEmailAddress,
    cc: ['pawan.dodda@gmail.com'],
    subject: selectedAward.subject,
    text: selectedAward.text,
    html:`<div style="margin:0;padding:0;background-color:#F8F8F8;border:1px solid #ddd">
    <img src="cid:image1@johnson.com" width="100%" />
    <div style="height:1%;"></div>
    <div
      style="border-radius:5px;text-align:justify;padding:15px;box-shadow: 0px 0px 10px 1px #888888;background-color:#FFF;margin:0 auto;font:16px Helvetica,Arial,sans-serif;line-height:1.5;color:#848484;"
    >
      <b>Hello '+user+',</b><br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Sattvarise Technologies. We offers
      market-leading expertise in the latest 3D, Augmented Reality and Virtual
      Reality for Android, iOS, Google Cardboard, GearVR and more.. <br /><br />
      <table
        border="0"
        cellspacing="0"
        cellpadding="0"
        style="margin:0 auto;border-bottom:1px solid #cee3ed;padding:0;background-color:rgba(236,240,241,0.3);"
      >
        <caption
          style="font-size:20px;color:#005999;font-weight:bold;background:rgba(236,240,241,0.3);border-top:1px solid #cee3ed;"
        >
          How to use
        </caption>
        <tbody>
          <tr>
            <td width="60"></td>
            <td width="160" valign="middle">
              <div
                style="padding:0 0 0.5em;color:#699bbf;font:bold 16px Helvetica,Arial,sans-serif"
              >
              </div>
            </td>
            <td width="16"></td>
            <td width="364" valign="top" style="padding:1.5em 0">
              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin:0;border:0;padding:0;color:#8d9ba6;font:15px Helvetica,Arial,sans-serif;line-height:1.5"
              >
                <tbody>
                  <tr>
                    <td
                      width="24"
                      valign="top"
                      style="margin:0;padding:4px 0 0;font-weight:bold;color:#005999"
                    >
                      1.
                    </td>
                    <td valign="top" style="margin:0;padding:0 0 1.25em">
                      <span
                        style="font-weight:bold;color:#005999"
                        target="_blank"
                      >
                        Download Android app from google play store</span
                      ><br />
                      <span style="font-size:13px"
                        ><a href="#" style="color:inherit;"
                          >Play store link</a
                        ></span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td
                      width="24"
                      valign="top"
                      style="margin:0;padding:4px 0 0;font-weight:bold;color:#005999"
                    >
                      2.
                    </td>
                    <td valign="top" style="margin:0;padding:0">
                      <span style="font-weight:bold;color:#005999" target="_blank"
                        >Download and Print</span
                      ><br />
                      <span style="font-size:13px"
                        >Download and print adjacent image on A4 paper (Either
                        Color/Black & White print).</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td
                      width="24"
                      valign="top"
                      style="margin:0;padding:4px 0 0;font-weight:bold;color:#005999"
                    >
                      3.
                    </td>
                    <td valign="top" style="margin:0;padding:0">
                      <span style="font-weight:bold;color:#005999" target="_blank"
                        >Place the Marker</span
                      ><br />
                      <span style="font-size:13px"
                        >Place the printed image on the Floor</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td
                      width="24"
                      valign="top"
                      style="margin:0;padding:4px 0 0;font-weight:bold;color:#005999"
                    >
                      4.
                    </td>
                    <td valign="top" style="margin:0;padding:0">
                      <span style="font-weight:bold;color:#005999" target="_blank"
                        >Transform your space to luxury</span
                      ><br />
                      <span style="font-size:13px"
                        >Open Johnson Tiles AR app and go to "Transform your space
                        to luxury".</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td
                      width="24"
                      valign="top"
                      style="margin:0;padding:4px 0 0;font-weight:bold;color:#005999"
                    >
                      5.
                    </td>
                    <td valign="top" style="margin:0;padding:0">
                      <span style="font-weight:bold;color:#005999" target="_blank"
                        >Scan the Marker</span
                      ><br />
                      <span style="font-size:13px"
                        >As camera feed opens in the app, scan the printed image
                        and it will show tiles on top of it.
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      width="24"
                      valign="top"
                      style="margin:0;padding:4px 0 0;font-weight:bold;color:#005999"
                    >
                      6.
                    </td>
                    <td valign="top" style="margin:0;padding:0">
                      <span style="font-weight:bold;color:#005999" target="_blank"
                        >Select tiles from the catalogue</span
                      ><br />
                      <span style="font-size:13px">
                        Use other features from the right panel for a complete
                        experience.</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td width="60"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
    <div style="height:3%;"></div>
  </div>
  `,
    attachments:[{
        filename : 'kat-banner-bg.jpg',
        path: './src/public/Award.jpg',
        cid : 'image1@johnson.com'
    }]
  };
  console.log (mailOptions);
  // TODO: stopped sending email. Can be enabled once code is ready.
  // smtpTransport.sendMail (mailOptions, function (error, response) {
  //   if (error) {
  //     console.log (error.message, error.stack);
  //     res.end ('error');
  //   } else {
  //     console.log ('Message sent: ', JSON.stringify(response));
  //     res.end ('sent');
  //   }
  // });

  console.log(`Awards after updating : ${JSON.stringify(awards)}`);
  res.render ('index', {
    data: {
      awards,
      status: {
        statusCode: 'SUCCESS',
        statusMessage: `Email was sent successfully to ${selectedAward.recipientEmailAddress}`,
      },
    },
  });
});

router.get('/hideModal', (req, res) => {
  res.render('index', {
    data: {
      awards,
      status: {
      }
    }
  });
  return res;
})
router.get('/showModal', (req, res) => {
  res.render('index', {
    data: {
      awards,
      status: {
        statusCode: 'SUCCESS',
        statusMessage: 'Showing Modal'
      }
    }
  });
  return res;
})

module.exports = router;
