
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Tiêu đề phải có ít nhất 5 ký tự",
  }),
  abstract: z.string().min(20, {
    message: "Tóm tắt phải có ít nhất 20 ký tự",
  }),
  faculty: z.string().min(2, {
    message: "Vui lòng chọn khoa",
  }),
  checkAiPlagiarism: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const UploadThesis = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      abstract: "",
      faculty: "",
      checkAiPlagiarism: true,
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Vui lòng chọn file luận văn để tải lên",
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Giả lập quá trình tải lên và kiểm tra đạo văn
      // Trong thực tế, đây sẽ là API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast({
        title: "Tải lên thành công",
        description: "Luận văn của bạn đã được tải lên và đang được kiểm tra đạo văn. Quá trình này có thể mất vài phút.",
      });
      
      // Reset form
      form.reset();
      setFile(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi tải lên luận văn",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Kiểm tra định dạng file (chỉ chấp nhận PDF, DOCX)
      const fileType = selectedFile.type;
      if (
        fileType !== "application/pdf" &&
        fileType !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        toast({
          variant: "destructive",
          title: "Định dạng không hỗ trợ",
          description: "Vui lòng tải lên file PDF hoặc DOCX",
        });
        e.target.value = "";
        return;
      }
      
      // Kiểm tra kích thước file (tối đa 20MB)
      if (selectedFile.size > 20 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File quá lớn",
          description: "Kích thước file tối đa là 20MB",
        });
        e.target.value = "";
        return;
      }
      
      setFile(selectedFile);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tải lên luận văn mới</CardTitle>
        <CardDescription>
          Điền thông tin và tải lên file luận văn của bạn để kiểm tra đạo văn.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề luận văn</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tiêu đề luận văn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="abstract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tóm tắt</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Nhập tóm tắt luận văn" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="faculty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khoa</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên khoa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <Label htmlFor="thesis-file">File luận văn (PDF hoặc DOCX, tối đa 20MB)</Label>
              <Input
                id="thesis-file"
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
              />
              {file && (
                <p className="text-sm text-muted-foreground">
                  Đã chọn: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              )}
            </div>
            
            <FormField
              control={form.control}
              name="checkAiPlagiarism"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Kiểm tra đạo văn AI</FormLabel>
                    <FormDescription>
                      Bật tính năng phát hiện nội dung được tạo bởi AI
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? "Đang tải lên..." : "Tải lên và kiểm tra đạo văn"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UploadThesis;
