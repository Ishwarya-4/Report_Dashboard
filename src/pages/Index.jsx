import { useState, useEffect } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { Filters } from '@/components/Filters';
import { KPICard } from '@/components/KPICard';
import { ChartCard } from '@/components/ChartCard';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { parseExcelFile, getUniqueValues, filterData, calculateSum, aggregateByRegion, getProductGroupData } from '@/utils/dataParser';
import { toast } from 'sonner';

const Index = () => {
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCharts, setSelectedCharts] = useState([]);
  
  const chartsList = [
    { id: 'total-mailable', name: 'Total Mailable Prospects', type: 'horizontal' },
    { id: 'active-region', name: 'Active in Each Region', type: 'horizontal' },
    { id: 'inactive-region', name: 'Inactive in Each Region', type: 'horizontal' },
    { id: 'total-emailed', name: 'Total Emailed Last 30 Days', type: 'horizontal' },
    { id: 'active-emailed', name: 'Active Emailed Last 30 Days', type: 'horizontal' },
    { id: 'inactive-emailed', name: 'Inactive Emailed Last 30 Days', type: 'horizontal' },
    { id: 'unknown', name: 'Unknown in Each Region', type: 'horizontal' },
    { id: 'empty-pg', name: 'Empty Product Group', type: 'horizontal' },
    { id: 'sept-prospects', name: 'September Prospects', type: 'horizontal' },
    { id: 'sept-mailable', name: 'September Mailable', type: 'horizontal' },
    { id: 'sept-emailed', name: 'September Emailed', type: 'horizontal' },
    { id: 'aai', name: 'AAI', type: 'vertical' },
    { id: 'adm', name: 'ADM', type: 'vertical' },
    { id: 'cybersecurity', name: 'Cybersecurity', type: 'vertical' },
    { id: 'osm', name: 'OSM', type: 'vertical' },
    { id: 'portfolio', name: 'Portfolio', type: 'vertical' }
  ];

  const handleFileUpload = async (file) => {
    try {
      const data = await parseExcelFile(file);
      setRawData(data);
      setFilteredData(data);
      setFileName(file.name);
      
      const uniqueRegions = getUniqueValues(data, 'Region');
      const uniqueCountries = getUniqueValues(data, 'Country');
      setRegions(uniqueRegions);
      setCountries(uniqueCountries);
      
      toast.success(`File uploaded successfully: ${file.name}`);
    } catch (error) {
      toast.error('Error parsing file. Please check the format.');
      console.error(error);
    }
  };

  const handleClear = () => {
    setRawData([]);
    setFilteredData([]);
    setFileName('');
    setSelectedRegion('all');
    setSelectedCountry('all');
    setSelectedCharts([]);
    toast.info('Dashboard cleared');
  };

  useEffect(() => {
    if (rawData.length > 0) {
      const filtered = filterData(rawData, selectedRegion, selectedCountry);
      setFilteredData(filtered);
    }
  }, [selectedRegion, selectedCountry, rawData]);

  const handleChartChange = (value) => {
    if (value === 'all') {
      setSelectedCharts([]);
    } else {
      const currentCharts = selectedCharts.includes(value)
        ? selectedCharts.filter(id => id !== value)
        : [...selectedCharts, value];
      setSelectedCharts(currentCharts);
    }
  };

  const shouldShowChart = (chartId) => {
    return selectedCharts.length === 0 || selectedCharts.includes(chartId);
  };

  // KPI Calculations - Always use rawData (not filtered)
  const kpis = rawData.length > 0 ? {
    totalMailable: calculateSum(rawData, 'Total_Mailable_Count'),
    emailedTotalMailable: calculateSum(rawData, 'Total_Mailable_Emailed'),
    noEmailTotalMailable: calculateSum(rawData, 'Total_Mailable_NoEmail'),
    active: calculateSum(rawData, 'Active_Count'),
    emailedActive: calculateSum(rawData, 'Active_Emailed'),
    noEmailActive: calculateSum(rawData, 'Active_NoEmail'),
    inactive: calculateSum(rawData, 'Inactive_Count'),
    emailedInactive: calculateSum(rawData, 'Inactive_Emailed'),
    noEmailInactive: calculateSum(rawData, 'Inactive_NoEmail'),
    aai: calculateSum(rawData, 'AAI_Total'),
    adm: calculateSum(rawData, 'ADM_Total'),
    cybersecurity: calculateSum(rawData, 'CBS_Total'),
    osm: calculateSum(rawData, 'OSM_Total'),
    portfolio: calculateSum(rawData, 'PFO_Total'),
    totalDatabase: calculateSum(rawData, 'Total_Database'),
    unmailable: calculateSum(rawData, 'Unmailable'),
    hardBounce: calculateSum(rawData, 'Hardbounce'),
    unsubscribed: calculateSum(rawData, 'Unsubscribed'),
    monthlyProspects: calculateSum(rawData, 'September_Prospects'),
    monthlyMailable: calculateSum(rawData, 'Mailable'),
    monthlyEmailed: calculateSum(rawData, 'Emailed'),
    unknown: calculateSum(rawData, 'Unknown_Count'),
    emptyPG: calculateSum(rawData, 'Empty_PG')
  } : null;

  // Chart data generation
  const generateRegionChart = (valueColumn, label, color) => {
    const regionData = aggregateByRegion(filteredData, valueColumn);
    return {
      labels: Object.keys(regionData),
      datasets: [{
        label: label,
        data: Object.values(regionData),
        backgroundColor: color,
        borderRadius: 4
      }]
    };
  };

  const generateProductGroupChart = (prefix, name) => {
    const data = getProductGroupData(filteredData, prefix);
    const colors = [
      'rgba(59, 130, 246, 0.8)',
      'rgba(34, 197, 94, 0.8)',
      'rgba(251, 146, 60, 0.8)',
      'rgba(168, 85, 247, 0.8)',
      'rgba(236, 72, 153, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(14, 165, 233, 0.8)',
      'rgba(132, 204, 22, 0.8)',
      'rgba(163, 163, 163, 0.8)'
    ];
    
    return {
      labels: Object.keys(data),
      datasets: [{
        label: name,
        data: Object.values(data),
        backgroundColor: colors,
        borderRadius: 4
      }]
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative bg-white rounded-xl shadow-md p-8 mb-8">
          {/* Title and Upload */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-primary mb-3">Email Performance Dashboard</h1>
            {rawData.length === 0 && (
              <p className="text-muted-foreground mb-6">
                Upload your email campaign data to visualize performance metrics
              </p>
            )}
          </div>

          {/* File Upload Zone */}
          {rawData.length === 0 ? (
            <div className="mt-6">
              <FileUpload onFileUpload={handleFileUpload} />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <Filters
                  regions={regions}
                  countries={countries}
                  selectedRegion={selectedRegion}
                  selectedCountry={selectedCountry}
                  onRegionChange={setSelectedRegion}
                  onCountryChange={setSelectedCountry}
                  charts={chartsList}
                  selectedCharts={selectedCharts}
                  onChartChange={handleChartChange}
                />
              </div>
              <div className="flex-shrink-0">
                <Button 
                  onClick={handleClear} 
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* KPIs */}
        {kpis && (
          <div className="mb-8">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              <KPICard title="Total Mailable" value={kpis.totalMailable} />
              <KPICard title="Emailed" value={kpis.emailedTotalMailable} />
              <KPICard title="No Email" value={kpis.noEmailTotalMailable} />
              <KPICard title="AAI" value={kpis.aai} />
              <KPICard title="ADM" value={kpis.adm} />
              <KPICard title="CyberSecurity" value={kpis.cybersecurity} />
              <KPICard title="OSM" value={kpis.osm} />
              <KPICard title="Portfolio" value={kpis.portfolio} />
              
              <KPICard title="Active" value={kpis.active} />
              <KPICard title="Emailed" value={kpis.emailedActive} />
              <KPICard title="No Email" value={kpis.noEmailActive} />
              <KPICard title="Total Database" value={kpis.totalDatabase} />
              <KPICard title="Unmailable" value={kpis.unmailable} />
              <KPICard title="Hardbounce" value={kpis.hardBounce} />
              <KPICard title="Unsubscribed" value={kpis.unsubscribed} />
              <div className="hidden xl:block"></div>
              
              <KPICard title="Inactive" value={kpis.inactive} />
              <KPICard title="Emailed" value={kpis.emailedInactive} />
              <KPICard title="No Email" value={kpis.noEmailInactive} />
              <KPICard title="Sept Prosprecs" value={kpis.monthlyProspects} />
              <KPICard title="Sept Mailable" value={kpis.monthlyMailable} />
              <KPICard title="Sept Emailed" value={kpis.monthlyEmailed} />
              <KPICard title="Unknown" value={kpis.unknown} />
              <KPICard title="Empty PG" value={kpis.emptyPG} />
            </div>
          </div>
        )}

        {/* Charts */}
        {filteredData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {shouldShowChart('total-mailable') && (
              <ChartCard
                title="Total Mailable Prospects in Each Region"
                data={generateRegionChart('Total_Mailable_Count', 'Total Mailable', 'rgba(59, 130, 246, 0.8)')}
                type="horizontal"
              />
            )}
            
            {shouldShowChart('active-region') && (
              <ChartCard
                title="Active in Each Region"
                data={generateRegionChart('Active_Count', 'Active', 'rgba(34, 197, 94, 0.8)')}
                type="horizontal"
              />
            )}
            
            {shouldShowChart('inactive-region') && (
              <ChartCard
                title="Inactive in Each Region"
                data={generateRegionChart('Inactive_Count', 'Inactive', 'rgba(239, 68, 68, 0.8)')}
                type="horizontal"
              />
            )}
            
            {shouldShowChart('total-emailed') && (
              <ChartCard
                title="Total Emailed Last 30 Days in Each Region"
                data={generateRegionChart('Total_Mailable_Emailed', 'Total Emailed', 'rgba(168, 85, 247, 0.8)')}
                type="horizontal"
              />
            )}
            
            {shouldShowChart('active-emailed') && (
              <ChartCard
                title="Active Emailed Last 30 Days in Each Region"
                data={generateRegionChart('Active_Emailed', 'Active Emailed', 'rgba(251, 146, 60, 0.8)')}
                type="horizontal"
              />
            )}
            
            {shouldShowChart('inactive-emailed') && (
              <ChartCard
                title="Inactive Emailed Last 30 Days in Each Region"
                data={generateRegionChart('Inactive_Emailed', 'Inactive Emailed', 'rgba(236, 72, 153, 0.8)')}
                type="horizontal"
              />
            )}
            
            {shouldShowChart('unknown') && (
              <ChartCard
                title="Unknown in Each Region"
                data={generateRegionChart('Unknown_Count', 'Unknown', 'rgba(163, 163, 163, 0.8)')}
                type="horizontal"
              />
            )}
            
            {shouldShowChart('empty-pg') && (
              <ChartCard
                title="Empty Product Group in Each Region"
                data={generateRegionChart('Empty_PG', 'Empty PG', 'rgba(14, 165, 233, 0.8)')}
                type="horizontal"
              />
            )}
            
            {shouldShowChart('sept-prospects') && (
              <ChartCard
                title="September Prospects"
                data={generateRegionChart('September_Prospects', 'September Prospects', 'rgba(132, 204, 22, 0.8)')}
                type="horizontal"
              />
            )}
            
            {shouldShowChart('sept-mailable') && (
              <ChartCard
                title="September Mailable"
                data={generateRegionChart('Mailable', 'Mailable', 'rgba(59, 130, 246, 0.8)')}
                type="horizontal"
              />
            )}
            
            {shouldShowChart('sept-emailed') && (
              <ChartCard
                title="September Emailed"
                data={generateRegionChart('Emailed', 'Emailed', 'rgba(34, 197, 94, 0.8)')}
                type="horizontal"
              />
            )}
            
            {shouldShowChart('aai') && (
              <ChartCard
                title="Analytics & Legal Tech"
                data={generateProductGroupChart('AAI', 'AAI')}
                type="vertical"
              />
            )}
            
            {shouldShowChart('adm') && (
              <ChartCard
                title="ADM"
                data={generateProductGroupChart('ADM', 'ADM')}
                type="vertical"
              />
            )}
            
            {shouldShowChart('cybersecurity') && (
              <ChartCard
                title="Cybersecurity"
                data={generateProductGroupChart('CBS', 'Cybersecurity')}
                type="vertical"
              />
            )}
            
            {shouldShowChart('osm') && (
              <ChartCard
                title="OSM"
                data={generateProductGroupChart('OSM', 'OSM')}
                type="vertical"
              />
            )}
            
            {shouldShowChart('portfolio') && (
              <ChartCard
                title="Portfolio"
                data={generateProductGroupChart('PFO', 'Portfolio')}
                type="vertical"
              />
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Index;
