"use client";

import React, { useState, useMemo } from "react";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";

import UserStats from "@/Components/Admin/Users/UserStats";
import UserFilters from "@/Components/Admin/Users/UserFilters";
import UsersTable from "@/Components/Admin/Users/UsersTable";
import PermissionMatrix from "@/Components/Admin/Users/PermissionMatrix";
import ActivityLogs from "@/Components/Admin/Users/ActivityLogs";
import UserModal from "@/Components/Admin/Users/UserModal";
import DeleteConfirmModal from "@/Components/Admin/Users/DeleteConfirmModal";

import { mockUsers, User, Role, UserStatus } from "@/Components/Admin/Users/mockData";

const currentUserRole: Role = "SUPER_ADMIN";

export default function UsersAndRolesPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  
  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "ALL">("ALL");

  // Modals state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Computed Stats
  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter(u => u.status === "ACTIVE").length,
      suspended: users.filter(u => u.status === "SUSPENDED").length,
      twoFactorEnabled: users.filter(u => u.twoFactorEnabled).length,
      failedLogins: users.reduce((acc, curr) => acc + curr.failedAttempts, 0),
    };
  }, [users]);

  // Computed Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
      const matchesStatus = statusFilter === "ALL" || user.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Handlers
  const handleOpenCreateModal = () => {
    setSelectedUser(null);
    setIsUserModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleOpenDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleSaveUser = (userData: Partial<User>) => {
    if (selectedUser) {
      // Edit
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...userData } as User : u));
    } else {
      // Create
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "VIEWER",
        status: userData.status || "INVITED",
        avatar: userData.avatar || `https://i.pravatar.cc/150?u=${userData.email}`,
        permissions: [],
        lastLogin: "",
        createdDate: new Date().toISOString(),
        failedAttempts: 0,
        twoFactorEnabled: false,
      };
      setUsers([newUser, ...users]);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
    }
  };

  const handleSuspend = (user: User) => {
    const newStatus = user.status === "SUSPENDED" ? "ACTIVE" : "SUSPENDED";
    setUsers(users.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
  };

  const handleResetPassword = (user: User) => {
    // Mock functionality
    alert(`Password reset link sent to ${user.email}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1600px] mx-auto pb-12"
    >
      {/* Top section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Users & Roles</h1>
          <p className="text-slate-400 text-sm">Manage team access, roles, and security policies.</p>
        </div>
        
        {currentUserRole === "SUPER_ADMIN" && (
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-500 hover:scale-105"
          >
            <UserPlus className="h-4 w-4" />
            Create User
          </button>
        )}
      </div>

      {/* Analytics Cards */}
      <UserStats stats={stats} />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Col (Users Table) */}
        <div className="xl:col-span-2 space-y-6">
          <UserFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          <UsersTable 
            users={filteredUsers}
            currentUserRole={currentUserRole}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
            onSuspend={handleSuspend}
            onResetPassword={handleResetPassword}
          />
          <PermissionMatrix />
        </div>

        {/* Right Col (Activity Sidebar) */}
        <div className="xl:col-span-1">
          <ActivityLogs />
        </div>

      </div>

      {/* Modals */}
      <UserModal 
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleSaveUser}
        initialData={selectedUser}
        currentUserRole={currentUserRole}
      />
      
      {selectedUser && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          userName={selectedUser.name}
        />
      )}
    </motion.div>
  );
}
