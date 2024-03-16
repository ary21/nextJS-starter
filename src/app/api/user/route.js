import { hash } from "bcrypt";
import { Prisma } from "@prisma/client";
import prisma from "@/common/prisma/prisma";
import * as UserService from "@/common/service/UserService";

export async function GET(req, res) {
  const users = await UserService.getAllUsers();
  res.status(200).json({ data: users })
}

export async function POST(req, res) {
  let errors = [];
  const { name, email, phone, role, password } = req.body;
  if (!name || !email || !phone || !password || !role) {
    errors.push("invalid input");
    return res.status(400).json({ status: 400, errors });
  }
  if (password.length < 6) {
    errors.push("password length should be more than 6 characters");
    return res.status(400).json({ errors });
  }
  
  try {
    const user = await UserService.createUser({
      data: { name, email, phone, role, password: hash(req.body.password) },
    });
    return res.status(201).json({ user });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: e.message });
      }
      return res.status(400).json({ message: e.message });
    }
  }
}