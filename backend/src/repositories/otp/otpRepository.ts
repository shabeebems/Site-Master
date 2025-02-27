import { IOtp, IOtpRepository } from "./otpInterface"
import Otp from '../../model/otpModel'


export class OtpRepository implements IOtpRepository {

    public createOtp = async (email: string, otp: string): Promise<IOtp> => {
        return await Otp.create({ email, otp })
    }

    public findOtp = async(email: string): Promise<IOtp | null> => {
        return await Otp.findOne({ email })
    }

    public deleteOtp = async(email: string): Promise<IOtp | null> => {
        return await Otp.findOneAndDelete({ email })
    }

}