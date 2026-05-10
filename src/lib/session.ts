import { IAdmin, ISession } from "@/models/Admin";

/**
 * Tracks a new session or updates an existing one
 */
export async function trackSession(
  admin: IAdmin, 
  deviceId: string, 
  ip: string, 
  userAgent: string
) {
  const existingSessionIndex = admin.activeSessions.findIndex(s => s.deviceId === deviceId);

  if (existingSessionIndex !== -1) {
    admin.activeSessions[existingSessionIndex].lastActive = new Date();
    admin.activeSessions[existingSessionIndex].ip = ip;
  } else {
    // Keep only the last 5 sessions
    if (admin.activeSessions.length >= 5) {
      admin.activeSessions.shift();
    }
    
    admin.activeSessions.push({
      deviceId,
      ip,
      userAgent,
      lastActive: new Date()
    });
  }

  admin.lastLogin = new Date();
  admin.lastLoginIp = ip;
  await admin.save();
}

/**
 * Clears all active sessions for an admin
 */
export async function logoutAllDevices(admin: IAdmin) {
  admin.activeSessions = [];
  await admin.save();
}

/**
 * Removes a specific session
 */
export async function terminateSession(admin: IAdmin, deviceId: string) {
  admin.activeSessions = admin.activeSessions.filter(s => s.deviceId !== deviceId);
  await admin.save();
}
