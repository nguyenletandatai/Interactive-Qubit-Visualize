
import React from 'react';

interface StateVectorDisplayProps {
  theta: number;
  phi: number;
}

const StateVectorDisplay: React.FC<StateVectorDisplayProps> = ({ theta, phi }) => {
  const alpha = Math.cos(theta / 2);
  const beta_mag = Math.sin(theta / 2);
  const beta_real = Math.cos(phi) * beta_mag;
  const beta_imag = Math.sin(phi) * beta_mag;

  const formatNumber = (n: number): string => {
    if (Math.abs(n) < 1e-10) return '0.000';
    return n.toFixed(3);
  };
  
  const betaImagSign = beta_imag >= 0 ? '+' : '-';
  const betaImagAbs = formatNumber(Math.abs(beta_imag));
  
  const betaString = `(${formatNumber(beta_real)} ${betaImagSign} ${betaImagAbs}i)`;

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">State Vector |ψ⟩</h2>
      <div className="bg-gray-900 rounded-md p-4 font-mono text-lg sm:text-xl text-left overflow-x-auto whitespace-nowrap">
        <span className="text-gray-300">|ψ⟩ = </span>
        <span className="text-amber-400">{formatNumber(alpha)}</span>
        <span className="text-pink-400">|0⟩</span>
        <span className="text-gray-300"> + </span>
        <span className="text-amber-400">{betaString}</span>
        <span className="text-pink-400">|1⟩</span>
      </div>
    </div>
  );
};

export default StateVectorDisplay;
