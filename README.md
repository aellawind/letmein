# letmein

Sometimes you just don't have the time to answer your phone when guests ring you via your building doorking. With Twilio ML it's incredibly easy to add a few short scripts to simplify guest admittance. Let guests in automatically, or ask for a passcode first. You can even get their names and send a notification to your phone.

This repo consists of a set of scripts that hold the 'runtime functions' that implement a fancy doorking setup in which the door code calls the Twilio phone number, which then triggers these functions.

Here is the order of operations:
- Guest enters apartment code on lobby doorking (ex: 100)
- Code is eventually routed to the Twilio number (note: it may be a good idea to first route to a Google Voice number, which forwards calls to the Twilio number, as a fallback in case Twilio stops working and you want to be able to answer the calls via Google Voice)
- Code hits main.js

From here there are several environmental variables that are set:
- AMIRA_PHONE_NUMBER => My personal cell to text with notifications or forward calls to
- GET_INFORMATION => Set to '1' if we want to get the guest's information, which is just their name currently
- PASSCODE_REQUIRED => Set to '1' if we want to require a passcode from the guest in order to be able to enter
- PASSCODE => Above's passcode
- SKYPE_DOORKING_TEST => The number of the doorking that is calling, since we should route any other numbers straight to your cell phone number (this variable will change later post-testing)

There are various flows that can happen:
1. Automatically let guest in
2. Ask for guest's name then let them in
3. Ask for a passcode then let the guest in
4. Ask for a passcode and then the guest name and then let the guest in

Letting a guest in will always send a text message to the specified number(s).