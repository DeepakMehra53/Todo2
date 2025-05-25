import bcrypt from 'bcrypt';

const saltRound = 10;
interface User{
    password:string
}

export const hashpassword =({password}:User)=>{
    const salt=bcrypt.genSaltSync(saltRound)
    return bcrypt.hashSync(password,salt)
}