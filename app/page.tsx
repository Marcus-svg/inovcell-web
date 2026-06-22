"use client";
import React, { useState, useEffect } from 'react';

// Catálogo de serviços
const serviçosInovCell = [
  {
    id: 'tela',
    título: 'Troca de Tela',
    descrição: 'Telas premium com calibração de cor perfeita e prova social de antes e depois.',
    imagens: [
      '/images/servico-tela-antes.png',
      '/images/servico-tela-depois.png'
    ], 
    mensagemWhatsApp: 'Olá! Gostaria de um orçamento para Troca de Tela.'
  },
  {
    id: 'bateria',
    título: 'Troca de Bateria',
    descrição: 'Baterias de alta capacidade para o seu aparelho durar o dia todo.',
    imagemStatic: '/images/servico-bateria.png', 
    mensagemWhatsApp: 'Olá! Gostaria de um orçamento para Troca de Bateria.'
  },
  {
    id: 'placa',
    título: 'Reparo em Placa',
    descrição: 'Diagnóstico avançado e reparos em microeletrônica.',
    imagemStatic: '/images/servico-placa.jpg', 
    mensagemWhatsApp: 'Olá! Gostaria de um orçamento para Reparo em Placa.'
  }
];

// Configuração Responsiva de Fundo Otimizado
const fundosOtimizados = [
  {
    mobile: '/images/fundo_mobile_otimizado1.webp', // Nova imagem mobile limpa e escura
    desktop: '/images/fundo_desktop_otimizado1.jpg', // Nova imagem desktop panorâmica
    alt: 'Fachada Profissional InovCell'
  },
];

