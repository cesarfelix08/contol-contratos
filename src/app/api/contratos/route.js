
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function POST(req){
// Run inside `async` function
const data = await req.json();
const contrato = await prisma.contratos.create({
    data: {
        Cliente: data.cliente,
        Fecha_inicio: new Date(data.fechaInicio),
        Fecha_fin: new Date(data.fechaFin),
        Estado: parseInt(data.estado),
        Importe: parseFloat(data.importeInicial),
    },
  })

return Response.json({data: contrato});
}