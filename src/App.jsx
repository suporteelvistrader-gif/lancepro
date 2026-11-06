import { useMemo, useState } from 'react';
import { Gavel, Search, UserRound, Menu, ChevronRight, Clock3, MapPin, ShieldCheck, CarFront, House, Sofa, X, ArrowUpRight, SlidersHorizontal, Heart, Plus, Minus, LogIn } from 'lucide-react';

const initialLots = [
  { id: 1, title: 'Toyota Corolla XEi 2.0', category: 'Veículos', location: 'Aracaju, SE', bid: 42800, bids: 18, ends: '02h 14m', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1000&q=85', tag: 'Em destaque' },
  { id: 2, title: 'Casa residencial com 3 quartos', category: 'Imóveis', location: 'Maceió, AL', bid: 185000, bids: 12, ends: '05h 42m', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85', tag: 'Oportunidade' },
  { id: 3, title: 'Honda CG 160 Fan 2022', category: 'Veículos', location: 'Recife, PE', bid: 9200, bids: 9, ends: '08h 06m', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85', tag: 'Lance aberto' },
  { id: 4, title: 'Lote de móveis para escritório', category: 'Diversos', location: 'Salvador, BA', bid: 3400, bids: 7, ends: '1d 03h', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85', tag: 'Lance aberto' },
  { id: 5, title: 'Jeep Renegade Longitude 2021', category: 'Veículos', location: 'João Pessoa, PB', bid: 67500, bids: 21, ends: '1d 08h', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85', tag: 'Em destaque' },
  { id: 6, title: 'Apartamento próximo à praia', category: 'Imóveis', location: 'Barra dos Coqueiros, SE', bid: 210000, bids: 14, ends: '2d 11h', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85', tag: 'Oportunidade' }
];

const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

function App() {
  const [lots, setLots] = useState(initialLots);
  const [category, setCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState('');
  const [bidValue, setBidValue] = useState('');
  const [email, setEmail] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState('');

  const filtered = useMemo(() => lots.filter(lot =>
    (category === 'Todos' || lot.category === category) &&
    (lot.title.toLowerCase().includes(search.toLowerCase()) || lot.location.toLowerCase().includes(search.toLowerCase()))
  ), [lots, category, search]);

  const placeDemoBid = () => {
    if (!selected || Number(bidValue) <= selected.bid) {
      setNotice('Digite um lance maior que o lance atual.');
      return;
    }
    setLots(current => current.map(lot => lot.id === selected.id ? { ...lot, bid: Number(bidValue), bids: lot.bids + 1 } : lot));
    setSelected(current => ({ ...current, bid: Number(bidValue), bids: current.bids + 1 }));
    setNotice('Lance demonstrativo registrado nesta prévia. Para lances reais, será necessário conectar o sistema a um servidor seguro.');
    setBidValue('');
  };

  const categories = [
    { name: 'Todos', icon: SlidersHorizontal },
    { name: 'Veículos', icon: CarFront },
    { name: 'Imóveis', icon: House },
    { name: 'Diversos', icon: Sofa }
  ];

  return <div className="app-shell">
    <div className="top-strip"><div className="container strip-inner"><span>Oportunidades que fazem bons negócios.</span><span><ShieldCheck size={14}/> Ambiente de demonstração</span></div></div>
    <header className="header"><div className="container nav">
      <a className="brand" href="#"><span className="brand-mark"><Gavel size={23}/></span><span>LANCE<span className="gold">PRO</span><small>LEILÕES & OPORTUNIDADES</small></span></a>
      <nav className={mobileMenu ? 'nav-links open' : 'nav-links'}><a href="#lotes">Explorar lotes</a><a href="#como-funciona">Como funciona</a><a href="#seguranca">Segurança</a><button className="mobile-login" onClick={() => setModal('login')}>Entrar na conta</button></nav>
      <div className="nav-actions"><button className="login-btn" onClick={() => setModal('login')}><UserRound size={17}/> Entrar</button><button className="menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir menu"><Menu/></button></div>
    </div></header>

    <main>
      <section className="hero"><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow"><span className="pulse"/> LEILÕES ONLINE</div><h1>Seu próximo grande negócio começa com um <em>lance.</em></h1><p>Encontre veículos, imóveis e oportunidades selecionadas. Explore os lotes e acompanhe cada disputa.</p><div className="hero-actions"><a className="primary-btn" href="#lotes">Explorar oportunidades <ArrowUpRight size={18}/></a><a className="text-btn" href="#como-funciona">Saiba como funciona <ChevronRight size={17}/></a></div><div className="hero-trust"><span><ShieldCheck size={16}/> Plataforma em desenvolvimento</span><span><Gavel size={16}/> Lotes demonstrativos</span></div></div>
      <div className="hero-art"><div className="hero-glow"/><div className="hero-card"><div className="hero-card-top"><span className="live-dot"/> DISPUTA EM DESTAQUE</div><img src="https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1000&q=85" alt="Carro em destaque"/><div className="hero-card-info"><div><small>LOTE #001 · VEÍCULOS</small><h3>Oportunidades selecionadas</h3></div><span className="hero-gavel"><Gavel size={22}/></span></div><div className="hero-card-bottom"><span>Experiência simples e transparente</span><strong>LANCE PRO</strong></div></div><div className="floating-note"><span className="note-icon"><Clock3 size={17}/></span><span><b>Acompanhe os lotes</b><small>Em um só lugar</small></span></div></div></div></section>

      <section className="stats"><div className="container stats-grid"><div><strong>100%</strong><span>Experiência digital</span></div><div><strong>24h</strong><span>Acesso aos lotes</span></div><div><strong>3 categorias</strong><span>Diversas oportunidades</span></div><div><strong>Transparência</strong><span>Informações organizadas</span></div></div></section>

      <section className="lots-section container" id="lotes"><div className="section-heading"><div><div className="eyebrow dark">OPORTUNIDADES</div><h2>Encontre seu próximo <em>lance</em></h2><p>Explore os lotes disponíveis na plataforma.</p></div><span className="lot-count">{filtered.length} lotes encontrados</span></div>
        <div className="filter-row"><div className="category-tabs">{categories.map(({name, icon: Icon}) => <button key={name} className={category === name ? 'category-tab active' : 'category-tab'} onClick={() => setCategory(name)}><Icon size={17}/>{name}</button>)}</div><label className="search-box"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar lote ou cidade..."/></label></div>
        <div className="lots-grid">{filtered.map(lot => <article className="lot-card" key={lot.id}><div className="lot-image"><img src={lot.image} alt={lot.title} onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80'; }}/><span className="lot-tag">{lot.tag}</span><button className="favorite" aria-label="Favoritar" onClick={() => setNotice('Entre na sua conta para salvar seus lotes favoritos.')}><Heart size={17}/></button></div><div className="lot-content"><div className="lot-meta"><span>{lot.category}</span><span><MapPin size={13}/>{lot.location}</span></div><h3>{lot.title}</h3><div className="bid-line"><span>Lance atual</span><strong>{money(lot.bid)}</strong></div><div className="lot-footer"><span><Gavel size={14}/>{lot.bids} lances</span><span><Clock3 size={14}/>{lot.ends}</span></div><button className="bid-btn" onClick={() => { setSelected(lot); setBidValue(String(lot.bid + 100)); setNotice(''); }}>Ver lote e ofertar <ChevronRight size={17}/></button></div></article>)}</div>
        {filtered.length === 0 && <div className="empty-state">Nenhum lote encontrado. Tente outra busca ou categoria.</div>}
      </section>

      <section className="events-section"><div className="container"><div className="section-heading"><div><div className="eyebrow dark">AGENDA DE LEILÕES</div><h2>Próximos <em>eventos</em></h2><p>Consulte a programação demonstrativa de leilões.</p></div><span className="lot-count">Agenda de exemplo</span></div><div className="event-list"><article className="event-row"><div className="event-date"><strong>08</strong><span>NOV 2026</span></div><div className="event-main"><span className="event-type">JUDICIAL · ONLINE</span><h3>Leilão de veículos e motocicletas</h3><p>Aracaju/SE · 1º e 2º leilão · Visitação mediante agendamento</p></div><div className="event-info"><span>Início às</span><strong>09:30</strong></div><a href="#lotes" className="event-link">Ver lotes <ChevronRight size={16}/></a></article><article className="event-row"><div className="event-date"><strong>12</strong><span>NOV 2026</span></div><div className="event-main"><span className="event-type">EXTRAJUDICIAL · ONLINE</span><h3>Imóveis residenciais e terrenos</h3><p>Grande Aracaju/SE · Edital e condições do evento</p></div><div className="event-info"><span>Início às</span><strong>10:00</strong></div><a href="#lotes" className="event-link">Ver lotes <ChevronRight size={16}/></a></article><article className="event-row"><div className="event-date"><strong>18</strong><span>NOV 2026</span></div><div className="event-main"><span className="event-type">ONLINE</span><h3>Equipamentos, móveis e diversos</h3><p>Sergipe · Oportunidades para pessoa física e jurídica</p></div><div className="event-info"><span>Início às</span><strong>14:00</strong></div><a href="#lotes" className="event-link">Ver lotes <ChevronRight size={16}/></a></article></div><p className="event-disclaimer">Datas e eventos ilustrativos para demonstração da interface. Não representam leilões reais.</p></div></section>\n\n      <section className="how-section" id="como-funciona"><div className="container"><div className="section-heading centered"><div className="eyebrow dark">SIMPLES ASSIM</div><h2>Como funciona o <em>LANCE PRO</em></h2><p>Uma jornada clara para acompanhar oportunidades.</p></div><div className="steps"><div className="step"><span>01</span><h3>Crie sua conta</h3><p>Cadastre-se para acompanhar seus lotes e atividades.</p></div><div className="step"><span>02</span><h3>Escolha um lote</h3><p>Consulte as informações e condições de cada oportunidade.</p></div><div className="step"><span>03</span><h3>Acompanhe a disputa</h3><p>Veja os lances e acompanhe o andamento do leilão.</p></div></div></div></section>

      <section className="security-section container" id="seguranca"><div className="security-icon"><ShieldCheck size={28}/></div><div><h2>Informação clara é parte de um bom negócio.</h2><p>Antes de participar de qualquer leilão, confira o edital, as condições de pagamento, taxas, visitação e regras do lote. Esta versão é uma prévia visual com dados fictícios.</p></div></section>
    </main>
    <footer><div className="container footer-inner"><a className="brand footer-brand" href="#"><span className="brand-mark"><Gavel size={21}/></span><span>LANCE<span className="gold">PRO</span><small>LEILÕES & OPORTUNIDADES</small></span></a><span>© 2026 LANCE PRO. Projeto em desenvolvimento.</span><a href="mailto:contato@lancepro.com.br">Fale com a equipe</a></div></footer>

    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="modal lot-modal" onClick={e => e.stopPropagation()}><button className="close-btn" onClick={() => setSelected(null)}><X/></button><img className="modal-image" src={selected.image} alt={selected.title}/><div className="modal-body"><span className="eyebrow dark">LOTE #{String(selected.id).padStart(3,'0')} · {selected.category.toUpperCase()}</span><h2>{selected.title}</h2><p className="modal-location"><MapPin size={15}/>{selected.location}</p><div className="modal-current"><span>Lance atual</span><strong>{money(selected.bid)}</strong><small>{selected.bids} lances registrados nesta prévia</small></div><label className="field-label">Seu lance (R$)<input type="number" min={selected.bid + 1} value={bidValue} onChange={e => setBidValue(e.target.value)}/></label><button className="primary-btn full" onClick={placeDemoBid}><Gavel size={17}/> Enviar lance demonstrativo</button><p className="disclaimer">Prévia de interface: este botão não registra uma oferta real nem cria obrigação de compra. O sistema de lances reais será implementado com autenticação e validação no servidor.</p>{notice && <div className="notice">{notice}</div>}</div></div></div>}

    {modal === 'login' && <div className="modal-backdrop" onClick={() => setModal('')}><div className="modal login-modal" onClick={e => e.stopPropagation()}><button className="close-btn" onClick={() => setModal('')}><X/></button><div className="login-symbol"><LogIn size={24}/></div><div className="eyebrow dark">ÁREA DO CLIENTE</div><h2>Entre na sua conta</h2><p>Acesse para acompanhar seus lotes e atividades.</p><label className="field-label">E-mail<input type="email" placeholder="voce@email.com" value={email} onChange={e => setEmail(e.target.value)}/></label><button className="primary-btn full" onClick={() => setNotice('A área de login será ativada na próxima etapa, com autenticação segura.')}>Continuar <ChevronRight size={17}/></button><p className="disclaimer">Cadastro e autenticação ainda não estão conectados nesta versão.</p></div></div>}

    {notice && !selected && <div className="toast" role="status">{notice}<button onClick={() => setNotice('')}><X size={15}/></button></div>}
  </div>;
}

export default App;