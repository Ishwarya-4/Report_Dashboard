import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export const Filters = ({ regions, countries, selectedRegion, selectedCountry, onRegionChange, onCountryChange, charts, selectedCharts, onChartChange }) => {
  return (
    <div className="flex flex-wrap gap-4 items-end w-full">
      <div className="flex-1 min-w-[180px]">
        <Label className="text-sm font-medium mb-2 block text-foreground">Region</Label>
        <Select value={selectedRegion} onValueChange={onRegionChange}>
          <SelectTrigger className="bg-background border-input shadow-sm">
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent className="bg-background border-input z-[100]">
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map(region => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[180px]">
        <Label className="text-sm font-medium mb-2 block text-foreground">Country</Label>
        <Select value={selectedCountry} onValueChange={onCountryChange}>
          <SelectTrigger className="bg-background border-input shadow-sm">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent className="bg-background border-input z-[100] max-h-[300px]">
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map(country => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[180px]">
        <Label className="text-sm font-medium mb-2 block text-foreground">Select Charts</Label>
        <Select value={selectedCharts.join(',')} onValueChange={onChartChange}>
          <SelectTrigger className="bg-background border-input shadow-sm">
            <SelectValue placeholder="All Charts" />
          </SelectTrigger>
          <SelectContent className="bg-background border-input z-[100] max-h-[300px]">
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
