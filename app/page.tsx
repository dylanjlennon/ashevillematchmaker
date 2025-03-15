"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import neighborhoods from "@/lib/neighborhood-data";

export default function ComparePage() {
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState([]);
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    console.log("Google Maps script loaded");
    const sortedNeighborhoods = [...neighborhoods].sort((a, b) => a.name.localeCompare(b.name));
    setAvailableNeighborhoods(sortedNeighborhoods);
  }, []);

  useEffect(() => {
    if (selectedNeighborhoods.length > 0) {
      localStorage.setItem("comparedNeighborhoods", JSON.stringify(selectedNeighborhoods));
    }
  }, [selectedNeighborhoods]);

  const handleAddNeighborhood = (e) => {
    const id = parseInt(e.target.value);
    if (isNaN(id)) return;

    const neighborhood = neighborhoods.find((n) => n.id === id);
    if (!neighborhood) return;

    if (selectedNeighborhoods.some((n) => n.id === id)) {
      alert("This neighborhood is already selected");
      return;
    }

    if (selectedNeighborhoods.length >= 3) {
      alert("You can compare up to 3 neighborhoods at a time");
      return;
    }

    setSelectedNeighborhoods([...selectedNeighborhoods, neighborhood]);
    e.target.value = ""; // Reset select
  };

  const handleRemoveNeighborhood = (id) => {
    setSelectedNeighborhoods(selectedNeighborhoods.filter((n) => n.id !== id));
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`}
        strategy="afterInteractive"
      />

      <div className="max-w-6xl mx-auto p-6 bg-white text-gray-800">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">Compare Neighborhoods</h1>

        <div className="mb-8 bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-grow">
              <label className="block mb-2 text-gray-700">Add a neighborhood to compare:</label>
              <select
                onChange={handleAddNeighborhood}
                className="w-full p-2 border border-gray-300 rounded text-gray-800"
                disabled={selectedNeighborhoods.length >= 3}
              >
                <option value="">Select a neighborhood...</option>
                {availableNeighborhoods.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name} ({n.area})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {selectedNeighborhoods.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-orange-100 to-blue-100">
                  <th className="p-4 text-left w-1/4 text-blue-800">Feature</th>
                  {selectedNeighborhoods.map((neighborhood) => (
                    <th key={neighborhood.id} className="p-4 text-left text-blue-800">
                      {neighborhood.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold bg-gray-50 text-gray-800">Area</td>
                  {selectedNeighborhoods.map((n) => (
                    <td key={`${n.id}-area`} className="p-4 bg-white text-gray-700">{n.area}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-800">Median Price</td>
                  {selectedNeighborhoods.map((n) => (
                    <td key={`${n.id}-price`} className="p-4 text-gray-700">{n.median_price}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
