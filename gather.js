exports.handler = function(context, event, callback) {
	let twiml = new Twilio.twiml.VoiceResponse();
	let amiraPhoneNumber = context.AMIRA_PHONE_NUMBER;

	twiml.gather({
		input: 'speech',
		action: '/welcome',
        speechTimeout: 1
	})
        .say('Please state your name.');

	callback(null, twiml);
};


