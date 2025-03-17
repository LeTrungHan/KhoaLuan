
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";

interface Thesis {
  id: string;
  title: string;
  uploadDate: string;
  status: "processing" | "completed" | "rejected";
  plagiarismScore: number;
  aiPlagiarismScore: number;
}

const ThesisList = () => {
  const { user } = useAuth();
  const [theses, setTheses] = useState<Thesis[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Giả lập API call để lấy dữ liệu
    const fetchTheses = async () => {
      setIsLoading(true);
      try {
        // Giả lập delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock data
        const mockTheses: Thesis[] = [
          {
            id: "thesis-1",
            title: "Phân tích và đánh giá hiệu quả của các phương pháp học máy trong dự đoán giá chứng khoán",
            uploadDate: "2023-09-15",
            status: "completed",
            plagiarismScore: 12,
            aiPlagiarismScore: 5,
          },
          {
            id: "thesis-2",
            title: "Nghiên cứu tác động của biến đổi khí hậu đến nông nghiệp Việt Nam",
            uploadDate: "2023-10-20",
            status: "processing",
            plagiarismScore: 0,
            aiPlagiarismScore: 0,
          },
          {
            id: "thesis-3",
            title: "Ứng dụng công nghệ blockchain trong ngành tài chính ngân hàng",
            uploadDate: "2023-08-05",
            status: "rejected",
            plagiarismScore: 37,
            aiPlagiarismScore: 22,
          },
        ];
        
        setTheses(mockTheses);
      } catch (error) {
        console.error("Error fetching theses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTheses();
  }, [user?.id]);

  if (isLoading) {
    return <div className="text-center py-4">Đang tải dữ liệu...</div>;
  }

  if (theses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">Bạn chưa tải lên luận văn nào</p>
        <Button variant="outline">Tải lên luận văn mới</Button>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tiêu đề</TableHead>
          <TableHead>Ngày tải lên</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Đạo văn truyền thống</TableHead>
          <TableHead>Đạo văn AI</TableHead>
          <TableHead>Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {theses.map((thesis) => (
          <TableRow key={thesis.id}>
            <TableCell className="font-medium">{thesis.title}</TableCell>
            <TableCell>{new Date(thesis.uploadDate).toLocaleDateString("vi-VN")}</TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell>
              {thesis.status === "processing" ? (
                <span className="text-muted-foreground text-sm">Đang kiểm tra</span>
              ) : (
                <>
                  <div className="flex items-center">
                    <Progress value={thesis.plagiarismScore} className="h-2 mr-2" />
                    <span className="text-sm">{thesis.plagiarismScore}%</span>
                  </div>
                </>
              )}
            </TableCell>
            <TableCell>
              {thesis.status === "processing" ? (
                <span className="text-muted-foreground text-sm">Đang kiểm tra</span>
              ) : (
                <>
                  <div className="flex items-center">
                    <Progress value={thesis.aiPlagiarismScore} className="h-2 mr-2" />
                    <span className="text-sm">{thesis.aiPlagiarismScore}%</span>
                  </div>
                </>
              )}
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/thesis/${thesis.id}`}>Xem chi tiết</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ThesisList;
