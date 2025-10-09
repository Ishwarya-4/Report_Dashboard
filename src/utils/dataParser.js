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
  return data.reduce((sum, row) => sum + (Number(row[columnName]) || 0), 0);
};

export const aggregateByRegion = (data, valueColumn) => {
  const regionData = {};
  
  data.forEach(row => {
    const region = row.Region;
    if (!region) return;
    
    if (!regionData[region]) {
      regionData[region] = 0;
    }
    regionData[region] += Number(row[valueColumn]) || 0;
  });
  
  return regionData;
};

export const getProductGroupData = (data, prefix) => {
  const result = {
    Active: calculateSum(data, `${prefix}_Active`),
    'Active Emailed': calculateSum(data, `${prefix}_Active_Emailed`),
    'Active No Email': calculateSum(data, `${prefix}_Active_NoEmail`),
    Total: calculateSum(data, `${prefix}_Total`),
    'Total Emailed': calculateSum(data, `${prefix}_Total${prefix === 'AAI' ? '_Email_Count' : '_Emailed'}`),
    Inactive: calculateSum(data, `${prefix}_${prefix === 'ADM' || prefix === 'OSM' ? 'InActive' : 'Inactive'}`),
    'Inactive Emailed': calculateSum(data, `${prefix}_${prefix === 'ADM' || prefix === 'OSM' ? 'InActive' : 'Inactive'}_Emailed`),
    'Inactive No Email': calculateSum(data, `${prefix}_${prefix === 'ADM' || prefix === 'OSM' ? 'InActive' : 'Inactive'}_NoEmail`),
    Unknown: calculateSum(data, `${prefix}_Unknown`)
  };
  
  return result;
};
