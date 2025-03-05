import transporter from "./nodeMailer";

const sendOtp = async(email: string, password: string)=>{

    transporter.sendMail({
        from: process.env.EMAIL_USER, // sender address
        to: email, // list of receivers
        subject: "Constraction Site Management Welcome Mail",
        text: `Your Password is: ${password}. Please use this code to login.`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
                <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; text-align: center;">
                    <h2 style="color: #333;">Contraction Site Management</h2>
                    <p style="color: #555;">Use the following password and email to log:</p>
                    <h3 style="color: #007bff; font-size: 24px; margin: 10px 0;">password: ${password}, email: ${email}</h3>
                    <p style="color: #888;">This is for login. Please do not share it with anyone.</p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="color: #999; font-size: 12px;">If you did not request this credantials, please ignore this email.</p>
                </div>
            </div>
        `
      });

    console.log('Password sended to users', password)

}


export default sendOtp


