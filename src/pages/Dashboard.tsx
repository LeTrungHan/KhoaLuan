
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import UploadThesis from "@/components/UploadThesis";
import ThesisList from "@/components/ThesisList";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("myTheses");

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Xin chào, {user.name}!</h2>
        <p className="text-muted-foreground">
          Quản lý và kiểm tra đạo văn cho các luận văn của bạn
        </p>
      </div>

      <Tabs defaultValue="myTheses" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="myTheses">Luận văn của tôi</TabsTrigger>
          <TabsTrigger value="upload">Tải lên luận văn mới</TabsTrigger>
        </TabsList>
        <TabsContent value="myTheses" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Luận văn của tôi</CardTitle>
              <CardDescription>
                Danh sách các luận văn bạn đã tải lên và trạng thái của chúng.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThesisList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upload" className="mt-6">
          <UploadThesis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
