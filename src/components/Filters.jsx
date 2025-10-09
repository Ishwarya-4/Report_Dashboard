import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export const Filters = ({ regions, countries, selectedRegion, selectedCountry, onRegionChange, onCountryChange, charts, selectedCharts, onChartChange }) => {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[200px]">
        <Label className="text-sm font-medium mb-2 block">Region</Label>
        <Select value={selectedRegion} onValueChange={onRegionChange}>
          <SelectTrigger className="bg-white shadow-sm">
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent className="bg-white z-50">
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map(region => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <Label className="text-sm font-medium mb-2 block">Country</Label>
        <Select value={selectedCountry} onValueChange={onCountryChange}>
          <SelectTrigger className="bg-white shadow-sm">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent className="bg-white z-50 max-h-[300px]">
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map(country => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <Label className="text-sm font-medium mb-2 block">Select Charts</Label>
        <Select value={selectedCharts.join(',')} onValueChange={onChartChange}>
          <SelectTrigger className="bg-white shadow-sm">
            <SelectValue placeholder="All Charts" />
          </SelectTrigger>
          <SelectContent className="bg-white z-50 max-h-[300px]">
            <SelectItem value="all">All Charts</SelectItem>
            {charts.map(chart => (
              <SelectItem key={chart.id} value={chart.id}>{chart.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
