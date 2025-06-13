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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useDeleteUserMutation } from "@/generated/graphql-types";
import { useState } from "react";

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
  const [deleteUserMutation] = useDeleteUserMutation();

  const [deleteMessage, setDeleteMessage] = useState("");

  const deteleUser = async (id: number) => {
    try {
      const response = await deleteUserMutation({
        variables: { deleteUserId: id },
      });
      if (response.data?.deleteUser) {
        setDeleteMessage(response.data.deleteUser);
      } else {
        setDeleteMessage(
          "Une erreur est survenue, veuillez réessayer plus tard"
        );
      }
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

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
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant={"ghost"}
                        className="hover:cursor-pointer"
                        onClick={() => setDeleteMessage("")}
                      >
                        <RiDeleteBin6Line size={20} className="text-red-600" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center gap-5">
                      {!deleteMessage ? (
                        <DialogHeader>
                          <DialogTitle className="flex flex-col items-center gap-4">
                            <div>
                              Êtes-vous certain de vouloir supprimer cet
                              utilisateur:
                            </div>
                            <p className="text-green">
                              {item.first_name} {item.last_name}
                            </p>
                          </DialogTitle>
                          <DialogDescription className="text-center mt-5">
                            <div>
                              Cette action est irréversible. Elle entraînera la
                              suppression définitive du compte ainsi que
                              l’effacement des données de nos serveurs.
                            </div>
                            <Button
                              onClick={() => deteleUser(item.id)}
                              variant={"destructive"}
                              className="mt-5"
                            >
                              Confirmer
                            </Button>
                          </DialogDescription>
                        </DialogHeader>
                      ) : (
                        <DialogHeader>
                          <DialogTitle>{deleteMessage}</DialogTitle>
                        </DialogHeader>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
