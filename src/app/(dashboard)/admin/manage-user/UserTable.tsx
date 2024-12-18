import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { IUser } from "@/interface/user.interface";
import { Modalbox } from "@/components/ui_component/common/modal/Modalbox";
import { DialogClose } from "@/components/ui/dialog";
import { useBlockUser, useDeleteUser } from "@/hooks/user.hook";
import { toast } from "sonner";

const UserTable = ({ users }: { users: IUser[] }) => {
  const { mutate: deleteSingleUser } = useDeleteUser();
  const { mutate: blockSingleUser } = useBlockUser();

  const blockUser = (id: string) => {
    blockSingleUser(id, {
      onSuccess: () => {
        toast.success("User Account Status Changed");
      },
      onError: () => {
        toast.error("Something went wrong! Try again.");
      },
    });
  };
  const deleteUser = (id: string) => {
    deleteSingleUser(id, {
      onSuccess: () => {
        toast.success("User Account Status Changed");
      },
      onError: () => {
        toast.error("Something went wrong! Try again.");
      },
    });
  };
  return (
    <Table>
      <TableCaption>User management</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.userId}>
            <TableCell>
              <Image
                width={100}
                height={100}
                src={
                  user.customer?.image ||
                  user.vendor?.image ||
                  "/placeholder.png"
                }
                alt={user.customer?.name || user.vendor?.name || "User"}
                className="w-10 h-10 rounded-full object-cover"
              />
            </TableCell>
            <TableCell>
              {user.customer?.name || user.vendor?.name || "N/A"}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              {user.isBlocked ? (
                <span className="text-red-500">Blocked</span>
              ) : (
                <span className="text-green-500">Active</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Modalbox
                  btnIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                  }
                  title="Are you sure?"
                >
                  <DialogClose
                    onClick={() => blockUser(user.userId)}
                    className="bg-primary text-primary-foreground shadow hover:bg-primary/90 py-2 rounded-md "
                  >
                    Yes
                  </DialogClose>
                </Modalbox>
                <Modalbox
                  btnIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  }
                  title="Are you sure?"
                >
                  <DialogClose
                    onClick={() => deleteUser(user.userId)}
                    className="bg-primary text-primary-foreground shadow hover:bg-primary/90 py-2 rounded-md "
                  >
                    Yes
                  </DialogClose>
                </Modalbox>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
