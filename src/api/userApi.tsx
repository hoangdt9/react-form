import axiosClient from "./axiosClient";

const userApi = {
  getUsers: async () => {
    const url = "/user";
    const res = await axiosClient.get(url);
    return res.data;
  },

  getUser: async (id: Number) => {
    const url = `/user/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  updateUser: ({ id, ...updateuser }: { id: Number }) => {
    const url = `/user/${id}`;
    return axiosClient.put(url, updateuser);
  },
};

export default userApi;
