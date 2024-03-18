import { HOST } from "@/common/config/constant";
import AppLayout from "@/components/layout/AppLayout";
import AdminContent from "@/components/molecules/admin/AdminContent";

export async function getData() {
  const res = await fetch(`${HOST}api/user`, {
    next: { revalidate: 0 },
    cache: "no-store",
  });
  
  const { data } = await res.json();
  console.log("cek res fetch >>>>", data.length);
  return data;
}

const Admin = async () => {
  const users = await getData();
  return (
    <AppLayout>
      <AdminContent users={users} />
    </AppLayout>
  );
};

export default Admin;
