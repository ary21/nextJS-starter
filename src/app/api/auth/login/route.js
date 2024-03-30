import * as jose from 'jose';
// import jwt from 'jsonwebtoken';
// import { compare, hash } from "bcrypt";
// import { SHA256 as sha256 } from "crypto-js";
import prisma from "@/common/prisma/prisma";

export async function POST(req, res) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json({ message: "invalid input" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    const isPasswordValid = true;
    // await compare(
    //   password,
    //   user.password
    // )

    if (user && isPasswordValid) {
      const token = new jose.SignJWT({ sub: user.id }, 'OKE123***', {
        expiresIn: '8h',
      });

      return Response.json({ ...exclude(user, ["password"]), token });
    } else {
      return Response.json({ message: "invalid credentials" }, { status: 400 });
    }
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: e.message || "server error" },
      { status: 400 }
    );
  }
}

function exclude(user, keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}