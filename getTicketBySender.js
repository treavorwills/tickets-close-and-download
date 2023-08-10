const request = require('request');
require('dotenv').config();

const apiKey = process.env.FRESHDESK_API_KEY;
const domain = process.env.FRESHDESK_DOMAIN;
const ticketSender = process.env.SENDER;

const options = {
    url: `https://${domain}.freshdesk.com/api/v2/tickets?email=${ticketSender}`,
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
    const responseData = JSON.parse(body)
    // console.log(`Amount of tickets: ${responseData.length}`);
    console.log(`ticket ID: ${responseData[0].id}, subject: ${responseData[0].subject}`);
  }
});
