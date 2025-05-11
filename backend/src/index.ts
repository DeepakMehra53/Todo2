import { PrismaClient } from "@prisma/client";
import express,{Request,Response} from  'express'

const prisma=new PrismaClient()
const app = express()

app.use(express.json())

