'use client'
import { useState } from 'react'
import Image from 'next/image'
import { title } from 'process'
import { coinFromChain } from '@/lib/utils/chain'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

interface Donation {
  id: string
  created: Date
  initiative: {
    title: string
  }
  organization: {
    name: string
  }
  amount: string
  chain: string
  storyId: string
  image: string
}

interface DonationHeader extends Omit<Donation, 'initiative' | 'organization'> {
  initiative: string
  organization: string
}

type Dictionary = { [key: string]: any }

export default function TableDonationsSort(props: Dictionary) {
  const donations: Donation[] = props?.donations || []

  const records = donations.map((rec) => {
    return {
      id: rec.id,
      created: rec.created,
      initiative: rec.initiative.title,
      organization: rec.organization.name,
      amount: rec.amount,
      chain: rec.chain,
      storyId: rec.storyId,
      image: rec.storyId ? '/media/icon-story.svg' : ''
    }
  })

  const [data, setData] = useState(records)
  const [sorting, setSorting] = useState<SortingState>([])

  const columnHelper = createColumnHelper<DonationHeader>()

  const columns = [
    columnHelper.accessor('created', {
      header: 'Date',
      cell: (info) => new Date(info.getValue().toString()).toLocaleString(),
    }),
    columnHelper.accessor('initiative', {
      header: 'Initiative',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('organization', {
      header: 'Organization',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('chain', {
      header: 'Chain',
      cell: (info) => coinFromChain(info.getValue()).toUpperCase(),
    }),
    columnHelper.accessor('image', {
      header: 'Impact',
      cell: (info) => info.getValue()
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  const allRows = table.getRowModel().rows

  function NoRows(){
    return (
      <TableRow>
        <TableCell className="col-span-5">No donations found</TableCell>
      </TableRow>
    )
  }

  function AllRows(){
    return allRows.map((row) => {
      return (
        <TableRow key={row.id}>
          {row.getVisibleCells().map((cell) => {
            return (
              <TableCell key={cell.id}>
                { (cell?.column?.id=='image' && cell?.getValue()!='')
                  ? (<Image src={cell?.getValue() as string} width={20} height={20} alt="NFT" />)
                  : flexRender(cell.column.columnDef.cell, cell.getContext())
                }
              </TableCell>
            )}
          )}
        </TableRow>
      )
    })
  }

  return (
    <Table id="table-donations" className="w-full">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : (
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                      onClick: header.column.getToggleSortingHandler()
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc:  ' ↑',
                      desc: ' ↓',
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        { allRows.length ? <AllRows /> : <NoRows /> }
      </TableBody>
    </Table>
  )
}
