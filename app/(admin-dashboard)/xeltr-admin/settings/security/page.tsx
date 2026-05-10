"use client";

import { useState, useEffect } from "react";
import { Shield, Lock, Clock, AlertTriangle } from "lucide-react";
import {
  SettingsHeader,
  SettingsCard,
  ToggleSwitch,
  SettingsNumberInput,
  SecurityBadge,
  SaveButton,
} from "@/Components/Admin/Settings/SettingsComponents";

export default function SecuritySettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [security, setSecurity] = useState({
    forceHttps: true,
    secureCookies: true,
    sessionTimeoutMinutes: 60,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireSpecialChars: true,
  });

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/admin/system/settings");
        const json = await res.json();
        if (json.success && json.settings?.security) {
          setSecurity(json.settings.security);
        }
      } catch (e) {
        console.error("Failed to load security settings:", e);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/admin/system/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ security }),
      });
    } catch (e) {
      console.error("Save failed:", e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-500 font-black uppercase tracking-widest animate-pulse">Loading security config…</div>;

  const overallStatus = security.forceHttps && security.secureCookies && security.requireSpecialChars
    ? "secure" : "warning";

  return (
    <div className="space-y-8 pb-20">
      <SettingsHeader
        title="Security Settings"
        description="Configure authentication, session policies, and login protections."
        badge="Security"
        actions={<SaveButton onClick={handleSave} loading={saving} />}
      />

      {/* Status overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "HTTPS Enforced", status: security.forceHttps ? "secure" : "danger" },
          { label: "Secure Cookies", status: security.secureCookies ? "secure" : "warning" },
          { label: "Password Policy", status: security.requireSpecialChars ? "secure" : "warning" },
        ].map((item) => (
          <div key={item.label} className="bg-white/[0.02] border border-white/8 rounded-[24px] p-6 flex items-center justify-between">
            <span className="text-sm text-gray-400 font-medium">{item.label}</span>
            <SecurityBadge status={item.status as any} label={item.status === "secure" ? "Secure" : "Review"} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* HTTPS & Cookies */}
        <SettingsCard title="Transport Security" description="Protect data in transit and session storage." icon={<Shield />}>
          <ToggleSwitch
            label="Force HTTPS"
            description="Redirect all HTTP requests to HTTPS. Required for production."
            checked={security.forceHttps}
            onChange={(v) => setSecurity({ ...security, forceHttps: v })}
          />
          <ToggleSwitch
            label="Secure Cookies"
            description="Attach the Secure flag so cookies are only sent over HTTPS."
            checked={security.secureCookies}
            onChange={(v) => setSecurity({ ...security, secureCookies: v })}
          />
        </SettingsCard>

        {/* Session */}
        <SettingsCard title="Session Management" description="Control admin session duration." icon={<Clock />}>
          <div className="space-y-6 py-2">
            <SettingsNumberInput
              label="Session Timeout (minutes)"
              value={security.sessionTimeoutMinutes}
              onChange={(v) => setSecurity({ ...security, sessionTimeoutMinutes: v })}
              min={5}
              max={10080}
              hint="Idle sessions will be terminated after this duration."
            />
          </div>
        </SettingsCard>

        {/* Login Protection */}
        <SettingsCard title="Login Protection" description="Rate-limit failed login attempts to prevent brute-force attacks." icon={<Lock />}>
          <div className="space-y-6 py-2">
            <SettingsNumberInput
              label="Max Failed Login Attempts"
              value={security.maxLoginAttempts}
              onChange={(v) => setSecurity({ ...security, maxLoginAttempts: v })}
              min={1}
              max={20}
              hint="Account will be temporarily locked after this many failed attempts."
            />
          </div>
        </SettingsCard>

        {/* Password Policy */}
        <SettingsCard title="Password Policy" description="Enforce strong password requirements for all admin accounts." icon={<AlertTriangle />}>
          <div className="space-y-6">
            <SettingsNumberInput
              label="Minimum Password Length"
              value={security.passwordMinLength}
              onChange={(v) => setSecurity({ ...security, passwordMinLength: v })}
              min={6}
              max={32}
            />
            <ToggleSwitch
              label="Require Special Characters"
              description="Passwords must contain at least one symbol (!, @, #, etc.)."
              checked={security.requireSpecialChars}
              onChange={(v) => setSecurity({ ...security, requireSpecialChars: v })}
            />
          </div>
        </SettingsCard>
      </div>
    </div>
  );
}
