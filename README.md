# Haematix - Haematology Diagnosis Tool

A modern web application for haematology diagnosis, providing classification according to WHO 2022 and ICC 2022 standards for AML and MDS, as well as risk stratification.

## Features

- **Data Extraction**: Extract key data fields from free text molecular, cytogenetic, and clinical reports
- **Dual Pathway Classification**: Process data through both WHO 2022 and ICC 2022 classification systems
- **Risk Stratification**: Perform ELN risk stratification for AML and IPSS for MDS
- **Interactive Flow Diagram**: Visualize the classification process with an interactive diagram

## Tech Stack

- **Frontend**: Next.js 15.x
- **Styling**: CSS Modules
- **UI Components**: Custom React components

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 7.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/haemato-dx.git
   cd haemato-dx
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
my-nextjs-app/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js app directory
│   │   ├── globals.css    # Global styles
│   │   ├── layout.jsx     # Root layout component
│   │   ├── page.jsx       # Main landing page
│   │   └── page.module.css # Page-specific styles
│   └── components/    # React components
│       ├── FlowDiagram.jsx       # Flow diagram component
│       └── FlowDiagram.module.css # Component styles
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

## Development

- **Component Styling**: We use CSS Modules for component-specific styling
- **Theme Colors**:
  - Primary Color: `#009688` (teal)
  - Background Color: `#FFFFFF` (white)
  - Secondary Background: `#F2F2F2` (light grey)
  - Text Color: `#263238` (dark greyish-blue)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- World Health Organization (WHO) 2022 Classification
- International Consensus Classification (ICC) 2022 