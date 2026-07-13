import React, { useState, useEffect } from 'react';
import './App.css';

const BACKEND_URL = 'https://bmi-qrfh.onrender.com';

const apiCall = async (endpoint, method = 'GET', body = null) => {
  const options = {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {}
  };
  if (body) options.body = JSON.stringify(body);
  
  try {
    const res = await fetch(`${BACKEND_URL}${endpoint}`, options);
    return res.status !== 204 ? await res.json() : null;
  } catch (err) {
    console.error(`API Error (${method} ${endpoint}):`, err);
    throw err;
  }
};

function App() {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    apiCall('/api/bmi')
      .then((data) => setHistory(data))
      .catch((err) => console.error(err));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const hInFeet = parseFloat(height);
    const wInKg = parseFloat(weight);
    
    if (isNaN(hInFeet) || isNaN(wInKg) || hInFeet <= 0 || wInKg <= 0) {
      alert("Please enter valid height and weight values.");
      return;
    }

    const heightInMeters = hInFeet * 0.3048;
    const bmiValue = parseFloat((wInKg / (heightInMeters * heightInMeters)).toFixed(1));

    let category = '';
    if (bmiValue < 18.5) category = 'Underweight';
    else if (bmiValue >= 18.5 && bmiValue < 25) category = 'Normal';
    else if (bmiValue >= 25 && bmiValue < 30) category = 'Overweight';
    else if (bmiValue >= 30 && bmiValue < 35) category = 'Obese Class I';
    else category = 'Obese Class II';

    const payload = { name, bmi: bmiValue, category };

    try {
      if (isEditing) {
        const updatedRecord = await apiCall(`/api/bmi/${editId}`, 'PUT', payload);
        setHistory(history.map(item => item._id === editId ? updatedRecord : item));
        setResult({ ...updatedRecord, message: 'Record updated successfully!' });
        setIsEditing(false);
        setEditId(null);
      } else {
        const newRecord = await apiCall('/api/bmi', 'POST', payload);
        setResult({ ...newRecord, message: 'Calculation successful!' });
        setHistory([newRecord, ...history]);
      }
    } catch (err) {
      console.error(err);
    }

    setName('');
    setHeight('');
    setWeight('');
  };

  const startEdit = (item) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setName(item.name);
    setHeight(item.rawHeight || "5.6");
    setWeight(item.rawWeight || "60");
    setIsEditing(true);
    setEditId(item._id);
  };

  const deleteRecord = async (id) => {
    try {
      await apiCall(`/api/bmi/${id}`, 'DELETE');
      setHistory(history.filter(item => item._id !== id));
      if (result && result._id === id) {
        setResult(null);
      }
      if (editId === id) {
        setIsEditing(false);
        setEditId(null);
        setName('');
        setHeight('');
        setWeight('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getPointerRotation = (bmi) => {
    if (!bmi) return -90; 
    const minBmi = 15;
    const maxBmi = 40;
    const percentage = Math.min(Math.max((bmi - minBmi) / (maxBmi - minBmi), 0), 1);
    return -90 + percentage * 180;
  };

  return (
    <div className="app-layout-container">
      {/* Centered Top Heading */}
      <header className="site-header">
        <div className="site-brand">
          <div className="logo" aria-hidden="true"></div>
          <div className="site-title">BMI Tracker</div>
        </div>
        <div className="site-subtitle">Quick, friendly BMI calculations & logs</div>
      </header>

      {/* Main Dual Panels */}
      <div className="app-wrapper">
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <div className="input-group">
              <label>NAME</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter Name"
                required
              />
            </div>
            
            <div className="input-group">
              <label>HEIGHT (FEET)</label>
              <input 
                type="text" 
                value={height} 
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^[0-9.]*$/.test(val)) {
                    setHeight(val);
                  }
                }} 
                placeholder="Enter Height in feet (e.g. 5.6)"
                required
              />
            </div>

            <div className="input-group">
              <label>WEIGHT (KG)</label>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
                placeholder="Enter Weight in kg"
                required
              />
            </div>
            
            <button type="submit" className={isEditing ? 'btn-update' : ''}>
              {isEditing ? '💡 Update & Save Log' : 'Calculate & Save'}
            </button>
            
            {isEditing && (
              <button 
                type="button" 
                className="btn-cancel"
                onClick={() => {
                  setIsEditing(false);
                  setEditId(null);
                  setName('');
                  setHeight('');
                  setWeight('');
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>

          {result && (
            <div className="result">
              <h4 style={{ color: '#ffffff', margin: '0 0 10px 0', opacity: 0.9 }}>{result.message}</h4>
              <h3 style={{ color: '#ffffff', marginBottom: '6px' }}>Result for {result.name}</h3>
              <p style={{ color: '#ffffff', margin: '4px 0' }}><strong>BMI:</strong> {result.bmi}</p>
              <p style={{ color: '#ffffff', margin: '4px 0' }}><strong>Category:</strong> {result.category}</p>
            </div>
          )}

          {history.length > 0 && (
            <div style={{ marginTop: '35px' }}>
              <h3 style={{ color: '#ffffff', textAlign: 'center', marginBottom: '15px' }}>History Logs</h3>
              <div style={{ maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }} className="scrollbar-thin">
                {history.map((item) => (
                  <div key={item._id} className="history-item">
                    <div style={{ flex: 1, paddingRight: '10px' }}>
                      <strong>{item.name}</strong>: {item.bmi} ({item.category})
                    </div>
                    <div className="history-actions">
                      <button className="edit-btn" onClick={() => startEdit(item)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => deleteRecord(item._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Result View</h3>
          
          <div className="gauge-wrapper">
            <div className="gauge-body">
              <div className="gauge-segment underweight"></div>
              <div className="gauge-segment normal"></div>
              <div className="gauge-segment overweight"></div>
              <div className="gauge-segment obese1"></div>
              <div className="gauge-segment obese2"></div>
              <div className="gauge-core"></div>
              
              <div 
                className="gauge-pointer-wrapper" 
                style={{ transform: `rotate(${getPointerRotation(result ? result.bmi : null)}deg)` }}
              >
                <div className="gauge-pointer"></div>
              </div>
            </div>
            
            <div className="gauge-value-display">
              <span className="gauge-value-num" style={{ color: result?.category === 'Normal' ? '#10b981' : 'var(--primary)' }}>
                {result ? result.bmi : '--.-'}
              </span>
              <span className="gauge-value-text" style={{ color: result?.category === 'Normal' ? '#10b981' : '#64748b' }}>
                {result ? result.category : 'No calculation yet'}
              </span>
            </div>

            <div className="gauge-labels">
              <span className="lbl-15">15.0</span>
              <span className="lbl-18">18.5</span>
              <span className="lbl-25">25.0</span>
              <span className="lbl-30">30.0</span>
              <span className="lbl-35">35.0</span>
              <span className="lbl-40">40.0</span>
            </div>
          </div>

          <div className="chart-legend">
            <div className="legend-item"><span className="dot uw-dot"></span> Underweight</div>
            <div className="legend-item"><span className="dot nw-dot"></span> Normal</div>
            <div className="legend-item"><span className="dot ow-dot"></span> Overweight</div>
            <div className="legend-item"><span className="dot o1-dot"></span> Obese Class I</div>
            <div className="legend-item"><span className="dot o2-dot"></span> Obese Class II</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
