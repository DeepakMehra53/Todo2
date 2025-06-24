import { userControllers } from "../controllers/userControllers";

export const userRoute =async(req:Request): Promise<Response> =>{
    const url = new URL(req.url)
    const body= await req.json()

    if (url.pathname === "/api/v1/user/signup" && req.method === "POST"){
        const result = await userControllers.signup(body);
        return new Response(JSON.stringify(result.body),{status:result.status})

    }
    if (url.pathname === "/api/v1/user/signin" && req.method === "POST") {
        const result = await userControllers.signin(body);
        return new Response(JSON.stringify(result.body), { status: result.status });
    }

    return new Response("Route Not Found", { status: 404 });
}   