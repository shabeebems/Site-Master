export interface IOtp {
    otp: string;
    email: string,
    createdAt: Date;
}

export interface IOtpRepository {
    createOtp(email: string, otp: string): Promise<IOtp>;
    findOtp(email: string): Promise<IOtp | null>;
    deleteOtp(email: string): Promise<IOtp | null>;
}