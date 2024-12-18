"use client";
import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrder } from "@/interface/order.interface";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";
import { useUpdateOrder } from "@/hooks/order.hook";
import { toast } from "sonner";

const OrderTable = ({
  orderData,
  action = false,
}: {
  orderData: IOrder[];
  action?: boolean;
}) => {
  const path = usePathname();
  const userData = useContext(AuthContext);
  const { mutate } = useUpdateOrder();
  const handleSelectChange = (orderId: string, value: string) => {
    if (value !== "not") {
      mutate(orderId, {
        onSuccess: () => {
          toast.success("Status updated.");
        },
        onError: () => {
          toast.error("Something went wrong!");
        },
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Transaction ID</TableHead>
          {userData?.user?.role == "ADMIN" ||
            (userData?.user?.role == "SUPERADMIN" && (
              <TableHead className="">Email</TableHead>
            ))}

          <TableHead>Payment Status</TableHead>
          <TableHead className="min-w-[150px]">Items</TableHead>
          <TableHead className="text-right">Subtotal</TableHead>
          <TableHead>Status</TableHead>
          {action && (
            <>
              {" "}
              {userData?.user?.role == "ADMIN" ||
                (userData?.user?.role == "SUPERADMIN" && (
                  <TableHead className="">Action</TableHead>
                ))}
            </>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderData.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">
              <Link href={`${path}/${order.id}`}>{order.transactionId}</Link>
            </TableCell>
            {userData?.user?.role == "ADMIN" ||
              (userData?.user?.role == "SUPERADMIN" && (
                <TableCell className="text-right">
                  ${order.customer?.email}
                </TableCell>
              ))}

            <TableCell>{order.paymentStatus}</TableCell>
            <TableCell className="">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-2 mb-1">
                  <Image
                    width={100}
                    height={100}
                    src={item?.product?.images[0]}
                    alt={item?.product?.name}
                    className="w-10 h-10 rounded"
                  />
                  <span className="text-sm font-medium">
                    {item?.product?.name}
                  </span>
                </div>
              ))}
            </TableCell>
            <TableCell className="text-right">
              ${order.subTotal.toFixed(2)}
            </TableCell>
            <TableCell>{order.status}</TableCell>
            {action && (
              <>
                {" "}
                {userData?.user?.role == "ADMIN" ||
                  (userData?.user?.role == "SUPERADMIN" && (
                    <TableCell className="text-right">
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange(order.id, value)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not">Update Status</SelectItem>
                          <SelectGroup>
                            <SelectItem
                              disabled={
                                order.status === "ONGOING" ||
                                order.status === "DELIVERED"
                              }
                              value="ONGOING"
                            >
                              {" "}
                              ONGOING
                            </SelectItem>
                            <SelectItem
                              value="DELIVERED"
                              disabled={
                                order.status === "DELIVERED" ||
                                order.status === "PENDING"
                              }
                            >
                              DELIVERED
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  ))}
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>A list of your recent transactions.</TableCaption>
    </Table>
  );
};

export default OrderTable;
