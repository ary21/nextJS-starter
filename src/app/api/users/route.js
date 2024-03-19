export const dynamic = 'force-dynamic' // defaults to auto
// import { hash } from "bcrypt";
import { Prisma } from "@prisma/client";
import prisma from "@/common/prisma/prisma";
import * as UserService from "@/common/service/UserService";

export async function GET(req, res) {
  const users = await UserService.getAllUsers();
  return Response.json({ data: users });
}

export async function POST(req, res) {
  let errors = [];
  const { name, email, phone, role, password } = req.body;
  if (!name || !email || !phone || !password || !role) {
    errors.push("invalid input");
    return Response.json({ status: 400, errors }, { status: 400 });
  }
  if (password.length < 6) {
    errors.push("password length should be more than 6 characters");
    return Response.json({ errors }, { status: 400 });
  }

  try {
    const user = await UserService.createUser({
      data: { name, email, phone, role, password: req.body.password }, //hash(req.body.password)
    });
    return Response.json({ user }, { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return Response.json({ message: e.message }, { status: 400 });
      }
      return Response.json({ message: e.message }, { status: 400 });
    }
  }
}
