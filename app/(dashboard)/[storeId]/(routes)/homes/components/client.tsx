"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, HomeColumn } from "./columns";

interface HomeClientProps {
  data: HomeColumn[];
}

export const HomeClient: React.FC<HomeClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Homes (${data.length})`} description="Administra el home page de tu tienda" />
        <Button onClick={() => router.push(`/${params.storeId}/homes/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Nuevo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Homes" />
      <Separator />
      <ApiList entityName="homes" entityIdName="homeId" />
    </>
  );
};
