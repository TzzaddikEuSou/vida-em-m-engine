import { useState } from 'react';
import './index.css';

// --- MOCK DATA ---
const FLASHCARDS = [
  {
    id: 1,
    topic: 'Fé e Graça',
    front: 'O que significa ser "justificado pela graça"?',
    back: 'Significa que somos declarados justos diante de Deus não pelos nossos méritos, mas unicamente pelo sacrifício de Jesus Cristo, recebido através da fé.',
    ref: 'Romanos 3:24'
  },
  {
    id: 2,
    topic: 'Identidade em Deus',
    front: 'Quem somos nós agora, em Cristo?',
    back: 'Nós somos nova criação; as coisas velhas já passaram, eis que tudo se fez novo. Somos filhos amados e herdeiros.',
    ref: '2 Coríntios 5:17'
  },
  {
    id: 3,
    topic: 'O Papel do Espírito Santo',
    front: 'Qual é um dos principais papéis do Espírito Santo na nossa caminhada?',
    back: 'Ele nos guia em toda a verdade, nos consola, intercede por nós e confirma em nosso espírito que somos filhos de Deus.',
    ref: 'João 16:13, Romanos 8:16'
  }
];

function App() {
  const [appState, setAppState] = useState<'intro' | 'dashboard' | 'study' | 'storybook'>('intro');
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Manipulador para quando uma resposta SM-2 é clicada
  const handleReview = () => {
    // Avança para o próximo card ou finaliza a sessão
    if (activeCardIndex < FLASHCARDS.length - 1) {
      setActiveCardIndex(prev => prev + 1);
    } else {
      setActiveCardIndex(0); // Reinicia pro MVP
      setAppState('dashboard'); // Volta pro dashboard
      alert("Sessão de estudo finalizada! Excelente!");
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col items-center relative overflow-hidden font-body pattern-dots">

      {/* BACKGROUND ELEMENTS (Cinematic Feel) */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-purple/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-pink/10 blur-[150px] rounded-full pointer-events-none" />

      {appState === 'intro' && (
        <IntroScreen onEnter={() => setAppState('storybook')} />
      )}

      {appState !== 'intro' && (
        <div className="w-full h-full flex flex-col items-center p-6 md:p-12 z-10 animate-fade-in max-w-5xl">
          <Header activeTab={appState} setActiveTab={setAppState} />

          <main className="w-full h-full flex-1 flex flex-col">
            {appState === 'dashboard' && <Dashboard onStartStudy={() => setAppState('study')} />}
            {appState === 'study' && (
              <StudySession
                card={FLASHCARDS[activeCardIndex]}
                currentIndex={activeCardIndex}
                totalCards={FLASHCARDS.length}
                onReview={handleReview}
              />
            )}
            {appState === 'storybook' && <StorybookView onGoToSM2={() => setAppState('study')} />}
          </main>
        </div>
      )}
    </div>
  );
}

// ===== COMPONENTS =====

function IntroScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen z-10 animate-fade-in text-center px-4">
      <div className="animate-float mb-12">
        <h1 className="text-5xl md:text-7xl font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-pink to-brand-gold pb-2">
          Vida em M
        </h1>
        <p className="tracking-[0.3em] uppercase text-xs md:text-sm text-brand-neon mt-2 opacity-80">
          Cognitive Learning Engine
        </p>
      </div>

      <p className="text-gray-400 max-w-md text-lg md:text-xl leading-relaxed mb-12 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        Consolidação do conhecimento guiado pelas verdades do evangelho da graça.
      </p>

      <button
        onClick={onEnter}
        className="glass-panel px-8 py-4 text-lg font-bold hover:bg-white/10 transition-all duration-300 hover:scale-105 glass-glow animate-fade-in flex items-center gap-3"
        style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
      >
        <span>Entrar no Cofre</span>
        <span className="text-brand-neon">→</span>
      </button>
    </div>
  );
}

