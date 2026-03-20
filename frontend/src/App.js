import { useState, useRef, useEffect } from "react";
import "./App.css";
import { 
  Truck, Shield, CreditCard, Clock, Award, Users, 
  CheckCircle, Star, Package, MapPin, Play, Volume2, VolumeX,
  ChevronDown, MessageCircle, Menu, X, ChevronRight, Syringe, Pill
} from "lucide-react";

// URLs das mídias
const VIDEO_URL = "http://www.suplementosmaisbaratos.com.br/wp-content/uploads/2026/03/avaliacoes.mp4";
const AUDIO_URL = "http://www.suplementosmaisbaratos.com.br/wp-content/uploads/2026/03/B-Dynamitze-Quer-Ficar-Grandao-CLIP-OFICIAL-B-DYNAMITZE-OFFICIAL-youtube-mp3cut.net_.mp3";
const LOGO_URL = "https://customer-assets.emergentagent.com/job_cb62d599-aee6-476d-9abd-89f0590dfbd5/artifacts/g34piw1w_IMG_3116.png";
const MASCOTE_URL = "https://customer-assets.emergentagent.com/job_confidence-builder-14/artifacts/tix9i9rh_maromba%20%282%29.png";

// Imagens anexadas
const IMAGES = {
  patrocinio1: "https://customer-assets.emergentagent.com/job_d928858b-27ad-40e7-8a17-fdf6b21a326e/artifacts/33g9f9tp_patrocinio%201.jpeg",
  patrocinio2: "https://customer-assets.emergentagent.com/job_d928858b-27ad-40e7-8a17-fdf6b21a326e/artifacts/v0kszs3c_patrocinio%202.jpeg",
  envios: "https://customer-assets.emergentagent.com/job_d928858b-27ad-40e7-8a17-fdf6b21a326e/artifacts/v8cj5uxx_envios.jpeg",
  videoAvaliacoes: "https://customer-assets.emergentagent.com/job_d928858b-27ad-40e7-8a17-fdf6b21a326e/artifacts/pvm7x6nt_avalia%C3%A7%C3%B5es.mp4"
};

// Menu items
const MENU_ITEMS = {
  injetaveis: {
    title: "Injetáveis Clássicos",
    icon: "syringe",
    items: ["Testosterona", "Deposteron", "Propionato", "Enantato", "Deca-Durabolin", "Durateston", "Primobolan", "Boldenona", "Trembolona"]
  },
  orais: {
    title: "Orais",
    icon: "pill",
    items: ["Dianabol", "Oxandrolona", "Stanozolol", "Hemogenin", "Halotestin"]
  }
};

// Função para abrir o chat Crisp
const openCrispChat = (message = "") => {
  if (window.$crisp) {
    window.$crisp.push(["do", "chat:open"]);
    if (message) {
      window.$crisp.push(["do", "message:send", ["text", message]]);
    }
  }
};

// Componente de contador animado
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString('pt-BR')}{suffix}
    </span>
  );
};

// Mascote Background Component
const MascoteBackground = () => {
  return (
    <>
      <div className="mascote-bg mascote-bg-1">
        <img src={MASCOTE_URL} alt="" aria-hidden="true" />
      </div>
      <div className="mascote-bg mascote-bg-2">
        <img src={MASCOTE_URL} alt="" aria-hidden="true" />
      </div>
      <div className="mascote-bg mascote-bg-3">
        <img src={MASCOTE_URL} alt="" aria-hidden="true" />
      </div>
    </>
  );
};

