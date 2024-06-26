import argon2 from 'argon2';
import * as UserService from "@/common/service/UserService";

export async function GET(req, res) {
  const skip = +req.nextUrl.searchParams.get("page") || 0;
  const take = +req.nextUrl.searchParams.get("limit") || 5;
  const users = await UserService.getAllUsers({}, skip, take);
  const total = await UserService.countUser();
  return Response.json({ data: users, total });
}

export async function POST(req, res) {
  const { name, email, phone, role, password } = await req.json();

  if (!name || !email || !phone || !password) {
    return Response.json({ message: "invalid input" }, { status: 400 });
  }

  try {
    const check = await UserService.getOneUser({ email });
    if (check) {
      return Response.json(
        { message: "email already exists" },
        { status: 400 }
      );
    }
    
    const trimmedPassword = String(password).trim();
    const hashedPassword = await argon2.hash(trimmedPassword);
    const user = await UserService.createUser({
      name,
      email,
      phone,
      role: role || "ADMIN",
      password: hashedPassword,
    });
    return Response.json({ user }, { status: 201 });
  } catch (err) {
    return Response.json(
      { message: err.message || "server error" },
      { status: 400 }
    );
  }
}
