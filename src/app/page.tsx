"use client";
import { User } from "@/__types__/user";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import UserDeleteModal from "@/components/UserDeleteModal";
import UserFormModal from "@/components/UserFormModal";
import UserList from "@/components/UserList";
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUsers,
} from "@/queries/user";
import { ListFilter } from "lucide-react";
import React, { useState } from "react";

export default function Home() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading, error } = useUsers();
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();

  const updateUserSubmit = (user: User) => {
    updateUser(user, {
      onSuccess: () => {
        toast({
          title: "User updated successfully",
        });
        handleModal(false);
        setSelectedUser(undefined);
      },
      onError: () => {
        toast({
          title: "An error occurred while updating user",
        });
      },
    });
  };

  const addUserSubmit = (user: User) => {
    createUser(user, {
      onSuccess: () => {
        handleModal(false);
        toast({
          title: "User created successfully",
        });
      },
      onError: () => {
        toast({
          title: "An error occurred while creating user",
        });
      },
    });
  };

  const handleModal = (state: boolean) => {
    setIsModalOpen(state);
  };

  const handleDeleteModal = (state: boolean) => {
    setIsDeleteModalOpen(state);
  };

  const editUser = (user: User) => {
    handleModal(true);
    setSelectedUser(user);
  };

  const openDeleteUserModal = (user: User) => {
    handleDeleteModal(true);
    setSelectedUser(user);
  };

  const deleteUserSubmit = () => {
    deleteUser(selectedUser!.id, {
      onSuccess: () => {
        handleDeleteModal(false);
        toast({
          title: "User deleted successfully",
        });
        setSelectedUser(undefined);
      },
      onError: () => {
        toast({
          title: "An error occurred while deleting user",
        });
      },
    });
  };

  const filteredUsers = data?.filter((user: User) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <main className="flex min-h-screen flex-col">
      <div className="text-gray-400 text-sm mt-5 mb-5">
        <p>Settings / Users & Roles Settings</p>
      </div>

      <div className="mb-5">
        <h1 className="font-bold text-2xl mb-2">Users & Roles</h1>
        <p className="text-gray-400">Manage all users in your business</p>
      </div>

      <div className="p-4 flex justify-between items-center bg-white">
        <div className="flex gap-4">
          <Input
            placeholder="Search...."
            className="h-10"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline" className="border-gray-200">
            <ListFilter className="mr-2" /> Filter
          </Button>
        </div>

        <Button
          onClick={() => {
            setSelectedUser(undefined);
            handleModal(true);
          }}
        >
          Add user
        </Button>
      </div>

      {isLoading && <Loading className="mt-5" />}
      {error && <Error className="mt-5" />}
      {data && data.length === 0 && (
        <div className="flex justify-center items-center h-32">
          <p>No users found</p>
        </div>
      )}

      {data && data.length > 0 && (
        <React.Fragment>
          <UserList
            users={filteredUsers}
            openDeleteUserModal={openDeleteUserModal}
            editUser={editUser}
          />
        </React.Fragment>
      )}

      <UserFormModal
        isModalOpen={isModalOpen}
        handleModal={handleModal}
        addUser={addUserSubmit}
        updateUser={updateUserSubmit}
        existingUser={selectedUser}
      />

      <UserDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={handleDeleteModal}
        deleteUser={deleteUserSubmit}
      />
    </main>
  );
}
