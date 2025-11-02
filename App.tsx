
import React, { useState } from 'react';
import BlochSphere from './components/BlochSphere';
import ControlPanel from './components/ControlPanel';
import StateVectorDisplay from './components/StateVectorDisplay';

export default function App() {
  const [theta, setTheta] = useState<number>(Math.PI / 2);
  const [phi, setPhi] = useState<number>(Math.PI / 4);

  return (
    <main className="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Interactive Qubit Visualizer
          </h1>
          <p className="mt-2 text-lg text-gray-400 max-w-3xl mx-auto">
            Explore the state of a quantum bit on the Bloch sphere. Adjust the polar (θ) and azimuthal (φ) angles to see the state vector and its corresponding mathematical representation update in real-time.
          </p>
        </header>
        
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-gray-800/50 rounded-xl shadow-2xl p-4 flex justify-center items-center aspect-square lg:aspect-auto">
            <BlochSphere theta={theta} phi={phi} />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-8">
            <ControlPanel
              theta={theta}
              phi={phi}
              setTheta={setTheta}
              setPhi={setPhi}
            />
            <StateVectorDisplay theta={theta} phi={phi} />
          </div>
        </div>
      </div>
    </main>
  );
}
