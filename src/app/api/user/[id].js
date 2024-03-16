// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as UserService from "../@services/user";

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) {
    throw new Error("Missing id");
  }

  // PUT Update by Id request
  if (req.method === "PUT") {
    const user = await UserService.getUserById(+id);
    if (!user) {
      throw new Error("User not found");
    }

    const { name, email, phone, role } = req.body;
    const updatedUser = await UserService.updateUser(user.id, {
      name,
      email,
      phone,
      role,
    });
    res.status(200).json(updatedUser);
    // PUT Update by Id request
  } else if (req.method === "DELETE") {
    const user = await UserService.getUserById(+id);
    if (!user) {
      throw new Error("User not found");
    }

    await UserService.deleteUser(user.id);
    res.status(200).json(null);
  } else {
    // GET by Id
    const user = await UserService.getUserById(+id);
    res.status(200).json(user);
  }
}
