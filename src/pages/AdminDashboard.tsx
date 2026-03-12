import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Users, Crown, Clock, CheckCircle2, XCircle, Eye, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const AdminDashboard = () => {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectNotes, setRejectNotes] = useState("");

  const { data: allProfiles = [] } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const { data: upgradeRequests = [] } = useQuery({
    queryKey: ["admin-upgrade-requests"],
    queryFn: async () => {
      const { data } = await supabase
        .from("upgrade_requests")
        .select("*, profiles!upgrade_requests_user_id_fkey(full_name, avatar_url)")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (requestId: string) => {
      const { error } = await supabase.rpc("approve_upgrade", {
        request_id: requestId,
        admin_id: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("User upgraded to Premium!");
      queryClient.invalidateQueries({ queryKey: ["admin-upgrade-requests"] });
      queryClient.invalidateQueries({ queryKey: ["admin-profiles"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ requestId, notes }: { requestId: string; notes: string }) => {
      const { error } = await supabase.rpc("reject_upgrade", {
        request_id: requestId,
        admin_id: user!.id,
        notes: notes || undefined,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Request rejected");
      setRejectId(null);
      setRejectNotes("");
      queryClient.invalidateQueries({ queryKey: ["admin-upgrade-requests"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const freeUsers = allProfiles.filter((p) => p.account_type === "free").length;
  const premiumUsers = allProfiles.filter((p) => p.account_type === "premium").length;
  const pendingRequests = upgradeRequests.filter((r) => r.status === "pending").length;

  return (
    <DashboardLayout role="admin" userName={profile?.full_name ?? "Admin"}>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage users and upgrade requests.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Users" value={String(allProfiles.length)} icon={<Users className="w-5 h-5" />} variant="primary" />
        <StatCard label="Free Users" value={String(freeUsers)} icon={<Users className="w-5 h-5" />} />
        <StatCard label="Premium Users" value={String(premiumUsers)} icon={<Crown className="w-5 h-5" />} variant="secondary" />
        <StatCard label="Pending Requests" value={String(pendingRequests)} icon={<Clock className="w-5 h-5" />} variant="accent" />
      </div>

      {/* Upgrade Requests */}
      <div className="bg-card border rounded-xl p-6 mb-6">
        <h2 className="font-display font-semibold text-lg text-foreground mb-4">Upgrade Requests</h2>
        {upgradeRequests.length === 0 ? (
          <p className="text-muted-foreground text-sm">No upgrade requests yet.</p>
        ) : (
          <div className="space-y-3">
            {upgradeRequests.map((req: any) => (
              <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">
                    {req.profiles?.full_name ?? "Unknown User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {req.transaction_id && `TX: ${req.transaction_id} · `}
                    {new Date(req.created_at).toLocaleDateString()} · {req.amount.toLocaleString()} RWF
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {req.payment_screenshot_url && (
                    <Button variant="outline" size="sm" onClick={() => setSelectedProof(req.payment_screenshot_url)}>
                      <Eye className="w-3 h-3 mr-1" /> Proof
                    </Button>
                  )}
                  {req.status === "pending" ? (
                    <>
                      <Button size="sm" className="bg-secondary text-secondary-foreground" onClick={() => approveMutation.mutate(req.id)} disabled={approveMutation.isPending}>
                        {approveMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <><CheckCircle2 className="w-3 h-3 mr-1" /> Approve</>}
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => setRejectId(req.id)}>
                        <XCircle className="w-3 h-3 mr-1" /> Reject
                      </Button>
                    </>
                  ) : (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      req.status === "approved" ? "bg-secondary/20 text-secondary" : "bg-destructive/20 text-destructive"
                    }`}>
                      {req.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* All Users */}
      <div className="bg-card border rounded-xl p-6">
        <h2 className="font-display font-semibold text-lg text-foreground mb-4">All Users</h2>
        <div className="space-y-2">
          {allProfiles.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {p.full_name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{p.full_name}</p>
                  <p className="text-xs text-muted-foreground">Joined {new Date(p.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                p.account_type === "premium" ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"
              }`}>
                {p.account_type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshot Dialog */}
      <Dialog open={!!selectedProof} onOpenChange={() => setSelectedProof(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Payment Proof</DialogTitle>
          </DialogHeader>
          {selectedProof && <img src={selectedProof} alt="Payment proof" className="w-full rounded-lg" />}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={!!rejectId} onOpenChange={() => setRejectId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Upgrade Request</DialogTitle>
          </DialogHeader>
          <Textarea placeholder="Reason for rejection (optional)..." value={rejectNotes} onChange={(e) => setRejectNotes(e.target.value)} />
          <Button variant="destructive" onClick={() => rejectId && rejectMutation.mutate({ requestId: rejectId, notes: rejectNotes })} disabled={rejectMutation.isPending}>
            {rejectMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Rejection"}
          </Button>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminDashboard;
