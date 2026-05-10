export type Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "SEO_MANAGER"
  | "CONTENT_EDITOR"
  | "MARKETING_MANAGER"
  | "VIEWER";

export type UserStatus = "ACTIVE" | "SUSPENDED" | "INVITED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  status: UserStatus;
  permissions: string[];
  lastLogin: string;
  createdDate: string;
  failedAttempts: number;
  twoFactorEnabled: boolean;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Sterling",
    email: "alex@xeltr.com",
    role: "SUPER_ADMIN",
    avatar: "https://i.pravatar.cc/150?u=alex",
    status: "ACTIVE",
    permissions: ["all"],
    lastLogin: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365).toISOString(),
    failedAttempts: 0,
    twoFactorEnabled: true,
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    email: "sarah@xeltr.com",
    role: "ADMIN",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    status: "ACTIVE",
    permissions: ["pages", "blogs", "analytics"],
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString(),
    failedAttempts: 0,
    twoFactorEnabled: true,
  },
  {
    id: "3",
    name: "Marcus Chen",
    email: "marcus@xeltr.com",
    role: "SEO_MANAGER",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    status: "ACTIVE",
    permissions: ["SEO", "redirects", "analytics"],
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
    failedAttempts: 1,
    twoFactorEnabled: false,
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    email: "elena@xeltr.com",
    role: "CONTENT_EDITOR",
    avatar: "https://i.pravatar.cc/150?u=elena",
    status: "SUSPENDED",
    permissions: ["blogs", "pages"],
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    failedAttempts: 4,
    twoFactorEnabled: false,
  },
  {
    id: "5",
    name: "David Kim",
    email: "david@xeltr.com",
    role: "MARKETING_MANAGER",
    avatar: "https://i.pravatar.cc/150?u=david",
    status: "ACTIVE",
    permissions: ["analytics", "scripts"],
    lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    failedAttempts: 0,
    twoFactorEnabled: true,
  },
  {
    id: "6",
    name: "Guest User",
    email: "guest@xeltr.com",
    role: "VIEWER",
    avatar: "https://i.pravatar.cc/150?u=guest",
    status: "INVITED",
    permissions: [],
    lastLogin: "",
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    failedAttempts: 0,
    twoFactorEnabled: false,
  },
];

export const activityLogs = [
  { id: 1, action: "User created", target: "Guest User", by: "Alex Sterling", time: "2 days ago", type: "create" },
  { id: 2, action: "Role updated", target: "Marcus Chen (SEO_MANAGER)", by: "Sarah Jenkins", time: "3 days ago", type: "update" },
  { id: 3, action: "Account suspended", target: "Elena Rodriguez", by: "Alex Sterling", time: "5 days ago", type: "security" },
  { id: 4, action: "Password changed", target: "Sarah Jenkins", by: "Self", time: "1 week ago", type: "security" },
  { id: 5, action: "Login attempt failed", target: "Elena Rodriguez", by: "System", time: "5 days ago", type: "danger" },
];
