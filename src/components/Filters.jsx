import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Check, X } from 'lucide-react';

export const Filters = ({ regions, countries, selectedRegion, selectedCountry, onRegionChange, onCountryChange, charts, selectedCharts, onChartChange }) => {
  return (
    <div className="flex flex-wrap gap-4 items-end w-full mt-10">
      <div className="flex-1 min-w-[180px]">
        <Label className="text-sm font-medium mb-2 block text-foreground">
          Region
        </Label>

        <Select value={selectedRegion} onValueChange={onRegionChange}>
          <SelectTrigger className="bg-background border-input shadow-sm">
            <SelectValue
              placeholder={
                selectedRegion === "all" || !selectedRegion
                  ? "All Regions"
                  : selectedRegion
              }
            />
          </SelectTrigger>

          <SelectContent
            className="bg-background border-input z-[100]"
            position="popper"
            side="bottom"
            align="start"
          >
            {/* All Regions */}
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <span>All Regions</span>
              </div>
            </SelectItem>

            {/* Clear Selection (only shown if something is selected) */}
            {selectedRegion !== "all" && selectedRegion && (
              <SelectItem value="clear">
                <div className="flex items-center gap-2 text-destructive">
                  <X className="h-4 w-4" />
                  <span>Clear Selection</span>
                </div>
              </SelectItem>
            )}

            {/* Dynamic region list */}
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                <div className="flex items-center gap-2">
                  <span>{region}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[180px]">
        <Label className="text-sm font-medium mb-2 block text-foreground">
          Country
        </Label>

        <Select value={selectedCountry} onValueChange={onCountryChange}>
          <SelectTrigger className="bg-background border-input shadow-sm">
            <SelectValue
              placeholder={
                selectedCountry === "all" || !selectedCountry
                  ? "All Countries"
                  : selectedCountry
              }
            />
          </SelectTrigger>

          <SelectContent
            className="bg-background border-input z-[100] max-h-[300px]"
            position="popper"
            side="bottom"
            align="start"
          >
            {/* All Countries */}
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <span>All Countries</span>
              </div>
            </SelectItem>

            {/* Clear Selection (only show if something is selected) */}
            {selectedCountry !== "all" && selectedCountry && (
              <SelectItem value="clear">
                <div className="flex items-center gap-2 text-destructive">
                  <X className="h-4 w-4" />
                  <span>Clear Selection</span>
                </div>
              </SelectItem>
            )}

            {/* Dynamic Country list */}
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                <div className="flex items-center gap-2">
                  <span>{country}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      <div className="flex-1 min-w-[180px]">
        <Label className="text-sm font-medium mb-2 block text-foreground">
          Select Charts
        </Label>

        <Select
          value={selectedCharts.length === 0 ? "all" : selectedCharts.join(",")}
          onValueChange={onChartChange}
        >
          <SelectTrigger className="bg-background border-input shadow-sm">
            <SelectValue
              placeholder={
                selectedCharts.length === 0
                  ? "All Charts"
                  : `${selectedCharts.length} chart${
                      selectedCharts.length === 1 ? "" : "s"
                    } selected`
              }
            />
          </SelectTrigger>

          <SelectContent
            className="bg-background border-input z-[100] max-h-[300px]"
            position="popper" // ✅ ensures dropdown aligns properly below/above
            side="bottom"      // ✅ ensures top alignment from trigger
            align="start"      // ✅ aligns left edge
          >
            {/* All Charts */}
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <span>All Charts</span>
              </div>
            </SelectItem>

            {/* Clear Selection */}
            {selectedCharts.length > 0 && (
              <SelectItem value="clear">
                <div className="flex items-center gap-2 text-destructive">
                  <X className="h-4 w-4" />
                  <span>Clear Selection</span>
                </div>
              </SelectItem>
            )}

            {/* Chart options */}
            {charts.map((chart) => (
              <SelectItem key={chart.id} value={chart.id}>
                <div className="flex items-center gap-2">
                  {selectedCharts.includes(chart.id) && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                  <span>{chart.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

    </div>
  );
};
