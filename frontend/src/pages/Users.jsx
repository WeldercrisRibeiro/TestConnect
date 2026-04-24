import { useState, useEffect } from 'react';
import { userService } from '../services/api';
import { UserPlus, Trash2, Mail, User as UserIcon, Loader2, Lock } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar usuários. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) return;

    try {
      setSubmitting(true);
      await userService.create(formData);
      setFormData({ name: '', email: '' });
      await fetchUsers();
    } catch (err) {
      alert('Erro ao criar usuário: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    try {
      await userService.delete(id);
      await fetchUsers();
    } catch (err) {
      alert('Erro ao excluir usuário');
    }
  };

  return (
    <div className="container animate-fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Form Column */}
        <div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserPlus className="text-primary" size={24} />
              Novo Usuário
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Nome</label>
                <div style={{ position: 'relative' }}>
                  <UserIcon size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="João Silva" 
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>
              <div className="input-group">
                <label>E-mail</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="joao@exemplo.com" 
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Senha</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="••••••••" 
                    required
                    value={formData.password || ''}
                    onChange={handleInputChange}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
                {submitting ? <Loader2 className="animate-spin" size={18} /> : <UserPlus size={18} />}
                {submitting ? 'Criando...' : 'Adicionar Usuário'}
              </button>
            </form>
          </div>
        </div>

        {/* List Column */}
        <div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserIcon className="text-primary" size={24} />
                Lista de Usuários
              </h2>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{users.length} usuários</span>
            </div>

            {loading ? (
              <div style={{ padding: '3rem', textAlign: 'center' }}>
                <Loader2 className="animate-spin" size={32} style={{ color: 'var(--primary)', margin: '0 auto' }} />
                <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Carregando...</p>
              </div>
            ) : error ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
                {error}
              </div>
            ) : users.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: '8px' }}>
                <p style={{ color: 'var(--text-muted)' }}>Nenhum usuário encontrado.</p>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>E-MAIL</th>
                    <th>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>#{user.id}</td>
                      <td style={{ fontWeight: 500 }}>{user.name || 'Sem nome'}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{user.email}</td>
                      <td>
                        <button 
                          onClick={() => handleDelete(user.id)} 
                          className="btn btn-danger" 
                          style={{ padding: '0.5rem' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
