import automationDesign from "@/assets/Automation and Machine Design.png";
import architecturalDesign from "@/assets/Architectural and Structural Design.jpg";
import electricalWorks from "@/assets/Electrical Works.png";
import sheetMetal from "@/assets/Sheet Metal Works.png";
import controlPanel from "@/assets/Fabrication of Electrical Control Panel.png";
import cncLaser from "@/assets/CNC Laser Cutting Machine.png";
import cncMilling from "@/assets/CNC Milling Machine.jpg";
import latheMachine from "@/assets/Lathe Machine.png";
import millingMachine from "@/assets/Milling Machine.png";
import pressBrake from "@/assets/Press Break Bending Machine.jpg";
import shearing from "@/assets/Shearing Machine.jpg";
import bandSaw from "@/assets/Band Saw Machine.jpg";
import backhoe from "@/assets/Rental of Backhoe.jpg";
import roadRehab from "@/assets/Road Rehabilitation.png";
import concreting from "@/assets/Concreting.png";
import structural from "@/assets/Structural.png.jpg";
import fireProtection from "@/assets/Fire Protection System.png";

export interface Service {
  id: string;
  name: string;
  description: string;
  images: string[];
  specs: Record<string, string>;
  category: string;
}

export const services: Service[] = [
  {
    id: "automation-machine-design",
    name: "Automation & Machine Design",
    description:
      "Custom automation and machine design solutions. We engineer and build automated systems tailored to your specific production requirements.",
    images: [automationDesign],
    specs: {
      Type: "Custom Automation Systems",
      Application: "Industrial Manufacturing",
      Includes: "PLC Programming, Mechanical Design",
      Delivery: "Project-based timeline",
    },
    category: "Engineering Services",
  },
  {
    id: "architectural-structural-design",
    name: "Architectural & Structural Design",
    description:
      "Designing functional and durable structures. Comprehensive architectural and structural engineering services for commercial and industrial projects.",
    images: [architecturalDesign],
    specs: {
      Type: "Structural / Architectural Design",
      Software: "AutoCAD, SolidWorks",
      Compliance: "National Building Code",
      Deliverables: "Plans, 3D Models, BOQ",
    },
    category: "Engineering Services",
  },
  {
    id: "electrical-works",
    name: "Electrical Works",
    description:
      "Reliable electrical works for industrial and commercial use. Full-service electrical installation, maintenance, and troubleshooting.",
    images: [electricalWorks],
    specs: {
      Type: "Electrical Installation & Maintenance",
      Voltage: "Up to 440V",
      Scope: "Wiring, Panels, Conduit, Lighting",
      Certification: "Licensed Electricians",
    },
    category: "Engineering Services",
  },
  {
    id: "sheet-metal-works",
    name: "Sheet Metal Works",
    description:
      "Fabrication and processing of sheet metal components. Precision cutting, bending, and forming for industrial applications.",
    images: [sheetMetal],
    specs: {
      Type: "Sheet Metal Fabrication",
      Thickness: "0.5mm - 12mm",
      Material: "Mild Steel, Stainless Steel, Aluminum",
      Processes: "Cutting, Bending, Welding, Finishing",
    },
    category: "Engineering Services",
  },
  {
    id: "electrical-control-panel-fabrication",
    name: "Fabrication of Electrical Control Panel",
    description:
      "High-quality electrical control panel fabrication. Custom-built panels designed for safe, reliable, and efficient power management.",
    images: [controlPanel],
    specs: {
      Type: "Control Panel Fabrication",
      Standard: "IEC 61439",
      Components: "Schneider, ABB, Siemens",
      Testing: "Full functional & safety testing",
    },
    category: "Engineering Services",
  },
  {
    id: "cnc-laser-cutting",
    name: "CNC Laser Cutting Machine",
    description:
      "Precision cutting with advanced CNC laser technology. High-speed, accurate cutting for metals, plastics, and other materials.",
    images: [cncLaser],
    specs: {
      Type: "Fiber Laser Cutting",
      Power: "1000W - 6000W",
      Accuracy: "+/- 0.1mm",
      Material: "Steel, Stainless, Aluminum, Brass",
    },
    category: "Machining & Fabrication",
  },
  {
    id: "cnc-milling",
    name: "CNC Milling Machine",
    description:
      "High-precision CNC milling for complex components. Multi-axis machining capability for tight-tolerance parts.",
    images: [cncMilling],
    specs: {
      Type: "3-Axis / 4-Axis CNC Milling",
      Table: "1000mm x 500mm",
      Accuracy: "+/- 0.02mm",
      Material: "Metals, Plastics, Composites",
    },
    category: "Machining & Fabrication",
  },
  {
    id: "lathe-machine",
    name: "Lathe Machine",
    description:
      "Turning solutions using high-grade lathe machines. Precision cylindrical machining for shafts, bushings, and custom components.",
    images: [latheMachine],
    specs: {
      Type: "CNC / Manual Lathe",
      Swing: "Up to 600mm diameter",
      Length: "Up to 2000mm",
      Accuracy: "+/- 0.02mm",
    },
    category: "Machining & Fabrication",
  },
  {
    id: "milling-machine",
    name: "Milling Machine",
    description:
      "Reliable milling machine services for all industries. Conventional and CNC milling for a wide range of materials and part geometries.",
    images: [millingMachine],
    specs: {
      Type: "Vertical / Horizontal Milling",
      Travel: "X: 800mm, Y: 400mm, Z: 500mm",
      Speed: "60 - 4500 RPM",
      Application: "Keyways, Slots, Flat Surfaces",
    },
    category: "Machining & Fabrication",
  },
  {
    id: "press-brake-bending",
    name: "Press Brake Bending Machine",
    description:
      "Accurate sheet metal bending with press brake technology. CNC-controlled bending for consistent angles and profiles.",
    images: [pressBrake],
    specs: {
      Type: "CNC Press Brake",
      Tonnage: "Up to 300 tons",
      Length: "Up to 4000mm",
      Accuracy: "+/- 0.5 degree",
    },
    category: "Machining & Fabrication",
  },
  {
    id: "shearing-machine",
    name: "Shearing Machine",
    description:
      "Efficient sheet metal cutting using shearing machines. Clean, straight cuts for various gauges and materials.",
    images: [shearing],
    specs: {
      Type: "Hydraulic Shearing",
      Capacity: "Up to 12mm mild steel",
      Length: "Up to 3000mm",
      Blade: "High-carbon steel",
    },
    category: "Machining & Fabrication",
  },
  {
    id: "band-saw-machine",
    name: "Band Saw Machine",
    description:
      "Versatile cutting services with band saw machines. Ideal for cutting bars, tubes, and structural shapes with precision.",
    images: [bandSaw],
    specs: {
      Type: "Horizontal Band Saw",
      Capacity: "Up to 400mm round",
      Blade: "Bi-metal / Carbide tipped",
      Application: "Bars, Tubes, Profiles",
    },
    category: "Machining & Fabrication",
  },
  {
    id: "backhoe-rental",
    name: "Rental of Backhoe",
    description:
      "Reliable backhoe rental for construction projects. Well-maintained heavy equipment with optional operator for excavation and earthmoving.",
    images: [backhoe],
    specs: {
      Type: "Backhoe Loader",
      Capacity: "1.0 cubic meter bucket",
      Depth: "Up to 4.5m digging depth",
      Rental: "Daily / Weekly / Monthly",
    },
    category: "Civil Works",
  },
  {
    id: "road-rehabilitation",
    name: "Road Rehabilitation",
    description:
      "Comprehensive road rehabilitation and maintenance. Full-service road repair, resurfacing, and reconstruction for industrial and municipal projects.",
    images: [roadRehab],
    specs: {
      Type: "Road Rehabilitation",
      Scope: "Grading, Paving, Drainage",
      Material: "Asphalt, Concrete",
      Standard: "DPWH Specifications",
    },
    category: "Civil Works",
  },
  {
    id: "concreting",
    name: "Concreting",
    description:
      "High-quality concreting for structural integrity. Ready-mix and site-mixed concrete solutions for foundations, slabs, and structural elements.",
    images: [concreting],
    specs: {
      Type: "Structural Concreting",
      Strength: "2500 PSI - 6000 PSI",
      Method: "Ready-mix / Site Batching",
      Testing: "Cylinder & Slump Testing",
    },
    category: "Civil Works",
  },
  {
    id: "structural-works",
    name: "Structural",
    description:
      "Strong and reliable structural construction services. Steel and concrete structural works for buildings, warehouses, and industrial facilities.",
    images: [structural],
    specs: {
      Type: "Structural Steel / Concrete",
      Application: "Buildings, Warehouses, Bridges",
      Material: "Structural Steel, Reinforced Concrete",
      Standard: "AISC / ACI Codes",
    },
    category: "Civil Works",
  },
  {
    id: "fire-protection-system",
    name: "Fire Protection System",
    description:
      "Installation of reliable fire protection systems. Complete fire safety solutions including sprinklers, alarms, and suppression systems.",
    images: [fireProtection],
    specs: {
      Type: "Fire Sprinkler / Alarm System",
      Standard: "NFPA Compliant",
      Coverage: "Full building protection",
      Includes: "Design, Installation, Testing",
    },
    category: "Civil Works",
  },
];

export const serviceCategories = [
  "Engineering Services",
  "Machining & Fabrication",
  "Civil Works",
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter((s) => s.category === category);
}
