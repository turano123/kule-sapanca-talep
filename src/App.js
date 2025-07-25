import React, { useState } from 'react';

function App() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [pet, setPet] = useState('Yok');
  const [note, setNote] = useState('');

  const generateRequestId = () => Math.floor(100000 + Math.random() * 900000);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  };

  const handleSubmit = () => {
    if (!checkIn || !checkOut || !adults || !children) {
      alert("Lütfen tüm alanları doldurunuz.");
      return;
    }

    const talepNo = generateRequestId();

    const message = `
${formatDate(checkIn)}
${formatDate(checkOut)}
${adults} yetişkin
${children} çocuk
evcil hayvan ${pet.toLowerCase()}
not: ${note || 'Yok'}

Talep No: ${talepNo}
    `;

    const encoded = encodeURIComponent(message.trim());
    const phone = '905431665454';
    const link = `https://wa.me/${phone}?text=${encoded}`;
    window.open(link, '_blank');
  };

  return (
    <div style={container}>
      <h2 style={{ textAlign: 'center', color: '#0a7c66', marginBottom: 20 }}>
        Kule Sapanca WhatsApp Rezervasyon Talep Formu
      </h2>

      <label>Giriş Tarihi</label>
      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} style={input} />

      <label>Çıkış Tarihi</label>
      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} style={input} />

      <label>Yetişkin Sayısı</label>
      <input type="number" min="0" value={adults} onChange={(e) => setAdults(e.target.value)} style={input} />

      <label>Çocuk Sayısı</label>
      <input type="number" min="0" value={children} onChange={(e) => setChildren(e.target.value)} style={input} />

      <label>Evcil Hayvan</label>
      <select value={pet} onChange={(e) => setPet(e.target.value)} style={input}>
        <option>Yok</option>
        <option>Var</option>
      </select>

      <label>Not / Açıklama</label>
      <textarea
        placeholder="Talepleriniz, özel istekleriniz varsa yazabilirsiniz..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        style={{ ...input, resize: 'vertical' }}
      />

      <button onClick={handleSubmit} style={button}>WhatsApp'tan Gönder 💬</button>
    </div>
  );
}

const container = {
  maxWidth: 450,
  margin: '50px auto',
  padding: 20,
  background: '#fff',
  borderRadius: 10,
  boxShadow: '0 0 20px rgba(0,0,0,0.1)',
  fontFamily: 'Arial',
};

const input = {
  width: '100%',
  padding: 10,
  marginBottom: 12,
  fontSize: 16,
  borderRadius: 5,
  border: '1px solid #ccc',
};

const button = {
  width: '100%',
  padding: 12,
  fontSize: 18,
  backgroundColor: '#25D366',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
};

export default App;
