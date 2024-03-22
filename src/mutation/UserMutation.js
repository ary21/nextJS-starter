import axios from 'axios';
import useSWR from 'swr';

export const UserMutation = (callback, pageIndex) => {
  const url = `/api/users`;
  const api = axios.create({
    baseURL: process.env.API_URL,
  });

  const fetcher = (url) => api.get(url, {
    next: { revalidate: 0 },
    cache: "no-store",
  }).then((res) => res.data);

  const { data, error, isLoading, mutate } = useSWR(`${url}?page=${pageIndex}`, fetcher, {
    onSuccess: (data, key) => {
      if (callback) callback();
    },
  });

  const createUser = async (user) => {
    if (!data) {
      return false;
    }
    const result = await api.post(url, user);
    mutate([...data.data, result.data.user]);
  };

  const updateUser = async (user) => {
    if (!data) {
      return false;
    }
    const { data: updatedUser } = await api.put(
      `${url}/${user.id}`,
      user
    );
    mutate(
      data.data.map(
        (user) => (user.id === updatedUser.id ? updatedUser : user),
        false
      )
    );
  };

  const removeUser = async (user) => {
    if (!data) {
      return false;
    }
    await api.delete(`${url}/${user.id}`);
    mutate(data.data.filter((item) => item.id === user.id, false));
  };

  return { data, error, isLoading, createUser, updateUser, removeUser };
};