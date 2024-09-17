import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    import_price: '',
    selling_price: '',
    investment_amount: '',
    target_roas: '',
    vat: true
  });
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateResults = () => {
    const importPrice = parseFloat(inputs.import_price);
    const sellingPrice = parseFloat(inputs.selling_price);
    const investmentAmount = parseFloat(inputs.investment_amount);
    const targetROAS = parseFloat(inputs.target_roas);
    const includeVAT = inputs.vat;

    const vatRate = 0.19;

    const vat = includeVAT ? (sellingPrice * vatRate * investmentAmount) / importPrice : 0;
    const revenue = includeVAT ? sellingPrice / (1 + vatRate) : sellingPrice;
    const cogs = importPrice;
    const grossProfit = revenue - cogs;
    const advertisingCost = revenue / targetROAS;
    const netProfit = grossProfit - advertisingCost;

    const profitRon = (netProfit / importPrice) * (sellingPrice / 600);
    const roi = (profitRon / investmentAmount) * 100;
    const estimatedProfit = profitRon * (investmentAmount / sellingPrice) * 6;
    const totalCapital = investmentAmount + estimatedProfit;

    setResults({
      profit_ron: profitRon.toFixed(2),
      roi: roi.toFixed(2),
      estimated_profit: estimatedProfit.toFixed(2),
      total_capital: totalCapital.toFixed(2),
      vat: vat.toFixed(6)
    });
  };

  return (
      <div className="App">
        <h1>VAT Calculator</h1>
        <div className="input-group">
          <input
              type="number"
              name="import_price"
              placeholder="Import Price"
              value={inputs.import_price}
              onChange={handleInputChange}
          />
          <input
              type="number"
              name="selling_price"
              placeholder="Selling Price"
              value={inputs.selling_price}
              onChange={handleInputChange}
          />
          <input
              type="number"
              name="investment_amount"
              placeholder="Investment Amount"
              value={inputs.investment_amount}
              onChange={handleInputChange}
          />
          <input
              type="number"
              name="target_roas"
              placeholder="Target ROAS"
              value={inputs.target_roas}
              onChange={handleInputChange}
          />
          <label>
            <input
                type="checkbox"
                name="vat"
                checked={inputs.vat}
                onChange={handleInputChange}
            />
            Include VAT
          </label>
        </div>
        <button onClick={calculateResults}>Calculate</button>
        {results && (
            <div className="results">
              <h2>Results</h2>
              <p>Profit RON: {results.profit_ron}</p>
              <p>ROI: {results.roi}%</p>
              <p>Estimated Profit: {results.estimated_profit}</p>
              <p>Total Capital: {results.total_capital}</p>
              <p>VAT: {results.vat}</p>
            </div>
        )}
      </div>
  );
}

export default App;