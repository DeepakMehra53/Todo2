// types/express/index.d.ts
import { User } from "../../interfaces/User.type";


declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

