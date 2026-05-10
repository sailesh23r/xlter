export type Role = "SUPER_ADMIN" | "ADMIN" | "SEO_MANAGER" | "EDITOR" | "VIEWER";

export const ROLES: Record<Role, Role> = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  SEO_MANAGER: "SEO_MANAGER",
  EDITOR: "EDITOR",
  VIEWER: "VIEWER",
};

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  SUPER_ADMIN: ["*"], // Full access
  ADMIN: [
    "/xeltr-admin/dashboard",
    "/xeltr-admin/content",
    "/xeltr-admin/marketing",
    "/xeltr-admin/performance",
    "/api/admin/dashboard",
    "/api/admin/content",
    "/api/admin/marketing",
    "/api/admin/performance"
  ],
  SEO_MANAGER: [
    "/xeltr-admin/dashboard",
    "/xeltr-admin/seo",
    "/xeltr-admin/settings/seo",
    "/xeltr-admin/performance/core-web-vitals",
    "/api/admin/seo",
    "/api/admin/performance/metrics"
  ],
  EDITOR: [
    "/xeltr-admin/dashboard",
    "/xeltr-admin/content/blog",
    "/xeltr-admin/content/testimonials",
    "/api/admin/content/blog",
    "/api/admin/content/testimonials",
    "/api/admin/system/media"
  ],
  VIEWER: [
    "/xeltr-admin/dashboard"
  ],
};

/**
 * Checks if a role has access to a specific path
 */
export function canAccess(role: Role, path: string): boolean {
  if (role === ROLES.SUPER_ADMIN) return true;

  const permissions = ROLE_PERMISSIONS[role] || [];
  
  // Check if the path starts with any of the allowed prefixes
  return permissions.some(permission => path.startsWith(permission));
}
