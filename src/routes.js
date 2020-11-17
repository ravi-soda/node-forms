const express = require ('express');

const {check, validationResult} = require ('express-validator/check');
const {matchedData} = require ('express-validator/filter');
const {AWARDS, RECIPIENT_LIST} = require ('./constants');
const sendEmailComponent = require ('./send-email');
let awards = AWARDS;
let recipientList = RECIPIENT_LIST;
const router = express.Router ();

router.get ('/', (req, res) => {
  res.render ('index', {
    data: {
      awards,
      recipientList: RECIPIENT_LIST,
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
  const recipientEmailAddress = reqBody.recipientEmailAddress;

  let selectedAward;
  let selectedRecipient;
  console.log (`Selected Award : ${selectedAwardId}`);
  if (!selectedAwardId) {
    console.log ('No proper award selected.');

    res.render ('index', {
      data: {
        awards,
        recipientList: RECIPIENT_LIST,
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
  console.log (`Awards after updating : ${JSON.stringify (awards)}`);
  recipientList.map(recipient => {
    if (recipient.email === recipientEmailAddress) {
      selectedRecipient = recipient;
    }
  });

  console.log ('Entering into Send Mail options', selectedAward, selectedRecipient);
  const mailOptions = sendEmailComponent.prepareMailOptions (
    selectedAward.name,
    selectedAward.subject,
    selectedAward.text,
    selectedRecipient.email,
    selectedRecipient.fName,
    selectedRecipient.lName
  );
  console.log (mailOptions);
  const response = sendEmailComponent.sendEmail (mailOptions).then(msg => {
    console.log ('Email Response', msg);
    res.send ({
      data: {
        awards,
        recipientList: RECIPIENT_LIST,
        status: {
          statusCode: 'SUCCESS',
          statusMessage: `Email was sent successfully to ${selectedAward.recipientEmailAddress}`,
        },
      },
    });
  }).catch(e => {
    console.log(e.message, e.stack);
    res.send ({
      data: {
        awards,
        recipientList: RECIPIENT_LIST,
        status: {
          statusCode: 'FAIL',
          statusMessage: `Email was NOT sent successfully to ${selectedAward.recipientEmailAddress}`,
        },
      },
    });
  });
  
  
});

router.get ('/hideModal', (req, res) => {
  res.render ('index', {
    data: {
      awards,
      recipientList: RECIPIENT_LIST,
      status: {},
    },
  });
  return res;
});
router.get ('/showModal', (req, res) => {
  res.render ('index', {
    data: {
      awards,
      recipientList: RECIPIENT_LIST,
      status: {
        statusCode: 'SUCCESS',
        statusMessage: 'Showing Modal',
      },
    },
  });
  return res;
});

module.exports = router;
