// components/columns.tsx
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getImageUrl } from '@/lib/utils';
import type { IProvider } from '../types/providers';

import { Link } from 'react-router-dom';

export const columns: ColumnDef<IProvider>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="cursor-pointer p-0 font-bold hover:bg-transparent"
        >
          المعرف
          <ArrowUpDown className="mr-2 h-4 w-4" />{' '}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="cursor-pointer p-0 font-bold hover:bg-transparent"
        >
          الاسم
          <ArrowUpDown className="mr-2 h-4 w-4" />{' '}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'age',
    header: () => <span className="hidden sm:inline-block">العمر</span>,
    cell: ({ row }) => (
      <span className="hidden sm:inline-block">{row.getValue('age')} سنة</span>
    ),
  },
  {
    accessorKey: 'pictureUrl',

    header: () => <span className="hidden sm:inline-block">الصورة</span>,
    cell: ({ row }) => (
      <div className="hidden items-center justify-start sm:flex">
        <img
          src={getImageUrl(row.getValue('pictureUrl'))}
          alt=""
          className="h-12 w-12 rounded-full object-cover shadow-sm ring-2 ring-slate-100"
        />
      </div>
    ),
  },
  {
    accessorKey: 'documents',
    header: 'المستندات',
    cell: ({ row }) => {
      const docs = row.original.documents;
      return (
        <div className="flex flex-wrap gap-2">
          {docs.map((doc) => (
            <a
              key={doc.id}
              href={getImageUrl(doc.url)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge
                variant="outline"
                className="text-primary border-primary bg-card/10 hover:bg-card/30 flex items-center gap-1 px-3 py-1"
              >
                <FileText className="h-3.5 w-3.5" />
                مستند {doc.id}
              </Badge>
            </a>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'الإجراءات',
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        <Link to={`/admin/craftsmen/${row.original.id}`}>
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Eye className="h-4 w-4" />
            عرض التفاصيل
          </Button>
        </Link>
      </div>
    ),
  },
];
