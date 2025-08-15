// Updated interface to match CSV structure with cleaner field names
export interface Student {
  id: number;
  mssv: string; // MaSV - Student ID
  ho_ten: string; // HoTen - Full name
  gioi_tinh: string; // Phai - Gender
  ngay_sinh: string; // NgaySinh - Date of birth
  cccd: string; // CMND - Citizen ID
  email: string; // Email - Email address
  dien_thoai: string; // DienThoai - Phone number
  so_bao_danh: string; // SBD - Test registration number
  ma_hs: string; // MaHS - Student code
  ho_khau: string; // HoKhau - Household registration address
  ma_nganh: string; // MaNganh - Major code
  ten_nganh: string; // TenNganh - Major name
  truong_thpt: string; // Truong_THPT - High school name
  doat_giai: string; // DoatGiai - Awards/achievements
  phuong_thuc: string; // DTT - Admission method
  diem_tt: number | null; // Diem_TT - Total score
  kv: string; // KV - Khu vực
  dt: string; // DT - Đối tượng
  tt_uutien: string;

  // System functionality fields (mock data)
  created_at: string;
  updated_at: string;
  nam_tot_nghiep: number;
  tinh_trang_hoc_phi: boolean;
  so_tien_hoc_phi: number;
  phuong_thuc_nhap_hoc: string;
  ho_so_can_thiet: string[];
  trang_thai_duyet: "pending" | "approved" | "rejected";
  nguoi_duyet?: string;
  ngay_duyet?: string;
  khoa: string;
  nganh: string;

  // Display fields for compatibility
  dia_chi_thuong_tru: string;
  diem_toan: number | null;
  diem_sinh_hoc: number | null;
  diem_tieng_anh: number | null;
  diem_tong: number | null;
}

export interface AdmissionMethod {
  id: number;
  name: string;
  documents: string[];
}

export interface Faculty {
  id: string;
  name: string;
  majors: string[];
}

// Mock admission methods from HCMUS website
export const ADMISSION_METHODS: AdmissionMethod[] = [
  {
    id: 1,
    name: "Phương thức 1 - Xét tuyển thẳng và ưu tiên",
    documents: [
      "Hai ảnh thẻ 4×6",
      "Bản chính Giấy báo nhập học",
      "Bản sao trích lục Giấy khai sinh",
      "Bản chính Giấy chứng nhận tốt nghiệp tạm thời năm 2024",
      "Bản sao học bạ THPT (mang theo bản chính để đối chiếu)",
      "Bản sao Giấy chứng nhận đoạt giải (mang theo bản chính để đối chiếu)",
      "Lý lịch sinh viên (in trực tiếp từ trang Portal của Trường)",
      "Phiếu đăng ký nhận thông tin học tập sinh viên",
      "Sổ Đoàn hoặc giấy giới thiệu chuyển sinh hoạt Đảng (nếu có)",
    ],
  },
  {
    id: 2,
    name: "Phương thức 2 - Xét tuyển dựa trên kết quả thi THPT",
    documents: [
      "Hai ảnh thẻ 4×6",
      "Bản chính Giấy báo nhập học",
      "Bản sao trích lục Giấy khai sinh",
      "Bản chính Giấy chứng nhận tốt nghiệp tạm thời năm 2024",
      "Bản sao học bạ THPT (mang theo bản chính để đối chiếu)",
      "Bản sao Giấy chứng nhận kết quả thi THPT",
      "Lý lịch sinh viên (in trực tiếp từ trang Portal của Trường)",
      "Phiếu đăng ký nhận thông tin học tập sinh viên",
    ],
  },
  {
    id: 3,
    name: "Phương thức 3 - Xét tuyển dựa trên học bạ THPT",
    documents: [
      "Hai ảnh thẻ 4×6",
      "Bản chính Giấy báo nhập học",
      "Bản sao trích lục Giấy khai sinh",
      "Bản chính Giấy chứng nhận tốt nghiệp tạm thời năm 2024",
      "Bản sao học bạ THPT (mang theo bản chính để đối chiếu)",
      "Lý lịch sinh viên (in trực tiếp từ trang Portal của Trường)",
      "Phiếu đăng ký nhận thông tin học tập sinh viên",
    ],
  },
  {
    id: 4,
    name: "Phương thức 4 - Xét tuyển kết hợp",
    documents: [
      "Hai ảnh thẻ 4×6",
      "Bản chính Giấy báo nhập học",
      "Bản sao trích lục Giấy khai sinh",
      "Bản chính Giấy chứng nhận tốt nghiệp tạm thời năm 2024",
      "Bản sao học bạ THPT (mang theo bản chính để đối chiếu)",
      "Bản sao kết quả thi năng lực/đánh giá tư duy",
      "Lý lịch sinh viên (in trực tiếp từ trang Portal của Trường)",
      "Phiếu đăng ký nhận thông tin học tập sinh viên",
    ],
  },
];

