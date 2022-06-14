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
            subject: 'お問合せありがとうございました。',
            text: 'お問合せを受け付けました。回答をお待ちください。' + req.body.message,
            html: '<p>お問合せを受け付けました。回答をお待ちください。' + req.body.message + '</p>',
        };
        console.log('req.body: ', req.body);
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
