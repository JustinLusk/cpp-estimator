
import React, { useState } from 'react';

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

  const totalLabor = Math.ceil(project.length / 300) * crewRate;
  const totalCost = totalLabor + overhead + (mobilization.isPercent ? (mobilization.amount / 100) * totalLabor : mobilization.amount);
  const totalBid = totalCost * (1 + markup / 100);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Cobra CIPP Bid Tool</h1>
      <label>
        Project Name:
        <input value={project.name} onChange={e => setProject({ ...project, name: e.target.value })} />
      </label>
      <br />
      <label>
        Pipe Length (ft):
        <input type="number" value={project.length} onChange={e => setProject({ ...project, length: +e.target.value })} />
      </label>
      <br />
      <label>
        Crew Rate ($/day):
        <input type="number" value={crewRate} onChange={e => setCrewRate(+e.target.value)} />
      </label>
      <br />
      <label>
        Overhead:
        <input type="number" value={overhead} onChange={e => setOverhead(+e.target.value)} />
      </label>
      <br />
      <label>
        Mobilization:
        <input type="number" value={mobilization.amount} onChange={e => setMobilization({ ...mobilization, amount: +e.target.value })} />
        <input type="checkbox" checked={mobilization.isPercent} onChange={e => setMobilization({ ...mobilization, isPercent: e.target.checked })} /> %
      </label>
      <br />
      <label>
        Markup (%):
        <input type="number" value={markup} onChange={e => setMarkup(+e.target.value)} />
      </label>
      <hr />
      <h2>Total Bid: ${totalBid.toFixed(2)}</h2>
    </div>
  );
};

export default App;
