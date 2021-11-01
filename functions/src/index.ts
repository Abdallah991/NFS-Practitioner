import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sendgrid from "@sendgrid/mail";
// import * as cors from "cors";

admin.initializeApp(functions.config().firebase);


const cors = require("cors")({origin: true});
export const sendCertificates = functions.https.onRequest(
    async (data, context) => {
      cors(data, context, async () => {
        // console.log("the data being sent is", data);
        // console.log("the context", context);

        // set send grid API
        sendgrid.setApiKey(
            "SG.XPKP_LbbTrKI1lE68yvo8A.BryzuAsaB6G44ylsFJ5sQl" +
          "-mpQsB8t9FYEImdl7Awpk"
        );

        // body of the message
        // const htmlSendEmail =
        // "<h3> Hello NFS team,</h3>" +
        // "<br>" +
        // "<p> Please find my certificates attaches below</p>";
        // // subject and sender email
        // const subject =
        // "Certificates and licenses for " +
        // data?.title +
        // " " +
        // data?.firstName +
        // " " +
        // data?.lastName;
        // // const senderEmail = data.email;

        // console.log(htmlSendEmail, "send email html");
        // console.log(subject, "subject");
        // console.log(senderEmail, "senderEmail");

        const msg = {
          to: "abdulla@fthm.me",
          from: "abdulla@fthm.me",
          subject: "test",
          text: "body",
          html: "<h1> this is a test</h1>",
          // attachments: data.attachments,
        };

        // send gird send email code
        await sendgrid
            .send(msg)
            .then((response) => {
              console.log(response);
              // console.log("the header are", response[0].headers);
            })
            .catch((error) => {
              console.error(error);
            });
      });
    }
);
