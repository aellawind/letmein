exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.VoiceResponse()

    // Phone number that is calling
    let callerId = event.From || 'No Number';

    // Call Amira!
    let callAmira = function() {
        let phoneNumber = context.AMIRA_PHONE_NUMBER;
        let dialParams = {'callerId': callerId};

        twiml.say('Forwarding your call to Amira\'s cell');
        twiml.dial(dialParams, phoneNumber);
    }

    let greet = function() {
        twiml.say('Hello.');
        twiml.say('Welcome to Ameera and Teddy\'s place.');
    }

    // Only handle doorking type of things if it is the building
    // that is calling us, otherwise forward the call to my cell
    if (callerId === context.SKYPE_DOORKING_TEST) {
        // If passcode is required, force the guest to enter it
        if (context.PASSCODE_REQUIRED === '1') {
            switch (event.Digits) {
                case '000':
                    callAmira();
                    break;
                case '801':
                    console.log('got 801!');
                    twiml.redirect('/welcome');
                    break;
                default:
                  let gatherConfigs = {
                    numDigits: 3,
                    timeout: 15
                  };
                  twiml.gather(gatherConfigs)
                    .say('Please enter the passcode or 0, 0, 0 to call Amira');
            }
        } else {
            greet();
            twiml.play(null, {digits: 9});
        }
      } else {
            callAmira();
      }
      callback(null, twiml)
}