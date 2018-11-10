var twilio = require('twilio');
twilioNumber = '+18019215345'
var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console


const formatPhoneNumber = (phoneNumber) => {
  // Twilio likes 1 in front of phone numbers
  if (phoneNumber.length === 10){
    phoneNumber = '1' + phoneNumber
  };

  return phoneNumber
}

const sendNotification = async (location, user, item) => {
  let body = '';
  switch (location) {
    case '0' :
      body = `1. ${user.firstName}, Your recent donation, ${item.name} has been used to purchase something for a Granite School District food pantry!`
      break;
      case '1' :
      body = `2. ${user.firstName}, The ${item.name} you helped by has been delivered and is now available for hungry families in the Granite School District!`
      break;
      case '2' :
      body = `3. ${user.firstName}, Someone just left the Granite School District pantry with the ${item.name} you supplied! Thank you for your help!`
      break;

  }
  const client = new twilio(accountSid, authToken);
  const formattedPhoneNumber = formatPhoneNumber(user.phone);

  client.messages.create({
      body,
      to: `+${formattedPhoneNumber}`,  // Person being notified
      from: twilioNumber, // JUMP hackathon Twilio account number
  })
  .then((message) => {
    console.log(`Notification to ${user.phone} succeeded: ${message.sid}`)
    return
  })
  .catch(err => {
    console.log(err)
    throw err
  });
}

module.exports = {
  sendNotification
};