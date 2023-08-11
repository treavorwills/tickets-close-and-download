const request = require("request");
const fs = require("fs");
require("dotenv").config();

const apiKey = process.env.FRESHDESK_API_KEY;
const domain = process.env.FRESHDESK_DOMAIN;
const downloadPath = './attachment.csv'
const ticketId = 245858;

const options = {
  url: `https://${domain}.freshdesk.com/api/v2/tickets/${ticketId}`,
  method: "GET",
  auth: {
    user: apiKey,
    pass: "x",
  },
};

// Send the API request to retrieve the matching ticket
request.get(options, function (error, response, body) {
  if (error) {
    console.error("Error:", error);
  } else if (response.statusCode !== 200) {
    console.error("Status:", response.statusCode, body);
  } else {
    const responseData = JSON.parse(body);

    if (responseData.hasOwnProperty("id")) {
      console.log(`Ticket ID: ${responseData.id}`);
      console.log(responseData.attachments[4].name);

      // download the attachment - in all cases, it's the 5th attachment, or the 4th index
      request
        .get(responseData.attachments[4].attachment_url)
        .on("error", (err) => {
          console.error("Error downloading attachment:", err);
        })
        .pipe(fs.createWriteStream(downloadPath))
        .on("close", () => {
          console.log(`Attachment downloaded to: ${downloadPath}`);
        });

    } else {
      console.log("No matching tickets found.");
    }
  }
});
