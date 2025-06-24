import { todoControllers } from "../controllers/todoControllers";

export const todoRouter = async (req:Request,userId:number):Promise<Response> =>{
    const url = new URL(req.url);
    const pathname = url.pathname;
    const method = req.method;

    if(pathname === "/api/v1/todos" && method === "POST"){
        const body = await req.json();
        const result = await todoControllers.create(body,userId)
        return new Response(JSON.stringify(result.body),{status:result.status})
    }
    if (pathname === "/api/v1/todos" && method === "GET") {
        const result = await todoControllers.get(userId);
        return new Response(JSON.stringify(result.body), { status: result.status });
    }

    if (pathname.startsWith("/api/v1/todos/") && method === "PUT") {
        const id = Number(pathname.split("/").pop());
        const body = await req.json();
        const result = await todoControllers.update(id, userId, body);
        return new Response(JSON.stringify(result.body), { status: result.status });
    }

    if (pathname.startsWith("/api/v1/todos/") && method === "DELETE") {
        const id = Number(pathname.split("/").pop());
        const result = await todoControllers.delete(id, userId);
        return new Response(JSON.stringify(result.body), { status: result.status });
    }

    return new Response("Todo Route Not Found", { status: 404 });
}