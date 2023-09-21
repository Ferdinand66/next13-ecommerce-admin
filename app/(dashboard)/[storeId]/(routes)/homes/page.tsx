import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { HomeColumn } from "./components/columns"
import { HomeClient } from "./components/client";

const HomesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const homes = await prismadb.home.findMany({
    where: {
      storeId: params.storeId 
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedHomes: HomeColumn[] = homes.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <HomeClient data={formattedHomes} />
      </div>
    </div>
  );
};

export default HomesPage;
