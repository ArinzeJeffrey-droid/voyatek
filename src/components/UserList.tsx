import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { User } from "@/__types__/user";

export interface UserListProps {
  users: any[];
  openDeleteUserModal: (user: User) => void;
  editUser: (user: User) => void;
}

const badgeColors = {
  Admin: "default",
  "Sales Manager": "secondary",
  "Sales Representative": "yellow",
};

export default function UserList({
  users,
  openDeleteUserModal,
  editUser,
}: UserListProps) {
  return (
    <Table className="bg-white rounded-md">
      <TableHeader className="bg-gray-200 rounded-md">
        <TableRow className="border-gray-200 text-black">
          <TableHead>Name</TableHead>
          <TableHead>Email Address</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user.id}
            className="text-black border-gray-200 hover:opacity-75"
          >
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge
                // @ts-ignore
                variant={badgeColors[user.role]}
              >
                {user.role}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                onClick={() => editUser(user)}
                className="mr-4 text-blue-500"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                className="text-gray-500"
                size="sm"
                onClick={() => openDeleteUserModal(user)}
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
