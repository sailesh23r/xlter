import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface SessionStatusProps {
  twoFactorEnabled: boolean;
  failedAttempts: number;
}

export default function SessionStatus({ twoFactorEnabled, failedAttempts }: SessionStatusProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-xs">
        {twoFactorEnabled ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <XCircle className="h-3.5 w-3.5 text-slate-500" />
        )}
        <span className={twoFactorEnabled ? "text-green-500 font-medium" : "text-slate-400"}>
          2FA {twoFactorEnabled ? "Enabled" : "Disabled"}
        </span>
      </div>
      {failedAttempts > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-red-400">
          <XCircle className="h-3.5 w-3.5" />
          <span>{failedAttempts} failed attempts</span>
        </div>
      )}
    </div>
  );
}