// Mock faculties
export const FACULTIES: Faculty[] = [
  {
    id: "fit",
    name: "Khoa Công nghệ Thông tin",
    majors: [
      "Công nghệ thông tin",
      "Khoa học máy tính",
      "Hệ thống thông tin",
      "Kỹ thuật phần mềm",
      "Mạng máy tính và truyền thông dữ liệu",
      "Trí tuệ nhân tạo",
    ],
  },
  {
    id: "chemistry",
    name: "Khoa Hóa học",
    majors: [
      "Hóa học",
      "Hóa học (CT tăng cường tiếng Anh)",
      "Công nghệ hóa học",
      "Công nghệ thực phẩm",
      "Hóa dược",
      "Công nghệ sinh học",
    ],
  },
  {
    id: "geology",
    name: "Khoa Địa chất",
    majors: [
      "Địa chất học",
      "Địa vật lý",
      "Địa kỹ thuật",
      "Kỹ thuật địa chất",
      "Thạch học - Khoáng vật học",
    ],
  },
  {
    id: "fetel",
    name: "Khoa Điện tử - Viễn thông",
    majors: [
      "Kỹ thuật điện tử - viễn thông",
      "Công nghệ kỹ thuật điều khiển và tự động hóa",
      "Kỹ thuật y sinh",
      "Thiết kế vi mạch bán dẫn",
      "Kỹ thuật Robot",
    ],
  },
  {
    id: "mst",
    name: "Khoa Khoa học và Công nghệ Vật liệu",
    majors: [
      "Khoa học vật liệu",
      "Công nghệ vật liệu",
      "Vật liệu nano",
      "Công nghệ vật liệu polyme và composite",
    ],
  },
  {
    id: "environment",
    name: "Khoa Môi trường",
    majors: [
      "Khoa học môi trường",
      "Quản lý tài nguyên và môi trường",
      "Công nghệ kỹ thuật môi trường (CT tăng cường tiếng Anh)",
      "Khoa học môi trường (CT tăng cường tiếng Anh)",
    ],
  },
  {
    id: "fbb",
    name: "Khoa Sinh học",
    majors: [
      "Sinh học",
      "Công nghệ sinh học",
      "Sinh học (CT tăng cường tiếng Anh)",
      "Công nghệ sinh học (CT tăng cường tiếng Anh)",
    ],
  },
  {
    id: "math",
    name: "Khoa Toán - Tin học",
    majors: [
      "Toán học",
      "Toán ứng dụng",
      "Toán tin",
      "Khoa học dữ liệu",
      "Thống kê",
      "Toán học (CT cử nhân tài năng)",
    ],
  },
  {
    id: "physics",
    name: "Khoa Vật lý",
    majors: [
      "Vật lý học",
      "Công nghệ điện tử và tin học",
      "Công nghệ bán dẫn",
      "Kỹ thuật hạt nhân",
      "Vật lý y khoa",
      "Hải dương học",
      "Vật lý học (CT tăng cường tiếng Anh)",
      "Vật lý học (CT cử nhân tài năng)",
      "Công nghệ bán dẫn (CT cử nhân tài năng)",
    ],
  },
  {
    id: "fis",
    name: "Khoa Công nghệ Giáo dục",
    majors: ["Công nghệ giáo dục"],
  },
];
