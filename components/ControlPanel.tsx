
import React from 'react';

interface ControlPanelProps {
  theta: number;
  phi: number;
  setTheta: (value: number) => void;
  setPhi: (value: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ theta, phi, setTheta, setPhi }) => {
  const thetaDegrees = Math.round((theta * 180) / Math.PI);
  const phiDegrees = Math.round((phi * 180) / Math.PI);

  const handleThetaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheta((Number(e.target.value) * Math.PI) / 180);
  };

  const handlePhiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhi((Number(e.target.value) * Math.PI) / 180);
  };
  
  const sliderClass = "w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-lg accent-cyan-500";

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Qubit Controls</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="theta" className="flex justify-between text-lg text-gray-300 mb-2">
            <span>Polar Angle (θ)</span>
            <span className="font-mono text-cyan-300">{thetaDegrees}°</span>
          </label>
          <input
            id="theta"
            type="range"
            min="0"
            max="180"
            step="1"
            value={thetaDegrees}
            onChange={handleThetaChange}
            className={sliderClass}
          />
        </div>
        <div>
          <label htmlFor="phi" className="flex justify-between text-lg text-gray-300 mb-2">
            <span>Azimuthal Angle (φ)</span>
            <span className="font-mono text-cyan-300">{phiDegrees}°</span>
          </label>
          <input
            id="phi"
            type="range"
            min="0"
            max="360"
            step="1"
            value={phiDegrees}
            onChange={handlePhiChange}
            className={sliderClass}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
