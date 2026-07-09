import { renderNavbar, renderFooter } from '../components/Navigation';
import { renderProductCard } from '../components/ProductCard';
import { Search, Box } from 'lucide-static';

const fallbackProducts = [
  {
    "id": "p-1",
    "name": "13HP Tata Power Tiller",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/13HP Tata Power Tiller/WhatsApp Image 2026-07-09 at 11.34.23 AM.jpeg",
    "images": [
      "/assets/products_staging/OTHER/13HP Tata Power Tiller/WhatsApp Image 2026-07-09 at 11.34.23 AM.jpeg",
      "/assets/products_staging/OTHER/13HP Tata Power Tiller/WhatsApp Image 2026-07-09 at 11.34.30 AM.jpeg"
    ],
    "specs": [
      "13 HP Heavy-Duty Engine",
      "Dual-Speed Transmission",
      "Extra-Wide Rotary Tines",
      "Reinforced Mechanical Frame"
    ],
    "task": "Medium-scale soil cultivation, rotary plowing, and hauling in smallholder fields or hard clay soils.",
    "description": "Providing nearly double the power of the smaller model, the 13HP Tata Power Tiller handles tough, compacted soils with ease. It supports deeper row-tilling and can pull small farm carts, making it a rugged and versatile primary tool for medium-scale vegetable farms.",
    "status": "Active"
  },
  {
    "id": "p-2",
    "name": "4-Row Corn Harvester Header",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/4 ROW CORN HARVESTER HEADER/WhatsApp Image 2026-07-09 at 11.34.04 AM (1).jpeg",
    "images": [
      "/assets/products_staging/OTHER/4 ROW CORN HARVESTER HEADER/WhatsApp Image 2026-07-09 at 11.34.04 AM (1).jpeg",
      "/assets/products_staging/OTHER/4 ROW CORN HARVESTER HEADER/WhatsApp Image 2026-07-09 at 11.34.04 AM.jpeg",
      "/assets/products_staging/OTHER/4 ROW CORN HARVESTER HEADER/WhatsApp Image 2026-07-09 at 11.34.22 AM (1).jpeg"
    ],
    "specs": [
      "4-Row Harvesting Capacity",
      "High-Strength Steel Construction",
      "Compatible with Major Combine Harvesters",
      "Optimized Row Spacing"
    ],
    "task": "Efficiently snapping and harvesting corn ears from stalks while minimizing grain damage and field loss.",
    "description": "This high-performance 4-Row Corn Harvester Header is engineered for seamless integration with combine harvesters. It cleanly separates corn ears from stalks, directing them into the feeder house while leaving chopped stalks on the field, maximizing efficiency during the harvest season.",
    "status": "Active"
  },
  {
    "id": "p-3",
    "name": "7HP Tata Power Tiller",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/7HP Tata Power Tiller/WhatsApp Image 2026-07-09 at 11.34.24 AM (1).jpeg",
    "images": [
      "/assets/products_staging/OTHER/7HP Tata Power Tiller/WhatsApp Image 2026-07-09 at 11.34.24 AM (1).jpeg",
      "/assets/products_staging/OTHER/7HP Tata Power Tiller/WhatsApp Image 2026-07-09 at 11.34.29 AM (1).jpeg"
    ],
    "specs": [
      "7 HP Gasoline/Diesel Engine",
      "Compact Walking Frame",
      "Multi-Blade Rotary Tines",
      "Adjustable Handlebars"
    ],
    "task": "Small-scale soil tilling, weeding, and seedbed preparation in home gardens, narrow orchards, and greenhouses.",
    "description": "The 7HP Tata Power Tiller is a light, agile walk-behind cultivator built for intensive work in tight spaces. Perfect for smallholders and vegetable gardeners, it breaks up topsoil and cuts down weeds with minimal user effort, navigating narrow pathways where full-sized tractors cannot fit.",
    "status": "Active"
  },
  {
    "id": "p-4",
    "name": "Bamford Baler",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/Bamford Baler/BamfordBaler-x1zE2RlD.jpeg",
    "images": [
      "/assets/products_staging/OTHER/Bamford Baler/BamfordBaler-x1zE2RlD.jpeg"
    ],
    "specs": [
      "High-Density Compression Chamber",
      "Automated Knotter System",
      "Adjustable Bale Size",
      "PTO Driven"
    ],
    "task": "Gathering and compressing loose hay, straw, or forage into compact, transportable, and stackable bales.",
    "description": "The Bamford Baler is an essential implement for managing post-harvest straw and livestock forage. It cleans fields by pulling in loose material, compacting it inside a high-density chamber, and securing it with an automated knotting mechanism. The resulting uniform bales are easy to transport and store over long winters.",
    "status": "Active"
  },
  {
    "id": "p-5",
    "name": "Bamford Forage Harvester (Chopper)",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/Bamford Forage Harvester (Chopper)/BamfordForageHarvesterChopper-DfRrIS-T.jpeg",
    "images": [
      "/assets/products_staging/OTHER/Bamford Forage Harvester (Chopper)/BamfordForageHarvesterChopper-DfRrIS-T.jpeg",
      "/assets/products_staging/OTHER/Bamford Forage Harvester (Chopper)/WhatsApp Image 2026-07-09 at 11.34.01 AM.jpeg"
    ],
    "specs": [
      "PTO Driven",
      "High-Speed Cutting Flywheel",
      "Adjustable Chop Length",
      "Directional Discharge Chute"
    ],
    "task": "Cutting and fine-chopping green fodder crops (such as maize or sorghum) for high-quality silage production.",
    "description": "This tractor-driven forage harvester cuts green standing crops and immediately processes them through a high-speed chopping mechanism. It guarantees uniform chop lengths, which optimizes anaerobic compaction during silage fermentation, improving the overall nutritional retention of livestock feed.",
    "status": "Active"
  },
  {
    "id": "p-6",
    "name": "Multi-Crop Thresher",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/THRESHER/WhatsApp Image 2026-07-09 at 11.33.51 AM.jpeg",
    "images": [
      "/assets/products_staging/OTHER/THRESHER/WhatsApp Image 2026-07-09 at 11.33.51 AM.jpeg",
      "/assets/products_staging/OTHER/THRESHER/WhatsApp Image 2026-07-09 at 11.34.05 AM.jpeg",
      "/assets/products_staging/OTHER/THRESHER/WhatsApp Image 2026-07-09 at 11.34.06 AM.jpeg"
    ],
    "specs": [
      "High-Speed Threshing Cylinder",
      "Adjustable Blow Speed",
      "Interchangeable Screen Sieves",
      "Tractor PTO or Engine Powered"
    ],
    "task": "Separating grains from harvested crops (maize, sorghum, rice, beans) rapidly and cleanly.",
    "description": "The Multi-Crop Thresher is a robust post-harvest machine designed to separate grain from chaff. Powered by a tractor PTO or an auxiliary engine, it processes harvested stalks, yielding clean, polished grain with minimal kernel damage, dramatically cutting down manual threshing labor.",
    "status": "Active"
  },
  {
    "id": "p-7",
    "name": "Tata 2BYZF-4 No-Till Planter with Fertilizer Applicator",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/Tata 2BYZF-4 No-Till Planter with Fertilizer Applicator/FertilizerApplicator4Planter--V26CKtd.jpeg",
    "images": [
      "/assets/products_staging/OTHER/Tata 2BYZF-4 No-Till Planter with Fertilizer Applicator/FertilizerApplicator4Planter--V26CKtd.jpeg",
      "/assets/products_staging/OTHER/Tata 2BYZF-4 No-Till Planter with Fertilizer Applicator/WhatsApp Image 2026-07-09 at 11.33.50 AM.jpeg",
      "/assets/products_staging/OTHER/Tata 2BYZF-4 No-Till Planter with Fertilizer Applicator/WhatsApp Image 2026-07-09 at 11.34.26 AM.jpeg",
      "/assets/products_staging/OTHER/Tata 2BYZF-4 No-Till Planter with Fertilizer Applicator/WhatsApp Image 2026-07-09 at 11.34.27 AM (1).jpeg",
      "/assets/products_staging/OTHER/Tata 2BYZF-4 No-Till Planter with Fertilizer Applicator/WhatsApp Image 2026-07-09 at 11.34.27 AM.jpeg"
    ],
    "specs": [
      "4-Row Seeding Assembly",
      "No-Till Disc Openers",
      "Integrated Dual Fertilizer Hoppers",
      "Depth-Control Press Wheels"
    ],
    "task": "Simultaneous direct seeding and precise fertilizer placement into unplowed crop fields in a single pass.",
    "description": "The Tata 2BYZF-4 is an advanced 4-row planter engineered for conservation agriculture. Its sharp disc cutters cut through old crop residues to place seeds directly into the unplowed earth, while simultaneously laying down fertilizer. This method protects the soil structure and conserves ground moisture.",
    "status": "Active"
  },
  {
    "id": "p-8",
    "name": "Tata 2BYZF-6 No-Till Planter with Fertilizer Applicator",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/Tata 2BYZF-6 No-Till Planter with Fertilizer Applicator/FertilizerApplicator-DRJGsdIk.jpeg",
    "images": [
      "/assets/products_staging/OTHER/Tata 2BYZF-6 No-Till Planter with Fertilizer Applicator/FertilizerApplicator-DRJGsdIk.jpeg",
      "/assets/products_staging/OTHER/Tata 2BYZF-6 No-Till Planter with Fertilizer Applicator/WhatsApp Image 2026-07-09 at 11.34.00 AM.jpeg",
      "/assets/products_staging/OTHER/Tata 2BYZF-6 No-Till Planter with Fertilizer Applicator/WhatsApp Image 2026-07-09 at 11.34.23 AM (1).jpeg",
      "/assets/products_staging/OTHER/Tata 2BYZF-6 No-Till Planter with Fertilizer Applicator/WhatsApp Image 2026-07-09 at 11.34.24 AM.jpeg"
    ],
    "specs": [
      "6-Row Seeding Assembly",
      "Heavy-Duty No-Till Disc Coulters",
      "Large Capacity Seed/Fertilizer Tanks",
      "Precision Metering Units"
    ],
    "task": "High-capacity direct seeding and fertilizer application across larger acreage fields to preserve soil moisture.",
    "description": "This 6-row configuration maximizes planting efficiency for larger farming operations. It shares the same no-till design as the 4-row model, but features larger seed and fertilizer capacities to minimize refilling stops, allowing farmers to cover fields rapidly while preventing soil erosion.",
    "status": "Active"
  },
  {
    "id": "p-9",
    "name": "Tata 6N2018X-G Rice Mill",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/Tata 6N2018X-G Rice Mill/WhatsApp Image 2026-07-09 at 11.33.52 AM.jpeg",
    "images": [
      "/assets/products_staging/OTHER/Tata 6N2018X-G Rice Mill/WhatsApp Image 2026-07-09 at 11.33.52 AM.jpeg",
      "/assets/products_staging/OTHER/Tata 6N2018X-G Rice Mill/WhatsApp Image 2026-07-09 at 11.34.28 AM.jpeg",
      "/assets/products_staging/OTHER/Tata 6N2018X-G Rice Mill/WhatsApp Image 2026-07-09 at 11.34.29 AM.jpeg"
    ],
    "specs": [
      "Integrated De-husking System",
      "Multistage Rice Polishing System",
      "High-Output Electric Motor",
      "Compact Footprint"
    ],
    "task": "Processing harvested field paddy into fully de-husked, polished, and market-ready white rice.",
    "description": "The Tata 6N2018X-G is an efficient, all-in-one rice milling machine built for decentralized agricultural processing. It gently separates the tough outer husk from raw paddy grains before running them through an integrated polishing system, producing clean, high-grade white rice with a very low percentage of broken grains.",
    "status": "Active"
  },
  {
    "id": "p-10",
    "name": "Tata Boom Sprayer",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/Tata Boom Sprayer/TataBoomSprayer-DdUxDens.jpeg",
    "images": [
      "/assets/products_staging/OTHER/Tata Boom Sprayer/TataBoomSprayer-DdUxDens.jpeg"
    ],
    "specs": [
      "Tractor-Mounted Frame",
      "Wide-Span Folding Booms",
      "Adjustable Spray Nozzles",
      "Chemical-Resistant Poly Tank"
    ],
    "task": "Wide-coverage, precise application of liquid pesticides, liquid fertilizers, and herbicides across large crop fields.",
    "description": "The Tata Boom Sprayer provides uniform chemical coverage across a wide path, drastically reducing field time. It features adjustable nozzles to minimize chemical drift, ensuring targeted and efficient crop protection. Its durable boom arms fold compactly for safe transport between fields.",
    "status": "Active"
  },
  {
    "id": "p-11",
    "name": "Tata Rice Transplanter",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/OTHER/Tata Rice Transplanter/RiceTransplanter-nXZtJxAL.jpeg",
    "images": [
      "/assets/products_staging/OTHER/Tata Rice Transplanter/RiceTransplanter-nXZtJxAL.jpeg"
    ],
    "specs": [
      "Mechanized Row Planting Fingers",
      "Uniform Seedling Spacing",
      "Low-Compaction Paddy Wheels",
      "High-Speed Float Board"
    ],
    "task": "Mechanized, high-speed transplanting of young rice seedlings into flooded paddy fields.",
    "description": "This specialized machine replaces intensive manual labor by automatically planting young rice seedlings into wet paddies. It places seedlings at precise, uniform depths and intervals, ensuring optimal crop spacing that maximizes field yields while significantly lowering manual labor costs.",
    "status": "Active"
  },
  {
    "id": "p-12",
    "name": "Lovol Harvester RG108 (Standard Combine)",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/combine harvestor/LOVOL-RG108+/WhatsApp Image 2026-07-09 at 11.33.11 AM.jpeg",
    "images": [
      "/assets/products_staging/combine harvestor/LOVOL-RG108+/WhatsApp Image 2026-07-09 at 11.33.11 AM.jpeg",
      "/assets/products_staging/combine harvestor/LOVOL-RG108+/WhatsApp Image 2026-07-09 at 11.33.13 AM.jpeg",
      "/assets/products_staging/combine harvestor/LOVOL-RG108+/WhatsApp Image 2026-07-09 at 11.33.14 AM (1).jpeg",
      "/assets/products_staging/combine harvestor/LOVOL-RG108+/WhatsApp Image 2026-07-09 at 11.33.14 AM.jpeg",
      "/assets/products_staging/combine harvestor/LOVOL-RG108+/WhatsApp Image 2026-07-09 at 11.33.17 AM.jpeg",
      "/assets/products_staging/combine harvestor/LOVOL-RG108+/WhatsApp Image 2026-07-09 at 11.33.18 AM.jpeg"
    ],
    "specs": [
      "Reliable Mechanical Drive",
      "High-Volume Grain Tank",
      "Optimized Cutting Width",
      "Tangential Flow Threshing Drum"
    ],
    "task": "Continuous harvesting of diverse grain crops including rice, wheat, and barley under varied climate conditions.",
    "description": "The Lovol RG108 is a robust combine harvester favored for its straightforward, reliable mechanical operation and excellent crop throughput. Its threshing mechanics cleanly separate grains from stalks, minimizing crop damage. The durable chassis and broad tires minimize soil compaction while keeping harvest operations smooth and highly efficient.",
    "status": "Active"
  },
  {
    "id": "p-13",
    "name": "Zoomlion Crawler Type Harvester ZL105",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/combine harvestor/ZOOMLION/WhatsApp Image 2026-07-09 at 11.33.18 AM (1).jpeg",
    "images": [
      "/assets/products_staging/combine harvestor/ZOOMLION/WhatsApp Image 2026-07-09 at 11.33.18 AM (1).jpeg",
      "/assets/products_staging/combine harvestor/ZOOMLION/WhatsApp Image 2026-07-09 at 11.33.19 AM.jpeg",
      "/assets/products_staging/combine harvestor/ZOOMLION/WhatsApp Image 2026-07-09 at 11.33.22 AM.jpeg",
      "/assets/products_staging/combine harvestor/ZOOMLION/WhatsApp Image 2026-07-09 at 11.33.49 AM.jpeg"
    ],
    "specs": [
      "High-Traction Crawler Tracks",
      "High Ground Clearance",
      "High-Capacity Grain Tank",
      "Heavy-Duty Rubber Tracks",
      "Turbocharged Engine"
    ],
    "task": "Harvesting grain crops in waterlogged, muddy, or highly uneven and challenging wetland fields.",
    "description": "The Zoomlion ZL105 is built with heavy-duty crawler tracks specifically to operate where wheeled harvesters fail. It floats effortlessly over muddy soils and paddy environments, delivering exceptional stability and high traction. Its high-capacity harvesting drum processes dense wet crops cleanly, making it indispensable for intensive rice farming regions.",
    "status": "Active"
  },
  {
    "id": "p-14",
    "name": "Alvan Blanch Disc Harrow",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/implements/Alvan Blanch Disc Harrow/OffsetDiscPlough-DO6luG0F.jpeg",
    "images": [
      "/assets/products_staging/implements/Alvan Blanch Disc Harrow/OffsetDiscPlough-DO6luG0F.jpeg",
      "/assets/products_staging/implements/Alvan Blanch Disc Harrow/WhatsApp Image 2026-07-09 at 11.33.49 AM (1).jpeg",
      "/assets/products_staging/implements/Alvan Blanch Disc Harrow/WhatsApp Image 2026-07-09 at 11.34.41 AM.jpeg"
    ],
    "specs": [
      "Premium Alvan Blanch Steel Structure",
      "Multiple Heavy Discs",
      "Adjustable Working Angle",
      "Sealed Heavy-Duty Bearings"
    ],
    "task": "High-quality secondary tillage, clod breaking, seedbed leveling, and active weed eradication.",
    "description": "Manufactured by Alvan Blanch, this disc harrow is an exceptional tool for secondary cultivation. Following a primary plow, it pulverizes large dirt clods into a fine, flat tilth. It is highly adjustable to ensure full surface coverage, making it ideal for final seedbed preparation.",
    "status": "Active"
  },
  {
    "id": "p-15",
    "name": "Disc Ridger",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/implements/Disc Ridger/WhatsApp Image 2026-07-09 at 11.34.07 AM.jpeg",
    "images": [
      "/assets/products_staging/implements/Disc Ridger/WhatsApp Image 2026-07-09 at 11.34.07 AM.jpeg",
      "/assets/products_staging/implements/Disc Ridger/WhatsApp Image 2026-07-09 at 11.34.12 AM.jpeg",
      "/assets/products_staging/implements/Disc Ridger/WhatsApp Image 2026-07-09 at 11.34.41 AM (1).jpeg",
      "/assets/products_staging/implements/Disc Ridger/WhatsApp Image 2026-07-09 at 11.34.41 AM (2).jpeg"
    ],
    "specs": [
      "Adjustable Gang Angle",
      "Durable Steel Discs",
      "Heavy-Duty Frame",
      "Variable Ridge Width Settings"
    ],
    "task": "Creating uniform ridges and furrows for row crops, irrigation planning, and localized soil water management.",
    "description": "The Disc Ridger utilizes heavy rotating discs to gather loose soil into perfectly shaped ridges. It is highly adjustable, allowing operators to match row spacing requirements for crops such as potatoes, maize, and vegetables, while creating neat channels that optimize field drainage.",
    "status": "Active"
  },
  {
    "id": "p-16",
    "name": "Mould Board Plough",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/implements/Mould Board Plough/MouldBoardPlough-roKwaKOA.jpeg",
    "images": [
      "/assets/products_staging/implements/Mould Board Plough/MouldBoardPlough-roKwaKOA.jpeg",
      "/assets/products_staging/implements/Mould Board Plough/WhatsApp Image 2026-07-09 at 11.33.59 AM.jpeg",
      "/assets/products_staging/implements/Mould Board Plough/WhatsApp Image 2026-07-09 at 11.34.40 AM (1).jpeg",
      "/assets/products_staging/implements/Mould Board Plough/WhatsApp Image 2026-07-09 at 11.34.40 AM.jpeg"
    ],
    "specs": [
      "Classic Mould Board Share Design",
      "High-Clearance Frame",
      "Deep Tillage Shares",
      "Reversible or Fixed Configurations"
    ],
    "task": "Traditional deep tillage, complete soil inversion, burial of organic crop residue, and weed seed suppression.",
    "description": "The Mould Board Plough is the definitive tool for deep soil preparation. By cutting, lifting, and completely turning over the soil profile, it buries surface trash and weed seeds deep underground. This process enhances aeration, improves water infiltration, and establishes a clean, fertile seedbed.",
    "status": "Active"
  },
  {
    "id": "p-17",
    "name": "Mould Board Ridger",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/implements/Mould Board Ridger/MouldBoardRidger-CZahw9XL.jpeg",
    "images": [
      "/assets/products_staging/implements/Mould Board Ridger/MouldBoardRidger-CZahw9XL.jpeg"
    ],
    "specs": [
      "Dual Mould Board Wings",
      "Deep Penetration Point",
      "Adjustable Wing Span",
      "High-Strength Steel Frame"
    ],
    "task": "Forming deep, well-defined raised beds and clean furrows for crops requiring strict root drainage profiles.",
    "description": "The Mould Board Ridger uses symmetric wings to plow through soil, pushing equal amounts to both sides to form raised beds. It provides deep soil penetration, ensuring that the root zone of the crop remains loosely packed and highly aerated, which is ideal for root crop health.",
    "status": "Active"
  },
  {
    "id": "p-18",
    "name": "Offset Disc Plough",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/implements/Offset Disc Plough/OffsetDiscPlough-DO6luG0F.jpeg",
    "images": [
      "/assets/products_staging/implements/Offset Disc Plough/OffsetDiscPlough-DO6luG0F.jpeg"
    ],
    "specs": [
      "Offset Frame Design",
      "High-Carbon Steel Discs",
      "Adjustable Cutting Depth",
      "Heavy-Duty Scrapers"
    ],
    "task": "Primary tillage in hard, dry, and stony soils, breaking up hardpan layers and chopping weed root systems.",
    "description": "The Offset Disc Plough is designed to aggressively penetrate tough, uncultivated soils where traditional shares might break. The heavy, sharp discs spin freely to slash through crop residue and blend it into the topsoil. It features highly adjustable angles to accommodate changing ground hardness levels.",
    "status": "Active"
  },
  {
    "id": "p-19",
    "name": "Shrubmaster Rotary Slasher",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/implements/Shrubmaster Rotary Slasher/ShrubmasterRotarySlasher-bgnnic4k.jpeg",
    "images": [
      "/assets/products_staging/implements/Shrubmaster Rotary Slasher/ShrubmasterRotarySlasher-bgnnic4k.jpeg",
      "/assets/products_staging/implements/Shrubmaster Rotary Slasher/WhatsApp Image 2026-07-09 at 11.33.54 AM.jpeg",
      "/assets/products_staging/implements/Shrubmaster Rotary Slasher/WhatsApp Image 2026-07-09 at 11.34.14 AM.jpeg",
      "/assets/products_staging/implements/Shrubmaster Rotary Slasher/WhatsApp Image 2026-07-09 at 11.34.15 AM.jpeg",
      "/assets/products_staging/implements/Shrubmaster Rotary Slasher/WhatsApp Image 2026-07-09 at 11.34.20 AM.jpeg",
      "/assets/products_staging/implements/Shrubmaster Rotary Slasher/WhatsApp Image 2026-07-09 at 11.34.22 AM.jpeg"
    ],
    "specs": [
      "Heavy-Duty Rotary Cutting Blades",
      "Reinforced Steel Deck",
      "Adjustable Skid Shoes",
      "Friction Clutch Protection"
    ],
    "task": "Heavy-duty clearing of tough field bushes, tall shrubs, overgrown vegetation, and pasture maintenance.",
    "description": "The Shrubmaster Rotary Slasher is engineered to clear wild, untamed fields and scrublands. Driven by the tractor's PTO, its heavy-duty blades rotate at high speeds to shred through thick brushwood and small saplings. It features built-in slip-clutch protection to safeguard the tractor's internal drive from sudden subterranean impacts.",
    "status": "Active"
  },
  {
    "id": "p-20",
    "name": "Tipping Trailer",
    "category": "Farm Implements",
    "price": "Price on Request",
    "image": "/assets/products_staging/implements/Tipping Trailer/TippingTrailer-C2RhSgR1.jpeg",
    "images": [
      "/assets/products_staging/implements/Tipping Trailer/TippingTrailer-C2RhSgR1.jpeg"
    ],
    "specs": [
      "Heavy-Duty Steel Construction",
      "Hydraulic Tipping Mechanism",
      "Various Payload Capacities",
      "Multi-Leaf Spring Suspension"
    ],
    "task": "Highly efficient transport and automated unloading of harvested crops, fertilizer bags, and loose farm materials.",
    "description": "This heavy-duty tipping trailer is built to handle the rigorous hauling needs of a busy farm. Operated directly by the tractor\u2019s hydraulic system, its smooth tipping mechanism allows for rapid, effortless unloading of bulk materials. The reinforced steel box structure ensures long-term resistance to denting and heavy impacts.",
    "status": "Active"
  },
  {
    "id": "p-21",
    "name": "Lovol H754 H-Series 4WD Utility Tractor",
    "category": "Tractors",
    "price": "Price on Request",
    "image": "/assets/products_staging/tractor/LOVOL/WhatsApp Image 2026-07-09 at 11.33.23 AM (1).jpeg",
    "images": [
      "/assets/products_staging/tractor/LOVOL/WhatsApp Image 2026-07-09 at 11.33.23 AM (1).jpeg",
      "/assets/products_staging/tractor/LOVOL/WhatsApp Image 2026-07-09 at 11.33.27 AM.jpeg",
      "/assets/products_staging/tractor/LOVOL/WhatsApp Image 2026-07-09 at 11.33.28 AM.jpeg",
      "/assets/products_staging/tractor/LOVOL/WhatsApp Image 2026-07-09 at 11.33.29 AM.jpeg",
      "/assets/products_staging/tractor/LOVOL/WhatsApp Image 2026-07-09 at 11.33.34 AM (1).jpeg",
      "/assets/products_staging/tractor/LOVOL/WhatsApp Image 2026-07-09 at 11.33.34 AM.jpeg"
    ],
    "specs": [
      "75 HP Engine",
      "Xinchai 4-Cylinder Water-Cooled Diesel Engine",
      "12 Forward + 12 Reverse Gears with Mechanical Synchronizer Shuttle Shift",
      "Heavy-Duty 4WD",
      "Category II Three-Point Hitch with dual auxiliary cylinders",
      "and Independent Dual-Speed PTO (540/1000 RPM)"
    ],
    "task": "Highly efficient dry and paddy field operations, deep plowing, rotary tillage, farm hauling, and heavy-duty front/rear implement attachments.",
    "description": "The Lovol H754 H-Series is an exceptionally engineered, multifunctional utility tractor independently developed to deliver unmatched power and adaptability for small to medium-sized farms. Powered by a robust Xinchai 4-cylinder engine, it satisfies modern emission regulations while providing an impressive torque reserve coefficient of over 30% and a heavy traction force reaching up to 17 KN. Built to survive challenging environments, it features a specialized shared-oil chassis integrated with a chassis oil radiator that continuously optimizes thermal control and overall operational efficiency during deep tillage or long hauling tasks.",
    "status": "Active"
  },
  {
    "id": "p-22",
    "name": "Massey Ferguson MF-375 Utility Tractor",
    "category": "Tractors",
    "price": "Price on Request",
    "image": "/assets/products_staging/tractor/MF/WhatsApp Image 2026-07-09 at 11.33.35 AM (1).jpeg",
    "images": [
      "/assets/products_staging/tractor/MF/WhatsApp Image 2026-07-09 at 11.33.35 AM (1).jpeg",
      "/assets/products_staging/tractor/MF/WhatsApp Image 2026-07-09 at 11.33.35 AM.jpeg",
      "/assets/products_staging/tractor/MF/WhatsApp Image 2026-07-09 at 11.33.43 AM.jpeg",
      "/assets/products_staging/tractor/MF/WhatsApp Image 2026-07-09 at 11.33.44 AM.jpeg"
    ],
    "specs": [
      "75 HP Engine",
      "4.41L 4-Cylinder Perkins Diesel Engine",
      "Sliding Spur Transmission (8 Forward / 2 Reverse Gears)",
      "2",
      "145 kg Maximum Lifting Capacity",
      "Hydrostatic Power Steering"
    ],
    "task": "High-efficiency primary cultivation, heavy-duty plowing, medium-to-large scale crop hauling, and reliable multi-implement farm management.",
    "description": "The Massey Ferguson MF-375 is a legendary, durable, and highly versatile utility tractor engineered specifically to tackle demanding agricultural tasks under challenging field conditions. Powered by a robust and fuel-efficient 4-cylinder Perkins engine, it delivers high pulling power and maximum torque at low RPMs, minimizing engine wear while maximizing field productivity. Its aerodynamic body profile is paired with an upgraded oil cooler system to ensure steady engine performance without overheating during prolonged operations in hot climates.  The tractor's heavy-duty transmission and independent 540 RPM PTO allow it to seamlessly operate deep-tillage implements, large planters, and harvesting tools. For operator safety and comfort, it features an oil-immersed multi-disc braking system for responsive stopping power, responsive hydrostatic steering to lower steering effort, and a spring-suspension seat designed to absorb vibrations during long working days in the field.",
    "status": "Active"
  },
  {
    "id": "p-23",
    "name": "Zoomlion RC Series 1104 - 4WD Heavy-Duty Tractor",
    "category": "Tractors",
    "price": "Price on Request",
    "image": "/assets/products_staging/tractor/Zoomlion RC SERIES 1104 - 4WD /WhatsApp Image 2026-07-09 at 11.32.55 AM.jpeg",
    "images": [
      "/assets/products_staging/tractor/Zoomlion RC SERIES 1104 - 4WD /WhatsApp Image 2026-07-09 at 11.32.55 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RC SERIES 1104 - 4WD /WhatsApp Image 2026-07-09 at 11.32.56 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RC SERIES 1104 - 4WD /WhatsApp Image 2026-07-09 at 11.33.01 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RC SERIES 1104 - 4WD /WhatsApp Image 2026-07-09 at 11.33.46 AM (1).jpeg"
    ],
    "specs": [
      "110 HP Engine",
      "4WD",
      "16 Forward Gears",
      "High-Pressure Common Rail Diesel Engine",
      "High Lifting Capacity Category II Hitch"
    ],
    "task": "Intensive large-scale farming, deep tillage, heavy secondary cultivation, and continuous heavy machinery pulling.",
    "description": "The Zoomlion RC Series 1104 is a heavy-duty agricultural tractor designed to dominate demanding farm tasks. Featuring 16 forward speeds and an advanced 110 HP engine, it delivers high torque to pull wider implements and deep-subsoilers effortlessly. The advanced cabin ergonomics and technological control loops allow operators to remain productive during extended seasonal windows.",
    "status": "Active"
  },
  {
    "id": "p-24",
    "name": "Zoomlion RK Series 504 - 4WD Compact Tractor",
    "category": "Tractors",
    "price": "Price on Request",
    "image": "/assets/products_staging/tractor/Zoomlion RK SERIES 504K - 4WD/WhatsApp Image 2026-07-09 at 11.32.55 AM.jpeg",
    "images": [
      "/assets/products_staging/tractor/Zoomlion RK SERIES 504K - 4WD/WhatsApp Image 2026-07-09 at 11.32.55 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 504K - 4WD/WhatsApp Image 2026-07-09 at 11.32.58 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 504K - 4WD/WhatsApp Image 2026-07-09 at 11.33.01 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 504K - 4WD/WhatsApp Image 2026-07-09 at 11.33.46 AM (1).jpeg"
    ],
    "specs": [
      "50 HP Engine",
      "4WD",
      "Compact Frame Design",
      "Shuttle Shift Transmission",
      "Multi-Way Hydraulic Valve System"
    ],
    "task": "Perfect for small-to-medium farms, orchards, vineyard management, and tight-space maneuverability.",
    "description": "The Zoomlion RK Series 504 delivers efficient performance in a compact, highly maneuverable 4WD frame. It is specially built to navigate narrow rows and smaller plots without sacrificing the hydraulic and pulling power required for plowing and planting. Its high fuel efficiency and straightforward operation make it a staple tool for diverse small-scale farmers.",
    "status": "Active"
  },
  {
    "id": "p-25",
    "name": "Zoomlion RK Series 754 - 4WD Tractor",
    "category": "Tractors",
    "price": "Price on Request",
    "image": "/assets/products_staging/tractor/Zoomlion RK SERIES 754 - 4WD/WhatsApp Image 2026-07-09 at 11.33.02 AM (1).jpeg",
    "images": [
      "/assets/products_staging/tractor/Zoomlion RK SERIES 754 - 4WD/WhatsApp Image 2026-07-09 at 11.33.02 AM (1).jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 754 - 4WD/WhatsApp Image 2026-07-09 at 11.33.02 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 754 - 4WD/WhatsApp Image 2026-07-09 at 11.33.23 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 754 - 4WD/WhatsApp Image 2026-07-09 at 11.33.45 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 754 - 4WD/WhatsApp Image 2026-07-09 at 11.33.46 AM.jpeg"
    ],
    "specs": [
      "75 HP Engine",
      "4WD",
      "12 Forward Gears",
      "Dual-Stage Clutch",
      "Ergonomic Operator Platform"
    ],
    "task": "Powerful general agriculture, row-crop cultivation, medium-scale seeding, and intensive field spraying.",
    "description": "The Zoomlion RK Series 754 provides outstanding versatility and power for modern farming conditions. Featuring a robust 12-speed transmission and dual-stage clutch mechanics, it gives the operator precise control over ground speeds and PTO speeds. Its aggressive 4WD axle enables steady operation through heavy clay and undulating topographies.",
    "status": "Active"
  },
  {
    "id": "p-26",
    "name": "Zoomlion RK Series 904 - 4WD Heavy-Duty Tractor",
    "category": "Tractors",
    "price": "Price on Request",
    "image": "/assets/products_staging/tractor/Zoomlion RK SERIES 904 - 4WD/WhatsApp Image 2026-07-09 at 11.32.55 AM.jpeg",
    "images": [
      "/assets/products_staging/tractor/Zoomlion RK SERIES 904 - 4WD/WhatsApp Image 2026-07-09 at 11.32.55 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 904 - 4WD/WhatsApp Image 2026-07-09 at 11.33.01 AM.jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 904 - 4WD/WhatsApp Image 2026-07-09 at 11.33.22 AM (1).jpeg",
      "/assets/products_staging/tractor/Zoomlion RK SERIES 904 - 4WD/WhatsApp Image 2026-07-09 at 11.33.46 AM (1).jpeg"
    ],
    "specs": [
      "90 HP Engine",
      "4WD",
      "16 Forward Gears",
      "High-Pressure Common Rail Diesel Engine",
      "High Lifting Capacity Category II Hitch"
    ],
    "task": "Intensive large-scale farming, deep tillage, heavy secondary cultivation, and continuous heavy machinery pulling.",
    "description": "The Zoomlion RK Series 904 is a heavy-duty agricultural tractor designed to dominate demanding farm tasks. Featuring 16 forward speeds and an advanced 90 HP engine, it delivers high torque to pull wider implements and deep-subsoilers effortlessly. The advanced cabin ergonomics and technological control loops allow operators to remain productive during extended seasonal windows.",
    "status": "Active"
  }
];


