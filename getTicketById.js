const request = require('request');
require('dotenv').config();

const apiKey = process.env.FRESHDESK_API_KEY;
const domain = process.env.FRESHDESK_DOMAIN;
const sender = 'notifications@domo.com'; 
const ticketId = 245834;

const options = {
    url: `https://${domain}.freshdesk.com/api/v2/tickets/${ticketId}`,
    method: 'GET',
    auth: {
      user: apiKey,
      pass: 'x'
    }
  };

// Send the API request to retrieve the matching ticket
request.get(options, function(error, response, body) {
  if (error) {
    console.error('Error:', error);
  } else if (response.statusCode !== 200) {
    console.error('Status:', response.statusCode, body);
  } else {
    const responseData = JSON.parse(body);

    if (responseData.hasOwnProperty('id')) {
      console.log(`Ticket ID: ${responseData.id}`);
      console.log(`Subject: ${responseData.subject}`);
    } else {
      console.log('No matching tickets found.');
    }
  }
});
