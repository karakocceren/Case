# Case Study Project

**A demo web application built using React, TypeScript, and Vite, intended for a case study.**

---

## Tech Stack

- **React** 
- **TypeScript**
- **Vite**
- **ESLint**  
- **Chart.js / React Chart.js**
- **TanStack Table**

---

## 1. Project Overview

### Key Components

1. **Main Dashboard**
  - **Line Chart:**
    The line chart displays data trends over time. While the chart itself shows normalized values for a clear visualization, a tooltip reveals the original, un-normalized data points upon hover.

  - **Bar Chart:**
    The bar chart provides a visual comparison of data across different dimensions.

  - **Interactive Data Table:**
    This is a robust and fully-featured data table. It offers various tools to explore and analyze data efficiently.

      - **Paging:**
        Users can navigate through large datasets with pagination controls.

      - **Filtering:**
        The table supports column filtering, allowing users to narrow down data based on specific criteria like "equals," "contains," "starts with," and "ends with."

      - **Search:**
        A global search bar enabling quick searching across all data in the table.

      - **Sorting:**
        Users can sort columns in ascending or descending order by clicking on the column headers.

      - **Export:**
        Data can be downloaded in multiple formats, including PDF and CSV, for offline use or further analysis.

      - **Column Visibility:**
        Users have the ability to show or hide specific columns, customizing their view of the data.

2. **Ads Overview Component**

    This component provides a snapshot of ad performance, allowing users to filter data by time interval.
  - **Time Interval Filter:**
    A dropdown menu lets users select a specific time frame, such as "Last 30 days," to view relevant data.

3. **Ad Performance Summary**

    This component visually represents ad performance metrics across different ad networks using bar charts.

---

## 2. Getting Started

### Prerequisites
- Node.js (v14+, ideally latest LTS)
- npm or Yarn installed

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/karakocceren/Case.git
   cd Case
2. **Install dependencies**
   ```bash
   npm install
3. **Start the development server**
   ```
   npm run dev
  - Then navigate to http://localhost:5173 (or the port Vite shows) to see the live app with HMR.

---

## Dev Note:

The Overview component’s data was initially not showing in production due to ad-blocker extensions blocking elements with class names containing "ad". Renaming these classes (e.g., .ad-item → .item) resolved the issue.
In case you encounter the same issue, try disabling any ad-blocker extensions or check if class names, IDs, or variables contain ad-related keywords that might be blocked.

---