function Header({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: any) => void }) {
  return (
    <header className="w-full flex flex-col sm:flex-row gap-6 justify-between items-center mb-10 pt-2 border-b border-white/5 pb-6">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <button className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 glass-panel hover:bg-white/10 transition-colors rounded-xl">
          <span className="w-5 h-0.5 bg-white block"></span>
          <span className="w-5 h-0.5 bg-white block"></span>
          <span className="w-5 h-0.5 bg-white block"></span>
        </button>
        <h2 className="text-2xl font-display tracking-tight font-bold ml-2">
          Vida <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">em M</span>
        </h2>
      </div>

      <div className="flex-1 max-w-xs mx-auto hidden md:flex items-center gap-4 w-full px-4">
        <div className="flex-1 bg-white/5 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-brand-purple to-brand-pink h-full w-[13%] rounded-full shadow-[0_0_10px_#ff6cb3]"></div>
        </div>
        <span className="text-gray-500 text-xs font-bold">13%</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-white/10 text-white border border-white/20 shadow-lg' : 'text-gray-400 hover:text-white border border-transparent hover:bg-white/5'}`}
        >
          Painel
        </button>
        <button
          onClick={() => setActiveTab('storybook')}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === 'storybook' ? 'bg-white/10 text-white border border-white/20 shadow-lg' : 'text-gray-400 hover:text-white border border-transparent hover:bg-white/5'}`}
        >
          Lição
        </button>
        <button
          onClick={() => setActiveTab('study')}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 border border-brand-purple/40 hover:bg-brand-purple/20 ${activeTab === 'study' ? 'bg-brand-purple/20 text-white shadow-[0_0_10px_rgba(123,108,255,0.4)]' : 'text-brand-purple hover:text-white bg-black/40'}`}
        >
          <span>🃏</span> SM-2
        </button>
      </div>
    </header>
  );
}

function StorybookView({ onGoToSM2 }: { onGoToSM2: () => void }) {
  return (
    <div className="w-full flex-1 flex flex-col animate-fade-in">
      {/* Chapter header */}
      <div className="flex justify-between items-center mb-10 w-full mt-4">
        <div className="flex items-center gap-4">
          <div className="text-3xl">🎨</div>
          <div>
            <h4 className="text-brand-pink text-xs font-bold tracking-[0.2em] uppercase mb-1">Capítulo 02</h4>
            <h1 className="text-3xl md:text-4xl font-display font-medium text-white">UI/UX Cinemático</h1>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-2 invisible sm:visible">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-pink shadow-[0_0_8px_#ff6cb3]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="w-full flex-1 border-l-2 border-brand-purple/80 pl-8 pr-4 py-2 pb-24 relative text-lg md:text-xl text-gray-400 font-light leading-[1.8] flex flex-col">

        <h2 className="text-3xl font-display font-bold text-white mb-6">A Identidade Visual</h2>

        <p className="mb-12 max-w-3xl">
          A experiência começa antes do conteúdo. Um design cinemático em modo escuro cria imersão total.
          O fundo <span className="text-white">#08080e</span> ('negro infinito') elimina distrações e coloca o foco no aprendizado.
          Glassmorphism nos painéis e gradientes nos botões sinalizam qualidade e cuidado.
        </p>

        {/* Stats Section */}
        <div className="w-full max-w-2xl space-y-8 mt-4 auto-mt">

          <div className="w-full space-y-3">
            <div className="flex justify-between items-end font-bold">
              <span className="text-white text-base">Retenção com bom design</span>
              <span className="text-brand-pink text-xl">78%</span>
            </div>
            <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
              <div className="bg-brand-pink h-full w-[78%] rounded-full shadow-[0_0_10px_rgba(255,108,179,0.8)]"></div>
            </div>
          </div>

          <div className="w-full space-y-3">
            <div className="flex justify-between items-end font-bold">
              <span className="text-white text-base">Retenção sem design</span>
              <span className="text-white/30 text-xl font-normal">34%</span>
            </div>
            <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
              <div className="bg-white/10 h-full w-[34%] rounded-full"></div>
            </div>
          </div>

        </div>

      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center w-full mt-auto pt-6 border-t border-white/5">
        <button className="glass-panel px-6 py-3 font-bold text-white hover:bg-white/10 transition flex items-center gap-2">
          <span className="text-white/50">←</span> Anterior
        </button>

        <span className="text-gray-500 font-bold text-sm tracking-widest">1 / 4</span>

        <button
          onClick={onGoToSM2}
          className="px-8 py-3 rounded-[16px] bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(123,108,255,0.4)] flex items-center gap-2"
        >
          Próximo <span className="text-white/80">→</span>
        </button>
      </div>
    </div>
  );
}

