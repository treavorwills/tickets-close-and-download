const request = require('request');
require('dotenv').config();

const apiKey = process.env.FRESHDESK_API_KEY;
const domain = process.env.FRESHDESK_DOMAIN;
const ticketId = 245861;

var fields = {
    'status': 5, // set status to 'closed'
    'type': 'TMS Load Notes', // update type
    'responder_id': 73017082192,
    'type': 'Reports - TMS/DOMO'
}

const options = {
    url: `https://${domain}.freshdesk.com/api/v2/tickets/${ticketId}`,
    method: 'PUT',
    auth: {
      user: apiKey,
      pass: 'x'
    },
    json: fields
  };

// Send the API request to retrieve the matching ticket
request.put(options, (error, response, body) => {
    if (error) {
        console.error('Error:', error);
    } else if (response.statusCode !== 200) {
        console.error('Status:', response.statusCode, body);
    } else {
        console.log(`Ticket ${ticketId} closed.`)
    }
});
  
