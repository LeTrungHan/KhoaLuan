
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Kiểm tra người dùng đã đăng nhập từ localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Giả lập API đăng nhập
      setLoading(true);
      
      // Kiểm tra tài khoản admin
      if (email === "admin@example.com" && password === "admin123") {
        const adminUser = {
          id: "admin-id",
          email,
          isAdmin: true,
          name: "Administrator"
        };
        setUser(adminUser);
        localStorage.setItem("user", JSON.stringify(adminUser));
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng quản trị viên quay trở lại!",
        });
        return;
      }
      
      // Giả lập đăng nhập người dùng thông thường
      // Trong thực tế, đây sẽ là API call
      if (email && password) {
        const normalUser = {
          id: `user-${Math.random().toString(36).substr(2, 9)}`,
          email,
          isAdmin: false,
          name: email.split('@')[0]
        };
        setUser(normalUser);
        localStorage.setItem("user", JSON.stringify(normalUser));
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng quay trở lại!",
        });
      } else {
        throw new Error("Email hoặc mật khẩu không hợp lệ");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Đăng nhập thất bại",
        description: error instanceof Error ? error.message : "Đã xảy ra lỗi khi đăng nhập",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      
      // Giả lập API đăng ký
      // Trong thực tế, đây sẽ là API call
      if (email && password && name) {
        const newUser = {
          id: `user-${Math.random().toString(36).substr(2, 9)}`,
          email,
          isAdmin: false,
          name
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        toast({
          title: "Đăng ký thành công",
          description: "Tài khoản của bạn đã được tạo!",
        });
      } else {
        throw new Error("Vui lòng điền đầy đủ thông tin");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Đăng ký thất bại",
        description: error instanceof Error ? error.message : "Đã xảy ra lỗi khi đăng ký",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại bạn!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth phải được sử dụng trong AuthProvider");
  }
  return context;
};
