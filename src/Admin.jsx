import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Lock, Eye, EyeOff, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [responses, setResponses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [filterProduct, setFilterProduct] = useState('all');

  const ADMIN_PASSWORD = 'nagimasen2025'; // Change this to your secure password

  useEffect(() => {
    if (isAuthenticated) {
      loadResponses();
    }
  }, [isAuthenticated]);

  const loadResponses = () => {
    const saved = localStorage.getItem('nagimasen-responses');
    if (saved) setResponses(JSON.parse(saved));
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleDeleteResponse = (id) => {
    if (window.confirm('Delete this response?')) {
      const updated = responses.filter(r => r.id !== id);
      setResponses(updated);
      localStorage.setItem('nagimasen-responses', JSON.stringify(updated));
    }
  };

  const getAverageRating = (field, product = 'all') => {
    const filtered = product === 'all' ? responses : responses.filter(r => r.product === product);
    if (filtered.length === 0) return 0;
    return (filtered.reduce((acc, r) => acc + r[field], 0) / filtered.length).toFixed(1);
  };

  const getProductResponses = (product) => responses.filter(r => r.product === product);

  const filteredResponses = filterProduct === 'all' 
    ? responses 
    : responses.filter(r => r.product === filterProduct);

  if (!isAuthenticated) {
    return (
      <div style={{minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'}}>
        <div style={{backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '2.5rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%'}}>
          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <div style={{width: '60px', height: '60px', backgroundColor: '#DC2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'}}>
              <Lock size={30} color="#ffffff" />
            </div>
            <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem'}}>Admin Access</h2>
            <p style={{fontSize: '0.875rem', color: '#6b7280'}}>Nagimasen Dashboard</p>
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem'}}>Password</label>
            <div style={{position: 'relative'}}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter admin password"
                style={{width: '100%', padding: '0.75rem', paddingRight: '3rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: '#ffffff', color: '#111827', outline: 'none', fontSize: '1rem'}}
                autoFocus
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem'}}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            style={{width: '100%', padding: '0.75rem', backgroundColor: '#DC2626', color: '#ffffff', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '600'}}
          >
            Login
          </button>

          <p style={{fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center', marginTop: '1rem'}}>
            Default password: nagimasen2025
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f9fafb'}}>
      <div style={{backgroundColor: '#DC2626', color: '#ffffff', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h1 style={{fontSize: '1.75rem', fontWeight: 'bold', margin: 0}}>Nagimasen Admin</h1>
            <p style={{fontSize: '0.875rem', color: '#fecaca', margin: '0.25rem 0 0 0'}}>Customer Feedback Dashboard</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            style={{padding: '0.5rem 1rem', backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500'}}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem'}}>
        {/* Summary Stats */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem'}}>
          <div style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', textAlign: 'center'}}>
            <p style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>Total Responses</p>
            <p style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#DC2626'}}>{responses.length}</p>
          </div>
          <div style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', textAlign: 'center'}}>
            <p style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>Avg Taste</p>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <Star size={24} fill="#FCD34D" color="#FCD34D" />
              <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#111827'}}>{getAverageRating('tasteRating')}</p>
            </div>
          </div>
          <div style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', textAlign: 'center'}}>
            <p style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>Avg Price</p>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <Star size={24} fill="#10B981" color="#10B981" />
              <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#111827'}}>{getAverageRating('priceRating')}</p>
            </div>
          </div>
          <div style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', textAlign: 'center'}}>
            <p style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>Avg Overall</p>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <Star size={24} fill="#DC2626" color="#DC2626" />
              <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#111827'}}>{getAverageRating('overallRating')}</p>
            </div>
          </div>
        </div>

        {/* Product Breakdown */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem'}}>
          {['Pinakbet Sushi Roll', 'Virgin Blue Lagoon'].map(product => {
            const pr = getProductResponses(product);
            const avgT = pr.length ? (pr.reduce((a, r) => a + r.tasteRating, 0) / pr.length).toFixed(1) : 0;
            const avgP = pr.length ? (pr.reduce((a, r) => a + r.priceRating, 0) / pr.length).toFixed(1) : 0;
            const avgO = pr.length ? (pr.reduce((a, r) => a + r.overallRating, 0) / pr.length).toFixed(1) : 0;

            return (
              <div key={product} style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}}>
                <h3 style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem'}}>{product}</h3>
                <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#DC2626', marginBottom: '0.75rem'}}>{pr.length} responses</p>
                <div style={{fontSize: '0.875rem', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                  <p>Taste: {avgT} ⭐</p>
                  <p>Price: {avgP} ⭐</p>
                  <p>Overall: {avgO} ⭐</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter */}
        <div style={{marginBottom: '1.5rem'}}>
          <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem'}}>Filter by Product:</label>
          <select
            value={filterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
            style={{padding: '0.5rem 1rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: '#ffffff', color: '#111827', outline: 'none', fontSize: '0.875rem', cursor: 'pointer'}}
          >
            <option value="all">All Products</option>
            <option value="Pinakbet Sushi Roll">Pinakbet Sushi Roll</option>
            <option value="Virgin Blue Lagoon">Virgin Blue Lagoon</option>
          </select>
        </div>

        {/* Individual Responses */}
        <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem'}}>
          Customer Feedback {filterProduct !== 'all' && `- ${filterProduct}`}
        </h3>

        {filteredResponses.length === 0 ? (
          <div style={{backgroundColor: '#ffffff', padding: '3rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', textAlign: 'center'}}>
            <MessageSquare size={48} style={{margin: '0 auto 1rem', color: '#d1d5db'}} />
            <p style={{color: '#6b7280'}}>No responses yet</p>
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {filteredResponses.map(r => (
              <div key={r.id} style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '1rem', flexWrap: 'wrap'}}>
                  <div>
                    <h4 style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#DC2626', margin: 0}}>{r.product}</h4>
                    <p style={{fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem'}}>{r.name || 'Anonymous'} • {r.timestamp}</p>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div style={{fontSize: '0.875rem', color: '#6b7280', textAlign: 'right'}}>
                      <p style={{margin: 0}}>Taste: {r.tasteRating}⭐</p>
                      <p style={{margin: 0}}>Price: {r.priceRating}⭐</p>
                      <p style={{margin: 0}}>Overall: {r.overallRating}⭐</p>
                    </div>
                    <button
                      onClick={() => handleDeleteResponse(r.id)}
                      style={{padding: '0.5rem', backgroundColor: '#fee2e2', color: '#DC2626', borderRadius: '0.375rem', border: 'none', cursor: 'pointer'}}
                      title="Delete response"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                {r.whatYouLiked && (
                  <div style={{marginBottom: '0.75rem'}}>
                    <p style={{fontSize: '0.875rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem'}}>😊 What they liked:</p>
                    <p style={{fontSize: '0.875rem', color: '#6b7280', backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.375rem', margin: 0}}>{r.whatYouLiked}</p>
                  </div>
                )}
                
                {r.whatToImprove && (
                  <div style={{marginBottom: '0.75rem'}}>
                    <p style={{fontSize: '0.875rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem'}}>💡 Suggestions for improvement:</p>
                    <p style={{fontSize: '0.875rem', color: '#6b7280', backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.375rem', margin: 0}}>{r.whatToImprove}</p>
                  </div>
                )}
                
                {r.suggestions && (
                  <div>
                    <p style={{fontSize: '0.875rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem'}}>💬 Additional suggestions:</p>
                    <p style={{fontSize: '0.875rem', color: '#6b7280', backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.375rem', margin: 0}}>{r.suggestions}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;