export interface AccordionSection {
    title: string;
    content: string;
    bulletPoints?: string[];
}

export interface EnterpriseService {
    id: string;
    title: string;
    subtitle: string;
    intro: string;
    accordionSections: AccordionSection[];
    closingNote?: string;
}

export const ENTERPRISE_SERVICES: EnterpriseService[] = [
    {
        id: "roof-system-repairs",
        title: "Roof System Repairs",
        subtitle: "When Commercial Roof Repairs Can't Wait",
        intro: "Extreme winds, storm damage, a fire at the facility, or a water leak — these are all times when you need the roof fixed fast. Altering the roof? That's an urgent repair need too. With our Roof System Repairs service, we arrive on the jobsite ready to get to work.",
        accordionSections: [
            {
                title: "What to Share About Your Repair Need",
                content: "The more we know upfront, the faster we can mobilize the right crew and materials. Share your roof type (single-ply, built-up, metal, modified bitumen), the approximate age of the system, and any visible damage. If you have existing warranty documentation or past inspection reports, those help us determine compatibility of repair materials so your warranty stays intact."
            },
            {
                title: "What to Expect with Your Roof Repair",
                content: "Our estimator will inspect the affected area within 24–48 hours, often sooner for emergencies. You'll receive a detailed scope of work and transparent pricing before any wrench turns. Once approved, our certified crews use only manufacturer-specified materials and techniques — meaning every repair is built to last and fully warranty-compliant. We leave the site clean and provide a full documentation package for your records."
            }
        ]
    },
    {
        id: "commercial-reroof",
        title: "Commercial Reroof",
        subtitle: "When Your Roof Is at (or Past) Its Service Life",
        intro: "Most roof systems have an average life span of 14 to 16 years. A new roof is needed when the existing one is beyond repair. A reroof is a capital investment — one that should deliver decades of predictable performance when executed correctly.",
        accordionSections: [
            {
                title: "Time to Reroof",
                content: "Roofs need to be built stronger in order to last longer. The following attributes are engineered into every D. C. Taylor Co. reroof to maximize service life and minimize lifecycle cost:",
                bulletPoints: [
                    "Thicker membranes for superior puncture resistance",
                    "Pavers to protect high-traffic walkway areas",
                    "Adequate slope for positive drainage",
                    "Reinforced seams with factory-welded integrity",
                    "Cover board for enhanced hail and impact protection"
                ]
            },
            {
                title: "Planning Your Project",
                content: "D. C. Taylor Co. will discuss what you need from your new roof and how you'd like it to perform. We conduct a thorough assessment of the existing substrate, insulation, and deck condition. Our team then engineers a custom system specification, coordinates with your operations team to minimize disruption, and establishes a project timeline that respects your business schedule."
            },
            {
                title: "Executing Your Project",
                content: "Our crews follow strict safety protocols and quality checkpoints throughout installation. We coordinate with secondary trades, manage material logistics, and provide daily progress updates. Every phase is documented and inspected to ensure the finished system meets manufacturer specifications for full warranty eligibility."
            },
            {
                title: "Completing Your Project",
                content: "Upon completion, you receive a comprehensive project binder including as-built documentation, warranty certificates, maintenance recommendations, and digital access to all project records. We conduct a formal walk-through with your team and register your warranty directly with the manufacturer."
            }
        ],
        closingNote: "All D. C. Taylor Co. workmanship on single-ply membrane, built-up, modified bitumen, metal, and spray polyurethane foam (SPF) roofing systems is performed in accordance with manufacturer specifications and recommendations from the National Roofing Contractors Association (NRCA). Our roof technicians are certified and approved applicators for most major roofing manufacturers (e.g., Carlisle SynTec, Elevate, Sika Sarnafil, etc.)."
    },
    {
        id: "preventive-maintenance",
        title: "Preventive Maintenance",
        subtitle: "When It's Time to Perform Roof Maintenance",
        intro: "By taking a proactive approach to roof maintenance, you can catch problems when they're small enough to fix easily and economically. D. C. Taylor Co.'s General Preventive Maintenance service extends roof life and costs considerably less than reactive repairs. It combines the ultimate trifecta in scheduled proactive maintenance — cleaning, inspection, and minor repairs.",
        accordionSections: [
            {
                title: "Cleaning",
                content: "Debris accumulation is the silent killer of commercial roofs. Our cleaning protocol removes leaves, dirt, standing water, and biological growth from the membrane surface, drains, scuppers, and gutters. Clean roofs drain faster, reflect more heat, and allow our inspectors to see every square foot of your system clearly."
            },
            {
                title: "Inspection",
                content: "Our trained inspectors examine every critical detail: membrane condition, seam integrity, flashing terminations, penetration seals, edge metal, and drainage components. We document findings with high-resolution photography and assign condition ratings to help you prioritize future maintenance spend."
            },
            {
                title: "Minor Repairs",
                content: "Small defects found during inspection — open laps, cracked sealant, loose fasteners, damaged flashing — are repaired on the spot using manufacturer-approved materials. This prevents minor issues from escalating into costly interior damage or emergency repair calls."
            }
        ],
        closingNote: "This three-part service can take as little as two hours, or as much as eighty. The number, size, and complexity of roofing areas are all variables that impact how long the crew will be onsite."
    },
    {
        id: "fall-protection",
        title: "Fall Protection",
        subtitle: "When Your Commercial Roof Isn't Safe for Workers",
        intro: "It's your duty to provide fall protection to individuals whenever there is a four foot or greater fall exposure. Implementing countermeasures and installing fall protection systems to protect employees and contractors as they traverse the roof not only provides a safer working environment, but also demonstrates compliance with Occupational Safety and Health Administration (OSHA) regulations. D. C. Taylor Co. has been installing fall protection for customers since 2006.",
        accordionSections: [
            {
                title: "Safe Roof Audit",
                content: "We begin with a comprehensive hazard assessment of your entire rooftop. Our safety engineers identify fall exposure zones, map traffic patterns, evaluate existing safety equipment, and document all findings in a detailed report with recommended countermeasures prioritized by risk level."
            },
            {
                title: "Fall Protection Installation",
                content: "Based on the audit findings, we install permanent engineered systems — guardrails, warning lines, anchor points, and horizontal lifelines — all designed to integrate seamlessly with your existing roof system without compromising membrane integrity or voiding your roof warranty."
            },
            {
                title: "Familiarize Users",
                content: "Equipment is only effective when people know how to use it. We provide on-site orientation sessions for your maintenance staff and contractors, covering proper equipment usage, inspection protocols, and emergency procedures. Each participant receives documentation and certification of completion."
            },
            {
                title: "Inspection",
                content: "Fall protection systems require periodic inspection to ensure continued compliance and reliability. We offer annual recertification programs that verify the structural integrity of all installed equipment, replacing any components that show wear or damage, and updating your compliance documentation."
            }
        ]
    },
    {
        id: "roof-management",
        title: "Roof Management",
        subtitle: "When You Need Help Managing Roofing Assets",
        intro: "D. C. Taylor Co.'s Roof Management Program is a combination of services and information to help you keep the roof functioning as intended and make good timely decisions. It transforms roofing from a reactive expense into a strategically managed asset class.",
        accordionSections: [
            {
                title: "The Benefits",
                content: "A structured roof management program eliminates surprise expenditures by replacing emergency repairs with planned maintenance. You gain visibility into the condition of every roof in your portfolio, accurate 10-year capital budget forecasts, extended roof service life, reduced total cost of ownership, and a single point of accountability for all roofing decisions."
            },
            {
                title: "The Process",
                content: "We begin with a comprehensive field survey of every roof area in your portfolio. Each system is photographed, measured, and scored using our proprietary condition assessment methodology. This data feeds into a strategic plan that prioritizes maintenance and replacement based on remaining service life, criticality of the space below, and your budget constraints."
            },
            {
                title: "Our Deliverables",
                content: "You receive a complete digital portfolio including condition reports with photo documentation, CAD-generated roof plans, a prioritized capital expenditure forecast (1–10 years), annual maintenance recommendations, and online access to all records. We provide executive summary presentations for your leadership team and update all data annually."
            }
        ]
    }
];