// Header component with Menu
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = (item) => {
    openCrispChat(`Olá! Tenho interesse em ${item}. Gostaria de mais informações.`);
    setIsMenuOpen(false);
  };

  const handleAvaliacoesClick = () => {
    openCrispChat("Olá! Vim da página de avaliações e gostaria de fazer um pedido.");
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <img src={LOGO_URL} alt="Suplementos Mais Baratos" className="logo-image" />
        </div>
        
        <div className="header-actions">
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="menu-toggle"
            aria-label="Menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          
          <button 
            className="header-cta"
            onClick={() => openCrispChat()}
            data-testid="header-chat-btn"
          >
            <MessageCircle size={20} />
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div className={`dropdown-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="menu-section">
          <div className="menu-section-title">
            <Syringe size={18} />
            <span>Injetáveis Clássicos</span>
          </div>
          <div className="menu-items">
            {MENU_ITEMS.injetaveis.items.map((item, index) => (
              <button 
                key={index}
                className="menu-item"
                onClick={() => handleMenuItemClick(item)}
                data-testid={`menu-item-${item.toLowerCase()}`}
              >
                {item}
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </div>

        <div className="menu-section">
          <div className="menu-section-title orais">
            <Pill size={18} />
            <span>Orais</span>
          </div>
          <div className="menu-items">
            {MENU_ITEMS.orais.items.map((item, index) => (
              <button 
                key={index}
                className="menu-item"
                onClick={() => handleMenuItemClick(item)}
                data-testid={`menu-item-${item.toLowerCase()}`}
              >
                {item}
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </div>

        <div className="menu-section">
          <button 
            className="menu-section-title avaliacoes clickable"
            onClick={handleAvaliacoesClick}
          >
            <MessageCircle size={18} />
            <span>Avaliações</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

// Hero Section com vídeo
const HeroSection = ({ onInteraction, hasInteracted }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (hasInteracted && videoRef.current) {
      videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
    }
  }, [hasInteracted]);

  return (
    <section className="hero-section" onClick={onInteraction}>
      <div className="hero-overlay"></div>
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>
      <div className="hero-content">
        <div className="trust-badge-hero">
          <Shield className="badge-icon" />
          <span>EMPRESA VERIFICADA</span>
        </div>
        
        <h1 className="hero-title">
          POR QUE <span className="highlight">+21.000 CLIENTES</span><br />
          CONFIAM NA GENTE?
        </h1>
        
        <p className="hero-subtitle">
          Descubra o que faz da Suplementos Mais Baratos a escolha #1 do Brasil em suplementos importados
        </p>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number"><AnimatedCounter end={21000} suffix="+" /></span>
            <span className="stat-label">Clientes Satisfeitos</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number"><AnimatedCounter end={10} suffix="+" /></span>
            <span className="stat-label">Anos de Mercado</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number"><AnimatedCounter end={98} suffix="%" /></span>
            <span className="stat-label">Aprovação</span>
          </div>
        </div>

        {!hasInteracted && (
          <div className="interaction-prompt">
            <Play className="play-icon pulse" />
            <span>Clique para ver os depoimentos</span>
          </div>
        )}

        <a 
          href="#video-section" 
          className="scroll-indicator"
          data-testid="scroll-to-video"
        >
          <ChevronDown className="bounce" />
        </a>
      </div>
    </section>
  );
};

// Video Section
const VideoSection = ({ hasInteracted }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (hasInteracted && videoRef.current) {
      videoRef.current.play().catch(e => console.log('Video autoplay prevented:', e));
    }
  }, [hasInteracted]);

  return (
    <section id="video-section" className="video-section">
      <div className="section-header">
        <span className="section-badge">DEPOIMENTOS REAIS</span>
        <h2 className="section-title">Veja o Que Nossos <span className="gradient-text">Clientes Dizem</span></h2>
        <p className="section-subtitle">
          Avaliações 100% autênticas de clientes que já compraram conosco
        </p>
      </div>

      <div className="video-container">
        <div className="video-glow"></div>
        <video 
          ref={videoRef}
          className="main-video"
          controls
          playsInline
          muted={!hasInteracted}
          autoPlay={hasInteracted}
          loop
          poster={IMAGES.envios}
          data-testid="main-video"
        >
          <source src={VIDEO_URL} type="video/mp4" />
          <source src={IMAGES.videoAvaliacoes} type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
        <div className="video-badge">
          <CheckCircle className="check-icon" />
          <span>Vídeos Verificados</span>
        </div>
      </div>

      <div className="video-trust-indicators">
        <div className="trust-item">
          <Star className="star-icon filled" />
          <Star className="star-icon filled" />
          <Star className="star-icon filled" />
          <Star className="star-icon filled" />
          <Star className="star-icon filled" />
          <span>4.9/5 Avaliação Média</span>
        </div>
      </div>
    </section>
  );
};

// Trust Features Section
const TrustFeatures = () => {
  const features = [
    {
      icon: <Truck />,
      title: "Frete Grátis",
      description: "Entrega gratuita para todo o Brasil, sem mínimo de compra"
    },
    {
      icon: <Clock />,
      title: "Envio 24-48h",
      description: "Pedido despachado em até 24-48 horas úteis"
    },
    {
      icon: <MessageCircle />,
      title: "Rastreio WhatsApp",
      description: "Acompanhe seu pedido em tempo real pelo WhatsApp"
    },
    {
      icon: <Shield />,
      title: "Garantia 7 Dias",
      description: "Não gostou? Devolvemos seu dinheiro em até 7 dias"
    },
    {
      icon: <Award />,
      title: "Produtos Importados",
      description: "100% originais com selo de autenticidade"
    },
    {
      icon: <Users />,
      title: "+21.000 Clientes",
      description: "Comunidade fitness que cresce a cada dia"
    },
    {
      icon: <CheckCircle />,
      title: "10+ Anos de Mercado",
      description: "Década de experiência e confiança"
    }
  ];

  return (
    <section className="trust-features">
      <div className="section-header">
        <span className="section-badge">NOSSAS GARANTIAS</span>
        <h2 className="section-title">Compre com <span className="gradient-text">Total Segurança</span></h2>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card" data-testid={`feature-card-${index}`}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Social Proof Section com imagens
const SocialProof = () => {
  return (
    <section className="social-proof">
      <div className="section-header">
        <span className="section-badge">PROVA SOCIAL</span>
        <h2 className="section-title">Presença e <span className="gradient-text">Credibilidade</span></h2>
        <p className="section-subtitle">
          Patrocinadores oficiais de eventos fitness e milhares de envios diários
        </p>
      </div>

      <div className="proof-grid">
        <div className="proof-card large">
          <img 
            src={IMAGES.patrocinio2} 
            alt="Patrocínio oficial em campeonato de fisiculturismo" 
            className="proof-image"
            data-testid="patrocinio-image-1"
          />
          <div className="proof-overlay">
            <div className="proof-badge">
              <Award />
              <span>Patrocinador Oficial</span>
            </div>
            <h3>Campeonatos de Fisiculturismo</h3>
            <p>Apoiamos os melhores atletas do Brasil</p>
          </div>
        </div>

        <div className="proof-card">
          <img 
            src={IMAGES.envios} 
            alt="Envios diários realizados" 
            className="proof-image"
            data-testid="envios-image"
          />
          <div className="proof-overlay">
            <div className="proof-badge">
              <Package />
              <span>Envios Diários</span>
            </div>
            <h3>Milhares de Pedidos</h3>
            <p>Entregues em todo Brasil</p>
          </div>
        </div>

        <div className="proof-card">
          <img 
            src={IMAGES.patrocinio1} 
            alt="Logo MB Suplementos Mais Baratos" 
            className="proof-image"
            data-testid="patrocinio-image-2"
          />
          <div className="proof-overlay">
            <div className="proof-badge">
              <MapPin />
              <span>Presença Nacional</span>
            </div>
            <h3>Marca Reconhecida</h3>
            <p>Em todo território nacional</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Payment Methods Section
const PaymentMethods = () => {
  const cards = [
    { name: "Visa", icon: "fa-cc-visa" },
    { name: "Mastercard", icon: "fa-cc-mastercard" },
    { name: "American Express", icon: "fa-cc-amex" },
    { name: "Elo", icon: "fa-credit-card" },
    { name: "Hipercard", icon: "fa-credit-card" },
    { name: "Diners Club", icon: "fa-cc-diners-club" },
    { name: "Discover", icon: "fa-cc-discover" },
    { name: "JCB", icon: "fa-cc-jcb" },
    { name: "PIX", icon: "fa-pix" }
  ];

  return (
    <section className="payment-section">
      <div className="section-header">
        <span className="section-badge">FORMAS DE PAGAMENTO</span>
        <h2 className="section-title">Pague Como <span className="gradient-text">Preferir</span></h2>
        <p className="section-subtitle">Aceitamos todas as bandeiras em até 12x sem juros</p>
      </div>

      <div className="payment-grid">
        {cards.map((card, index) => (
          <div key={index} className="payment-card" data-testid={`payment-${card.name.toLowerCase()}`}>
            <i className={`fab ${card.icon}`}></i>
            <span>{card.name}</span>
          </div>
        ))}
      </div>

      <div className="payment-features">
        <div className="payment-feature">
          <CreditCard />
          <span>12x Sem Juros</span>
        </div>
        <div className="payment-feature">
          <Shield />
          <span>Compra Segura</span>
        </div>
        <div className="payment-feature">
          <CheckCircle />
          <span>Site Protegido SSL</span>
        </div>
      </div>
    </section>
  );
};

// Testimonials Stats
const TestimonialsStats = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stat-box">
          <div className="stat-icon">
            <Users />
          </div>
          <div className="stat-content">
            <span className="stat-value"><AnimatedCounter end={21000} suffix="+" /></span>
            <span className="stat-name">Clientes Atendidos</span>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon">
            <Package />
          </div>
          <div className="stat-content">
            <span className="stat-value"><AnimatedCounter end={45000} suffix="+" /></span>
            <span className="stat-name">Pedidos Entregues</span>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon">
            <Star />
          </div>
          <div className="stat-content">
            <span className="stat-value">4.9</span>
            <span className="stat-name">Avaliação Média</span>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon">
            <Award />
          </div>
          <div className="stat-content">
            <span className="stat-value"><AnimatedCounter end={10} suffix="+" /></span>
            <span className="stat-name">Anos de Mercado</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-glow"></div>
      <div className="cta-content">
        <h2 className="cta-title">
          Pronto Para <span className="gradient-text">Transformar</span> Seu Físico?
        </h2>
        <p className="cta-subtitle">
          Junte-se a mais de 21.000 clientes satisfeitos e comece sua transformação hoje!
        </p>
        
        <div className="cta-benefits">
          <div className="cta-benefit">
            <CheckCircle />
            <span>Frete Grátis Brasil</span>
          </div>
          <div className="cta-benefit">
            <CheckCircle />
            <span>Rastreio via WhatsApp</span>
          </div>
          <div className="cta-benefit">
            <CheckCircle />
            <span>Garantia 7 Dias</span>
          </div>
          <div className="cta-benefit">
            <CheckCircle />
            <span>12x Sem Juros</span>
          </div>
        </div>

        <button 
          className="cta-button"
          onClick={() => openCrispChat("Olá! Vim da página de avaliações e gostaria de fazer um pedido.")}
          data-testid="cta-chat-btn"
        >
          <MessageCircle />
          FALAR COM ESPECIALISTA
        </button>

        <p className="cta-note">
          Atendimento de Segunda a Sábado, das 9h às 18h
        </p>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={LOGO_URL} alt="Suplementos Mais Baratos" className="footer-logo" />
          <span>Suplementos Mais Baratos</span>
        </div>

        <div className="footer-links">
          <a href="https://www.suplementosmaisbaratos.com.br" target="_blank" rel="noopener noreferrer">
            Site Principal
          </a>
          <button onClick={() => openCrispChat()} className="footer-link-btn">
            Fale Conosco
          </button>
        </div>

        <div className="footer-trust">
          <Shield className="footer-icon" />
          <span>Compra 100% Segura</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2016-2026 Suplementos Mais Baratos. Todos os direitos reservados.</p>
        <p>Sucesso Vip Empreendimentos | CNPJ: 21.534.683/0001-37 | 10+ Anos de Mercado</p>
      </div>
    </footer>
  );
};

// Audio Player Component (Background Music)
const AudioPlayer = ({ hasInteracted }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    if (hasInteracted && audioRef.current && !isPlaying && !audioError) {
      audioRef.current.volume = 0.3;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => {
          console.log('Audio autoplay prevented:', e);
        });
    }
  }, [hasInteracted, isPlaying, audioError]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (!isPlaying && !audioError) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch(e => {
            console.log('Audio play error:', e);
            setAudioError(true);
          });
      } else {
        audioRef.current.muted = !audioRef.current.muted;
        setIsMuted(!isMuted);
      }
    }
  };

  const handleError = () => {
    console.log('Audio source error');
    setAudioError(true);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        data-testid="background-audio"
        onError={handleError}
      >
        <source src={AUDIO_URL} type="audio/mpeg" />
        <source src="https://www.suplementosmaisbaratos.com.br/wp-content/uploads/2026/03/B-Dynamitze-Quer-Ficar-Grandao-CLIP-OFICIAL-B-DYNAMITZE-OFFICIAL-youtube-mp3cut.net_.mp3" type="audio/mpeg" />
      </audio>
      {hasInteracted && (
        <button 
          className="audio-toggle"
          onClick={toggleMute}
          data-testid="audio-toggle-btn"
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
          title={audioError ? "Áudio indisponível" : (isMuted ? "Ativar som" : "Desativar som")}
        >
          {audioError ? <VolumeX /> : (isMuted ? <VolumeX /> : <Volume2 />)}
        </button>
      )}
    </>
  );
};

// Main App Component
function App() {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [hasInteracted]);

  return (
    <div className="App" data-testid="confidence-page">
      <MascoteBackground />
      <AudioPlayer hasInteracted={hasInteracted} />
      <Header />
      <HeroSection onInteraction={handleInteraction} hasInteracted={hasInteracted} />
      <VideoSection hasInteracted={hasInteracted} />
      <TestimonialsStats />
      <TrustFeatures />
      <SocialProof />
      <PaymentMethods />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
