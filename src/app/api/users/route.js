export const dynamic = "force-dynamic"; // defaults to auto
// import { hash } from "bcrypt";
import * as UserService from "@/common/service/UserService";

export async function GET(req, res) {
  const users = await UserService.getAllUsers();
  return Response.json({ data: users });
}

export async function POST(req, res) {
  const { name, email, phone, role, password } = await req.json();

  if (!name || !email || !phone || !password) {
    errors.push();
    return Response.json({ message: "invalid input" }, { status: 400 });
  }

  try {
    const check = await UserService.getOneUser({ email });
    if (check) {
      return Response.json({ message: "email already exists" }, { status: 400 });
    }

    const user = await UserService.createUser(
      { name, email, phone, role: role || "ADMIN", password } // password: hash(req.body.password)
    );
    return Response.json({ user }, { status: 201 });
  } catch (err) {
    return Response.json(
      { message: err.message || "server error" },
      { status: 400 }
    );
  }
}
