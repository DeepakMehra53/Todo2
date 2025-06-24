import { signupSchema, signinSchema } from "../validators/fromDataValidators";
import { JWT_SECRET } from "../config/default";
import { userServices } from "../services/userServices";
import { sign } from "jsonwebtoken";


export const userControllers = {
    async signup(reqBody: any) {
        const pasred = signupSchema.safeParse(reqBody)
        if (!pasred.success) return { status: 400, body: { msg: "Invalid body" } }

        const result = await userServices.signup(pasred.data)
        return result.success
            ? { status: 200, body: { success: true, token: sign({ id: result.userId }, JWT_SECRET) } }
            : { status: 409, body: { success: false, message: result.message } }
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