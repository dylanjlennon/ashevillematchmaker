'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import neighborhoods from '@/lib/neighborhood-data'

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Asheville Neighborhood Matchmaker</h1>
    </main>
  );
}

export default function ComparePage() {
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState([])
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState([])
  const [mapLoaded, setMapLoaded] = useState(false)
  
  useEffect(() => {
    // Sort neighborhoods alphabetically for the dropdown
    const sortedNeighborhoods = [...neighborhoods].sort((a, b) => a.name.localeCompare(b.name))
    setAvailableNeighborhoods(sortedNeighborhoods)
    
    // Try to get previously selected neighborhoods from localStorage
    const storedSelections = localStorage.getItem('comparedNeighborhoods')
    if (storedSelections) {
      try {
        const parsed = JSON.parse(storedSelections)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSelectedNeighborhoods(parsed)
        }
      } catch (e) {
        console.error('Error parsing stored neighborhoods:', e)
      }
    } else {
      // If no stored selections, try to get top matches from results
      const storedResults = localStorage.getItem('matchedNeighborhoods')
      if (storedResults) {
        try {
          const parsed = JSON.parse(storedResults)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSelectedNeighborhoods(parsed.slice(0, 3))
          }
        } catch (e) {
          console.error('Error parsing stored results:', e)
        }
      }
    }
  }, [])
  
  useEffect(() => {
    if (selectedNeighborhoods.length > 0) {
      // Store selections in localStorage
      localStorage.setItem('comparedNeighborhoods', JSON.stringify(selectedNeighborhoods))
    }
    
    // Update map if loaded
    if (mapLoaded && selectedNeighborhoods.length > 0) {
      updateMap()
    }
  }, [selectedNeighborhoods, mapLoaded])
  
  const handleMapLoad = () => {
    setMapLoaded(true)
  }
  
  const updateMap = () => {
    const mapElement = document.getElementById('compare-map')
    if (mapElement && window.google && window.google.maps && selectedNeighborhoods.length > 0) {
      // Calculate center point of selected neighborhoods
      let totalLat = 0
      let totalLng = 0
      let validCoords = 0
      
      selectedNeighborhoods.forEach(n => {
        if (n.map_coordinates) {
          totalLat += n.map_coordinates.lat
          totalLng += n.map_coordinates.lng
          validCoords++
        }
      })
      
      const center = validCoords > 0 
        ? { lat: totalLat / validCoords, lng: totalLng / validCoords }
        : { lat: 35.5951, lng: -82.5515 } // Default to downtown Asheville
      
      const map = new window.google.maps.Map(mapElement, {
        center,
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      })
      
      // Add markers for each selected neighborhood
      selectedNeighborhoods.forEach((neighborhood, index) => {
        if (neighborhood.map_coordinates) {
          const marker = new window.google.maps.Marker({
            position: { 
              lat: neighborhood.map_coordinates.lat, 
              lng: neighborhood.map_coordinates.lng 
            },
            map,
            title: neighborhood.name,
            label: {
              text: `${index + 1}`,
              color: 'white'
            },
            animation: window.google.maps.Animation.DROP
          })
          
          // Add info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="max-width: 200px;">
                <h3 style="font-weight: bold; margin-bottom: 5px;">${neighborhood.name}</h3>
                <p style="font-size: 0.9em;">${neighborhood.area} Asheville</p>
                <p style="font-size: 0.9em;">Median Price: ${neighborhood.median_price}</p>
              </div>
            `
          })
          
          marker.addListener('click', () => {
            infoWindow.open(map, marker)
          })
        }
      })
    }
  }
  
  const handleAddNeighborhood = (e) => {
    const id = parseInt(e.target.value)
    if (isNaN(id)) return
    
    const neighborhood = neighborhoods.find(n => n.id === id)
    if (!neighborhood) return
    
    if (selectedNeighborhoods.some(n => n.id === id)) {
      alert('This neighborhood is already selected')
      return
    }
    
    if (selectedNeighborhoods.length >= 3) {
      alert('You can compare up to 3 neighborhoods at a time')
      return
    }
    
    setSelectedNeighborhoods([...selectedNeighborhoods, neighborhood])
    e.target.value = '' // Reset select
  }
  
  const handleRemoveNeighborhood = (id) => {
    setSelectedNeighborhoods(selectedNeighborhoods.filter(n => n.id !== id))
  }
  
  const handleShareComparison = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Asheville Neighborhood Comparison',
        text: `Check out my comparison of these Asheville neighborhoods: ${selectedNeighborhoods.map(n => n.name).join(', ')}`,
        url: window.location.href
      })
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }
  
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places`}
        onLoad={handleMapLoad}
      />
      
      <div className="max-w-6xl mx-auto p-6 bg-white text-gray-800">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">Compare Neighborhoods</h1>
        
        <div className="mb-8 bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-blue-800">Select Neighborhoods to Compare</h2>
              <p className="text-gray-700">Choose up to 3 neighborhoods to compare side by side</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              <button 
                onClick={handleShareComparison}
                className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-full text-sm flex items-center"
                disabled={selectedNeighborhoods.length === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Comparison
              </button>
              
              <Link 
                href="/contact"
                className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-full text-sm flex items-center"
                disabled={selectedNeighborhoods.length === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Chat with Dylan
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-grow">
              <label className="block mb-2 text-gray-700">Add a neighborhood to compare:</label>
              <select 
                onChange={handleAddNeighborhood}
                className="w-full p-2 border border-gray-300 rounded text-gray-800"
                disabled={selectedNeighborhoods.length >= 3}
              >
                <option value="">Select a neighborhood...</option>
                {availableNeighborhoods.map(n => (
                  <option key={n.id} value={n.id}>{n.name} ({n.area})</option>
                ))}
              </select>
            </div>
            
            <Link 
              href="/quiz"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
            >
              Take Quiz for Matches
            </Link>
          </div>
          
          {selectedNeighborhoods.length === 0 && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center text-gray-700">
              <p>Select neighborhoods to compare or take the quiz to get matched neighborhoods</p>
            </div>
          )}
        </div>
        
        {/* Map View */}
        {selectedNeighborhoods.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Map View</h2>
            <div id="compare-map" className="w-full h-80 rounded-lg border border-gray-300"></div>
            <p className="mt-3 text-sm text-gray-600">Numbers on the map correspond to the neighborhoods below.</p>
          </div>
        )}
        
        {selectedNeighborhoods.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-orange-100 to-blue-100">
                  <th className="p-4 text-left w-1/4 text-blue-800">Feature</th>
                  {selectedNeighborhoods.map((neighborhood, index) => (
                    <th key={neighborhood.id} className="p-4 text-left text-blue-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-xs">
                            {index + 1}
                          </div>
                          <span>{neighborhood.name}</span>
                        </div>
                        <button 
                          onClick={() => handleRemoveNeighborhood(neighborhood.id)}
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="Remove neighborhood"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold bg-gray-50 text-gray-800">Area</td>
                  {selectedNeighborhoods.map(n => (
                    <td key={`${n.id}-area`} className="p-4 bg-white text-gray-700">{n.area}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-800">Median Price</td>
                  {selectedNeighborhoods.map(n => (
                    <td key={`${n.id}-price`} className="p-4 text-gray-700">{n.median_price}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold bg-gray-50 text-gray-800">Housing Types</td>
                  {selectedNeighborhoods.map(n => (
                    <td key={`${n.id}-housing`} className="p-4 bg-gray-50 text-gray-700">{n.housing_types}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-800">Distance to Airport</td>
                  {selectedNeighborhoods.map(n => (
                    <td key={`${n.id}-airport`} className="p-4 text-gray-700">{n.distance_to_airport}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold bg-gray-50 text-gray-800">Walkability</td>
                  {selectedNeighborhoods.map(n => (
                    <td key={`${n.id}-walk`} className="p-4 bg-gray-50 text-gray-700">{n.walkability}/10</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-800">Dining Options</td>
                  {selectedNeighborhoods.map(n => (
                    <td key={`${n.id}-dining`} className="p-4 text-gray-700">{n.amenities.dining_options}/10</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold bg-gray-50 text-gray-800">Shopping</td>
                  {selectedNeighborhoods.map(n => (
                    <td key={`${n.id}-shopping`} className="p-4 bg-gray-50 text-gray-700">{n.amenities.shopping}/10</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-800">Breweries/Bars</td>
                  {selectedNeighborhoods.map(n => (
                    <td key={`${n.id}-breweries`} className="p-4 text-gray-700">{n.amenities.breweries_bars}/10</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold bg-gray-50 text-gray-800">Coffee Shops</td>
                  {selectedNeighborhoods.map(n => (
                    <td key={`${n.id}-coffee`} className="p-4 bg-gray-50 text-gray-700">{n.amenities.coffee_shops}/10</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-800">Parks & Green Spaces</td>
                  {selectedNeighborhoods.map(n => (
                    <td key={`${n.id}-parks`} className="p-4 text-gray-700">{n.amenities.parks_green_spaces}/10</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold bg-gray-50 text-gray-800">Arts & Culture</td>
                  {selectedNeighborhoods.map(n => (
                    <td key={`${n.id}-arts`} className="p-4 bg-gray-50 text-gray-700">{n.amenities.arts_culture}/10</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-800">Nightlife</td>
                  {selectedNeighborhoods.map(n => (
                    <td key={`${n.id}-nightlife`} className="p-4 text-gray-700">{n.amenities.nightlife}/10</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold bg-gray-50 text-gray-800">Urban vs. Suburban</td>
                  {selectedNeighborhoods.map(n => (
                    <td key={`${n.id}-urban`} className="p-4 bg-gray-50 text-gray-700">
                      {n.characteristics.urban_suburban_scale}/10
                      <div className="text-xs text-gray-500">
                        {n.characteristics.urban_suburban_scale > 7 ? 'Mor<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>
