export default async function handler(req, res) {
    if (req.method === 'POST') {


        const msg = {
            to: req.body.email,
            from: process.env.FROM_EMAIL,
            subject: 'お問合せありがとうございました。',
            text: 'お問合せを受け付けました。回答をお待ちください。' + req.body.message,
            html: 'お問合せを受け付けました。回答をお待ちください。' + req.body.message,
        };
        let err = await sendMail(JSON.stringify(msg))
        if (err != null) {
            res.status(200).json({ error: 'error' })
        }
    }

    res.status(200).json({ result: 'ok' })
}

const sendMail = async (msg: string) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_KEY); //SendGridのAPIキー
    try {
        await sgMail.send(msg);
        return null
    } catch (error) {
        console.error(error);
        return error
    }
}