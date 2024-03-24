import * as handlebars from "handlebars";
// @ts-ignore
import nodemailer from "nodemailer";
import { NotifyMessageToCustomer } from "@/Templates/Reservation/NotifyMessageToCustomer";
import { NotifyMessageToOwner } from "@/Templates/Reservation/NotifyMessageToOwner";

type sendMailProps = {
  to: string;
  name: string;
  subject: string;
  body: string;
};

export const sendMail = async ({ to, name, subject, body }: sendMailProps) => {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();
  } catch (err: any) {
    console.error(err);
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendMailForSuccessfulReservation = (
  props: any,
  type: "customer" | "owner"
) => {
  let htmlTemplate;
  if (type === "customer") {
    htmlTemplate = handlebars?.compile(NotifyMessageToCustomer);
  } else {
    htmlTemplate = handlebars?.compile(NotifyMessageToOwner);
  }
  const updatedHtmlBody = htmlTemplate({
    ...(props || {}),
  });
  return updatedHtmlBody;
};
