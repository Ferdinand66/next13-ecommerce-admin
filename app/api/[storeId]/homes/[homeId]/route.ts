import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { homeId: string } }
) {
  try {
    if (!params.homeId) {
      return new NextResponse("Home id es requerido", { status: 400 });
    }

    const home = await prismadb.home.findUnique({
      where: {
        id: params.homeId,
      },
    });

    return NextResponse.json(home);
  } catch (error) {
    console.log("[HOME_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { homeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("No autheticado", { status: 403 });
    }

    if (!params.homeId) {
      return new NextResponse("Home id es requerido", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("No autorizado", { status: 405 });
    }

    const home = await prismadb.home.delete({
      where: {
        id: params.homeId,
      },
    });

    return NextResponse.json(home);
  } catch (error) {
    console.log("[HOME_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { homeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("No autenticado", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Etiqueta es requerido", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("URL de la imagen es requerido", { status: 400 });
    }
    if (!params.homeId) {
      return new NextResponse("Home id es requerido", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("No autorizado", { status: 405 });
    }

    const home = await prismadb.home.update({
      where: {
        id: params.homeId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(home);
  } catch (error) {
    console.log("[HOME_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
