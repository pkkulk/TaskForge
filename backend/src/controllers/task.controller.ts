import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/task.schema";

export const getTasks = async (req: AuthRequest, res: Response) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId: req.userId,
    },
  });

  res.json(tasks);
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const data = createTaskSchema.parse(req.body);

    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        userId: req.userId!,
      },
    });

    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const data = updateTaskSchema.parse(req.body);

    await prisma.task.updateMany({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
      data,
    });

    res.json({ message: "Task updated" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  await prisma.task.deleteMany({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
  });

  res.json({ message: "Task deleted" });
};
