import { NextResponse } from 'next/server';

// Banco de dados simulado (Mock)
const bancoDeDadosOS = [
  { id: 'OS-1001', cliente: 'João Silva', aparelho: 'iPhone 13', status: 'Em Análise', previsao: '16/06/2026' },
  { id: 'OS-1002', cliente: 'Maria Souza', aparelho: 'Samsung S22', status: 'Aguardando Peça', previsao: '18/06/2026' },
  { id: 'OS-1003', cliente: 'Pedro Costa', aparelho: 'Motorola Edge', status: 'Pronto para Retirada', previsao: '15/06/2026' },
];

export async function GET(request: Request) {
  // Pega o número da OS que veio na URL (ex: /api/os?numero=OS-1001)
  const { searchParams } = new URL(request.url);
  const numeroOS = searchParams.get('numero');

  if (!numeroOS) {
    return NextResponse.json({ erro: 'Número da OS não fornecido.' }, { status: 400 });
  }

  // Busca a OS no nosso banco de dados simulado (ignorando maiúsculas/minúsculas)
  const osEncontrada = bancoDeDadosOS.find(
    (os) => os.id.toLowerCase() === numeroOS.toLowerCase()
  );

  if (osEncontrada) {
    return NextResponse.json(osEncontrada, { status: 200 });
  } else {
    return NextResponse.json({ erro: 'Ordem de Serviço não encontrada.' }, { status: 404 });
  }
}