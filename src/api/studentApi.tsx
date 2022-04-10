import axiosClient from "./axiosClient";

const studentApi = {
  getStudents: async () => {
    const url = "/student";
    const res = await axiosClient.get(url);
    return res.data;
  },

  getStudent: async (id: Number) => {
    const url = `/student/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  updateStudent: ({ id, ...updateStudent }: { id: Number }) => {
    const url = `/student/${id}`;
    return axiosClient.put(url, updateStudent);
  },
};

export default studentApi;
