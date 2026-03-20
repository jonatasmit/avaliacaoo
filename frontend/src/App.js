import { useState, useRef, useEffect } from "react";
import "./App.css";
import { 
  Truck, Shield, CreditCard, Clock, Award, Users, 
  CheckCircle, Star, Package, MapPin, Play, Volume2, VolumeX,
  ChevronDown
} from "lucide-react";

// URLs das mídias
const VIDEO_URL = "http://www.suplementosmaisbaratos.com.br/wp-content/uploads/2026/03/avaliacoes.mp4";
const AUDIO_URL = "http://www.suplementosmaisbaratos.com.br/wp-content/uploads/2026/03/B-Dynamitze-Quer-Ficar-Grandao-CLIP-OFICIAL-B-DYNAMITZE-OFFICIAL-youtube-mp3cut.net_.mp3";

// Imagens anexadas
const IMAGES = {
  patrocinio1: "https://customer-assets.emergentagent.com/job_d928858b-27ad-40e7-8a17-fdf6b21a326e/artifacts/33g9f9tp_patrocinio%201.jpeg",
  patrocinio2: "https://customer-assets.emergentagent.com/job_d928858b-27ad-40e7-8a17-fdf6b21a326e/artifacts/v0kszs3c_patrocinio%202.jpeg",
  envios: "https://customer-assets.emergentagent.com/job_d928858b-27ad-40e7-8a17-fdf6b21a326e/artifacts/v8cj5uxx_envios.jpeg",
  videoAvaliacoes: "https://customer-assets.emergentagent.com/job_d928858b-27ad-40e7-8a17-fdf6b21a326e/artifacts/pvm7x6nt_avalia%C3%A7%C3%B5es.mp4"
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

// Header component
const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-badge">
            <span className="logo-text">MB</span>
          </div>
          <div className="logo-info">
            <span className="brand-name">SUPLEMENTOS MAIS BARATOS</span>
            <span className="brand-tagline">10+ Anos de Confiança</span>
          </div>
        </div>
        <a 
          href="https://wa.me/5521972232170?text=Olá! Vim da página de avaliações e gostaria de fazer um pedido."
          className="header-cta"
          data-testid="header-whatsapp-btn"
        >
          <i className="fab fa-whatsapp"></i>
          FALAR COM VENDEDOR
        </a>
      </div>
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
      <div className="hero-content">
        <div className="trust-badge-hero">
          <Shield className="badge-icon" />
          <span>EMPRESA VERIFICADA</span>
        </div>
        
        <h1 className="hero-title">
          POR QUE <span className="highlight">+50.000 CLIENTES</span><br />
          CONFIAM NA GENTE?
        </h1>
        
        <p className="hero-subtitle">
          Descubra o que faz da Suplementos Mais Baratos a escolha #1 do Brasil em suplementos importados
        </p>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number"><AnimatedCounter end={50000} suffix="+" /></span>
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
        <h2 className="section-title">Veja o Que Nossos Clientes Dizem</h2>
        <p className="section-subtitle">
          Avaliações 100% autênticas de clientes que já compraram conosco
        </p>
      </div>

      <div className="video-container">
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
      title: "+50.000 Clientes",
      description: "Maior comunidade fitness do Brasil"
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
        <h2 className="section-title">Compre com Total Segurança</h2>
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
        <h2 className="section-title">Presença e Credibilidade</h2>
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
        <h2 className="section-title">Pague Como Preferir</h2>
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
            <span className="stat-value"><AnimatedCounter end={50000} suffix="+" /></span>
            <span className="stat-name">Clientes Atendidos</span>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon">
            <Package />
          </div>
          <div className="stat-content">
            <span className="stat-value"><AnimatedCounter end={120000} suffix="+" /></span>
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
      <div className="cta-content">
        <h2 className="cta-title">
          Pronto Para <span className="highlight">Transformar</span> Seu Físico?
        </h2>
        <p className="cta-subtitle">
          Junte-se a mais de 50.000 clientes satisfeitos e comece sua transformação hoje!
        </p>
        
        <div className="cta-benefits">
          <div className="cta-benefit">
            <CheckCircle />
            <span>Frete Grátis Brasil</span>
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

        <a 
          href="https://wa.me/5521972232170?text=Olá! Vim da página de avaliações e gostaria de fazer um pedido."
          className="cta-button"
          data-testid="cta-whatsapp-btn"
        >
          <i className="fab fa-whatsapp"></i>
          COMPRAR AGORA VIA WHATSAPP
        </a>

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
          <div className="logo-badge small">
            <span className="logo-text">MB</span>
          </div>
          <span>Suplementos Mais Baratos</span>
        </div>

        <div className="footer-links">
          <a href="https://www.suplementosmaisbaratos.com.br" target="_blank" rel="noopener noreferrer">
            Site Principal
          </a>
          <a href="https://wa.me/5521972232170" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>

        <div className="footer-trust">
          <Shield className="footer-icon" />
          <span>Compra 100% Segura</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2016-2026 Suplementos Mais Baratos. Todos os direitos reservados.</p>
        <p>CNPJ: XX.XXX.XXX/0001-XX | 10+ Anos de Mercado</p>
      </div>
    </footer>
  );
};

// Audio Player Component (Background Music)
const AudioPlayer = ({ hasInteracted }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (hasInteracted && audioRef.current && !isPlaying) {
      audioRef.current.volume = 0.3;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log('Audio autoplay prevented:', e));
    }
  }, [hasInteracted, isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={AUDIO_URL} 
        loop 
        preload="auto"
        data-testid="background-audio"
      />
      {hasInteracted && (
        <button 
          className="audio-toggle"
          onClick={toggleMute}
          data-testid="audio-toggle-btn"
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted ? <VolumeX /> : <Volume2 />}
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
    // Add interaction listeners for first user interaction
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
