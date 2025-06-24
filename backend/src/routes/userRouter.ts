import { success } from "zod/v4";
import { userControllers } from "../controllers/userControllers";
import { userServices } from "../services/userServices";
import { signinSchema, signupSchema } from "../validators/fromDataValidators";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config/default";

export const userController={
    async signup (reqBody:any){
        const parsed = signupSchema.safeParse(reqBody)
        if(!parsed) return {status:400,body:{msg:"Invalid body"}}

        const result = await userServices.signup(parsed.data);
        return result.success
            ?{success:200,body:{success:true,token:sign({id:result.userId},JWT_SECRET)}}
            :{status:409,body:{success:false,message:result.message}};
    },
     async signin(reqBody: any) {
        const parsed = signinSchema.safeParse(reqBody)
        if (!parsed) return { status: 400, body: { msg: "Invalid body" } }

        const result = await userServices.signin(parsed.data);
        return result.success
            ? { success: 200, body: { success: true, token: sign({ id: result.userId }, JWT_SECRET) } }
            : { status: 409, body: { success: false, message: result.message } };
    }
}