import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { user, loading, login, register } = useAuth();
  const navigate = useNavigate();

  const [modo,          setModo]          = useState<'login' | 'cadastro'>('login');
  const [username,      setUsername]      = useState('');
  const [password,      setPassword]      = useState('');
  const [confirmar,     setConfirmar]     = useState('');
  const [mostrarSenha,  setMostrarSenha]  = useState(false);
  const [enviando,      setEnviando]      = useState(false);
  const [erro,          setErro]          = useState('');

  // Redireciona se já autenticado
  useEffect(() => {
    if (!loading && user) navigate('/admin', { replace: true });
  }, [user, loading, navigate]);

  const trocarModo = (novo: 'login' | 'cadastro') => {
    setModo(novo);
    setErro('');
    setPassword('');
    setConfirmar('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (modo === 'cadastro') {
      if (password !== confirmar) { setErro('As senhas não coincidem'); return; }
      if (password.length < 6)   { setErro('A senha deve ter ao menos 6 caracteres'); return; }
    }

    setEnviando(true);
    try {
      if (modo === 'login') {
        await login(username, password);
      } else {
        await register(username, password);
      }
      navigate('/admin', { replace: true });
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro inesperado');
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#060910' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#00d4ff' }} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#060910' }}
    >
      {/* Glow de fundo */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.07) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Ícone + título */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.15))',
                border: '1px solid rgba(0,212,255,0.25)',
              }}
            >
              <ShieldCheck className="w-8 h-8" style={{ color: '#00d4ff' }} />
            </div>
            <h1
              className="text-3xl font-black uppercase tracking-tighter text-white mb-1"
            >
              {modo === 'login' ? 'Entrar' : 'Criar conta'}
            </h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Área administrativa · Bíblia Mapeada
            </p>
          </div>

          {/* Toggle login / cadastro */}
          <div
            className="flex rounded-xl p-1 mb-7"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {(['login', 'cadastro'] as const).map(m => (
              <button
                key={m}
                onClick={() => trocarModo(m)}
                className="flex-1 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all duration-200"
                style={
                  modo === m
                    ? { background: 'rgba(0,212,255,0.15)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.3)' }
                    : { color: 'rgba(255,255,255,0.35)', border: '1px solid transparent' }
                }
              >
                {m === 'login' ? 'Entrar' : 'Cadastrar'}
              </button>
            ))}
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={e => { setUsername(e.target.value); setErro(''); }}
                placeholder="username"
                autoComplete="username"
                required
                className="rounded-xl px-4 py-3 text-base text-white placeholder-white/20 outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                onBlur={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              />
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Senha
              </label>
              <div className="relative">
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErro(''); }}
                  placeholder="••••••••"
                  autoComplete={modo === 'login' ? 'current-password' : 'new-password'}
                  required
                  className="w-full rounded-xl px-4 py-3 pr-12 text-base text-white placeholder-white/20 outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                  onBlur={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
                >
                  {mostrarSenha ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirmar senha (só no cadastro) */}
            <AnimatePresence>
              {modo === 'cadastro' && (
                <motion.div
                  key="confirmar"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden flex flex-col gap-1.5"
                >
                  <label className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Confirmar senha
                  </label>
                  <input
                    type={mostrarSenha ? 'text' : 'password'}
                    value={confirmar}
                    onChange={e => { setConfirmar(e.target.value); setErro(''); }}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required={modo === 'cadastro'}
                    className="rounded-xl px-4 py-3 text-base text-white placeholder-white/20 outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                    onBlur={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Erro inline */}
            <AnimatePresence>
              {erro && (
                <motion.div
                  key="erro"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold"
                  style={{
                    background: 'rgba(255,45,85,0.1)',
                    border: '1px solid rgba(255,45,85,0.3)',
                    color: '#ff2d55',
                  }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {erro}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botão submit */}
            <button
              type="submit"
              disabled={enviando}
              className="mt-2 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black uppercase tracking-wider text-sm transition-all duration-200"
              style={{
                background: enviando
                  ? 'rgba(0,212,255,0.1)'
                  : 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(168,85,247,0.2))',
                border: `1px solid ${enviando ? 'rgba(0,212,255,0.2)' : 'rgba(0,212,255,0.4)'}`,
                color: enviando ? 'rgba(0,212,255,0.5)' : '#00d4ff',
                cursor: enviando ? 'not-allowed' : 'pointer',
              }}
            >
              {enviando ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Aguarde…</>
              ) : (
                <><ShieldCheck className="w-4 h-4" /> {modo === 'login' ? 'Entrar' : 'Criar conta'}</>
              )}
            </button>
          </form>
        </div>

        {/* Rodapé */}
        <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Bíblia Mapeada Expositiva · Área restrita
        </p>
      </motion.div>
    </div>
  );
}
