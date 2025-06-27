
import React, { useState } from 'react';

const linerOptions = [
  { diameter: '6', thickness: '4.5', wetPrice: 11.35, dryPrice: 3.51 },
  { diameter: '6', thickness: '6', wetPrice: 12.50, dryPrice: 3.71 },
  { diameter: '8', thickness: '4.5', wetPrice: 14.25, dryPrice: 4.05 },
  { diameter: '8', thickness: '6', wetPrice: 15.10, dryPrice: 4.25 },
  { diameter: '10', thickness: '6', wetPrice: 18.75, dryPrice: 5.11 },
  { diameter: '12', thickness: '6', wetPrice: 21.00, dryPrice: 5.95 }
];

const App = () => {
  const [project, setProject] = useState({
    name: '',
    length: 0,
    diameter: '',
    thickness: '',
    location: ''
  });

  const [crewRate, setCrewRate] = useState(2500);
  const [markup, setMarkup] = useState(20);
  const [overhead, setOverhead] = useState(0);
  const [mobilization, setMobilization] = useState({ amount: 0, isPercent: false });

  const linerMatch = linerOptions.find(
    opt => opt.diameter === project.diameter && opt.thickness === project.thickness
  );

  const wetCost = linerMatch ? (linerMatch.wetPrice * project.length) : 0;
  const dryCost = linerMatch ? (linerMatch.dryPrice * project.length) : 0;
  const crewDays = Math.ceil(project.length / 300);
  const laborCost = crewDays * crewRate;
  const mobilizationCost = mobilization.isPercent
    ? (mobilization.amount / 100) * (wetCost + laborCost)
    : mobilization.amount;

  const totalBeforeMarkup = wetCost + laborCost + overhead + mobilizationCost;
  const totalBid = totalBeforeMarkup * (1 + markup / 100);

  const uniqueDiameters = [...new Set(linerOptions.map(l => l.diameter))];
  const filteredThicknesses = linerOptions
    .filter(l => l.diameter === project.diameter)
    .map(l => l.thickness);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Cobra CIPP Bid Tool</h1>
      <label>Project Name:<br />
        <input value={project.name} onChange={e => setProject({ ...project, name: e.target.value })} />
      </label><br /><br />
      <label>Pipe Length (ft):<br />
        <input type="number" value={project.length} onChange={e => setProject({ ...project, length: +e.target.value })} />
      </label><br /><br />
      <label>Pipe Diameter:<br />
        <select value={project.diameter} onChange={e => setProject({ ...project, diameter: e.target.value, thickness: '' })}>
          <option value="">Select</option>
          {uniqueDiameters.map(d => <option key={d} value={d}>{d}"</option>)}
        </select>
      </label><br /><br />
      {project.diameter && (
        <label>Wall Thickness (mm):<br />
          <select value={project.thickness} onChange={e => setProject({ ...project, thickness: e.target.value })}>
            <option value="">Select</option>
            {filteredThicknesses.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
      )}<br /><br />
      <label>Crew Rate ($/day):<br />
        <input type="number" value={crewRate} onChange={e => setCrewRate(+e.target.value)} />
      </label><br /><br />
      <label>Overhead:<br />
        <input type="number" value={overhead} onChange={e => setOverhead(+e.target.value)} />
      </label><br /><br />
      <label>Mobilization:<br />
        <input type="number" value={mobilization.amount} onChange={e => setMobilization({ ...mobilization, amount: +e.target.value })} />
        <label>
          <input type="checkbox" checked={mobilization.isPercent} onChange={e => setMobilization({ ...mobilization, isPercent: e.target.checked })} />
          as %
        </label>
      </label><br /><br />
      <label>Markup (%):<br />
        <input type="number" value={markup} onChange={e => setMarkup(+e.target.value)} />
      </label>
      <hr />
      <div>
        <strong>Wet Liner Cost:</strong> ${wetCost.toFixed(2)}<br />
        <strong>Dry Liner Cost:</strong> ${dryCost.toFixed(2)}<br />
        <strong>Labor Cost:</strong> ${laborCost.toFixed(2)}<br />
        <strong>Mobilization:</strong> ${mobilizationCost.toFixed(2)}<br />
        <strong>Overhead:</strong> ${overhead.toFixed(2)}<br />
        <strong>Total (Before Markup):</strong> ${totalBeforeMarkup.toFixed(2)}<br />
        <strong>Total Bid:</strong> ${totalBid.toFixed(2)}
      </div>
    </div>
  );
};

export default App;
