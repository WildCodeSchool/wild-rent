import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface UserTableProps {
  columns: {
    accessorKey: string;
    header: string;
  }[];
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    created_at: string;
    role: string;
  }[];
}

export function UserTable({ columns, data }: UserTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableHead key={column.accessorKey}>{column.header}</TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody className="text-gray-600">
          {data.map((item) => {
            return (
              <TableRow key={item.id} className="hover:bg-gray-100">
                <TableCell className="py-4">{item.id}</TableCell>
                <TableCell>{item.last_name}</TableCell>
                <TableCell>{item.first_name}</TableCell>
                <TableCell>
                  <Badge
                    variant={"outline"}
                    className={`${
                      item.role === "ADMIN"
                        ? "bg-green/30"
                        : item.role === "SUPER_ADMIN"
                        ? "bg-blue/30"
                        : ""
                    }`}
                  >
                    {item.role}
                  </Badge>
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone_number}</TableCell>
                <TableCell>{formatDate(item.created_at)}</TableCell>
                <TableCell>
                  <Button variant={"ghost"} className="hover:cursor-pointer">
                    <MdOutlineModeEdit size={25} className="text-green" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant={"ghost"} className="hover:cursor-pointer">
                    <RiDeleteBin6Line size={20} className="text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
