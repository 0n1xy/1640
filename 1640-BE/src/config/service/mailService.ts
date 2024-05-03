import nodemailer from "nodemailer";

var mailList: any[] = [
  "trankha.230102@gmail.com",
  
]

var managerMailList: any[] = [
  "lamlhdgcs200675@fpt.edu.vn"
]

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL_SERVICE_USER,
      pass: process.env.MAIL_SERVICE_PASSWORD,
    },
  });

export const mailOptionToCoordinator = {
    from: {
        name: "New submission",
        address: process.env.MAIL_SERVICE_USER
    },
    to: mailList,
    subject: "New submission",
    text: "A student has submitted their contribution",
 
}

export const mailOptionToManager = {
  from: {
      name: "Submission have accepted",
      address: process.env.MAIL_SERVICE_USER
  },
  to: managerMailList,
  subject: "New submission",
  text: "Coordinator have accepted student submission their contribution",

}

