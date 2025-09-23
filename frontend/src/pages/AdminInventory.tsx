import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GetInventoryByOptionsQuery,
  useGetInventoryByOptionsQuery,
} from "@/generated/graphql-types";
import { useCallback, useEffect, useMemo, useState } from "react";

type OptionInventoryType =
  GetInventoryByOptionsQuery["getInventoryByOptions"][number];

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getAllDates(
  start: string,
  end: string
): { iso: string; day: string; month: string }[] {
  const dates: { iso: string; day: string; month: string }[] = [];
  let current = new Date(start);
  const last = new Date(end);

  const monthFormatter = new Intl.DateTimeFormat("fr-FR", { month: "short" });

  while (current <= last) {
    const iso = current.toISOString().split("T")[0]; // YYYY-MM-DD
    const day = String(current.getDate()).padStart(2, "0");
    const month = monthFormatter.format(current).replace(".", ""); // retire le point
    dates.push({ iso, day, month });
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export function AdminInventory() {
  const today = new Date();
  const end = new Date();
  end.setDate(today.getDate() + 7);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(end);
  const allDates = useMemo(() => {
    return getAllDates(formatDate(startDate), formatDate(endDate)) ?? [];
  }, [startDate, endDate]);
  // const allDates = getAllDates(formatDate(startDate), formatDate(endDate));

  console.log("allDates:", allDates);

  const { data, refetch } = useGetInventoryByOptionsQuery({
    variables: {
      endDate: formatDate(endDate) ?? "",
      startDate: formatDate(startDate) ?? "",
    },
    skip: !startDate || !endDate,
    onCompleted: () => {
      console.log("COMPLETED");
    },
    onError: () => {
      console.log("ERREUR");
    },
  });

  const optionInventory = data?.getInventoryByOptions ?? [];

  const staticColumns: ColumnDef<OptionInventoryType>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Id
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue("id")}</div>,
      },
      {
        accessorKey: "product",
        header: "Produit",
        cell: ({ row }) => (
          <div className="max-w-[130px] text-wrap">
            {row.getValue("product")}
          </div>
        ),
      },
      {
        accessorKey: "option",
        header: "Option",
        cell: ({ row }) => <div>{row.getValue("option")}</div>,
      },
      {
        accessorFn: (row) => row.category?.title,
        id: "category",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Catégorie
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue("category")}</div>,
      },
      {
        accessorKey: "totalQty",
        header: () => {
          return <div className="max-w-10 text-wrap">Qté totale</div>;
        },
        cell: ({ row }) => <div>{row.getValue("totalQty")}</div>,
      },
    ],
    []
  );

  const handleDecrementDate = useCallback(() => {
    setStartDate((prev) => {
      const newStart = new Date(prev);
      newStart.setDate(newStart.getDate() - 1);
      return newStart;
    });
    setEndDate((prev) => {
      const newEnd = new Date(prev);
      newEnd.setDate(newEnd.getDate() - 1);
      return newEnd;
    });
  }, []);

  const handleIncrementDate = useCallback(() => {
    setStartDate((prev) => {
      const newStart = new Date(prev);
      newStart.setDate(newStart.getDate() + 1);
      return newStart;
    });
    setEndDate((prev) => {
      const newEnd = new Date(prev);
      newEnd.setDate(newEnd.getDate() + 1);
      return newEnd;
    });
  }, []);

  const changeDatesColumns: ColumnDef<OptionInventoryType>[] = useMemo(
    () => [
      {
        accessorKey: "decrement_date",
        id: "arrowsLeft",
        header: () => {
          return (
            <Button
              variant="ghost"
              className="w-5 hover:cursor-pointer"
              onClick={handleDecrementDate}
            >
              <ChevronLeft />
            </Button>
          );
        },
        cell: () => null,
      },
      {
        accessorKey: "increment_date",
        id: "arrowsRight",
        header: () => {
          return (
            <Button
              variant="ghost"
              className="w-5 hover:cursor-pointer"
              onClick={handleIncrementDate}
            >
              <ChevronRight />
            </Button>
          );
        },
        cell: () => null,
      },
    ],
    []
  );

  const dateColumns: ColumnDef<OptionInventoryType>[] = useMemo(
    () =>
      allDates.map((date) => {
        const columnId = `${date.day}-${date.month}`;

        return {
          id: columnId,
          header: () => {
            return (
              <div key={columnId} className="flex flex-col items-center">
                <div>{date.month}</div>
                <div>{date.day}</div>
              </div>
            );
          },
          cell: ({ row }) => {
            const rowData = row.original;
            const reservedOnDate = rowData.reservations.find(
              (reservation) => reservation.date.split("T")[0] === date.iso
            );
            const reservedQty = reservedOnDate
              ? reservedOnDate.reservedQty
              : rowData.totalQty;
            const availableQty = reservedOnDate
              ? reservedOnDate.availableQty
              : rowData.totalQty;

            return (
              <div
                className="flex justify-center"
                key={`${rowData.id}-${columnId}`}
              >
                <div
                  className={`w-6 text-center ${
                    availableQty === 0 ? "bg-red-600/50" : "bg-yellow-600/50"
                  } `}
                >
                  {reservedQty}
                </div>
                <div className=" w-6 text-center bg-green/50">
                  {availableQty}
                </div>
              </div>
            );
          },
        };
      }),
    [allDates]
  );

  const columns = useMemo(
    () => [
      ...staticColumns,
      changeDatesColumns[0],
      ...dateColumns,
      changeDatesColumns[1],
    ],
    [dateColumns, staticColumns]
  );

  const table = useReactTable({
    data: optionInventory,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full px-4">
      <h1 className="font-bold text-lg md:text-xl lg:text-2xl"> Inventaire</h1>

      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Chercher un produit..."
          value={(table.getColumn("product")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("product")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 w-full justify-between">
            <p className="text-sm">Quantité réservée:</p>
            <div className="h-5 w-6 bg-yellow-600/50"></div>
          </div>
          <div className="flex items-center gap-2 w-full justify-between">
            <p className="text-sm">Quantité disponible:</p>
            <div className="h-5 w-6 bg-green/50"></div>
          </div>
        </div>
      </div>

      <div className="rounded-md border max-h-[500px] 2xl:max-h-[700px] overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`sticky top-0 z-10 bg-white ${
                        header.id === "arrowsLeft" ||
                        header.id === "arrowsRight"
                          ? "px-0"
                          : ""
                      }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
