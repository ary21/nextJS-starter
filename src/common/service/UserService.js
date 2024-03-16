import { prisma } from "@/common/prisma/prisma";

export const getAllUsers = async (where) => {
  try {
    return prisma.user.findMany(where);
  } catch (error) {
    throw new Error("internal server error");
  }
};

export const getUser = async (where) => {
  try {
    return prisma.user.findUnique({ where: { where, deleteAt: null } });
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
    return prisma.user.update({ where: { id }, data: { deleteAt: new Date() } });
  } catch (error) {
    throw new Error("internal server error");
  }
};
