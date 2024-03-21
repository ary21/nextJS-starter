import { prisma } from "@/common/prisma/prisma";

export const getAllUsers = async (where) => {
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
};

export const getOneUser = async (where) => {
  return prisma.user.findFirst({
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
};


export const countUser = async (where) => {
  return prisma.user.count({
    where: { deletedAt: null, ...where },
  });
}

export const createUser = async (data) => {
  return prisma.user.create({ data });
};

export const updateUser = async (id, data) => {
  return prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id) => {
  return prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
