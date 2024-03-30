const { PrismaClient } = require("@prisma/client");
const { hash } = require("argon2");

const prisma = new PrismaClient();

async function main() {
  const password = await hash("test123");
  const user = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      name: "Test Admin",
      phone: "0812345",
      role: "ADMIN",
      password,
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
