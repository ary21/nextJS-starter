import { HOST } from "@/common/config/constant";
import AppLayout from "@/components/layout/AppLayout";
import AdminContent from "@/components/molecules/admin/AdminContent";

export async function getData() {
  const url = `${HOST}api/user`;
  const res = await fetch(url);
  const { data } = await res.json();
  return data;
}

const Admin = async () => {
  const users = await getData();
  return (
    <AppLayout>
      <AdminContent users={users} />
    </AppLayout>
  );
}

export default Admin;