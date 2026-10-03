"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Phone, Navigation } from "lucide-react";

const locations = [
  {
    id: "head-office",
    type: "Headquarters & Manufacturing",
    title: "J Pan Tubular Components Limited ( Head Quaters )",
    city: "Greater Noida 1",
    address: "B-2/31, 32 & 42, Surajpur Site B Industrial Block C Road, Block B, UPSIDC Site B, Surajpur, Greater Noida, Uttar Pradesh 201306",
    lat: 28.51296375515739,
    lng: 77.50140084866602,
    phone: "+91-120-2560586"
  },
  {
    id: "surajpur-unit",
    type: "Manufacturing Facility",
    title: "J Pan Tubular Components Limited",
    city: "Surajpur",
    address: "A2/1A, Surajpur Site B Industrial Block G Road, Industrial Area, Surajpur, Greater Noida, Uttar Pradesh 201306",
    lat: 28.514867904105685,
    lng: 77.49251737282106,
  },
  {
    id: "sanand-unit",
    type: "Manufacturing Facility",
    title: "J Pan Tubular Components Limited",
    city: "Ahmedabad",
    address: "E-235, SANAND, AHMEDABAD, Gujarat 382170",
    lat: 22.9868,
    lng: 72.3857,
  },
  {
    id: "ranjangaon-unit",
    type: "Manufacturing Facility",
    title: "J Pan Tubular Components Limited",
    city: "Ranjangaon",
    address: "C-9 & C-10, Ranjangaon MIDC, Shirur, Maharashtra 412220",
    lat: 18.7845,
    lng: 74.2404,
  },
  {
    id: "jigani-unit",
    type: "Manufacturing Facility",
    title: "J Pan Tubular Components Limited",
    city: "Bengaluru",
    address: "Jigani Hobli, Bommandahalli, Bengaluru, Karnataka 560106",
    lat: 12.7876,
    lng: 77.6288,
  },
  {
    id: "neemrana-unit",
    type: "Manufacturing Facility",
    title: "J Pan Tubular Components Limited",
    city: "Neemrana",
    address: "Plot No:- E-16 Industrial Area Kolila Joga Neemrana, Rajasthan 301020",
    lat: 27.9868,
    lng: 76.3884,
  },
  {
    id: "sri-city-unit",
    type: "Upcoming Manufacturing Facility",
    title: "J Pan Tubular Components Limited",
    city: "Sri City",
    address: "Sri City Industrial Area, Andhra Pradesh 517646",
    lat: 13.5303,
    lng: 80.0384,
  }
];

const createCustomIcon = (type: string) => {
  const isHQ = type === "Headquarters & Manufacturing" || type === "Corporate Headquarters";
  const iconHtml = `
    <div style="display: flex; flex-direction: column; align-items: center; position: relative;">
      <div class="map-marker-pulse"></div>
      <div style="width: 48px; height: 48px; background: #0D2440; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid #D4AF37; box-shadow: 0 10px 25px rgba(0,0,0,0.5); position: relative; z-index: 2;">
        ${isHQ ? 
          '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>' 
          : 
          '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M17 18h1"></path><path d="M12 18h1"></path><path d="M7 18h1"></path></svg>'
        }
      </div>
      <div style="width: 4px; height: 16px; background: #D4AF37; margin-top: -2px; box-shadow: 0 5px 10px rgba(0,0,0,0.5); position: relative; z-index: 1;"></div>
      <div style="width: 12px; height: 4px; background: rgba(0,0,0,0.4); border-radius: 50%; filter: blur(2px); margin-top: -2px;"></div>
    </div>
  `;

  return new L.DivIcon({
    html: iconHtml,
    className: "custom-leaflet-icon",
    iconSize: [48, 70],
    iconAnchor: [24, 68],
    popupAnchor: [0, -70]
  });
};

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (map && map.invalidateSize) {
        try {
          map.invalidateSize();
        } catch (e) {
          // ignore leaflet resize errors on unmount
        }
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

export default function CompanyMap() {
  const [isMounted, setIsMounted] = React.useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  const locationsWithIcons = React.useMemo(() => {
    return locations.map(loc => ({
      ...loc,
      iconInstance: createCustomIcon(loc.type)
    }));
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <MapContainer 
        center={[21.14, 79.08]} 
        zoom={5} 
        minZoom={4}
        maxBounds={[
          [6.75, 68.16], // Southwest coordinates of India
          [35.5, 97.4]   // Northeast coordinates of India
        ]}
        scrollWheelZoom={false}
        className="w-full h-full absolute inset-0 z-0 bg-[#06111C]"
      >
        <MapResizer />
        
        {/* Using Voyager but dynamically inverting it for a crisp, high-contrast dark mode! */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          className="premium-inverted-tiles"
        />
        
        {locationsWithIcons.map((loc, idx) => (
          <Marker 
            key={loc.id} 
            position={[loc.lat, loc.lng]} 
            icon={loc.iconInstance}
          >
            <Popup className="premium-popup-dark">
              <div className="p-2 md:p-3 min-w-[220px] group/popup cursor-default">
                <div className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-1">{loc.type}</div>
                <h4 className="text-lg md:text-xl font-heading font-black text-white mb-0 group-hover/popup:mb-2 transition-all duration-300">{loc.title}</h4>
                <div className="text-xs font-bold text-silver/60 mb-1">V{idx + 1}. {loc.city}</div>
                
                <div className="grid grid-rows-[0fr] group-hover/popup:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[0.16,1,0.3,1]">
                  <div className="overflow-hidden">
                    <p className="text-[11px] text-silver/80 mb-4 leading-relaxed font-medium m-0 pt-2 opacity-0 group-hover/popup:opacity-100 transition-opacity duration-500 delay-100">{loc.address}</p>
                    
                    <div className="flex flex-col gap-2 pt-3 border-t border-white/10 opacity-0 group-hover/popup:opacity-100 transition-opacity duration-500 delay-200">
                      {loc.phone && (
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                          {loc.phone}
                        </div>
                      )}
                      <a 
                        href={`https://maps.google.com/?q=${loc.lat},${loc.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-white hover:text-[#D4AF37] transition-colors flex items-center gap-2 mt-1 no-underline"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
