import React from 'react';

const services = [
  {
    id: 'servico-sofas',
    title: 'Higienização de Sofás',
    icon: 'weekend',
    badge: 'Mais Procurado',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    description:
      'Remoção profunda de sujeiras encardidas, ácaros, fungos e bactérias. Processo com extração a vácuo de alta sucção que preserva a textura e as cores de tecidos como linho, suede, veludo e bouclé.',
    highlights: ['Extração profunda a vácuo', 'Elimina ácaros e odores', 'Secagem rápida controlada'],
    whatsappMsg: 'Olá, gostaria de um orçamento para Higienização de Sofás.',
    ctaText: 'Orçar Sofá'
  },
  {
    id: 'servico-impermeabilizacao',
    title: 'Impermeabilização',
    icon: 'shield',
    badge: 'Alta Durabilidade',
    badgeColor: 'bg-lime-400/10 text-[#a7fc5d] border-lime-400/20',
    description:
      'Blindagem e vitrificação de tecidos com resina protetora de nano-tecnologia não inflamável. Cria um escudo hidrorepelente contra café, refrigerante, vinho, gordura e poeira sem alterar o toque macio.',
    highlights: ['Nanotecnologia não inflamável', 'Protege contra café e vinho', 'Garantia e certificado'],
    whatsappMsg: 'Olá, gostaria de um orçamento para Impermeabilização de Estofados.',
    ctaText: 'Orçar Blindagem'
  },
  {
    id: 'servico-colchoes',
    title: 'Colchões e Tapetes',
    icon: 'bed',
    badge: 'Saúde em Foco',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    description:
      'Descontaminação biológica rigorosa em colchões solteiro, casal, queen e king size, além de tapetes e carpetes. Eliminação de alérgenos que causam crises respiratórias e neutralização de odores.',
    highlights: ['Tratamento antiácaro hospitalar', 'Neutralização de urina e mofo', 'Ideal para alérgicos'],
    whatsappMsg: 'Olá, gostaria de um orçamento para Colchões e Tapetes.',
    ctaText: 'Orçar Colchão'
  },
  {
    id: 'servico-poltronas',
    title: 'Poltronas e Cadeiras',
    icon: 'chair',
    badge: 'Todos os Tecidos',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    description:
      'Revitalização especializada de poltronas decorativas, cadeiras de jantar e assentos de escritório. Hidratação para couros legítimos e sintéticos, além de remoção cirúrgica de manchas em tecidos nobres.',
    highlights: ['Cadeiras de jantar e escritório', 'Hidratação de couro legítimo', 'Remoção de manchas difíceis'],
    whatsappMsg: 'Olá, gostaria de um orçamento para Poltronas e Cadeiras.',
    ctaText: 'Orçar Poltronas'
  },
  {
    id: 'servico-automotivo',
    title: 'Estofado Automotivo',
    icon: 'directions_car',
    badge: 'Auto & Car',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    description:
      'Limpeza técnica e higienização interna de veículos: bancos em tecido ou couro, teto, carpetes, portas e porta-malas. Recuperação do aspecto de novo e eliminação de ácaros e odores de mofo ou cigarro.',
    highlights: ['Bancos, teto, carpetes e portas', 'Elimina cheiro de cigarro/mofo', 'Atendimento a domicílio'],
    whatsappMsg: 'Olá, gostaria de um orçamento para Higienização Automotiva.',
    ctaText: 'Orçar Automotivo'
  },
  {
    id: 'servico-corporativo',
    title: 'Corporativo & B2B',
    icon: 'domain',
    badge: 'B2B Disponível',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    description:
      'Atendimento programado para empresas, auditórios, hotéis, clínicas e condomínios com emissão de nota fiscal e certificados. Agendamentos em horários flexíveis para não parar sua operação.',
    highlights: ['Emissão de Nota Fiscal e Laudo', 'Horários noturnos e finais de semana', 'Contratos recorrentes'],
    whatsappMsg: 'Olá, gostaria de um atendimento Corporativo B2B para minha empresa.',
    ctaText: 'Falar com B2B'
  }
];

export default function ServicesSection({ onSelectService }) {
  const getWhatsAppLink = (message) => {
    return `https://wa.me/5561995659224?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="servicos">
      {/* Glow de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#a7fc5d]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Cabeçalho da Seção */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#a7fc5d]/10 border border-[#a7fc5d]/20 text-[#a7fc5d] text-xs font-bold uppercase tracking-wider mb-4">
          <span className="material-symbols-outlined text-sm">verified</span>
          Nossos Serviços Especializados
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-headline mb-4">
          Cuidado completo <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            para cada superfície
          </span>
        </h2>

        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Produtos biodegradáveis aprovados pela ANVISA e equipamentos de extração profissional de alta potência para máxima durabilidade, saúde e estética.
        </p>
      </div>

      {/* Grid de Serviços */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="group relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-[#a7fc5d]/40 hover:bg-slate-900/90 hover:-translate-y-1.5 transition-all duration-300 shadow-xl shadow-black/20"
          >
            {/* Topo do Card */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-[#a7fc5d] group-hover:scale-110 group-hover:bg-[#a7fc5d]/10 group-hover:border-[#a7fc5d]/30 transition-all duration-300 shadow-inner">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-headline group-hover:text-[#a7fc5d] transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-300/80 text-sm sm:text-base leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Destaques / Checklist */}
              <ul className="space-y-2 mb-8">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <span className="material-symbols-outlined text-sm text-[#a7fc5d]">check_circle</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rodapé do Card com CTA */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4 mt-auto">
              <a
                href={getWhatsAppLink(item.whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-[#a7fc5d] text-white hover:text-black font-semibold text-sm transition-all duration-200 group-hover:shadow-lg group-hover:shadow-[#a7fc5d]/10"
              >
                <span>{item.ctaText}</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
