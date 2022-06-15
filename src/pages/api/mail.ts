import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { EmailData } from '@sendgrid/helpers/classes/email-address';
import sgMail from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'POST') {
        sgMail.setApiKey(process.env.SENDGRID_KEY as string);
        const msg: MailDataRequired = {
            to: process.env.TO_EMAIL,
            from: process.env.FROM_EMAIL as EmailData,
            subject: req.body.subject,
            text: 'お問合せを受け付けました。\n\nEmail: ' + req.body.email + '\n\nMessage: ' + req.body.message,
            html: 'お問合せを受け付けました。\n\nEmail: ' + req.body.email + '\n\nMessage: ' + req.body.message,
        };

        try {
            await sgMail.send(msg);
            res.status(200).json(msg);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    } else {
        res.status(200).json({ result: 'ok' })
    }
}
