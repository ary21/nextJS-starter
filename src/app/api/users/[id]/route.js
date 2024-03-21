export const dynamic = "force-dynamic"; // defaults to auto
// import { hash } from "bcrypt";
import * as UserService from "@/common/service/UserService";

export async function GET(req, { params }) {
  const user = await UserService.getOneUser({ id: +params.id });
  return Response.json({ ...user });
}

export async function PUT(req, { params }) {
  const { name, email, phone, role } = await req.json();

  if (!name || !email || !phone) {
    errors.push();
    return Response.json({ message: "invalid input" }, { status: 400 });
  }

  try {
    const user = await UserService.getOneUser({ id: +params.id });
    if (!user) {
      return Response.json({ message: "user not found" }, { status: 400 });
    }

    const check = await UserService.getOneUser({
      email,
      id: { notIn: [+params.id] },
    });
    if (check) {
      return Response.json(
        { message: "email already exists" },
        { status: 400 }
      );
    }

    const updatedUser = await UserService.updateUser(
      user.id,
      { name, email, phone, role: role || "ADMIN" }
    );
    return Response.json({ user: updatedUser }, { status: 201 });
  } catch (err) {
    return Response.json(
      { message: err.message || "server error" },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await UserService.getOneUser({ id: +params.id });
    if (!user) {
      return Response.json({ message: "user not found" }, { status: 400 });
    }
    await UserService.updateUser(user.id, { deletedAt: new Date() });
    return Response.json({}, { status: 201 });
  } catch (err) {
    return Response.json(
      { message: err.message || "server error" },
      { status: 400 }
    );
  }
}
