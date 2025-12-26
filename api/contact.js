import Mailjet from "node-mailjet";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }
  if (!process.env.MJ_APIKEY_PUBLIC || !process.env.MJ_APIKEY_PRIVATE) {
    return res.status(500).json({ message: "Mailjet keys are not configured" });
  }

  try {
    const mailjet = Mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "m.vernadakis@yahoo.gr",
            Name: "Contact Form",
          },
          To: [
            {
              Email: "m.vernadakis@yahoo.gr",
              Name: "You",
            },
          ],
          Subject: "New message from your app",
          TextPart: `Name: ${name || "N/A"}\nEmail: ${email || "N/A"}\n\n${message}`,
        },
      ],
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
