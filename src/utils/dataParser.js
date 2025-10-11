import * as XLSX from 'xlsx';

export const parseExcelFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

// Robust number parser: handles numbers, numeric strings, and comma-formatted strings
const parseNumber = (value) => {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value === 'string') {
    const cleaned = value.replace(/,/g, '').trim();
    if (cleaned === '') return 0;
    const n = Number(cleaned);
    return Number.isNaN(n) ? 0 : n;
  }
  return 0;
};

export const getUniqueValues = (data, key) => {
  return [...new Set(data.map(row => row[key]))].filter(Boolean).sort();
};

export const filterData = (data, region, country) => {
  let filtered = data;
  
  if (region && region !== 'all') {
    filtered = filtered.filter(row => row.Region === region);
  }
  
  if (country && country !== 'all') {
    filtered = filtered.filter(row => row.Country === country);
  }
  
  return filtered;
};

export const calculateSum = (data, columnName) => {
  return data.reduce((sum, row) => sum + parseNumber(row[columnName]), 0);
};

export const aggregateByRegion = (data, valueColumn) => {
  const regionData = {};
  
  data.forEach(row => {
    const region = row.Region;
    if (!region) return;
    
    if (!regionData[region]) {
      regionData[region] = 0;
    }
    regionData[region] += parseNumber(row[valueColumn]);
  });
  
  return regionData;
};

export const getProductGroupData = (data, prefix) => {
  const result = {
    Active: calculateSum(data, `${prefix}_Active`),
    'Active Emailed': calculateSum(data, `${prefix}_Active_Emailed`),
    'Active No Email': calculateSum(data, `${prefix}_Active_NoEmail`),
    Total: calculateSum(data, `${prefix}_Total`),
    'Total Emailed': calculateSum(data, `${prefix}_Total_Emailed`),
    Inactive: calculateSum(data, `${prefix}_Inactive`),
    'Inactive Emailed': calculateSum(data, `${prefix}_Inactive_Emailed`),
    'Inactive No Email': calculateSum(data, `${prefix}_Inactive_NoEmail`),
    Unknown: calculateSum(data, `${prefix}_Unknown`)
  };
  
  return result;
};
