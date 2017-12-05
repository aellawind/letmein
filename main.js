exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.VoiceResponse()

    // Phone number that is calling
    let callerId = event.From || 'No Number';
    let getInfo = context.GET_INFORMATION === '1' ? true : false;

    // Call Amira!
    let callAmira = function() {
        let phoneNumber = context.AMIRA_PHONE_NUMBER;
        let dialParams = {'callerId': callerId, 'timeLimit': 200};

        twiml.dial(dialParams, phoneNumber);
    };

    let redirectToEnter = function() {
        if (getInfo) {
            twiml.redirect('/gather');
        }
        twiml.redirect('/welcome');
    }

    // Only handle doorking type of things if it is the building
    // that is calling us, otherwise forward the call to my cell
    if (callerId !== context.SKYPE_DOORKING_TEST) {
        callAmira();
    }

    // If passcode is required, force the guest to enter it
    if (context.PASSCODE_REQUIRED === '1') {
        switch (event.Digits) {
            case '000':
                callAmira();
                break;
            case context.PASSCODE:
                redirectToEnter();
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
        redirectToEnter();
    }

    callback(null, twiml)
}
