import { useState, useEffect } from 'react';
import { productService } from '../services/api';
import { PackagePlus, Trash2, Tag, DollarSign, Loader2, ShoppingBag } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar produtos. Verifique se o backend está rodando.');
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
    if (!formData.name || !formData.price || !formData.stock) return;

    try {
      setSubmitting(true);
      await productService.create({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock,10)
      });
      setFormData({ name: '', price: '', stock: '' });
      await fetchProducts();
    } catch (err) {
      alert('Erro ao criar produto: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      await productService.delete(id);
      await fetchProducts();
    } catch (err) {
      alert('Erro ao excluir produto');
    }
  };

  return (
    <div className="container animate-fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Form Column */}
        <div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PackagePlus className="text-primary" size={24} />
              Novo Produto
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Nome do Produto</label>
                <div style={{ position: 'relative' }}>
                  <Tag size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Laptop Pro" 
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Preço (R$)</label>
                <div style={{ position: 'relative' }}>
                  <DollarSign size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="number" 
                    step="0.01"
                    name="price" 
                    placeholder="2999.99" 
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
                <div className="input-group">
                  <label>Estoque</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="number" 
                      step="1"
                      name="stock" 
                      placeholder="10"
                      required
                      value={formData.stock}
                      onChange={handleInputChange}
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
                {submitting ? <Loader2 className="animate-spin" size={18} /> : <PackagePlus size={18} />}
                {submitting ? 'Criando...' : 'Adicionar Produto'}
              </button>
            </form>
          </div>
        </div>

        {/* List Column */}
        <div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag className="text-primary" size={24} />
                Estoque de Produtos
              </h2>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{products.length} itens</span>
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
            ) : products.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: '8px' }}>
                <p style={{ color: 'var(--text-muted)' }}>Nenhum produto em estoque.</p>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>PREÇO</th>
                    <th>ESTOQUE</th>  
                    <th>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>#{product.id}</td>
                      <td style={{ fontWeight: 500 }}>{product.name}</td>
                      <td style={{ fontWeight: 600, color: 'var(--success)' }}>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                      </td>
                      <td>{product.stock}</td>
                      <td>
                        <button 
                          onClick={() => handleDelete(product.id)} 
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

export default Products;
