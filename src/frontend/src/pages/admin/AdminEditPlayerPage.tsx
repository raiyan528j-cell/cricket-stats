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
import { usePlayers, useUpdatePlayer } from "@/hooks/usePlayers";
import type { PlayerRole } from "@/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminEditPlayerPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/admin/edit-player" });
  const playerId = (search as { id?: string }).id ?? "";

  const { data: players } = usePlayers();
  const updatePlayer = useUpdatePlayer();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState<PlayerRole>("batter");
  const [touched, setTouched] = useState({ name: false, country: false });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/admin/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const player = players?.find((p) => p.id === playerId);
    if (player) {
      setName(player.name);
      setCountry(player.country);
      setRole(player.role as PlayerRole);
    }
  }, [players, playerId]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (errors.name || errors.country) {
      toast.error("Please fix the errors before submitting");
      return;
    }
    try {
      await updatePlayer.mutateAsync({
        id: playerId,
        input: { name: name.trim(), country: country.trim(), role },
      });
      toast.success("Player updated successfully!");
      navigate({ to: "/admin/dashboard" });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to update player";
      toast.error(msg);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-lg mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: "/admin/dashboard" })}
          className="mb-5 text-muted-foreground"
          data-ocid="edit_player.back_button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Card
          className="bg-card border-border card-elevated-dark"
          data-ocid="edit_player.card"
        >
          <CardHeader>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Edit Player
            </h1>
            <p className="text-sm text-muted-foreground">
              Update the player's details.
            </p>
          </CardHeader>
          <CardContent>
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
                  className={`bg-background border-input ${
                    showError("name")
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  aria-invalid={showError("name")}
                  data-ocid="edit_player.name_input"
                />
                {showError("name") && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="edit_player.name_input.field_error"
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
                  className={`bg-background border-input ${
                    showError("country")
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  aria-invalid={showError("country")}
                  data-ocid="edit_player.country_input"
                />
                {showError("country") && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="edit_player.country_input.field_error"
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
                    data-ocid="edit_player.role_select"
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
                disabled={updatePlayer.isPending}
                data-ocid="edit_player.submit_button"
              >
                {updatePlayer.isPending ? "Updating…" : "Update Player"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
