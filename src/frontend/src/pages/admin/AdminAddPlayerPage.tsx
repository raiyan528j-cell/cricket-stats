import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useCreatePlayer } from "@/hooks/usePlayers";
import type { PlayerRole } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminAddPlayerPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const createPlayer = useCreatePlayer();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState<PlayerRole>("batter");
  const [touched, setTouched] = useState({ name: false, country: false });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/admin/login" });
  }, [isAuthenticated, navigate]);

  // Derive errors from current values
  const errors = {
    name:
      name.trim().length === 0
        ? "Full name is required"
        : name.trim().length < 2
          ? "Name must be at least 2 characters"
          : "",
    country:
      country.trim().length === 0
        ? "Country is required"
        : country.trim().length < 2
          ? "Country must be at least 2 characters"
          : "",
  };

  const showError = (field: keyof typeof errors) =>
    (touched[field] || submitted) && !!errors[field];

  const isSubmitDisabled = createPlayer.isPending || createPlayer.isConnecting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (errors.name || errors.country) {
      toast.error("Please fix the errors before submitting");
      return;
    }
    try {
      await createPlayer.mutateAsync({
        name: name.trim(),
        country: country.trim(),
        role,
      });
      toast.success("Player created successfully!");
      navigate({ to: "/admin/dashboard" });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to create player";
      toast.error(msg);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-lg mx-auto px-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: "/admin/dashboard" })}
          className="mb-5 text-muted-foreground"
          data-ocid="add_player.back_button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Card
          className="bg-card border-border card-elevated-dark"
          data-ocid="add_player.card"
        >
          <CardHeader>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Add New Player
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill in the player's details below.
            </p>
          </CardHeader>
          <CardContent>
            {createPlayer.isConnecting && (
              <div
                className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 rounded-md bg-muted/40 border border-border"
                data-ocid="add_player.loading_state"
              >
                <span className="inline-block w-3 h-3 rounded-full bg-primary/60 animate-pulse" />
                Connecting to backend…
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setTouched((t) => ({ ...t, name: true }));
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  placeholder="e.g. Virat Singh"
                  className={`bg-background border-input ${
                    showError("name")
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  aria-invalid={showError("name")}
                  data-ocid="add_player.name_input"
                />
                {showError("name") && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="add_player.name_input.field_error"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Country */}
              <div className="space-y-1.5">
                <Label htmlFor="country" className="text-foreground">
                  Country
                </Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setTouched((t) => ({ ...t, country: true }));
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, country: true }))}
                  placeholder="e.g. India"
                  className={`bg-background border-input ${
                    showError("country")
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  aria-invalid={showError("country")}
                  data-ocid="add_player.country_input"
                />
                {showError("country") && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="add_player.country_input.field_error"
                  >
                    {errors.country}
                  </p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-foreground">
                  Role
                </Label>
                <Select
                  value={role}
                  onValueChange={(v) => setRole(v as PlayerRole)}
                >
                  <SelectTrigger
                    id="role"
                    className="bg-background border-input"
                    data-ocid="add_player.role_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="batter">Batter</SelectItem>
                    <SelectItem value="bowler">Bowler</SelectItem>
                    <SelectItem value="allRounder">All-Rounder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold"
                disabled={isSubmitDisabled}
                data-ocid="add_player.submit_button"
              >
                {createPlayer.isConnecting
                  ? "Connecting…"
                  : createPlayer.isPending
                    ? "Creating…"
                    : "Create Player"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
