var twilio = require('twilio');
twilioNumber = '+18019215345'
var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console


const purchasedMessage = 'Your recent donation has been used to purchase something for a Granite School District food pantry!'
const deliveredToPantryMessage = 'The food you helped by has been delivered and is now available for hungry families in the Granite School District!'
const pickedUpMessage = 'Someone just left the Granite School District pantry with food you supplied! Thank you for your help!'


const messaging = (notificationType) => {
  switch (notificationType) {
    case "0":
      return purchasedMessage;
    case "1":
      return deliveredToPantryMessage;
    case "2":
      return pickedUpMessage;
    default:
      throw Error('No notification type provided.')
  }
}

const formatPhoneNumber = (phoneNumber) => {

  // Twilio likes 1 in front of phone numbers
  if (phoneNumber.length === 10){
    phoneNumber = '1' + phoneNumber
  };

  return phoneNumber
}

const sendNotification = async (notificationType, notifyNumber) => {

  const client = new twilio(accountSid, authToken);
  const formattedPhoneNumber = formatPhoneNumber(notifyNumber);

  client.messages.create({
      body: messaging(notificationType),
      to: `+${formattedPhoneNumber}`,  // Person being notified
      from: twilioNumber, // JUMP hackathon Twilio account number
  })
  .then((message) => {
    console.log(`Notification to ${notifyNumber} succeeded: ${message.sid}`)
    return
  })
  .catch(err => {
    console.log(err)
    throw err
  });
}

module.exports = {
  messaging,
  sendNotification
};