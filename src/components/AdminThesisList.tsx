
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Thesis {
  id: string;
  title: string;
  author: string;
  faculty: string;
  uploadDate: string;
  status: "processing" | "completed" | "rejected";
  plagiarismScore: number;
  aiPlagiarismScore: number;
}

const AdminThesisList = () => {
  const [theses, setTheses] = useState<Thesis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

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
            author: "Nguyễn Văn A",
            faculty: "Công nghệ thông tin",
            uploadDate: "2023-09-15",
            status: "completed",
            plagiarismScore: 12,
            aiPlagiarismScore: 5,
          },
          {
            id: "thesis-2",
            title: "Nghiên cứu tác động của biến đổi khí hậu đến nông nghiệp Việt Nam",
            author: "Trần Thị B",
            faculty: "Môi trường",
            uploadDate: "2023-10-20",
            status: "processing",
            plagiarismScore: 0,
            aiPlagiarismScore: 0,
          },
          {
            id: "thesis-3",
            title: "Ứng dụng công nghệ blockchain trong ngành tài chính ngân hàng",
            author: "Lê Văn C",
            faculty: "Kinh tế",
            uploadDate: "2023-08-05",
            status: "rejected",
            plagiarismScore: 37,
            aiPlagiarismScore: 22,
          },
          {
            id: "thesis-4",
            title: "Nghiên cứu giải pháp nâng cao hiệu quả quản lý nguồn nhân lực trong doanh nghiệp vừa và nhỏ",
            author: "Phạm Thị D",
            faculty: "Quản trị kinh doanh",
            uploadDate: "2023-11-10",
            status: "completed",
            plagiarismScore: 8,
            aiPlagiarismScore: 3,
          },
          {
            id: "thesis-5",
            title: "Phân tích các yếu tố ảnh hưởng đến sự hài lòng của khách hàng trong lĩnh vực dịch vụ viễn thông",
            author: "Hoàng Văn E",
            faculty: "Marketing",
            uploadDate: "2023-07-22",
            status: "completed",
            plagiarismScore: 15,
            aiPlagiarismScore: 10,
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
  }, []);

  const handleDeleteThesis = async (id: string) => {
    try {
      // Giả lập xóa luận văn
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Cập nhật danh sách sau khi xóa
      setTheses((prev) => prev.filter((thesis) => thesis.id !== id));
      
      toast({
        title: "Xóa thành công",
        description: "Luận văn đã được xóa khỏi hệ thống",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi xóa luận văn",
      });
    }
  };

  const handleApproveThesis = async (id: string) => {
    try {
      // Giả lập phê duyệt luận văn
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Cập nhật trạng thái luận văn
      setTheses((prev) =>
        prev.map((thesis) =>
          thesis.id === id ? { ...thesis, status: "completed" as const } : thesis
        )
      );
      
      toast({
        title: "Phê duyệt thành công",
        description: "Luận văn đã được phê duyệt",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi phê duyệt luận văn",
      });
    }
  };

  const handleRejectThesis = async (id: string) => {
    try {
      // Giả lập từ chối luận văn
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Cập nhật trạng thái luận văn
      setTheses((prev) =>
        prev.map((thesis) =>
          thesis.id === id ? { ...thesis, status: "rejected" as const } : thesis
        )
      );
      
      toast({
        title: "Từ chối thành công",
        description: "Luận văn đã bị từ chối",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi từ chối luận văn",
      });
    }
  };

  const filteredTheses = theses.filter(
    (thesis) =>
      thesis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thesis.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thesis.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center py-4">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Tìm kiếm theo tiêu đề, tác giả, khoa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="text-sm text-muted-foreground">
          Tổng số: {filteredTheses.length} luận văn
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Tác giả</TableHead>
            <TableHead>Khoa</TableHead>
            <TableHead>Ngày tải lên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Đạo văn</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTheses.map((thesis) => (
            <TableRow key={thesis.id}>
              <TableCell className="font-medium">{thesis.title}</TableCell>
              <TableCell>{thesis.author}</TableCell>
              <TableCell>{thesis.faculty}</TableCell>
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
                  <div className="space-y-1">
                    <div className="flex items-center text-xs">
                      <span className="w-20">Truyền thống:</span>
                      <Progress value={thesis.plagiarismScore} className="h-2 w-20 mr-2" />
                      <span>{thesis.plagiarismScore}%</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="w-20">AI:</span>
                      <Progress value={thesis.aiPlagiarismScore} className="h-2 w-20 mr-2" />
                      <span>{thesis.aiPlagiarismScore}%</span>
                    </div>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/thesis/${thesis.id}`}>Xem</Link>
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm">Xóa</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Xác nhận xóa</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p>Bạn có chắc chắn muốn xóa luận văn này không? Hành động này không thể hoàn tác.</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Hủy</Button>
                        <Button 
                          variant="destructive" 
                          onClick={() => handleDeleteThesis(thesis.id)}
                        >
                          Xóa
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {thesis.status === "processing" && (
                    <>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleApproveThesis(thesis.id)}
                      >
                        Phê duyệt
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleRejectThesis(thesis.id)}
                      >
                        Từ chối
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {filteredTheses.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          Không tìm thấy luận văn nào
        </div>
      )}
    </div>
  );
};

export default AdminThesisList;
