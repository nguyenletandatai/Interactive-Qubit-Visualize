
import React, { useRef, useEffect } from 'react';

// This tells TypeScript that `d3` is a global variable.
declare const d3: any;

interface BlochSphereProps {
  theta: number; // in radians
  phi: number;   // in radians
}

const BlochSphere: React.FC<BlochSphereProps> = ({ theta, phi }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const size = 500;
  const margin = 40;
  const radius = size / 2 - margin;

  // Effect for drawing the static sphere and axes (runs once)
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const projection = d3.geoOrthographic()
      .scale(radius)
      .translate([size / 2, size / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection);

    // Sphere background
    svg.append('path')
      .datum({ type: 'Sphere' })
      .attr('d', path)
      .attr('fill', 'rgba(30, 41, 59, 0.5)') // slate-800 with opacity
      .attr('stroke', '#475569') // slate-600
      .attr('stroke-width', 1.5);
      
    // Graticule (wireframe)
    svg.append('path')
      .datum(d3.geoGraticule().step([15, 15]))
      .attr('d', path)
      .attr('stroke', '#334155') // slate-700
      .attr('stroke-width', 0.5);

    // Equator
    svg.append('path')
        .datum({type: "LineString", coordinates: [[-180,0],[-90,0],[0,0],[90,0],[180,0]]})
        .attr('d', path)
        .attr('stroke', '#475569')
        .attr('stroke-width', 1)
        .attr('fill', 'none');


    // Axes lines
    const axesGroup = svg.append('g').attr('class', 'axes');
    const axisColor = '#64748b'; // slate-500
    const textColor = '#94a3b8'; // slate-400

    // Z-axis
    axesGroup.append('line').attr('x1', size / 2).attr('y1', margin).attr('x2', size / 2).attr('y2', size - margin).attr('stroke', axisColor);
    axesGroup.append('text').text('|0⟩').attr('x', size / 2 + 5).attr('y', margin - 5).attr('fill', textColor).attr('font-family', 'Roboto Mono');
    axesGroup.append('text').text('|1⟩').attr('x', size / 2 + 5).attr('y', size - margin + 15).attr('fill', textColor).attr('font-family', 'Roboto Mono');
    axesGroup.append('text').text('+Z').attr('x', size / 2 + 10).attr('y', margin + 15).attr('fill', axisColor).style('font-size', '10px');
    
    // X-axis
    axesGroup.append('line').attr('x1', margin).attr('y1', size / 2).attr('x2', size - margin).attr('y2', size / 2).attr('stroke', axisColor);
    axesGroup.append('text').text('|+⟩').attr('x', size - margin + 5).attr('y', size / 2 + 5).attr('fill', textColor).attr('font-family', 'Roboto Mono');
    axesGroup.append('text').text('+X').attr('x', size - margin - 15).attr('y', size / 2 - 10).attr('fill', axisColor).style('font-size', '10px');

    // Y-axis label (no line for 3D effect)
    axesGroup.append('text').text('|i⟩').attr('x', size / 2 + 5).attr('y', size / 2 + radius + 15).attr('fill', textColor).attr('font-family', 'Roboto Mono');
    axesGroup.append('text').text('+Y').attr('x', size / 2 + radius - 15).attr('y', size / 2 - 10).attr('fill', axisColor).style('font-size', '10px');

    // Arrowhead marker definition
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 10)
      .attr('refY', 0)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#f59e0b'); // amber-500
        
  }, [radius]); // Only re-run if size changes

  // Effect for updating the state vector
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    
    const projection = d3.geoOrthographic()
      .scale(radius)
      .translate([size / 2, size / 2])
      .clipAngle(90);

    // Convert angles to degrees for D3
    const phiDegrees = phi * 180 / Math.PI;
    const thetaDegrees = theta * 180 / Math.PI;

    // Map physics spherical coords to geographic coords for D3
    // longitude: phi, latitude: 90 - theta
    const coords: [number, number] = [phiDegrees, 90 - thetaDegrees];
    const projectedEndPoint = projection(coords);

    // Remove old vector
    svg.select('.state-vector-group').remove();

    if (projectedEndPoint) {
      const [x2, y2] = projectedEndPoint;
      const x1 = size / 2;
      const y1 = size / 2;

      const vectorGroup = svg.append('g').attr('class', 'state-vector-group');

      // Draw the vector line
      vectorGroup.append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', '#f59e0b') // amber-500
        .attr('stroke-width', 2.5)
        .attr('marker-end', 'url(#arrowhead)');
    }
    
  }, [theta, phi, radius]);

  return <svg ref={svgRef} viewBox={`0 0 ${size} ${size}`} className="w-full h-full" />;
};

export default BlochSphere;
