
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Play, Square } from "lucide-react";
import { simulateProviderRoute } from "@/services/providerLocationService";
import { useToast } from "@/hooks/use-toast";

interface LocationSimulatorProps {
  providerId: string;
}

export function LocationSimulator({ providerId }: LocationSimulatorProps) {
  const { toast } = useToast();
  const [startLat, setStartLat] = useState("24.7136");
  const [startLng, setStartLng] = useState("46.6753");
  const [endLat, setEndLat] = useState("24.7236");
  const [endLng, setEndLng] = useState("46.7053");
  const [duration, setDuration] = useState("60");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulation, setSimulation] = useState<{ start: () => void; stop: () => void } | null>(null);

  const handleStartSimulation = () => {
    // Create new simulation
    const newSimulation = simulateProviderRoute(
      providerId,
      parseFloat(startLat),
      parseFloat(startLng),
      parseFloat(endLat),
      parseFloat(endLng),
      parseInt(duration),
      2000
    );

    // Start simulation
    newSimulation.start();
    setSimulation(newSimulation);
    setIsSimulating(true);

    toast({
      title: "Simulation started",
      description: `Provider location will be updated every 2 seconds for ${duration} seconds`,
    });
  };

  const handleStopSimulation = () => {
    if (simulation) {
      simulation.stop();
      setIsSimulating(false);
      toast({
        title: "Simulation stopped",
        description: "Provider location updates have been stopped",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Simulator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startLat">Start Latitude</Label>
              <Input
                id="startLat"
                value={startLat}
                onChange={(e) => setStartLat(e.target.value)}
                disabled={isSimulating}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startLng">Start Longitude</Label>
              <Input
                id="startLng"
                value={startLng}
                onChange={(e) => setStartLng(e.target.value)}
                disabled={isSimulating}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endLat">End Latitude</Label>
              <Input
                id="endLat"
                value={endLat}
                onChange={(e) => setEndLat(e.target.value)}
                disabled={isSimulating}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endLng">End Longitude</Label>
              <Input
                id="endLng"
                value={endLng}
                onChange={(e) => setEndLng(e.target.value)}
                disabled={isSimulating}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (seconds)</Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              disabled={isSimulating}
            />
          </div>

          <div className="flex gap-4">
            {!isSimulating ? (
              <Button onClick={handleStartSimulation} className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Start Simulation
              </Button>
            ) : (
              <Button variant="destructive" onClick={handleStopSimulation} className="flex items-center gap-2">
                <Square className="h-4 w-4" />
                Stop Simulation
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
