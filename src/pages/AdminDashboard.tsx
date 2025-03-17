
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import AdminThesisList from "@/components/AdminThesisList";
import AdminSettings from "@/components/AdminSettings";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("theses");

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Trang quản trị</h2>
        <p className="text-muted-foreground">
          Quản lý tất cả luận văn và cài đặt hệ thống
        </p>
      </div>

      <Tabs defaultValue="theses" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="theses">Tất cả luận văn</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt hệ thống</TabsTrigger>
        </TabsList>
        <TabsContent value="theses" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tất cả luận văn</CardTitle>
              <CardDescription>
                Quản lý tất cả luận văn đã được tải lên hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminThesisList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <AdminSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
