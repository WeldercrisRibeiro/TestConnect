import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, ShoppingBag, LayoutDashboard, Sun, Moon, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLight, setIsLight] = useState(() => localStorage.getItem('theme') === 'light');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-card" style={{ margin: '1rem', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: '1rem', zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LayoutDashboard size={20} color="white" />
        </div>
        <span style={{ fontWeight: 700, fontSize: '1.25rem' }} className="gradient-text">ConnectDB</span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link 
          to="/users" 
          className="btn" 
          style={{ 
            background: isActive('/users') ? 'var(--glass)' : 'transparent',
            color: isActive('/users') ? 'var(--primary)' : 'var(--text-muted)',
            padding: '0.5rem 1rem'
          }}
        >
          <Users size={18} />
          <span>Usuários</span>
        </Link>
        <Link 
          to="/products" 
          className="btn" 
          style={{ 
            background: isActive('/products') ? 'var(--glass)' : 'transparent',
            color: isActive('/products') ? 'var(--primary)' : 'var(--text-muted)',
            padding: '0.5rem 1rem'
          }}
        >
          <ShoppingBag size={18} />
          <span>Produtos</span>
        </Link>

        <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 0.5rem' }} />

        <button 
          onClick={() => setIsLight(!isLight)}
          className="btn"
          style={{ 
            background: 'var(--glass)',
            color: 'var(--primary)',
            padding: '0.5rem',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            justifyContent: 'center'
          }}
          title={isLight ? 'Mudar para tema escuro' : 'Mudar para tema claro'}
        >
          {isLight ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button 
          onClick={handleLogout}
          className="btn"
          style={{ 
            background: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--danger)',
            padding: '0.5rem',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            justifyContent: 'center',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}
          title="Sair"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

