export const products = [
  {
    id: 'p1',
    name: 'NVIDIA GeForce RTX 4070',
    category: 'Graphics Cards',
    brand: 'NVIDIA',
    model: 'RTX 4070 12GB',
    price: 59999,
    stock: 5,
    minStock: 2,
    supplier: 's1', // Silver Systems
    specs: {
      memory: '12GB GDDR6X',
      interface: 'PCI Express 4.0',
      power: '200W'
    },
    image: 'https://placeholder.co/400x300?text=RTX+4070'
  },
  {
    id: 'p2',
    name: 'AMD Ryzen 7 7800X3D',
    category: 'Processors',
    brand: 'AMD',
    model: 'Ryzen 7 7800X3D',
    price: 42999,
    stock: 8,
    minStock: 3,
    supplier: 's2', // Super Computers
    specs: {
      cores: '8 cores/16 threads',
      frequency: '4.2-5.0GHz',
      cache: '96MB'
    },
    image: 'https://placeholder.co/400x300?text=Ryzen+7'
  },
  {
    id: 'p3',
    name: 'ASUS ROG STRIX B650-E',
    category: 'Motherboards',
    brand: 'ASUS',
    model: 'ROG STRIX B650-E',
    price: 29999,
    stock: 4,
    minStock: 2,
    supplier: 's3', // Orient Computers
    specs: {
      socket: 'AM5',
      formFactor: 'ATX',
      memory: 'DDR5'
    },
    image: 'https://placeholder.co/400x300?text=ROG+STRIX'
  },
  {
    id: 'p4',
    name: 'Corsair Vengeance 32GB DDR5',
    category: 'Memory',
    brand: 'Corsair',
    model: 'Vengeance RGB',
    price: 15999,
    stock: 12,
    minStock: 4,
    supplier: 's1',
    specs: {
      capacity: '32GB (2x16GB)',
      speed: '6000MHz',
      type: 'DDR5'
    },
    image: 'https://placeholder.co/400x300?text=Corsair+RAM'
  },
  {
    id: 'p5',
    name: 'Samsung 990 PRO 2TB',
    category: 'Storage',
    brand: 'Samsung',
    model: '990 PRO',
    price: 19999,
    stock: 7,
    minStock: 3,
    supplier: 's2',
    specs: {
      capacity: '2TB',
      interface: 'NVMe PCIe 4.0',
      speed: '7450/6900 MB/s'
    },
    image: 'https://placeholder.co/400x300?text=Samsung+SSD'
  },
  {
    id: 'p6',
    name: 'Seagate IronWolf Pro 8TB',
    category: 'Storage',
    brand: 'Seagate',
    model: 'IronWolf Pro',
    price: 21999,
    stock: 6,
    minStock: 2,
    supplier: 's3',
    specs: {
      capacity: '8TB',
      rpm: '7200 RPM',
      cache: '256MB'
    },
    image: 'https://placeholder.co/400x300?text=Seagate+HDD'
  },
  {
    id: 'p7',
    name: 'Corsair RM850x',
    category: 'Power Supplies',
    brand: 'Corsair',
    model: 'RM850x',
    price: 13999,
    stock: 9,
    minStock: 3,
    supplier: 's1',
    specs: {
      power: '850W',
      efficiency: '80+ Gold',
      modular: 'Full'
    },
    image: 'https://placeholder.co/400x300?text=Corsair+PSU'
  },
  {
    id: 'p8',
    name: 'Lian Li O11 Dynamic EVO',
    category: 'Cases',
    brand: 'Lian Li',
    model: 'O11 Dynamic EVO',
    price: 15999,
    stock: 4,
    minStock: 2,
    supplier: 's2',
    specs: {
      formFactor: 'Mid Tower',
      material: 'Aluminum/Glass',
      fans: '3x 120mm included'
    },
    image: 'https://placeholder.co/400x300?text=Lian+Li+Case'
  },
  {
    id: 'p9',
    name: 'LG 27GP950-B',
    category: 'Monitors',
    brand: 'LG',
    model: '27GP950-B',
    price: 49999,
    stock: 3,
    minStock: 1,
    supplier: 's3',
    specs: {
      resolution: '4K UHD',
      refreshRate: '160Hz',
      panel: 'Nano IPS'
    },
    image: 'https://placeholder.co/400x300?text=LG+Monitor'
  },
  {
    id: 'p10',
    name: 'Razer Huntsman V2',
    category: 'Keyboards',
    brand: 'Razer',
    model: 'Huntsman V2',
    price: 14999,
    stock: 8,
    minStock: 3,
    supplier: 's1',
    specs: {
      switches: 'Optical',
      layout: 'Full Size',
      backlight: 'RGB'
    },
    image: 'https://placeholder.co/400x300?text=Razer+Keyboard'
  },
  {
    id: 'p11',
    name: 'Logitech G Pro X Superlight',
    category: 'Mice',
    brand: 'Logitech',
    model: 'G Pro X Superlight',
    price: 12999,
    stock: 10,
    minStock: 4,
    supplier: 's2',
    specs: {
      sensor: 'HERO 25K',
      weight: '63g',
      wireless: 'Yes'
    },
    image: 'https://placeholder.co/400x300?text=Logitech+Mouse'
  },
  {
    id: 'p12',
    name: 'Logitech Brio 4K',
    category: 'Webcams',
    brand: 'Logitech',
    model: 'Brio',
    price: 19999,
    stock: 6,
    minStock: 2,
    supplier: 's3',
    specs: {
      resolution: '4K UHD',
      fps: '60fps',
      hdr: 'Yes'
    },
    image: 'https://placeholder.co/400x300?text=Logitech+Webcam'
  },
  {
    id: 'p13',
    name: 'Hikvision DS-2CD2385G1-I',
    category: 'CCTV',
    brand: 'Hikvision',
    model: 'DS-2CD2385G1-I',
    price: 8999,
    stock: 15,
    minStock: 5,
    supplier: 's1',
    specs: {
      resolution: '8MP (4K)',
      nightVision: '30m',
      ip67: 'Yes'
    },
    image: 'https://placeholder.co/400x300?text=Hikvision+CCTV'
  },
  {
    id: 'p14',
    name: 'ASUS ROG Rapture GT-AX11000',
    category: 'Networking',
    brand: 'ASUS',
    model: 'ROG Rapture GT-AX11000',
    price: 29999,
    stock: 4,
    minStock: 2,
    supplier: 's2',
    specs: {
      wifi: 'WiFi 6 (802.11ax)',
      speed: '11000 Mbps',
      ports: '8 LAN'
    },
    image: 'https://placeholder.co/400x300?text=ASUS+Router'
  },
  {
    id: 'p15',
    name: 'Intel X550-T2',
    category: 'Networking',
    brand: 'Intel',
    model: 'X550-T2',
    price: 24999,
    stock: 5,
    minStock: 2,
    supplier: 's3',
    specs: {
      ports: '2x 10GbE',
      interface: 'PCIe 3.0',
      compatibility: 'Windows/Linux'
    },
    image: 'https://placeholder.co/400x300?text=Intel+NIC'
  },
  {
    id: 'p16',
    name: 'Thermal Grizzly Kryonaut',
    category: 'Accessories',
    brand: 'Thermal Grizzly',
    model: 'Kryonaut',
    price: 999,
    stock: 20,
    minStock: 8,
    supplier: 's1',
    specs: {
      size: '1g',
      conductivity: '12.5 W/mk',
      type: 'Non-conductive'
    },
    image: 'https://placeholder.co/400x300?text=Thermal+Paste'
  },
  {
    id: 'p17',
    name: 'Intel Core i9-13900K',
    category: 'Processors',
    brand: 'Intel',
    model: 'Core i9-13900K',
    price: 54999,
    stock: 6,
    minStock: 2,
    supplier: 's2',
    specs: {
      cores: '24 cores (8P+16E)',
      frequency: '5.8GHz max',
      socket: 'LGA 1700'
    },
    image: 'https://placeholder.co/400x300?text=Intel+i9'
  },
  {
    id: 'p18',
    name: 'MSI MPG A850G',
    category: 'Power Supplies',
    brand: 'MSI',
    model: 'MPG A850G',
    price: 12999,
    stock: 8,
    minStock: 3,
    supplier: 's3',
    specs: {
      power: '850W',
      efficiency: '80+ Gold',
      modular: 'Full'
    },
    image: 'https://placeholder.co/400x300?text=MSI+PSU'
  },
  {
    id: 'p19',
    name: 'WD Black SN850X 1TB',
    category: 'Storage',
    brand: 'Western Digital',
    model: 'SN850X',
    price: 12999,
    stock: 10,
    minStock: 4,
    supplier: 's1',
    specs: {
      capacity: '1TB',
      interface: 'NVMe PCIe 4.0',
      speed: '7300/6600 MB/s'
    },
    image: 'https://placeholder.co/400x300?text=WD+SSD'
  },
  {
    id: 'p20',
    name: 'AMD Radeon RX 7900 XTX',
    category: 'Graphics Cards',
    brand: 'AMD',
    model: 'RX 7900 XTX',
    price: 89999,
    stock: 3,
    minStock: 1,
    supplier: 's2',
    specs: {
      memory: '24GB GDDR6',
      interface: 'PCI Express 4.0',
      power: '355W'
    },
    image: 'https://placeholder.co/400x300?text=RX+7900'
  }
]