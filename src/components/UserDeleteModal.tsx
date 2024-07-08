import { Trash2 } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./ui/button";

export interface UserDeleteModalProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  deleteUser(): void;
}

export default function UserDeleteModal({
  open,
  onOpenChange,
  deleteUser,
}: UserDeleteModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Delete this User</h2>
        <p className="text-sm text-gray-400 mt-1">
          This user and all associated data will be permanently removed. Do you
          wish to continue?
        </p>
        <div className="mt-4 items-center justify-center flex space-x-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={deleteUser}
          >
            <Trash2 className="mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
