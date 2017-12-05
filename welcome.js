exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.VoiceResponse();
    let amiraPhoneNumber = context.AMIRA_PHONE_NUMBER;
    let callerName = event.SpeechResult || null;
    let notification = 'You have a guest';

    if (callerName) {
        twiml.say(callerName);
        notification = notification + ' named ' + callerName;
    }
    twiml.say('Welcome to Ameera and Teddy\'s place');

    // Should play the 9 key to let people in.
    // Maybe replace with digits and see if that works.
    twiml.play('/assets/9.mp3');
    twiml.play(null, {digits: 9});

    // Notify the relevant parties
    twiml.sms(notification, {to: '12035074786'});

    callback(null, twiml);
};