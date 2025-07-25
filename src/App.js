import React, { useState } from 'react';

function App() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [childAges, setChildAges] = useState([]);
  const [breakfast, setBreakfast] = useState('Evet');
  const [note, setNote] = useState('');

  const generateRequestId = () => Math.floor(100000 + Math.random() * 900000);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  };

  const handleChildCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setChildren(count);
    setChildAges(Array(count).fill(''));
  };

  const handleChildAgeChange = (index, value) => {
    const updatedAges = [...childAges];
    updatedAges[index] = value;
    setChildAges(updatedAges);
  };

  const handleSubmit = () => {
    if (!checkIn || !checkOut || !adults) {
      alert("Lütfen giriş, çıkış tarihi ve yetişkin sayısını doldurunuz.");
      return;
    }

    const talepNo = generateRequestId();

    const childAgesText =
      childAges.length > 0
        ? childAges.map((age, i) => `Çocuk ${i + 1} yaşı: ${age || '-'}`).join('\n')
        : '';

    const message = `
${formatDate(checkIn)}
${formatDate(checkOut)}
${adults} yetişkin
${children ? `${children} çocuk` : ''}
${breakfast ? `kahvaltı: ${breakfast.toLowerCase()}` : ''}
${childAgesText}
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

      <label>Giriş Tarihi <span style={required}>*</span></label>
      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} style={input} />

      <label>Çıkış Tarihi <span style={required}>*</span></label>
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        min={checkIn}
        style={input}
      />

      <label>Yetişkin Sayısı <span style={required}>*</span></label>
      <input type="number" min="0" value={adults} onChange={(e) => setAdults(e.target.value)} style={input} />

      <label>Çocuk Sayısı <span style={{ color: '#999' }}>(0-12 yaş)</span></label>
      <input
        type="number"
        min="0"
        value={children}
        onChange={handleChildCountChange}
        style={input}
      />

      {childAges.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          {childAges.map((age, index) => (
            <input
              key={index}
              placeholder={`Çocuk ${index + 1} Yaşı`}
              value={age}
              onChange={(e) => handleChildAgeChange(index, e.target.value)}
              style={{ ...input, marginTop: 6 }}
            />
          ))}
        </div>
      )}

      <label>Kahvaltı</label>
      <select value={breakfast} onChange={(e) => setBreakfast(e.target.value)} style={input}>
        <option value="Evet">Evet</option>
        <option value="Hayır">Hayır</option>
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
  maxWidth: '100%',
  width: 480,
  margin: '30px auto',
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
  boxSizing: 'border-box',
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

const required = {
  color: 'red',
  fontWeight: 'bold',
};

export default App;