export default function Home() {
  const [numeroOS, setNumeroOS] = useState('');
  const [resultado, setResultado] = useState<any>(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const [tick, setTick] = useState(0);
  const [fundoIndex, setFundoIndex] = useState(0);

  useEffect(() => {
    // Temporizador global para slideshows (3 segundos)
    const intervalGlobal = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(intervalGlobal);
  }, []);

  const buscarOS = async () => {
    if (!numeroOS) return;
    setCarregando(true);
    setErro('');
    setResultado(null);
    try {
      const response = await fetch(`/api/os?numero=${numeroOS}`);
      const data = await response.json();
      if (response.ok) {
        setResultado(data);
      } else {
        setErro(data.erro);
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor.');
    } finally {
      setCarregando(false);
    }
  };

  const numeroWhatsApp = "5563984635223";

  return (
    // Removido bg-brand-dark, usando o fundo das imagens
    <main className="min-h-screen text-white font-sans relative selection:bg-[#00A859] selection:text-white bg-black">
      
      {/* CAMADA DE FUNDO GLOBAL RESPONSIVA E OTIMIZADA */}
      <div className="fixed inset-0 z-0">
        {fundosOtimizados.map((fundo, index) => (
          <React.Fragment key={index}>
            {/* Mobile (Vertical) - z-index baixo, object-center */}
            <img 
              src={fundo.mobile} 
              alt={`${fundo.alt} - Mobile`}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out md:hidden ${
                index === fundoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
            {/* Desktop (Panorâmica) - hidden md:block, object-top */}
            <img 
              src={fundo.desktop} 
              alt={`${fundo.alt} - Desktop`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ease-in-out hidden md:block ${
                index === fundoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          </React.Fragment>
        ))}
        {/* REMOVIDA A PELÍCULA ESCURA CSS (bg-black/80), agora está na imagem! */}
      </div>

      {/* CONTEÚDO DO SITE (z-20 para garantir que fique acima do fundo) */}
      <div className="relative z-20">
        
        {/* Cabeçalho */}
        <header className="pt-8 pb-4 flex flex-col items-center max-w-7xl mx-auto border-b border-white/10">
          <div className="flex flex-col items-center mb-4 drop-shadow-lg">
            <img src="/images/logo.png" alt="InovCell Logo" className="w-16 h-16 mb-2 object-contain" />
            <div className="text-2xl font-bold tracking-tighter">
              Inov<span className="text-[#00A859]">Cell</span>
            </div>
          </div>
          <nav className="flex gap-6 text-sm font-medium">
            <a href="#servicos" className="hover:text-[#00A859] transition">Serviços</a>
            <a href="#rastreio" className="hover:text-[#00A859] transition">Rastrear OS</a>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 w-full max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-xl">
            Conserto rápido e <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A859] to-transparent">transparente</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
            Especialistas em telas, baterias e placas. Recuperamos seu aparelho com agilidade e peças de alta qualidade em Palmas.
          </p>
          <a 
            href={`https://wa.me/${numeroWhatsApp}?text=Olá! Gostaria de um orçamento geral.`}
            target="_blank"
            rel="noopener noreferrer"
            // Adicionado backdrop-blur sutil para destacar o botão
            className="bg-[#00A859] hover:bg-green-500 text-white font-bold py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg shadow-[#00A859]/40 backdrop-blur-sm"
          >
            Fazer Orçamento
          </a>
        </section>

        {/* Catálogo de Serviços - Mantendo o Glassmorphism sutil */}
        <section id="servicos" className="py-20 px-4 max-w-7xl mx-auto w-full">
          <div className="text-center mb-16 drop-shadow-lg">
            <h2 className="text-4xl font-extrabold mb-4">Nossos Serviços</h2>
            <p className="text-gray-300 max-w-lg mx-auto">Oferecemos soluções completas para o seu aparelho, com transparência e garantia.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviçosInovCell.map((servico) => {
              return (
                <a 
                  key={servico.id}
                  href={`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(servico.mensagemWhatsApp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Glassmorphism sutil (bg-black/30 backdrop-blur-sm)
                  className="block bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#00A859] hover:scale-105 hover:shadow-2xl hover:shadow-[#00A859]/20 cursor-pointer group"
                >
                  <div className="aspect-video w-full overflow-hidden border-b border-white/10 relative bg-black/50">
                    {servico.imagens ? (
                      servico.imagens.map((imgSrc, index) => {
                        const isActive = index === (tick % servico.imagens.length);
                        return (
                          <img 
                            key={index}
                            src={imgSrc} 
                            alt={`${servico.título} - Vista ${index + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110 ${
                              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                          />
                        );
                      })
                    ) : (
                      <img 
                        src={servico.imagemStatic} 
                        alt={servico.título}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-20 pointer-events-none"></div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#00A859] transition-colors drop-shadow-md">{servico.título}</h3>
                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">{servico.descrição}</p>
                    <span className="text-[#00A859] font-medium flex items-center gap-2">Solicitar orçamento →</span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Seção de Rastreio - Glassmorphism sutil */}
        <section id="rastreio" className="py-20 w-full flex justify-center px-4">
          <div className="max-w-xl w-full bg-black/40 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white text-center drop-shadow-md">Acompanhe seu Reparo</h2>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={numeroOS}
                onChange={(e) => setNumeroOS(e.target.value)}
                placeholder="Digite sua OS (ex: OS-1001)" 
                className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] uppercase text-sm transition"
              />
              <button onClick={buscarOS} disabled={carregando} className="bg-[#00A859] hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-lg transition text-sm disabled:opacity-50 shadow-lg shadow-[#00A859]/20">
                {carregando ? '...' : 'Consultar'}
              </button>
            </div>
            {erro && <p className="mt-4 text-red-400 text-sm text-center bg-red-900/20 py-2 rounded-lg border border-red-500/30">{erro}</p>}
            {resultado && (
              <div className="mt-4 p-4 bg-black/40 rounded-lg border border-white/10 text-sm">
                <p>Aparelho: <strong className="text-white">{resultado.aparelho}</strong></p>
                <p className="mt-1">Status da OS <strong className="text-[#00A859]">{numeroOS}</strong>: <strong className="text-white">{resultado.status}</strong></p>
                {resultado.previsao && <p className="mt-1 text-gray-400">Previsão: {resultado.previsao}</p>}
              </div>
            )}
          </div>
        </section>

        {/* Rodapé - Glassmorphism sutil */}
        <footer className="bg-black/60 backdrop-blur-sm py-12 border-t border-white/10 mt-12 w-full text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Inov Cell. Especialistas em Microeletrônica.</p>
          <p className="mt-1 hover:text-white transition cursor-pointer">Palmas - TO | (63) 98463-5223</p>
        </footer>

      </div>
    </main>
  );
}