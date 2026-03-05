import electricalSupplies from "@/assets/Electrical Supplies.jpg";
import electricalPanel from "@/assets/Electrical Panel.png";
import cableTray from "@/assets/Cable Tray.jpg";
import acMotor from "@/assets/AC Motors and Gear Motors.png";
import bearings from "@/assets/Bearing and Seal.jpg";
import pneumaticsPart from "@/assets/Pneumatic Cylinder Accessories.jpg";
import conveyor from "@/assets/Conveyor System.png";
import jigs from "@/assets/Jigs and Fixtures.png";

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  specs: Record<string, string>;
  stock?: number;
  category: string;
}

export const products: Product[] = [
  {
    id: "electrical-supply",
    name: "Electrical Supply",
    description:
      "Complete solutions for industrial and commercial electrical needs. High-quality wiring, connectors, and accessories for reliable power distribution.",
    images: [electricalSupplies],
    specs: {
      Type: "Electrical Components",
      Application: "Industrial & Commercial",
      Material: "Copper / PVC Insulated",
      Certification: "UL Listed",
    },
    stock: 100,
    category: "Electrical",
  },
  {
    id: "electrical-panel",
    name: "Electrical Panel",
    description:
      "Durable and safe panels for power distribution. Designed for industrial-grade reliability with proper circuit protection and easy maintenance access.",
    images: [electricalPanel],
    specs: {
      Type: "Distribution Panel",
      Voltage: "220V / 440V",
      Material: "Powder-Coated Steel",
      Protection: "IP54 Rated",
    },
    stock: 25,
    category: "Electrical",
  },
  {
    id: "cable-tray",
    name: "Cable Tray",
    description:
      "Reliable cable trays for safe wiring management. Engineered for durability and easy cable routing in industrial and commercial installations.",
    images: [cableTray],
    specs: {
      Type: "Ladder / Perforated Tray",
      Material: "Hot-Dip Galvanized Steel",
      Width: "100mm - 600mm",
      Load: "Up to 150 kg/m",
    },
    stock: 80,
    category: "Electrical",
  },
  {
    id: "ac-motors-gear-motors",
    name: "AC Motors and Gear Motors",
    description:
      "Industrial-grade motors built for durability. High efficiency motors for various industrial applications including conveyors, pumps, and heavy machinery.",
    images: [acMotor],
    specs: {
      Type: "AC Induction / Gear Motor",
      Power: "0.5 HP - 30 HP",
      Voltage: "220V / 380V / 440V",
      Speed: "900 - 3600 RPM",
      Efficiency: "IE2 / IE3 Class",
    },
    stock: 12,
    category: "Mechanical Components",
  },
  {
    id: "bearings-seals",
    name: "Bearings & Seals",
    description:
      "Durable bearings and seals for precision. High-quality components for smooth mechanical operations from trusted brands like SKF, NSK, NTN, and NACHI.",
    images: [bearings],
    specs: {
      Type: "Ball Bearing",
      Size: "60mm x 110mm x 22mm",
      Material: "Chrome Steel",
      Speed: "6000 RPM",
    },
    stock: 50,
    category: "Mechanical Components",
  },
  {
    id: "pneumatic-cylinder-accessories",
    name: "Pneumatic Cylinder Accessories",
    description:
      "High-quality pneumatic parts for automation systems. Cylinders, fittings, valves, and accessories designed for smooth control and efficiency.",
    images: [pneumaticsPart],
    specs: {
      Type: "Pneumatic Cylinder / Fittings",
      Bore: "20mm - 200mm",
      Pressure: "1.0 - 10 bar",
      Material: "Aluminum / Stainless Steel",
    },
    stock: 35,
    category: "Automation & Pneumatics",
  },
  {
    id: "conveyor-system",
    name: "Conveyor System",
    description:
      "Custom conveyor systems for industrial use. Designed for efficient material handling with durable construction and low maintenance requirements.",
    images: [conveyor],
    specs: {
      Type: "Belt / Roller Conveyor",
      Length: "Custom (up to 50m)",
      Load: "Up to 500 kg/m",
      Speed: "Variable (0.1 - 2.0 m/s)",
      Drive: "AC Motor / Gear Motor",
    },
    stock: 5,
    category: "Systems & Tooling",
  },
  {
    id: "jigs-fixtures",
    name: "Jigs and Fixtures",
    description:
      "Precision jigs and fixtures for manufacturing. Custom-designed tooling solutions for consistent, accurate, and repeatable production processes.",
    images: [jigs],
    specs: {
      Type: "Custom Jig / Fixture",
      Material: "Tool Steel / Aluminum",
      Tolerance: "+/- 0.05mm",
      Application: "Assembly / Welding / Machining",
    },
    stock: 8,
    category: "Systems & Tooling",
  },
];

export const productCategories = [
  "Electrical",
  "Mechanical Components",
  "Automation & Pneumatics",
  "Systems & Tooling",
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
