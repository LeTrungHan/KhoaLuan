
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface PlagiarismDetail {
  originalText: string;
  highlightedText: string;
  source: string;
  similarity: number;
  isAiGenerated: boolean;
}

interface ThesisDetail {
  id: string;
  title: string;
  abstract: string;
  author: string;
  faculty: string;
  uploadDate: string;
  status: "processing" | "completed" | "rejected";
  plagiarismScore: number;
  aiPlagiarismScore: number;
  plagiarismDetails: PlagiarismDetail[];
  content: string;
}

const ThesisView = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [thesis, setThesis] = useState<ThesisDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Giả lập API call để lấy chi tiết luận văn
    const fetchThesisDetail = async () => {
      setIsLoading(true);
      try {
        // Giả lập delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Mock data
        const mockThesis: ThesisDetail = {
          id: "thesis-1",
          title: "Phân tích và đánh giá hiệu quả của các phương pháp học máy trong dự đoán giá chứng khoán",
          abstract: "Nghiên cứu này tập trung vào việc phân tích và đánh giá hiệu quả của các phương pháp học máy khác nhau trong việc dự đoán giá chứng khoán. Các phương pháp được đánh giá bao gồm mạng nơ-ron nhân tạo, máy vector hỗ trợ, và rừng ngẫu nhiên...",
          author: "Nguyễn Văn A",
          faculty: "Công nghệ thông tin",
          uploadDate: "2023-09-15",
          status: "completed",
          plagiarismScore: 12,
          aiPlagiarismScore: 5,
          content: "Nội dung đầy đủ của luận văn sẽ được hiển thị ở đây...",
          plagiarismDetails: [
            {
              originalText: "Phân tích và đánh giá hiệu quả của các phương pháp học máy trong dự đoán giá chứng khoán là một lĩnh vực nghiên cứu quan trọng trong tài chính",
              highlightedText: "Phân tích và đánh giá hiệu quả của các phương pháp học máy trong dự đoán giá chứng khoán là một lĩnh vực nghiên cứu quan trọng trong tài chính",
              source: "Tạp chí Khoa học & Công nghệ, số 45, tr.78-92",
              similarity: 100,
              isAiGenerated: false
            },
            {
              originalText: "Mạng nơ-ron nhân tạo (ANN) là một mô hình học máy phổ biến được sử dụng trong dự đoán chuỗi thời gian. Mô hình này bắt chước cách thức hoạt động của não người",
              highlightedText: "Mạng nơ-ron nhân tạo (ANN) là một mô hình học máy phổ biến được sử dụng trong dự đoán chuỗi thời gian",
              source: "https://example.edu/research/machine-learning-finance",
              similarity: 85,
              isAiGenerated: false
            },
            {
              originalText: "Việc áp dụng các kỹ thuật học sâu trong dự đoán thị trường chứng khoán đã mang lại những kết quả đáng kể trong những năm gần đây. Các mô hình như LSTM và GRU có khả năng nắm bắt các phụ thuộc dài hạn trong dữ liệu chuỗi thời gian.",
              highlightedText: "Việc áp dụng các kỹ thuật học sâu trong dự đoán thị trường chứng khoán đã mang lại những kết quả đáng kể trong những năm gần đây",
              source: "[Nội dung do AI tạo ra]",
              similarity: 95,
              isAiGenerated: true
            }
          ]
        };
        
        setThesis(mockThesis);
      } catch (error) {
        console.error("Error fetching thesis detail:", error);
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Đã xảy ra lỗi khi tải thông tin luận văn",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchThesisDetail();
    }
  }, [id, toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Đang tải thông tin luận văn...</p>
        </div>
      </div>
    );
  }

  if (!thesis) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Không tìm thấy luận văn</h2>
        <p className="text-muted-foreground">
          Luận văn bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{thesis.title}</h1>
          <div className="flex items-center mt-2 space-x-2">
            <p className="text-muted-foreground">Tác giả: {thesis.author}</p>
            <span>•</span>
            <p className="text-muted-foreground">Khoa: {thesis.faculty}</p>
            <span>•</span>
            <p className="text-muted-foreground">
              Ngày tải lên: {new Date(thesis.uploadDate).toLocaleDateString("vi-VN")}
            </p>
          </div>
          <div className="mt-2">
            {thesis.status === "processing" && (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                Đang xử lý
              </Badge>
            )}
            {thesis.status === "completed" && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Hoàn thành
              </Badge>
            )}
            {thesis.status === "rejected" && (
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                Bị từ chối
              </Badge>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Tải xuống</Button>
          {user?.isAdmin && (
            <Button variant="destructive">Xóa luận văn</Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="plagiarism">Báo cáo đạo văn</TabsTrigger>
          <TabsTrigger value="content">Nội dung</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tóm tắt luận văn</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{thesis.abstract}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Đạo văn truyền thống</h3>
                  <div className="flex items-center space-x-4">
                    <Progress value={thesis.plagiarismScore} className="h-4" />
                    <span className="text-2xl font-bold">{thesis.plagiarismScore}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {thesis.plagiarismScore > 15 
                      ? "Tỷ lệ đạo văn truyền thống cao, cần xem xét lại nội dung." 
                      : "Tỷ lệ đạo văn truyền thống trong giới hạn cho phép."}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Đạo văn AI</h3>
                  <div className="flex items-center space-x-4">
                    <Progress value={thesis.aiPlagiarismScore} className="h-4" />
                    <span className="text-2xl font-bold">{thesis.aiPlagiarismScore}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {thesis.aiPlagiarismScore > 10 
                      ? "Tỷ lệ nội dung được tạo bởi AI cao, cần xem xét lại." 
                      : "Tỷ lệ nội dung được tạo bởi AI trong giới hạn cho phép."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plagiarism" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết đạo văn</CardTitle>
              <CardDescription>
                Báo cáo chi tiết về các phần đạo văn được phát hiện trong luận văn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Thống kê đạo văn</h3>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">Đạo văn truyền thống:</span>
                      <Progress value={thesis.plagiarismScore} className="h-2 flex-1" />
                      <span className="font-bold">{thesis.plagiarismScore}%</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">Đạo văn AI:</span>
                      <Progress value={thesis.aiPlagiarismScore} className="h-2 flex-1" />
                      <span className="font-bold">{thesis.aiPlagiarismScore}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Đánh giá tổng thể</h3>
                    <p className="text-sm text-muted-foreground">
                      Dựa trên kết quả kiểm tra, luận văn này có 
                      {thesis.plagiarismScore + thesis.aiPlagiarismScore <= 20 
                        ? " tỷ lệ đạo văn thấp và nằm trong giới hạn cho phép." 
                        : " tỷ lệ đạo văn cao và cần được xem xét lại."}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Các đoạn đạo văn được phát hiện</h3>
                  
                  {thesis.plagiarismDetails.map((detail, index) => (
                    <Card key={index} className={detail.isAiGenerated ? "border-amber-200" : "border-red-200"}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              {detail.isAiGenerated ? (
                                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                                  Nội dung AI
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                                  Đạo văn truyền thống
                                </Badge>
                              )}
                              <span className="ml-2 text-sm text-muted-foreground">
                                Độ tương đồng: {detail.similarity}%
                              </span>
                            </div>
                            
                            <div className="p-3 bg-muted rounded-md">
                              <p className="text-sm">{detail.highlightedText}</p>
                            </div>
                            
                            <div className="text-sm">
                              <span className="font-medium">Nguồn:</span> {detail.source}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {thesis.plagiarismDetails.length === 0 && (
                    <p className="text-muted-foreground">
                      Không phát hiện đạo văn trong luận văn này.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Nội dung luận văn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  {thesis.content || "Nội dung đầy đủ của luận văn sẽ được hiển thị ở đây."}
                </p>
                
                <p className="italic text-muted-foreground mt-6">
                  Lưu ý: Đây là phiên bản hiển thị của luận văn. Để xem đầy đủ định dạng gốc, vui lòng tải xuống file.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThesisView;
