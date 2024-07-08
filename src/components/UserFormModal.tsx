import { CircleUserRound } from "lucide-react";
import { Modal } from "./Modal";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { User } from "@/__types__/user";
import { useEffect, useState } from "react";
import generateUserId from "@/lib/generateUserId";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export interface UserFormModalProps {
  existingUser?: User;
  isModalOpen: boolean;
  handleModal: (state: boolean) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
}

export default function UserFormModal({
  existingUser,
  isModalOpen,
  handleModal,
  addUser,
  updateUser,
}: UserFormModalProps) {
  const [user, setUser] = useState<User>({
    id: generateUserId(),
    name: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    if (existingUser) {
      setUser(existingUser);
    }
  }, [existingUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    existingUser ? updateUser(user) : addUser(user);
    setUser({} as User);
  };

  const title = existingUser ? "Edit User" : "Create User";

  return (
    <Modal open={isModalOpen} closeButton onOpenChange={handleModal}>
      <div className="m-auto flex flex-col items-center">
        <CircleUserRound className="h-14 w-14 text-blue-500" />
        <h1>{title}</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="grid w-full items-center gap-1.5 mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="grid w-full items-center gap-1.5 mb-4">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="grid w-full items-center gap-1.5 mb-4">
          <Label htmlFor="role">Role</Label>
          <Select
            value={user.role}
            onValueChange={(e) => setUser({ ...user, role: e })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Administrator">Administrator</SelectItem>
                <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                <SelectItem value="Sales Representative">Sales Representative</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full items-center gap-1.5 mb-4">
          <Label htmlFor="role">Password</Label>
          <Input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <Button>{title}</Button>
      </form>
    </Modal>
  );
}
