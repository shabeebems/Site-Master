export const emailValidation = (email: string): boolean => {
    const check = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/
    return check.test(email)
}