import { prisma } from "@/common/prisma/prisma";

export const getAllUsers = async (where) => {
  try {
    return prisma.user.findMany({
      where: { deletedAt: null, ...where },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        deletedAt: true,
      },
    });
  } catch (error) {
    throw new Error("internal server error");
  }
};

export const getUser = async (where) => {
  try {
    return prisma.user.findUnique({
      where: { deleteAt: null, ...where },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        deletedAt: true,
      },
    });
  } catch (error) {
    throw new Error("internal server error");
  }
};

export const createUser = async (data) => {
  try {
    return prisma.user.create({ data });
  } catch (error) {
    throw new Error("internal server error");
  }
};

export const updateUser = async (id, data) => {
  try {
    return prisma.user.update({ where: { id }, data });
  } catch (error) {
    throw new Error("internal server error");
  }
};

export const deleteUser = async (id) => {
  try {
    return prisma.user.update({
      where: { id },
      data: { deleteAt: new Date() },
    });
  } catch (error) {
    throw new Error("internal server error");
  }
};