export function renderProductsScreen() {
  const container = document.createElement('div');
  container.className = 'products-root';
  let allProducts = [];
  let currentCategory = 'All';
  let searchQuery = '';

  // Inject Stylesheet
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    .products-root {
      font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
      background: #ffffff;
      color: #0f172a;
    }
    .products-hero {
      background: linear-gradient(135deg, #021a15 0%, #010d0a 100%);
      padding: 180px 0 100px;
      text-align: center;
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid rgba(16, 185, 129, 0.15);
    }
    .products-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.15), transparent 70%),
                  radial-gradient(circle at bottom left, rgba(52, 211, 153, 0.1), transparent 70%);
      pointer-events: none;
    }
    .prod-filter-pill {
      padding: 10px 22px; 
      border-radius: 50px; 
      border: 1px solid rgba(16, 185, 129, 0.15);
      background: rgba(16, 185, 129, 0.03); 
      color: #475569; 
      font-weight: 700;
      font-size: 0.9rem; 
      cursor: pointer; 
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .prod-filter-pill:hover { 
      transform: translateY(-2px); 
      border-color: #10b981; 
      color: #10b981; 
    }
    .prod-filter-pill.active {
      background: #10b981; 
      color: white; 
      border-color: #10b981;
      box-shadow: 0 8px 24px rgba(16, 185, 129, 0.25);
    }
  `;
  container.appendChild(styleTag);

  // 1. Hero Section (Premium V2)
  const hero = document.createElement('header');
  hero.className = 'products-hero';
  hero.innerHTML = `
    <div class="container">
      <span class="reveal" style="color: #34d399; font-weight: 800; text-transform: uppercase; letter-spacing: 4px; display: block; margin-bottom: 20px;">Precision Machinery</span>
      <h1 class="reveal" style="font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 900; line-height: 1.05; margin-bottom: 25px; color: #ffffff;">Engineered For <br><span style="background: linear-gradient(135deg, #34d399 0%, #10b981 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Maximum Performance</span></h1>
      <p class="reveal" style="color: #cbd5e1; font-size: 1.25rem; max-width: 700px; margin: 0 auto; line-height: 1.8;">
        Explore our curated collection of high-performance agricultural equipment, from world-class Massey Ferguson tractors to specialized industrial implements.
      </p>
    </div>
  `;

  // 2. Control Bar (Filters & Search - Premium V2)
  const controls = document.createElement('section');
  controls.style.padding = '30px 0';
  controls.style.position = 'sticky';
  controls.style.top = '100px';
  controls.style.zIndex = '100';
  controls.innerHTML = `
    <div class="container">
      <div class="premium-glass-card" style="padding: 15px 30px; border-radius: 100px; display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(16, 185, 129, 0.15);">
        
        <div id="category-filters-v2" style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="prod-filter-pill active" data-category="All">All Equipment</button>
          <button class="prod-filter-pill" data-category="Tractors">Tractors</button>
          <button class="prod-filter-pill" data-category="Farm Implements">Implements</button>
          <button class="prod-filter-pill" data-category="Spare Parts">Spare Parts</button>
        </div>
        
        <div style="position: relative; flex: 1; max-width: 350px; min-width: 250px;">
          <span style="position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: #10b981; opacity: 0.7;">${Search}</span>
          <input type="text" id="product-search-v2" placeholder="Search our inventory..." 
            style="width: 100%; padding: 14px 20px 14px 48px; border-radius: 50px; border: 1px solid rgba(16, 185, 129, 0.15); outline: none; font-size: 0.95rem; background: #ffffff; color: #0f172a; transition: all 0.3s; font-weight: 600;"
            onfocus="this.style.borderColor='#10b981'; this.style.boxShadow='0 0 15px rgba(16,185,129,0.1)';"
            onblur="this.style.borderColor='rgba(16, 185, 129, 0.15)'; this.style.boxShadow='none';">
        </div>
        
      </div>
    </div>
  `;



  const productsGrid = document.createElement('section');
  productsGrid.style.padding = '80px 0 140px';
  const productsContainer = document.createElement('div');
  productsContainer.className = 'container';
  productsContainer.style.display = 'grid';
  productsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
  productsContainer.style.gap = '40px';

  productsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 100px; color: #64748b; font-size: 1.2rem;">Establishing secure link to machinery database...</div>';



  const applyFilters = () => {
    productsContainer.innerHTML = '';
    
    let filtered = currentCategory === 'All' 
      ? allProducts 
      : allProducts.filter(p => p.category === currentCategory);
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (filtered.length > 0) {
      filtered.forEach(product => {
        const card = renderProductCard(product);
        productsContainer.appendChild(card);
      });
      if (window.initAnimations) window.initAnimations();
    } else {
      productsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 120px 20px; background: #f8fafc; border: 1px solid rgba(16, 185, 129, 0.15); border-radius: 32px;">
          <div style="font-size: 4rem; margin-bottom: 25px; opacity: 0.1;">${Box}</div>
          <h3 style="font-size: 1.8rem; font-weight: 900; margin-bottom: 10px; color: #021a15;">No Equipment Found</h3>
          <p style="color: #64748b; font-size: 1.1rem;">Your search criteria did not match any items in our current inventory.</p>
        </div>
      `;
    }
  };

  const setupEventListeners = () => {
    const searchInput = controls.querySelector('#product-search-v2');
    const filterBtns = controls.querySelectorAll('.prod-filter-pill');

    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      applyFilters();
    };

    filterBtns.forEach(btn => {
      btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        applyFilters();
      };
    });


  };

  const loadPublicProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const dbProducts = await response.json();
      
      const dbNames = new Set(dbProducts.map(p => p.name.toLowerCase()));
      const uniqueFallbacks = fallbackProducts.filter(p => !dbNames.has(p.name.toLowerCase()));
      
      allProducts = [...dbProducts, ...uniqueFallbacks];
      applyFilters();
      setupEventListeners();
    } catch (err) {
      console.error('Error fetching products, using fallbacks:', err);
      allProducts = [...fallbackProducts];
      applyFilters();
      setupEventListeners();
    }
  };

  loadPublicProducts();

  productsGrid.appendChild(productsContainer);
  container.appendChild(renderNavbar());
  container.appendChild(hero);
  container.appendChild(controls);
  container.appendChild(productsGrid);
  container.appendChild(renderFooter());



  return container;
}


