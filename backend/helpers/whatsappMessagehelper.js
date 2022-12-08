import axios from 'axios';

function sendMessage(data) {
  var config = {
    method: 'post',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return axios(config);
}

function getTextMessageInput(recipient, text) {
  return JSON.stringify({
    messaging_product: 'whatsapp',
    preview_url: false,
    recipient_type: 'individual',
    to: recipient,
    type: 'text',
    text: {
      body: text,
    },
  });
}

function getEnrollmentTemplatedMessage(recipient, course, author) {
  return JSON.stringify({
    messaging_product: 'whatsapp',
    to: recipient,
    type: 'template',
    template: {
      name: 'course enrollment',
      language: {
        code: 'en_US',
      },
      components: [
        {
          type: 'header',
          parameters: [
            {
              type: 'image',
              image: {
                link: `${course.thumbnail} !== '' ? ${course.thumbnail} : 'https://cdn.elearningindustry.com/wp-content/uploads/2020/07/virtual-classroom-software-for-remote-teams.jpg'`,
              },
            },
          ],
        },
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: course.title,
            },
            {
              type: 'text',
              text: `By ${author.fullname}`,
            },
          ],
        },
      ],
    },
  });
}

function getAssignmentTemplatedMessage(recipient, assignment, author) {
  return JSON.stringify({
    messaging_product: 'whatsapp',
    to: recipient,
    type: 'template',
    template: {
      name: 'course assignment',
      language: {
        code: 'en_US',
      },
      components: [
        {
          type: 'header',
          parameters: [
            {
              type: 'image',
              image: {
                link: 'https://homeworkmaven.com/wp-content/themes/maven/assets/images/writer_sample_icon.jpg',
              },
            },
          ],
        },
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: 'You have an assignment!',
            },
            {
              type: 'text',
              text: assignment.title,
            },
            {
              type: 'text',
              text: `By ${author.fullname}`,
            },
          ],
        },
      ],
    },
  });
}

module.exports = {
  sendMessage,
  getTextMessageInput,
  getEnrollmentTemplatedMessage,
  getAssignmentTemplatedMessage,
};
