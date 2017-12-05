# letmein

This repo consists of a set of scripts that hold runtime functions to implement a fancy doorking setup in which the door code calls the Twilio phone number, which then triggers these functions.

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