import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';

const CustomerSurvey = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    tasteRating: 0,
    priceRating: 0,
    overallRating: 0,
    whatYouLiked: '',
    whatToImprove: '',
    suggestions: '',
    name: ''
  });

  const saveResponse = (response) => {
    const saved = localStorage.getItem('nagimasen-responses');
    const responses = saved ? JSON.parse(saved) : [];
    const updated = [response, ...responses];
    localStorage.setItem('nagimasen-responses', JSON.stringify(updated));
  };

  const handleSubmit = () => {
    if (!formData.product || formData.tasteRating === 0 || formData.priceRating === 0 || formData.overallRating === 0) {
      alert('Please complete all required fields (Product and all star ratings)');
      return;
    }

    const response = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
    };

    saveResponse(response);
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      setFormData({
        product: '',
        tasteRating: 0,
        priceRating: 0,
        overallRating: 0,
        whatYouLiked: '',
        whatToImprove: '',
        suggestions: '',
        name: ''
      });
    }, 3000);
  };

  const StarRating = ({ rating, setRating, label }) => (
    <div style={{marginBottom: '1.5rem'}}>
      <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem'}}>
        {label} *
      </label>
      <div style={{display: 'flex', gap: '0.5rem'}}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0}}
          >
            <Star
              size={32}
              fill={star <= rating ? '#DC2626' : 'none'}
              color={star <= rating ? '#DC2626' : '#d1d5db'}
            />
          </button>
        ))}
      </div>
    </div>
  );

  if (showThankYou) {
    return (
      <div style={{minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'}}>
        <div style={{backgroundColor: '#ffffff', borderRadius: '1rem', padding: '3rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', textAlign: 'center', maxWidth: '400px'}}>
          <div style={{width: '80px', height: '80px', backgroundColor: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'}}>
            <Send size={40} color="#ffffff" />
          </div>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem'}}>Salamat! 🙏</h2>
          <p style={{color: '#6b7280', fontSize: '1rem', marginBottom: '0.5rem'}}>Thank you for your valuable feedback!</p>
          <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Your input helps us serve you better.</p>
          <p style={{color: '#DC2626', fontWeight: '500', marginTop: '1rem'}}>- Nagimasen Team</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f9fafb'}}>
      <div style={{backgroundColor: '#DC2626', color: '#ffffff', padding: '2rem 1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
        <div style={{maxWidth: '600px', margin: '0 auto', textAlign: 'center'}}>
          <h1 style={{fontSize: '2rem', fontWeight: 'bold', margin: 0, marginBottom: '0.5rem'}}>Nagimasen</h1>
          <p style={{fontSize: '1rem', color: '#fecaca', margin: 0}}>We'd love to hear from you!</p>
        </div>
      </div>

      <div style={{maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem'}}>
        <div style={{backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem'}}>Customer Feedback</h2>
          <p style={{color: '#6b7280', marginBottom: '2rem', fontSize: '0.875rem'}}>Your honest feedback helps us improve our products and service. Thank you! ❤️</p>

          <div>
            <div style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem'}}>
                Which product did you try? *
              </label>
              <select 
                value={formData.product} 
                onChange={(e) => setFormData({...formData, product: e.target.value})} 
                style={{
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '0.5rem', 
                  backgroundColor: '#ffffff', 
                  color: '#111827', 
                  outline: 'none', 
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                <option value="">-- Select a product --</option>
                <option value="Pinakbet Sushi Roll">🍣 Pinakbet Sushi Roll</option>
                <option value="Virgin Blue Lagoon">🍹 Virgin Blue Lagoon</option>
              </select>
            </div>

            <StarRating 
              rating={formData.tasteRating} 
              setRating={(r) => setFormData({...formData, tasteRating: r})} 
              label="How was the taste?" 
            />

            <StarRating 
              rating={formData.priceRating} 
              setRating={(r) => setFormData({...formData, priceRating: r})} 
              label="How about the price?" 
            />

            <StarRating 
              rating={formData.overallRating} 
              setRating={(r) => setFormData({...formData, overallRating: r})} 
              label="Overall experience?" 
            />

            <div style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem'}}>
                What did you like most? 😊
              </label>
              <textarea 
                value={formData.whatYouLiked} 
                onChange={(e) => setFormData({...formData, whatYouLiked: e.target.value})} 
                placeholder="Tell us what made you smile..."
                style={{
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '0.5rem', 
                  backgroundColor: '#ffffff', 
                  color: '#111827', 
                  outline: 'none', 
                  fontSize: '0.875rem', 
                  minHeight: '80px', 
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }} 
              />
            </div>

            <div style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem'}}>
                What can we improve? 💡
              </label>
              <textarea 
                value={formData.whatToImprove} 
                onChange={(e) => setFormData({...formData, whatToImprove: e.target.value})} 
                placeholder="We're always learning! Share your thoughts..."
                style={{
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '0.5rem', 
                  backgroundColor: '#ffffff', 
                  color: '#111827', 
                  outline: 'none', 
                  fontSize: '0.875rem', 
                  minHeight: '80px', 
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }} 
              />
            </div>

            <div style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem'}}>
                Any other suggestions? 💬
              </label>
              <textarea 
                value={formData.suggestions} 
                onChange={(e) => setFormData({...formData, suggestions: e.target.value})} 
                placeholder="Other thoughts or ideas..."
                style={{
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '0.5rem', 
                  backgroundColor: '#ffffff', 
                  color: '#111827', 
                  outline: 'none', 
                  fontSize: '0.875rem', 
                  minHeight: '80px', 
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }} 
              />
            </div>

            <div style={{marginBottom: '2rem'}}>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem'}}>
                Your name (Optional)
              </label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="Leave blank to stay anonymous"
                style={{
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '0.5rem', 
                  backgroundColor: '#ffffff', 
                  color: '#111827', 
                  outline: 'none', 
                  fontSize: '0.875rem'
                }} 
              />
            </div>

            <button 
              onClick={handleSubmit} 
              style={{
                width: '100%', 
                padding: '1rem', 
                backgroundColor: '#DC2626', 
                color: '#ffffff', 
                borderRadius: '0.5rem', 
                border: 'none', 
                cursor: 'pointer', 
                fontSize: '1rem', 
                fontWeight: '600', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#B91C1C'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#DC2626'}
            >
              <Send size={20} />
              Submit Feedback
            </button>

            <p style={{fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center', marginTop: '1rem'}}>
              🔒 Your feedback is private and helps us improve
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSurvey;