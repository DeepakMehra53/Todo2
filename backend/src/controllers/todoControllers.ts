import { Request,Response } from "express";
import { TodoServices } from '../services/todoServices';
import { CreateTodo,updateTodo } from "../validators/fromValidators";

const   todoServices = new  TodoServices();

