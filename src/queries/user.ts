import { User } from "@/__types__/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = "https://ca95fa15d61a25b81641.free.beeceptor.com";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users`);
        return response.json();
      } catch (error) {
        throw new Error("An error occurred while fetching users");
      }
    },
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/${id}`);
        return response.json();
      } catch (error) {
        throw new Error("An error occurred while fetching an user");
      }
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: User) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
          method: "POST",
          body: JSON.stringify(user),
        });
        return response.json();
      } catch (error) {
        throw new Error("An error occurred while creating a user");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: User) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/${user.id}`, {
          method: "PUT",
          body: JSON.stringify(user),
        });
        return response.json();
      } catch (error) {
        throw new Error("An error occurred while updating this user");
      }
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
          method: "DELETE",
        });
        return response.json();
      } catch (error) {
        throw new Error("An error occurred while deleting an user");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