function Dashboard({ onStartStudy }: { onStartStudy: () => void }) {
  // ... resto igual ... (dashboard minified slightly to fit)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in">
      <div className="col-span-1 md:col-span-2 glass-panel p-8 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 blur-[80px] rounded-full pointer-events-none" />

        <h3 className="text-md uppercase tracking-widest text-brand-gold mb-1 font-bold">Status Espiritual</h3>
        <h2 className="text-4xl font-display mb-2 text-white">Nível: Obreiro</h2>
        <p className="text-gray-400 mb-8 max-w-md">Sua mente está sendo renovada através da palavra.</p>

        <div className="mt-auto">
          <div className="flex justify-between text-sm mb-3">
            <span className="font-bold">1.520 XP</span>
            <span className="text-gray-500">Mestre (5.000 XP)</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-purple via-brand-pink to-brand-neon h-full rounded-full w-[30%]"></div>
          </div>
        </div>
      </div>

      {/* Streak Card */}
      <div className="col-span-1 glass-panel p-8 flex flex-col items-center justify-center text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-gold/20 blur-[30px] rounded-full" />
          <div className="text-6xl mb-4 relative z-10 animate-float" style={{ animationDuration: '4s' }}>🔥</div>
        </div>
        <h3 className="text-3xl font-display font-bold text-white mb-1">12 Dias</h3>
        <p className="text-brand-gold text-sm font-bold tracking-wider uppercase">Ofensiva de Estudo</p>
      </div>

      {/* Quick Start Card */}
      <div className="col-span-1 md:col-span-3 mt-4">
        <button onClick={onStartStudy} className="w-full glass-panel glass-glow p-6 flex justify-between items-center hover:bg-white/10 transition-all">
          <div className="text-left">
            <h3 className="text-xl font-bold font-display text-brand-neon">Iniciar Nova Sessão SM-2</h3>
            <p className="text-gray-400 text-sm mt-1">3 cartões pendentes hoje.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand-neon/20 flex items-center justify-center text-brand-neon text-2xl">
            →
          </div>
        </button>
      </div>
    </div>
  );
}

function StudySession({ card, currentIndex, totalCards, onReview }: { card: any, currentIndex: number, totalCards: number, onReview: () => void }) {
  // ... igual ao SM2 original gerado na etapa transacional
  const [flipped, setFlipped] = useState(false);
  const handleAnswer = () => { setFlipped(false); setTimeout(() => onReview(), 150); };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center animate-fade-in py-8">

      {/* Progress */}
      <div className="w-full max-w-xl flex justify-between items-center mb-6 px-2">
        <span className="text-brand-pink font-bold text-sm tracking-widest uppercase">Cartão {currentIndex + 1} de {totalCards}</span>
      </div>

      {/* FLASHCARD 3D SCENE */}
      <div className="perspective-1000 w-full max-w-xl aspect-[4/3]">
        <div
          className={`w-full h-full relative preserve-3d transition-transform duration-700 cursor-pointer ${flipped ? 'rotate-y-180' : 'hover:scale-[1.02]'}`}
          onClick={() => !flipped && setFlipped(true)}
        >
          {/* FRONT */}
          <div className="absolute inset-0 backface-hidden glass-panel flex flex-col items-center justify-center p-8 text-center border-t border-l border-white/20 bg-gradient-to-br from-white/5 to-transparent">
            <span className="text-brand-gold text-xs font-bold tracking-[0.2em] uppercase mb-6 block bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
              {card.topic}
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-medium leading-tight">
              {card.front}
            </h2>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 backface-hidden glass-panel rotate-y-180 flex flex-col items-center justify-center p-8 text-center bg-brand-purple/5 border-brand-purple/30">
            <p className="text-xl md:text-2xl leading-relaxed">
              {card.back}
            </p>

            <div className="mt-8 pt-6 border-t border-white/10 w-full flex justify-center">
              <span className="text-brand-neon p-3 bg-white/5 rounded-full">
                📖 {card.ref}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SM-2 ACTION BUTTONS */}
      <div className={`flex justify-center gap-4 mt-12 transition-all ${flipped ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={handleAnswer}
          className="px-8 py-3 rounded-2xl bg-red-500/10 text-red-500 font-bold border-red-500/20"
        >
          Esqueci / Difícil
        </button>
        <button
          onClick={handleAnswer}
          className="px-8 py-3 rounded-2xl bg-brand-gold/10 text-brand-gold font-bold"
        >
          Bom / Médio
        </button>
        <button
          onClick={handleAnswer}
          className="px-8 py-3 rounded-2xl bg-brand-neon/10 text-brand-neon font-bold"
        >
          Fácil
        </button>
      </div>

    </div>
  );
}

export default App;
