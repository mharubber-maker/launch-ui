"use client";

import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
    );
  }

  if (!session) {
    redirect("/auth/login");
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              مرحباً {session.user?.name}! 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              تم تسجيل دخولك بنجاح
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">معلومات الحساب</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="font-medium">الاسم:</span> {session.user?.name}</p>
                <p><span className="font-medium">البريد:</span> {session.user?.email}</p>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">الإحصائيات</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="font-medium">المشاريع:</span> 0</p>
                <p><span className="font-medium">المهام:</span> 0</p>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">إجراءات سريعة</h3>
              <div className="space-y-2">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-center bg-destructive/10 text-destructive px-4 py-2 rounded-lg hover:bg-destructive/20 transition-colors"
                >
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
