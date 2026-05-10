import { cookies } from "next/headers";
import connectToDatabase from "./mongodb";
import Admin, { IAdmin } from "@/models/Admin";
import { SignJWT, jwtVerify } from "jose";

const secret = process.env.JWT_SECRET;

if (!secret && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET missing from environment variables");
}

const JWT_SECRET = new TextEncoder().encode(secret || "fallback_secret");

export async function signJWT(payload: any, expiresIn: string = "24h") {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(JWT_SECRET);
}

export async function verifyJWT(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;
    } catch (error) {
        return null;
    }
}

export async function getCurrentAdmin(): Promise<IAdmin | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_session")?.value;

        if (!token) return null;

        const payload = await verifyJWT(token);
        if (!payload || !payload.id) return null;

        await connectToDatabase();
        const admin = await Admin.findById(payload.id);
        return admin;
    } catch (error) {
        console.error("Auth error:", error);
        return null;
    }
}

export async function hasPermission(role: Role, path: string): Promise<boolean> {
    return canAccess(role, path);
}

import { Role, ROLES, canAccess } from "./rbac";
export { ROLES };
export type { Role };

import UserActivity from "@/models/UserActivity";

export async function logActivity(
    admin: IAdmin,
    action: string,
    targetType: string,
    details: { oldValue?: any; newValue?: any; description: string; ip?: string },
    targetId?: string,
    targetName?: string
) {
    try {
        await connectToDatabase();
        await UserActivity.create({
            adminId: admin._id,
            adminName: admin.name,
            role: admin.role,
            action,
            targetType,
            targetId,
            targetName,
            details,
        });
    } catch (error) {
        console.error("Failed to log activity:", error);
    }
}
