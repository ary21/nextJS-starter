import * as jose from "jose";
import argon2 from "argon2";
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
    const isPasswordValid = argon2.verify(user.password, password);

    if (user && isPasswordValid) {
      const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
      )
      const jwt = await new jose.SignJWT({ "urn:jwt:claim": true })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer(user.id)
        .setAudience(user.name)
        .setExpirationTime("2h")
        .sign(secret);

      return Response.json({ ...exclude(user, ["password"]), token: jwt });
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
