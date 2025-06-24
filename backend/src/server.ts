import { serve } from "bun";
import { userRoute } from "./routes/userRouter";
import { todoRouter } from "./routes/todoRouter";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "./config/default";

serve({
    port: 3000,
    fetch: async (req) => {
        const url = new URL(req.url);

       
        if (url.pathname.startsWith("/api/v1/user")) {
            return userRoute(req);
        }

      
        const auth = req.headers.get("authorization");
        if (!auth?.startsWith("Bearer ")) {
            return new Response("Unauthorized", { status: 401 });
        }

        try {
            const token = auth.split(" ")[1];
            if (!token) return new Response("Unauthorized", { status: 401 });

            const decoded = verify(token, JWT_SECRET);

            if (
                typeof decoded === "object" &&
                decoded !== null &&
                "id" in decoded &&
                typeof (decoded as any).id === "number"
            ) {
                const userId = (decoded as any).id;
                return todoRouter(req, userId);
            }

            return new Response("Invalid token payload", { status: 403 });
        } catch {
            return new Response("Invalid token", { status: 403 });
        }
    },
});




























// import { PrismaClient } from "@prisma/client";
// import { sign, verify } from 'jsonwebtoken'
// import bcrypt from 'bcrypt'
// import z from 'zod'
// import { serve, password } from 'bun';


// const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// const prisma = new PrismaClient();
// const PORT = process.env.PORT || 3000;


// const signupSchema = z.object({
//     name: z.string().min(1),
//     email: z.string().email(),
//     password: z.string().min(6)

// })

// const signinSchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(6)
// })

// serve({
//     port: 3000,
//     fetch: async (req: Request) => {
//         const url = new URL(req.url)
//         const pathname = url.pathname;
//         const method = req.method;

//         const body = await req.json();

//         if (pathname === "/api/v1/user/signup" && method === "POST") {
//             const parsed = signupSchema.safeParse(body)
//             if (!parsed.success) {
//                 return new Response(JSON.stringify({ message: "Invalid Input" }), {
//                     status: 400,
//                 })
//             }
//             const { email, password, name } = parsed.data;
//             const existingUser = await prisma.user.findUnique({ where: { email } })
//             if (existingUser) {
//                 return new Response(JSON.stringify({
//                     success: false,
//                     messgae: "User already exists,please login dude!"
//                 }), { status: 409 }
//                 );
//             }
//             const hashedPassword = await bcrypt.hash(password, 10)
//             const user = await prisma.user.create({
//                 data: {
//                     email,
//                     password: hashedPassword,
//                     name
//                 },
//             });
//             const token = sign({ id: user.id }, JWT_SECRET)
//             return Response.json({ success: true, token })
//         }

//         // Sign In
//         if (pathname === "/api/v1/user/signin" && method === "POST") {
//             const parsed = signinSchema.safeParse(body);
//             if (!parsed.success) {
//                 return new Response(JSON.stringify({ message: "Invalid Input" }), {
//                     status: 401,
//                 });
//             }

//             const { email, password } = parsed.data;
//             const user = await prisma.user.findUnique({ where: { email } });
//             if (!user) {
//                 return new Response(
//                     JSON.stringify({ message: "User not found, please signup first" }),
//                     { status: 404 }
//                 );
//             }

//             const comparePassword = await bcrypt.compare(password, user.password);
//             if (!comparePassword) {
//                 return new Response(JSON.stringify({ message: "Invalid password" }), {
//                     status: 401,
//                 });
//             }

//             const token = sign({ id: user.id }, JWT_SECRET);
//             return Response.json({ success: true, token });
//         }

//         return new Response("Route Not Found", { status: 404 });

//     },




// })


