import transporter from "./nodeMailer";

const sendOtp = async(email: string, otp: string)=>{

      await transporter.sendMail({
        from: process.env.EMAIL_USER, // sender address
        to: email, // list of receivers
        subject: "Constraction Site Management Register",
        text: `Your One-Time Password (OTP) is: ${otp}. Please use this code to complete your verification process. This OTP is valid for a limited time.`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
                <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; text-align: center;">
                    <h2 style="color: #333;">Contraction Site Management</h2>
                    <p style="color: #555;">Use the following OTP to verify your account:</p>
                    <h3 style="color: #007bff; font-size: 24px; margin: 10px 0;">${otp}</h3>
                    <p style="color: #888;">This OTP is valid for a limited time. Please do not share it with anyone.</p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="color: #999; font-size: 12px;">If you did not request this OTP, please ignore this email.</p>
                </div>
            </div>
        `
      });

    console.log('Otp sended', otp)

}


export default sendOtp


