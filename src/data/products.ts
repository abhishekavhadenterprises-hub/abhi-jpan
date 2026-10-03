export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  images?: string[];
  description: string;
  specs: string;
  overview?: string;
  offerings?: string[];
  qualityAssurance?: string;
  applications?: string;
}

export const products: Product[] = [
  {
    "id": 100,
    "name": "5A Distributor",
    "category": "Copper Components",
    "image": "/products/5A-Distributor.png",
    "description": "Precision-engineered 5A Distributor designed for perfectly balanced refrigerant flow across multiple circuits.",
    "specs": "Balanced Dispensing",
    "overview": "At J pan Tubular, we specialize in manufacturing high-precision 5A Distributors engineered to ensure equal division of refrigerant across multiple evaporator and condenser circuits, optimizing heat exchanger efficiency.",
    "offerings": [
      "Precision internal chambers engineered for uniform pressure distribution",
      "Optimized flow path geometry ensuring equal refrigerant division",
      "Custom outlet configuration options to suit diverse circuit numbers"
    ],
    "qualityAssurance": "Our 5A Distributors undergo 100% helium mass spectrometer leak testing and flow-balance verification to ensure absolute vacuum integrity.",
    "applications": "Perfect for multi-split VRF/VRV air conditioning units, commercial chillers, and large evaporator coil setups."
  },
  {
    "id": 101,
    "name": "AHU",
    "category": "Copper Components",
    "image": "/products/AHU.png",
    "description": "High-precision AHU engineered for reliable performance in thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium AHU is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Each AHU is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in HVAC units, industrial cooling systems, refrigeration racks, and commercial thermal transport setups."
  },
  {
    "id": 102,
    "name": "AIRWAY GROUP",
    "category": "Copper Components",
    "image": "/products/AIRWAY GROUP.png",
    "description": "High-precision AIRWAY GROUP engineered for reliable performance in thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium AIRWAY GROUP is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Each AIRWAY GROUP is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in HVAC units, industrial cooling systems, refrigeration racks, and commercial thermal transport setups."
  },
  {
    "id": 104,
    "name": "Brass Distributor (Copper Coated)",
    "category": "Brass Components",
    "image": "/products/Brass Distributors.png",
    "images": [
      "/products/Brass Distributors.png",
      "/products/Brass Distributors-2.png"
    ],
    "description": "Precision-engineered Brass Distributor (Copper Coated) designed for perfectly balanced refrigerant flow across multiple circuits.",
    "specs": "High Strength & Durability",
    "overview": "At J pan Tubular, our Brass Distributor (Copper Coated) series is engineered for high-vibration, high-pressure environments, offering superior mechanical strength and structural longevity compared to standard materials.",
    "offerings": [
      "Crafted from high-grade brass alloy with protective copper coating for enhanced brazeability and corrosion resistance",
      "Precision internal chambers engineered for uniform pressure distribution",
      "Optimized flow path geometry ensuring equal refrigerant division",
      "Custom outlet configuration options to suit diverse circuit numbers"
    ],
    "qualityAssurance": "Our Brass Distributors undergo 100% helium mass spectrometer leak testing and flow-balance verification to ensure absolute vacuum integrity.",
    "applications": "Perfect for multi-split VRF/VRV air conditioning units, commercial chillers, and large evaporator coil setups."
  },
  {
    "id": 105,
    "name": "Brazing Ring",
    "category": "Copper Components",
    "image": "/products/Brazing Ring.png",
    "description": "High-precision Brazing Ring engineered for reliable performance in thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Brazing Ring is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Each Brazing Ring is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in HVAC units, industrial cooling systems, refrigeration racks, and commercial thermal transport setups."
  },
  {
    "id": 106,
    "name": "Bus Bar",
    "category": "Copper Components",
    "image": "/products/Bus Bar.png",
    "description": "High-precision Bus Bar engineered for reliable performance in thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Bus Bar is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Each Bus Bar is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in HVAC units, industrial cooling systems, refrigeration racks, and commercial thermal transport setups."
  },
  {
    "id": 107,
    "name": "Bush",
    "category": "Brass Components",
    "image": "/products/Bush.png",
    "description": "High-precision Bush engineered for reliable performance in thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Bush is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Each Bush is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in HVAC units, industrial cooling systems, refrigeration racks, and commercial thermal transport setups."
  },
  {
    "id": 108,
    "name": "CAPILLARY TUBE ASSEMBLY",
    "category": "Copper Components",
    "image": "/products/CAPILLARY TUBE ASSEMBLY.png",
    "description": "High-durability CAPILLARY TUBE ASSEMBLY with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty CAPILLARY TUBE ASSEMBLY assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 109,
    "name": "CAPILLARY",
    "category": "Copper Components",
    "image": "/products/Capillary.png",
    "description": "High-durability CAPILLARY with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty CAPILLARY assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 110,
    "name": "Closed Distributor",
    "category": "Copper Components",
    "image": "/products/Closed Distributor.png",
    "description": "Precision-engineered Closed Distributor designed for perfectly balanced refrigerant flow across multiple circuits.",
    "specs": "Balanced Dispensing",
    "overview": "At J pan Tubular, we specialize in manufacturing high-precision Closed Distributors engineered to ensure equal division of refrigerant across multiple evaporator and condenser circuits, optimizing heat exchanger efficiency.",
    "offerings": [
      "Precision internal chambers engineered for uniform pressure distribution",
      "Optimized flow path geometry ensuring equal refrigerant division",
      "Custom outlet configuration options to suit diverse circuit numbers"
    ],
    "qualityAssurance": "Our Closed Distributors undergo 100% helium mass spectrometer leak testing and flow-balance verification to ensure absolute vacuum integrity.",
    "applications": "Perfect for multi-split VRF/VRV air conditioning units, commercial chillers, and large evaporator coil setups."
  },

  {
    "id": 112,
    "name": "CONDENSER IN",
    "category": "Copper Components",
    "image": "/products/CONDENSER IN.png",
    "description": "High-precision CONDENSER IN engineered for reliable performance in thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium CONDENSER IN is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Each CONDENSER IN is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in HVAC units, industrial cooling systems, refrigeration racks, and commercial thermal transport setups."
  },
  {
    "id": 113,
    "name": "Condenser Inlet",
    "category": "Copper Components",
    "image": "/products/Condenser Inlet.png",
    "description": "High-precision Condenser Inlet engineered for reliable performance in thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Condenser Inlet is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Each Condenser Inlet is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in HVAC units, industrial cooling systems, refrigeration racks, and commercial thermal transport setups."
  },
  {
    "id": 114,
    "name": "Brass Distributor (Copper coated)",
    "category": "Copper Components",
    "image": "/products/Copper Distributor - 24 Holes.png",
    "description": "Precision-engineered Copper Distributor 24 Holes designed for perfectly balanced refrigerant flow across multiple circuits.",
    "specs": "Balanced Dispensing",
    "overview": "At J pan Tubular, we specialize in manufacturing high-precision Copper Distributor 24 Holess engineered to ensure equal division of refrigerant across multiple evaporator and condenser circuits, optimizing heat exchanger efficiency.",
    "offerings": [
      "Precision internal chambers engineered for uniform pressure distribution",
      "Optimized flow path geometry ensuring equal refrigerant division",
      "Custom outlet configuration options to suit diverse circuit numbers"
    ],
    "qualityAssurance": "Our Copper Distributor 24 Holess undergo 100% helium mass spectrometer leak testing and flow-balance verification to ensure absolute vacuum integrity.",
    "applications": "Perfect for multi-split VRF/VRV air conditioning units, commercial chillers, and large evaporator coil setups."
  },
  {
    "id": 115,
    "name": "Copper Distributors",
    "category": "Copper Components",
    "image": "/products/Copper Distributors.png",
    "description": "Precision-engineered Copper Distributors designed for perfectly balanced refrigerant flow across multiple circuits.",
    "specs": "Balanced Dispensing",
    "overview": "At J pan Tubular, we specialize in manufacturing high-precision Copper Distributorss engineered to ensure equal division of refrigerant across multiple evaporator and condenser circuits, optimizing heat exchanger efficiency.",
    "offerings": [
      "Precision internal chambers engineered for uniform pressure distribution",
      "Optimized flow path geometry ensuring equal refrigerant division",
      "Custom outlet configuration options to suit diverse circuit numbers"
    ],
    "qualityAssurance": "Our Copper Distributorss undergo 100% helium mass spectrometer leak testing and flow-balance verification to ensure absolute vacuum integrity.",
    "applications": "Perfect for multi-split VRF/VRV air conditioning units, commercial chillers, and large evaporator coil setups."
  },
  {
    "id": 117,
    "name": "Copper Suction Tubing",
    "category": "Copper Components",
    "image": "/products/Copper Suction Tubing-1.png",
    "images": [
      "/products/Copper Suction Tubing-1.png",
      "/products/Copper Suction Tubing- 2.png"
    ],
    "description": "High-durability Copper Suction Tubing with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty Copper Suction Tubing assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 119,
    "name": "Copper Tee",
    "category": "Copper Components",
    "image": "/products/Copper Tee.png",
    "images": [
      "/products/Copper Tee.png",
      "/products/Copper Tee 2.png"
    ],
    "description": "High-durability Copper Tee with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty Copper Tee assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 120,
    "name": "Discharge Tubing",
    "category": "Copper Components",
    "image": "/products/Discharge Tubing.png",
    "description": "High-durability Discharge Tubing with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty Discharge Tubing assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 121,
    "name": "Distributor Assembly",
    "category": "Copper Components",
    "image": "/products/Distributor Assembly 1.png",
    "images": [
      "/products/Distributor Assembly 1.png",
      "/products/Distributor Assembly 2.png"
    ],
    "description": "Precision-engineered Distributor Assembly designed for perfectly balanced refrigerant flow across multiple circuits.",
    "specs": "Balanced Dispensing",
    "overview": "At J pan Tubular, we specialize in manufacturing high-precision Distributor Assembly solutions engineered to ensure equal division of refrigerant across multiple evaporator and condenser circuits, optimizing heat exchanger efficiency.",
    "offerings": [
      "Precision internal chambers engineered for uniform pressure distribution",
      "Optimized flow path geometry ensuring equal refrigerant division",
      "Custom outlet configuration options to suit diverse circuit numbers"
    ],
    "qualityAssurance": "Our Distributor Assemblies undergo 100% helium mass spectrometer leak testing and flow-balance verification to ensure absolute vacuum integrity.",
    "applications": "Perfect for multi-split VRF/VRV air conditioning units, commercial chillers, and large evaporator coil setups."
  },
  {
    "id": 123,
    "name": "EVA Inliquid Line Assembly",
    "category": "Copper Components",
    "image": "/products/EVA INLiquid Line Assembly.png",
    "description": "Pre-assembled EVA Inliquid Line Assembly designed for rapid, error-free field installation and immediate performance.",
    "specs": "Plug-and-Play Integration",
    "overview": "At J pan Tubular, our custom-engineered EVA Inliquid Line Assembly configurations are fully pre-brazed and pre-aligned, allowing seamless integration of sensors, valves, and controls in the field.",
    "offerings": [
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 124,
    "name": "EVA Outsuction Line Assembly 1024x683",
    "category": "Copper Components",
    "image": "/products/EVA OutSuction Line Assembly_1024x683.png",
    "description": "Pre-assembled EVA Outsuction Line Assembly 1024x683 designed for rapid, error-free field installation and immediate performance.",
    "specs": "Plug-and-Play Integration",
    "overview": "At J pan Tubular, our custom-engineered EVA Outsuction Line Assembly 1024x683 configurations are fully pre-brazed and pre-aligned, allowing seamless integration of sensors, valves, and controls in the field.",
    "offerings": [
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 125,
    "name": "EXHAUST PIPE",
    "category": "Copper Components",
    "image": "/products/EXHAUST PIPE.png",
    "description": "High-durability EXHAUST PIPE with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty EXHAUST PIPE assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 126,
    "name": "Flare Nuts",
    "category": "Brass Components",
    "image": "/products/Flare Nuts.png",
    "description": "High-precision Flare Nuts engineered for reliable performance in thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Flare Nuts is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Each Flare Nuts is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in HVAC units, industrial cooling systems, refrigeration racks, and commercial thermal transport setups."
  },

  {
    "id": 128,
    "name": "HEADER DISCHARGE",
    "category": "Copper Components",
    "image": "/products/HEADER DISCHARGE.png",
    "description": "High-durability HEADER DISCHARGE with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty HEADER DISCHARGE assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 129,
    "name": "Header Tubing",
    "category": "Copper Components",
    "image": "/products/Header Tubing.png",
    "description": "High-durability Header Tubing with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty Header Tubing assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 130,
    "name": "I KIT 2",
    "category": "Copper Components",
    "image": "/products/I KIT 2.png",
    "description": "Pre-assembled I KIT 2 designed for rapid, error-free field installation and immediate performance.",
    "specs": "Plug-and-Play Integration",
    "overview": "At J pan Tubular, our custom-engineered I KIT 2 configurations are fully pre-brazed and pre-aligned, allowing seamless integration of sensors, valves, and controls in the field.",
    "offerings": [
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 131,
    "name": "LIQUID COLLECTING PIPE",
    "category": "Copper Components",
    "image": "/products/LIQUID COLLECTING PIPE.png",
    "description": "High-durability LIQUID COLLECTING PIPE with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty LIQUID COLLECTING PIPE assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 132,
    "name": "LIQUID INLET PIPE SET",
    "category": "Copper Components",
    "image": "/products/LIQUID INLET PIPE SET.png",
    "description": "High-durability LIQUID INLET PIPE SET with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty LIQUID INLET PIPE SET assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 133,
    "name": "Muffler And Coupling",
    "category": "Copper Components",
    "image": "/products/Muffler and Coupling.png",
    "description": "High-efficiency protective Muffler And Coupling designed to filter out debris and dampen line vibration.",
    "specs": "System Protection",
    "overview": "At J pan Tubular, our protective Muffler And Coupling components are built to suppress noise, absorb gas pulsation from compressors, or capture debris to extend the life of downstream components.",
    "offerings": [
      "Acoustically optimized chambers or high-mesh strainers for clean operation",
      "Heavy-wall seamless copper/brass shells for high fatigue resistance",
      "Bi-directional flow designs for heat pump reverse-cycle operations"
    ],
    "qualityAssurance": "Built to withstand extreme mechanical vibration and high pulse loads, pressure tested to 45 bar.",
    "applications": "Installed in compressor discharge lines, refrigeration pipelines, and HVAC condensing units."
  },
  {
    "id": 134,
    "name": "Nuts",
    "category": "Brass Components",
    "image": "/products/Nuts.png",
    "description": "High-precision Nuts engineered for reliable performance in thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Nuts is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Each Nuts is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in HVAC units, industrial cooling systems, refrigeration racks, and commercial thermal transport setups."
  },
  {
    "id": 135,
    "name": "OIL SEPARATOR INLET PIPE",
    "category": "Copper Components",
    "image": "/products/OIL SEPARATOR INLET PIPE.png",
    "description": "High-durability OIL SEPARATOR INLET PIPE with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty OIL SEPARATOR INLET PIPE assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },

  {
    "id": 137,
    "name": "PLATE FINNED COIL HEADER ASSY 2",
    "category": "Copper Components",
    "image": "/products/PLATE FINNED COIL HEADER ASSY 2.png",
    "description": "High-durability PLATE FINNED COIL HEADER ASSY 2 with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty PLATE FINNED COIL HEADER ASSY 2 assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 138,
    "name": "Plugs",
    "category": "Brass Components",
    "image": "/products/Plugs.png",
    "description": "High-precision Plugs engineered for reliable performance in thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Plugs is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Each Plugs is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in HVAC units, industrial cooling systems, refrigeration racks, and commercial thermal transport setups."
  },
  {
    "id": 141,
    "name": "PPM KIT",
    "category": "Copper Components",
    "image": "/products/PPM KIT.png",
    "images": [
      "/products/PPM KIT.png",
      "/products/PPM KIT 2.png",
      "/products/PPM KIT 3.png"
    ],
    "description": "Pre-assembled PPM KIT designed for rapid, error-free field installation and immediate performance.",
    "specs": "Plug-and-Play Integration",
    "overview": "At J pan Tubular, our custom-engineered PPM KIT configurations are fully pre-brazed and pre-aligned, allowing seamless integration of sensors, valves, and controls in the field.",
    "offerings": [
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 142,
    "name": "RAC Discharge Pipe",
    "category": "Copper Components",
    "image": "/products/RAC Discharge Pipe.png",
    "description": "High-durability RAC Discharge Pipe with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty RAC Discharge Pipe assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 143,
    "name": "RAC EVA IN",
    "category": "Copper Components",
    "image": "/products/RAC EVA IN.png",
    "description": "High-precision RAC EVA IN engineered for reliable performance in thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium RAC EVA IN is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Each RAC EVA IN is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in HVAC units, industrial cooling systems, refrigeration racks, and commercial thermal transport setups."
  },
  {
    "id": 144,
    "name": "RAC EVA OUT",
    "category": "Copper Components",
    "image": "/products/RAC EVA OUT.png",
    "description": "High-precision RAC EVA OUT engineered for reliable performance in thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium RAC EVA OUT is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Each RAC EVA OUT is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in HVAC units, industrial cooling systems, refrigeration racks, and commercial thermal transport setups."
  },
  {
    "id": 145,
    "name": "RAC SUCTION ASSEMBLY",
    "category": "Copper Components",
    "image": "/products/RAC SUCTION ASSEMBLY.png",
    "description": "Pre-assembled RAC SUCTION ASSEMBLY designed for rapid, error-free field installation and immediate performance.",
    "specs": "Plug-and-Play Integration",
    "overview": "At J pan Tubular, our custom-engineered RAC SUCTION ASSEMBLY configurations are fully pre-brazed and pre-aligned, allowing seamless integration of sensors, valves, and controls in the field.",
    "offerings": [
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 146,
    "name": "Refnet / Y Joint",
    "category": "Copper Components",
    "image": "/products/Refnet or Y Joint-1.png",
    "images": [
      "/products/Refnet or Y Joint-1.png",
      "/products/Refnet or Y Joint-2.png",
      "/products/Refnt or Y Joint-3.png",
      "/products/Refnet.png"
    ],
    "description": "High-precision Refnet and Y-Joint fittings engineered for optimal fluid distribution and reliable performance in VRF/VRV thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Refnet / Y Joint series is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity seamless copper raw materials ensuring excellent durability",
      "Precise CNC-formed tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse VRF/VRV environments",
      "Balanced internal flow channels minimizing branch pressure drops"
    ],
    "qualityAssurance": "Each Refnet / Y Joint is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in VRV/VRF multi-split air conditioning systems, heat recovery units, industrial cooling systems, and commercial refrigeration setups."
  },
  {
    "id": 150,
    "name": "Return Bend And Sensor Holder",
    "category": "Copper Components",
    "image": "/products/Return Bend and Sensor Holder.png",
    "description": "High-durability Return Bend And Sensor Holder with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty Return Bend And Sensor Holder assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 151,
    "name": "Socket",
    "category": "Brass Components",
    "image": "/products/Socket.png",
    "description": "High-precision Socket engineered for reliable performance in thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Socket is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Each Socket is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in HVAC units, industrial cooling systems, refrigeration racks, and commercial thermal transport setups."
  },
  {
    "id": 152,
    "name": "SS Assembly 1",
    "category": "Steel Components",
    "image": "/products/SS Assembly 1.png",
    "description": "Pre-assembled SS Assembly 1 designed for rapid, error-free field installation and immediate performance.",
    "specs": "High Strength & Durability",
    "overview": "At J pan Tubular, our Stainless Steel SS Assembly 1 series is engineered for high-vibration, high-pressure environments, offering superior mechanical strength and structural longevity compared to standard materials.",
    "offerings": [
      "Crafted from high-grade stainless steel (304/316) for ultimate corrosion resistance",
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 153,
    "name": "SS Assembly 2",
    "category": "Steel Components",
    "image": "/products/SS Assembly 2.png",
    "description": "Pre-assembled SS Assembly 2 designed for rapid, error-free field installation and immediate performance.",
    "specs": "High Strength & Durability",
    "overview": "At J pan Tubular, our Stainless Steel SS Assembly 2 series is engineered for high-vibration, high-pressure environments, offering superior mechanical strength and structural longevity compared to standard materials.",
    "offerings": [
      "Crafted from high-grade stainless steel (304/316) for ultimate corrosion resistance",
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },

  {
    "id": 155,
    "name": "SS Strainer",
    "category": "Steel Components",
    "image": "/products/SS Strainer.png",
    "description": "High-efficiency protective SS Strainer designed to filter out debris and dampen line vibration.",
    "specs": "High Strength & Durability",
    "overview": "At J pan Tubular, our Stainless Steel SS Strainer series is engineered for high-vibration, high-pressure environments, offering superior mechanical strength and structural longevity compared to standard materials.",
    "offerings": [
      "Crafted from high-grade stainless steel (304/316) for ultimate corrosion resistance",
      "Acoustically optimized chambers or high-mesh strainers for clean operation",
      "Heavy-wall seamless copper/brass shells for high fatigue resistance",
      "Bi-directional flow designs for heat pump reverse-cycle operations"
    ],
    "qualityAssurance": "Built to withstand extreme mechanical vibration and high pulse loads, pressure tested to 45 bar.",
    "applications": "Installed in compressor discharge lines, refrigeration pipelines, and HVAC condensing units."
  },
  {
    "id": 127,
    "name": "High-Strength Precision Fitting Assembly",
    "category": "Steel Components",
    "image": "/products/Gemini_Generated_Image_2jiutl2jiutl2jiu.png",
    "description": "A precision-engineered metal fitting and connector assembly designed for secure, reliable connections in demanding industrial applications. The assembly features threaded and hexagonal components with sealing rings, providing easy installation, strong mechanical fastening, and dependable sealing performance.",
    "specs": "High Strength & Durability",
    "overview": "A precision-engineered metal fitting and connector assembly designed for secure, reliable connections in demanding industrial applications. The assembly features threaded and hexagonal components with sealing rings, providing easy installation, strong mechanical fastening, and dependable sealing performance.",
    "offerings": [
      "Crafted from high-grade stainless steel (304/316) for ultimate corrosion resistance",
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Manufactured for high strength, durability, and dimensional accuracy, these components are suitable for applications requiring consistent performance under pressure and repeated operating conditions.",
    "applications": "Key Features: High-strength construction, precision-machined threads, secure sealing arrangement, excellent durability, easy assembly, and reliable leak-resistant performance.\n\nApplications: HVAC & refrigeration systems, industrial equipment, fluid and gas connections, piping assemblies, and other engineered systems requiring robust mechanical connections."
  },
  {
    "id": 156,
    "name": "SUCTION TUBE SET 2",
    "category": "Copper Components",
    "image": "/products/SUCTION TUBE SET 2.png",
    "description": "Pre-assembled SUCTION TUBE SET 2 designed for rapid, error-free field installation and immediate performance.",
    "specs": "Plug-and-Play Integration",
    "overview": "At J pan Tubular, our custom-engineered SUCTION TUBE SET 2 configurations are fully pre-brazed and pre-aligned, allowing seamless integration of sensors, valves, and controls in the field.",
    "offerings": [
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 157,
    "name": "SUCTION TUBE SET",
    "category": "Copper Components",
    "image": "/products/SUCTION TUBE SET.png",
    "description": "Pre-assembled SUCTION TUBE SET designed for rapid, error-free field installation and immediate performance.",
    "specs": "Plug-and-Play Integration",
    "overview": "At J pan Tubular, our custom-engineered SUCTION TUBE SET configurations are fully pre-brazed and pre-aligned, allowing seamless integration of sensors, valves, and controls in the field.",
    "offerings": [
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 158,
    "name": "Tripod",
    "category": "Copper Components",
    "image": "/products/Tripod.png",
    "description": "High-precision Tripod engineered for reliable performance in thermal systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Tripod is manufactured from top-tier raw materials to meet strict dimensional and structural standards, guaranteeing long-term system integrity in demanding environments.",
    "offerings": [
      "High-purity raw materials ensuring excellent durability",
      "Precise tolerances for secure, leak-free connection joints",
      "Corrosion-resistant finishing suitable for diverse environments"
    ],
    "qualityAssurance": "Each Tripod is 100% dimensionally verified and pneumatically pressure tested to ensure compliance with strict international quality standards.",
    "applications": "Widely specified in HVAC units, industrial cooling systems, refrigeration racks, and commercial thermal transport setups."
  },
  {
    "id": 159,
    "name": "TUBE ASSEMBLY CONDENSER IN",
    "category": "Copper Components",
    "image": "/products/TUBE ASSEMBLY CONDENSER IN.png",
    "description": "Pre-assembled TUBE ASSEMBLY CONDENSER IN designed for rapid, error-free field installation and immediate performance.",
    "specs": "Plug-and-Play Integration",
    "overview": "At J pan Tubular, our custom-engineered TUBE ASSEMBLY CONDENSER IN configurations are fully pre-brazed and pre-aligned, allowing seamless integration of sensors, valves, and controls in the field.",
    "offerings": [
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 160,
    "name": "TUBE ASSEMBLY CONDENSER OUT",
    "category": "Copper Components",
    "image": "/products/TUBE ASSEMBLY CONDENSER OUT.png",
    "description": "Pre-assembled TUBE ASSEMBLY CONDENSER OUT designed for rapid, error-free field installation and immediate performance.",
    "specs": "Plug-and-Play Integration",
    "overview": "At J pan Tubular, our custom-engineered TUBE ASSEMBLY CONDENSER OUT configurations are fully pre-brazed and pre-aligned, allowing seamless integration of sensors, valves, and controls in the field.",
    "offerings": [
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 161,
    "name": "TUBE ASSEMBLY MANIFOLD",
    "category": "Copper Components",
    "image": "/products/TUBE ASSEMBLY MANIFOLD.png",
    "description": "Pre-assembled TUBE ASSEMBLY MANIFOLD designed for rapid, error-free field installation and immediate performance.",
    "specs": "Plug-and-Play Integration",
    "overview": "At J pan Tubular, our custom-engineered TUBE ASSEMBLY MANIFOLD configurations are fully pre-brazed and pre-aligned, allowing seamless integration of sensors, valves, and controls in the field.",
    "offerings": [
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 162,
    "name": "TUBE ASSEMBLY SUCTION OUTDOOR",
    "category": "Copper Components",
    "image": "/products/TUBE ASSEMBLY SUCTION OUTDOOR.png",
    "description": "Pre-assembled TUBE ASSEMBLY SUCTION OUTDOOR designed for rapid, error-free field installation and immediate performance.",
    "specs": "Plug-and-Play Integration",
    "overview": "At J pan Tubular, our custom-engineered TUBE ASSEMBLY SUCTION OUTDOOR configurations are fully pre-brazed and pre-aligned, allowing seamless integration of sensors, valves, and controls in the field.",
    "offerings": [
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 163,
    "name": "VALVE PLATE ASSEMBLY",
    "category": "Copper Components",
    "image": "/products/VALVE PLATE ASSEMBLY.png",
    "description": "Pre-assembled VALVE PLATE ASSEMBLY designed for rapid, error-free field installation and immediate performance.",
    "specs": "Plug-and-Play Integration",
    "overview": "At J pan Tubular, our custom-engineered VALVE PLATE ASSEMBLY configurations are fully pre-brazed and pre-aligned, allowing seamless integration of sensors, valves, and controls in the field.",
    "offerings": [
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 164,
    "name": "VRV ACCUMULATOR PIPE (2)",
    "category": "Copper Components",
    "image": "/products/VRV ACCUMULATOR PIPE (2).png",
    "description": "High-durability VRV ACCUMULATOR PIPE (2) with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty VRV ACCUMULATOR PIPE (2) assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 165,
    "name": "VRV ACCUMULATOR PIPE",
    "category": "Copper Components",
    "image": "/products/VRV ACCUMULATOR PIPE.png",
    "description": "High-durability VRV ACCUMULATOR PIPE with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty VRV ACCUMULATOR PIPE assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 166,
    "name": "VRV CONNECTION PIPE",
    "category": "Copper Components",
    "image": "/products/VRV CONNECTION PIPE.png",
    "description": "High-durability VRV CONNECTION PIPE with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty VRV CONNECTION PIPE assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 167,
    "name": "VRV HEADER ASSEMBLY",
    "category": "Copper Components",
    "image": "/products/VRV HEADER ASSEMBLY.png",
    "description": "High-durability VRV HEADER ASSEMBLY with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty VRV HEADER ASSEMBLY assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 168,
    "name": "VRV SUPPORTER ASSEMBLY (2)",
    "category": "Copper Components",
    "image": "/products/VRV SUPPORTER ASSEMBLY (2).png",
    "description": "Pre-assembled VRV SUPPORTER ASSEMBLY (2) designed for rapid, error-free field installation and immediate performance.",
    "specs": "Plug-and-Play Integration",
    "overview": "At J pan Tubular, our custom-engineered VRV SUPPORTER ASSEMBLY (2) configurations are fully pre-brazed and pre-aligned, allowing seamless integration of sensors, valves, and controls in the field.",
    "offerings": [
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 169,
    "name": "VRV SUPPORTER ASSEMBLY",
    "category": "Copper Components",
    "image": "/products/VRV SUPPORTER ASSEMBLY.png",
    "description": "Pre-assembled VRV SUPPORTER ASSEMBLY designed for rapid, error-free field installation and immediate performance.",
    "specs": "Plug-and-Play Integration",
    "overview": "At J pan Tubular, our custom-engineered VRV SUPPORTER ASSEMBLY configurations are fully pre-brazed and pre-aligned, allowing seamless integration of sensors, valves, and controls in the field.",
    "offerings": [
      "Pre-aligned and pre-formed sub-assemblies for quick mounting",
      "High-vacuum integrity joints pre-brazed under protective nitrogen gas",
      "Compact layouts optimized for space efficiency and vibration absorption"
    ],
    "qualityAssurance": "Each assembly is fully factory pressure tested, degreased, and sealed under positive nitrogen pressure.",
    "applications": "Widely specified in commercial split units, air handling units (AHU), and customized refrigeration systems."
  },
  {
    "id": 170,
    "name": "Window Tubing",
    "category": "Copper Components",
    "image": "/products/Window Tubing.png",
    "description": "High-durability Window Tubing with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty Window Tubing assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 171,
    "name": "Y Bend / Y Branch",
    "category": "Copper Components",
    "image": "/products/Y Bend.png",
    "images": [
      "/products/Y Bend.png",
      "/products/Y Branch.png"
    ],
    "description": "High-durability copper Y-Bend and Y-Branch fittings with precision bends to optimize fluid routing and minimize pressure drop.",
    "specs": "Optimal Flow Routing",
    "overview": "At J pan Tubular, our heavy-duty Y Bend and Y Branch assemblies are engineered with precision 3D CNC bending to facilitate smooth, low-friction fluid and refrigerant routing through restricted spaces.",
    "offerings": [
      "Precision CNC bending preventing restrictions or kink points",
      "High-grade seamless copper tubing rated for high burst pressures",
      "Deburred and expanded socket ends for effortless braze jointing"
    ],
    "qualityAssurance": "Subjected to rigorous eddy-current defect inspection and internal cleanliness testing according to DIN 8964 guidelines.",
    "applications": "Essential for evaporator/condenser connections, compressor piping loops, and heat exchanger assemblies."
  },
  {
    "id": 2000,
    "name": "Chiller Assembly",
    "category": "Chiller",
    "image": "/products/Chiller_Assembly_1.png",
    "images": [
      "/products/Chiller_Assembly_1.png",
      "/products/Chiller_Assembly_2.png"
    ],
    "description": "High-quality Chiller Assembly designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Chiller Assembly is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each Chiller Assembly undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2002,
    "name": "Discharge Pipe 1",
    "category": "Chiller",
    "image": "/products/Discharge_Pipe-1.png",
    "description": "High-quality Discharge Pipe 1 designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Discharge Pipe 1 is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each Discharge Pipe 1 undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2003,
    "name": "Discharge Pipe 2",
    "category": "Chiller",
    "image": "/products/Discharge_Pipe-2.png",
    "description": "High-quality Discharge Pipe 2 designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Discharge Pipe 2 is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each Discharge Pipe 2 undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2004,
    "name": "Discharge Pipe 3",
    "category": "Chiller",
    "image": "/products/Discharge_Pipe-3.png",
    "description": "High-quality Discharge Pipe 3 designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Discharge Pipe 3 is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each Discharge Pipe 3 undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2005,
    "name": "Discharge Pipe 4",
    "category": "Chiller",
    "image": "/products/Discharge_Pipe-4.png",
    "description": "High-quality Discharge Pipe 4 designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Discharge Pipe 4 is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each Discharge Pipe 4 undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2006,
    "name": "Discharge Pipe",
    "category": "Chiller",
    "image": "/products/Discharge_Pipe.png",
    "description": "High-quality Discharge Pipe designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Discharge Pipe is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each Discharge Pipe undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2007,
    "name": "DX 600 Model Evaporator Pipe",
    "category": "Chiller",
    "image": "/products/DX_600_-_model_-_Evaporator_Pipe.png",
    "description": "High-quality DX 600 Model Evaporator Pipe designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium DX 600 Model Evaporator Pipe is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each DX 600 Model Evaporator Pipe undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2008,
    "name": "DX 600 Model Discharge Pipe",
    "category": "Chiller",
    "image": "/products/DX_600_model_-_Discharge_pipe.png",
    "description": "High-quality DX 600 Model Discharge Pipe designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium DX 600 Model Discharge Pipe is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each DX 600 Model Discharge Pipe undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2009,
    "name": "H Model Assembly",
    "category": "Chiller",
    "image": "/products/H_-_Model_Assembly.png",
    "description": "High-quality H Model Assembly designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium H Model Assembly is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each H Model Assembly undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2010,
    "name": "Inroom Cooling Part Inlet Pipe",
    "category": "Chiller",
    "image": "/products/Inroom_cooling_part_-_Inlet_pipe.png",
    "description": "High-quality Inroom Cooling Part Inlet Pipe designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Inroom Cooling Part Inlet Pipe is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each Inroom Cooling Part Inlet Pipe undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2011,
    "name": "L-Bend Part 1",
    "category": "Chiller",
    "image": "/products/L-Bend_Part_-1.png",
    "description": "High-quality L-Bend Part 1 designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium L-Bend Part 1 is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each L-Bend Part 1 undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2013,
    "name": "L-Bend",
    "category": "Chiller",
    "image": "/products/L-Bend.png",
    "description": "High-quality L-Bend designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium L-Bend is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each L-Bend undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2014,
    "name": "Rods Assembly Parts",
    "category": "Chiller",
    "image": "/products/Rods_Assembly_parts.png",
    "description": "High-quality Rods Assembly Parts designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Rods Assembly Parts is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each Rods Assembly Parts undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2015,
    "name": "Saral Model Evaporator Part",
    "category": "Chiller",
    "image": "/products/Saral_Model_-_Evaporator_part.png",
    "description": "High-quality Saral Model Evaporator Part designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Saral Model Evaporator Part is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each Saral Model Evaporator Part undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2016,
    "name": "Three Connector Discharge Pipe",
    "category": "Chiller",
    "image": "/products/Three_Connector_-_Discharge_Pipe.png",
    "description": "High-quality Three Connector Discharge Pipe designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Three Connector Discharge Pipe is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each Three Connector Discharge Pipe undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  },
  {
    "id": 2017,
    "name": "Y Fitting Part",
    "category": "Chiller",
    "image": "/products/Y-_Fitting_Part.png",
    "description": "High-quality Y Fitting Part designed for optimal thermal performance and durability in chilling systems.",
    "specs": "Industrial Quality",
    "overview": "At J pan Tubular, our premium Y Fitting Part is manufactured to meet strict dimensional standards, ensuring reliable integration into high-capacity chiller units.",
    "offerings": [
      "High-grade materials ensuring maximum thermal efficiency",
      "Precise dimensional tolerances for secure, leak-free operation",
      "Tested for high-pressure and rigorous temperature variations"
    ],
    "qualityAssurance": "Each Y Fitting Part undergoes rigorous dimensional verification and pressure testing to meet strict international standards for chillers.",
    "applications": "Widely specified in commercial chillers, industrial refrigeration, and HVAC thermal transport setups."
  }
];

export function getProductById(id: string | number): Product | undefined {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  if (numericId === 103) {
    return products.find((p) => p.id === 104);
  }
  if (numericId === 116) {
    return products.find((p) => p.id === 117);
  }
  if (numericId === 118) {
    return products.find((p) => p.id === 119);
  }
  if (numericId === 122) {
    return products.find((p) => p.id === 121);
  }
  if (numericId === 136) {
    return products.find((p) => p.id === 137);
  }
  if (numericId === 139 || numericId === 140) {
    return products.find((p) => p.id === 141);
  }
  if (numericId === 147 || numericId === 148 || numericId === 149) {
    return products.find((p) => p.id === 146);
  }
  if (numericId === 172) {
    return products.find((p) => p.id === 171);
  }
  if (numericId === 2001) {
    return products.find((p) => p.id === 2000);
  }
  return products.find((p) => p.id === numericId);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getRelatedProducts(currentId: number | string, category?: string, limit: number = 4): Product[] {
  const numericId = typeof currentId === "string" ? parseInt(currentId, 10) : currentId;
  
  let related = products.filter((p) => p.id !== numericId);
  
  if (category && category !== "All Products") {
    const categoryMatches = related.filter((p) => p.category === category);
    if (categoryMatches.length >= limit) {
      return categoryMatches.slice(0, limit);
    }
  }
  
  return related.slice(0, limit);
}
