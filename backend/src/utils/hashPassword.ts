import bcrypt from 'bcrypt';

const hashPassword = async(password: string): Promise<string | undefined> => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

export default hashPassword