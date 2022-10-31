const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async email => {
	const mail = { ...email, from: "rmatvey11@gmail.com" };
	await sgMail.send(mail);
	return true;
};

module.exports = sendEmail;
