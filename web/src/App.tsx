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
  const [appState, setAppState] = useState<'intro' | 'dashboard' | 'study'>('intro');
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
        <IntroScreen onEnter={() => setAppState('dashboard')} />
      )}

      {appState !== 'intro' && (
        <div className="w-full h-full flex flex-col items-center p-6 md:p-12 z-10 animate-fade-in">
          <Header activeTab={appState} setActiveTab={setAppState} />

          <main className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center">
            {appState === 'dashboard' ? (
              <Dashboard onStartStudy={() => setAppState('study')} />
            ) : (
              <StudySession
                card={FLASHCARDS[activeCardIndex]}
                currentIndex={activeCardIndex}
                totalCards={FLASHCARDS.length}
                onReview={handleReview}
              />
            )}
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
    <header className="w-full max-w-5xl flex flex-col sm:flex-row gap-6 justify-between items-center mb-12 pt-4">
      <h2 className="text-2xl font-display tracking-tight font-bold">
        Vida<span className="text-brand-purple">_</span>em<span className="text-brand-pink">_</span>M
      </h2>
      <div className="flex gap-2 glass-panel p-1 rounded-full">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
        >
          Minha Jornada
        </button>
        <button
          onClick={() => setActiveTab('study')}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'study' ? 'bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
        >
          Sessão de Graça
        </button>
      </div>
    </header>
  );
}

function Dashboard({ onStartStudy }: { onStartStudy: () => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in">
      {/* Profile Card */}
      <div className="col-span-1 md:col-span-2 glass-panel glass-glow p-8 flex flex-col relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-[80px] group-hover:bg-brand-purple/20 transition-all duration-700" />

        <h3 className="text-md uppercase tracking-widest text-brand-gold mb-1 font-bold">Status Espiritual</h3>
        <h2 className="text-4xl font-display mb-2 text-white">Nível: Obreiro</h2>
        <p className="text-gray-400 mb-8 max-w-md">Sua mente está sendo renovada através da palavra. Continue firme no descanso da Graça.</p>

        <div className="mt-auto">
          <div className="flex justify-between text-sm mb-3">
            <span className="font-bold">1.520 XP</span>
            <span className="text-gray-500">Mestre (5.000 XP)</span>
          </div>
          <div className="w-full bg-black/40 rounded-full h-4 backdrop-blur-sm border border-white/5 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-purple via-brand-pink to-brand-neon h-full rounded-full w-[30%] shadow-[0_0_15px_rgba(108,255,200,0.5)] transition-all duration-1000 ease-out"></div>
          </div>
        </div>
      </div>

      {/* Streak Card */}
      <div className="col-span-1 glass-panel p-8 flex flex-col items-center justify-center text-center group cursor-default">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-gold/20 blur-[30px] rounded-full group-hover:bg-brand-gold/40 transition-all duration-500" />
          <div className="text-6xl mb-4 relative z-10 animate-float" style={{ animationDuration: '4s' }}>🔥</div>
        </div>
        <h3 className="text-3xl font-display font-bold text-white mb-1">12 Dias</h3>
        <p className="text-brand-gold text-sm font-bold tracking-wider uppercase">Ofensiva de Estudo</p>
      </div>

      {/* Quick Start Card */}
      <div className="col-span-1 md:col-span-3 mt-4">
        <button onClick={onStartStudy} className="w-full glass-panel glass-glow p-6 flex justify-between items-center group hover:bg-white/10 transition-all duration-300">
          <div className="text-left">
            <h3 className="text-xl font-bold font-display text-brand-neon">Iniciar Nova Sessão SM-2</h3>
            <p className="text-gray-400 text-sm mt-1">3 cartões pendentes de revisão hoje.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand-neon/20 flex items-center justify-center text-brand-neon group-hover:scale-110 transition-all">
            →
          </div>
        </button>
      </div>
    </div>
  );
}

function StudySession({ card, currentIndex, totalCards, onReview }: { card: any, currentIndex: number, totalCards: number, onReview: () => void }) {
  const [flipped, setFlipped] = useState(false);

  // Helper para virar o cartão e lidar com next card via uma única func
  const handleAnswer = () => {
    setFlipped(false);
    setTimeout(() => {
      onReview();
    }, 150);
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center animate-fade-in py-8">

      {/* Progress */}
      <div className="w-full max-w-xl flex justify-between items-center mb-6 px-2">
        <span className="text-brand-pink font-bold text-sm tracking-widest uppercase">Cartão {currentIndex + 1} de {totalCards}</span>
        <div className="flex gap-1">
          {Array.from({ length: totalCards }).map((_, i) => (
            <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentIndex ? 'bg-brand-pink' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>

      {/* FLASHCARD 3D SCENE */}
      <div className="perspective-1000 w-full max-w-xl aspect-[4/3]">
        <div
          className={`w-full h-full relative preserve-3d transition-transform duration-700 cursor-pointer ${flipped ? 'rotate-y-180' : 'hover:scale-[1.02]'}`}
          onClick={() => !flipped && setFlipped(true)}
        >
          {/* FRONT */}
          <div className="absolute inset-0 backface-hidden glass-panel flex flex-col items-center justify-center p-8 md:p-12 text-center border-t border-l border-white/20 bg-gradient-to-br from-white/5 to-transparent">
            <span className="text-brand-gold text-xs font-bold tracking-[0.2em] uppercase mb-6 block bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
              {card.topic}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium leading-tight">
              {card.front}
            </h2>
            <p className="absolute bottom-8 mt-8 text-gray-500 text-xs tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span>
              Toque para revelar
            </p>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 backface-hidden glass-panel rotate-y-180 flex flex-col items-center justify-center p-8 md:p-12 text-center bg-brand-purple/5 border-brand-purple/30">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xl md:text-2xl leading-relaxed font-light">
                {card.back}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 w-full flex justify-center">
              <p className="text-brand-neon font-bold text-sm tracking-widest flex items-center gap-2 bg-brand-neon/10 px-4 py-2 rounded-full border border-brand-neon/20">
                📖 {card.ref}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SM-2 ACTION BUTTONS */}
      <div className={`flex flex-wrap justify-center gap-4 mt-12 transition-all duration-500 ${flipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <button
          onClick={handleAnswer}
          className="px-8 py-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 font-bold transition-all hover:scale-105 active:scale-95"
        >
          Esqueci / Difícil
        </button>
        <button
          onClick={handleAnswer}
          className="px-8 py-3 rounded-2xl bg-brand-gold/10 text-brand-gold border border-brand-gold/30 hover:bg-brand-gold/20 hover:border-brand-gold/50 font-bold transition-all hover:scale-105 active:scale-95"
        >
          Bom / Médio
        </button>
        <button
          onClick={handleAnswer}
          className="px-8 py-3 rounded-2xl bg-brand-neon/10 text-brand-neon border border-brand-neon/30 hover:bg-brand-neon/20 hover:border-brand-neon/50 font-bold glass-glow transition-all hover:scale-105 active:scale-95"
        >
          Fácil
        </button>
      </div>

    </div>
  );
}

export default App;
