const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);
const fromEmail = "faisal.alshawa@kayamapp.com";

const forgotPasswordTemplate = "d-76a7f1f9e2ea49f88254d7a5fb27c001";
const forgotPasswordEmail = (email, url) => {
  const msg = {
    to: email,
    from: fromEmail,
    subject: "Reset Your Password!",
    templateId: forgotPasswordTemplate,
    dynamicTemplateData: {
      resetPassword: url,
    },
  };
  sgMail
    .send(msg)
    .then((e) => {
      console.log(e);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`Error Sending Feedback Email: ${err}`);
    });
};

module.exports = { forgotPasswordEmail };
