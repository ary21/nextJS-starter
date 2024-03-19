import axios from 'axios';
import useSWR from 'swr';

export const UserMutation = (callback) => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const fetcher = (url) => api.get(url).then((res) => res.data);

  const { data, error, mutate } = useSWR('/api/users', fetcher, {
    onSuccess: (data, key) => {
      if (callback) callback();
    },
  });

  const createUser = async (user) => {
    if (!data) {
      return false;
    }
    const result = await api.post('/users', user);
    mutate([...data, result.data]);
  };

  const updateUser = async (user) => {
    if (!data) {
      return false;
    }
    const { data: updatedUser } = await api.patch(
      `/users/${user.id}`,
      user
    );
    mutate(
      data.map(
        (user) => (user.id === updatedUser.id ? updatedUser : user),
        false
      )
    );
  };

  const removeUser = async (user) => {
    if (!data) {
      return false;
    }
    await api.delete(`/api/users/${user.id}`);
    mutate(data.filter((item) => item.id === user.id, false));
  };

  return { data, error, createUser, updateUser, removeUser };
};