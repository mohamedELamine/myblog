import { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

AWS.config.update({ region: 'il-central-1' });
const s3 = new AWS.S3();
const ses = new AWS.SES();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const paymentData = req.body;

    if (paymentData.payment_status === 'confirmed') {
      const email = paymentData.purchase_data.email;

      // Generate a signed URL for the PDF
      const ebookUrl = s3.getSignedUrl('getObject', {
        Bucket: 'amplify-collab-dev-03401-deployment',
        Key: 'Cryptographic Techniques for Blockchain: Theory and Practice - by Qais Alassa.pdf',
        Expires: 60 * 60 // 1 hour expiration
      });

      const emailParams = {
        Source: 'qais@qasawa.com',
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: { Data: 'Your Ebook Purchase' },
          Body: {
            Text: { Data: `Thank you for your purchase! Download your ebook here: ${ebookUrl}` },
            Html: { Data: `<p>Thank you for your purchase! Download your ebook <a href="${ebookUrl}">here</a>.</p>` }
          }
        }
      };

      await ses.sendEmail(emailParams).promise();
    }

    res.status(200).json({ status: 'success' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
