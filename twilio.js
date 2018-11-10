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
      body = `1. ${user.firstName}, Your recent donation, was used to purchase 21lbs of ${item.name} for hungry youngsters in the Granite School District! Donations go 7 times further with ganite kids :)`
      break;
      case '1' :
      body = `2. ${user.firstName}, The ${item.name} you dontated has arrived at Lehi Elementary and is now available for hungry youngsters!`
      break;
      case '2' :
      body = `3. ${user.firstName}, The ${item.name} you supplied to Ganite Kids just went to feed a family of four! A huge thankyou from Ganite Kids!`
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