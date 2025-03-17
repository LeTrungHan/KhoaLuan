
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Hệ thống quản lý luận văn với công nghệ chống đạo văn
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Nền tảng hiện đại giúp quản lý, lưu trữ và kiểm tra đạo văn cho luận văn và báo cáo tốt nghiệp
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/register">Đăng ký ngay</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/login">Đăng nhập</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-5xl">
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-3">Phát hiện đạo văn truyền thống</h2>
          <p className="text-muted-foreground">
            Kiểm tra tài liệu của bạn với hàng triệu tài liệu đã xuất bản và nội dung web để đảm bảo tính nguyên bản.
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-3">Phát hiện đạo văn AI</h2>
          <p className="text-muted-foreground">
            Công nghệ tiên tiến phát hiện nội dung được tạo bởi AI, giúp đảm bảo tính chính trực học thuật.
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-3">Báo cáo chi tiết</h2>
          <p className="text-muted-foreground">
            Nhận báo cáo chi tiết về các phần đạo văn, nguồn gốc và tỷ lệ đạo văn trong tài liệu của bạn.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Dành cho mọi khoa ngành</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hệ thống của chúng tôi được thiết kế để phục vụ tất cả các khoa ngành, từ kỹ thuật đến khoa học 
          xã hội, giúp đảm bảo tính nguyên bản trong mọi lĩnh vực học thuật.
        </p>
      </div>
    </div>
  );
};

export default Index;
