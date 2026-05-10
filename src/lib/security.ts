import { IAdmin } from "@/models/Admin";
import bcrypt from "bcryptjs";

/**
 * Brute force protection constants
 */
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000; // 2 hours

/**
 * Hashes a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
}

/**
 * Checks if an account is currently locked
 */
export function isLocked(admin: IAdmin): boolean {
  if (!admin.lockUntil) return false;
  return admin.lockUntil.getTime() > Date.now();
}

/**
 * Handles a failed login attempt
 */
export async function incrementFailedAttempts(admin: IAdmin) {
  admin.failedLoginAttempts += 1;
  
  if (admin.failedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
    admin.lockUntil = new Date(Date.now() + LOCK_TIME);
  }
  
  await admin.save();
}

/**
 * Resets failed attempts on successful login
 */
export async function resetFailedAttempts(admin: IAdmin) {
  if (admin.failedLoginAttempts > 0 || admin.lockUntil) {
    admin.failedLoginAttempts = 0;
    admin.lockUntil = undefined;
    await admin.save();
  }
}

/**
 * Generates a secure random OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
