// Updated interface to match CSV structure with cleaner field names
export interface Student {
  id: number
  mssv: string // MaSV - Student ID from CSV
  ho_ten: string // HoTen - Full name from CSV
  gioi_tinh: string // Phai - Gender from CSV
  ngay_sinh: string // NgaySinh - Date of birth from CSV
  cccd: string // CMND - Citizen ID from CSV
  email: string // Email from CSV
  dien_thoai: string // DienThoai - Phone from CSV
  so_bao_danh: string // SBD - Test number from CSV
  ma_hs: string // MaHS - Student code from CSV
  ho_khau: string // HoKhau - Household registration from CSV
  ma_nganh: string // MaNganh - Major code from CSV
  ten_nganh: string // TenNganh - Major name from CSV
  truong_thpt: string // Truong_THPT - High school from CSV
  doat_giai: string // DoatGiai - Awards from CSV
  phuong_thuc: string // DTT field - Admission method from CSV
  diem_tt: number | null // Diem_TT - Total score from CSV

  // System functionality fields (mock data)
  created_at: string
  updated_at: string
  nam_tot_nghiep: number
  tinh_trang_hoc_phi: boolean
  so_tien_hoc_phi: number
  phuong_thuc_nhap_hoc: string
  ho_so_can_thiet: string[]
  trang_thai_duyet: 'pending' | 'approved' | 'rejected'
  nguoi_duyet?: string
  ngay_duyet?: string
  khoa: string
  nganh: string

  // Display fields for compatibility
  dia_chi_thuong_tru: string
  diem_toan: number | null
  diem_sinh_hoc: number | null
  diem_tieng_anh: number | null
  diem_tong: number | null
}

export interface AdmissionMethod {
  id: number
  name: string
  documents: string[]
}

export interface Faculty {
  id: string
  name: string
  majors: string[]
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
      "Sổ Đoàn hoặc giấy giới thiệu chuyển sinh hoạt Đảng (nếu có)"
    ]
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
      "Phiếu đăng ký nhận thông tin học tập sinh viên"
    ]
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
      "Phiếu đăng ký nhận thông tin học tập sinh viên"
    ]
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
      "Phiếu đăng ký nhận thông tin học tập sinh viên"
    ]
  }
]

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
      "Trí tuệ nhân tạo"
    ]
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
      "Công nghệ sinh học"
    ]
  },
  {
    id: "geology",
    name: "Khoa Địa chất",
    majors: [
      "Địa chất học",
      "Địa vật lý",
      "Địa kỹ thuật",
      "Kỹ thuật địa chất",
      "Thạch học - Khoáng vật học"
    ]
  },
  {
    id: "fetel",
    name: "Khoa Điện tử - Viễn thông",
    majors: [
      "Kỹ thuật điện tử - viễn thông",
      "Công nghệ kỹ thuật điều khiển và tự động hóa",
      "Kỹ thuật y sinh",
      "Thiết kế vi mạch bán dẫn",
      "Kỹ thuật Robot"
    ]
  },
  {
    id: "mst",
    name: "Khoa Khoa học và Công nghệ Vật liệu",
    majors: [
      "Khoa học vật liệu",
      "Công nghệ vật liệu",
      "Vật liệu nano",
      "Công nghệ vật liệu polyme và composite"
    ]
  },
  {
    id: "environment",
    name: "Khoa Môi trường",
    majors: [
      "Khoa học môi trường",
      "Quản lý tài nguyên và môi trường",
      "Công nghệ kỹ thuật môi trường (CT tăng cường tiếng Anh)",
      "Khoa học môi trường (CT tăng cường tiếng Anh)"
    ]
  },
  {
    id: "fbb",
    name: "Khoa Sinh học",
    majors: [
      "Sinh học",
      "Công nghệ sinh học",
      "Sinh học (CT tăng cường tiếng Anh)",
      "Công nghệ sinh học (CT tăng cường tiếng Anh)"
    ]
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
      "Toán học (CT cử nhân tài năng)"
    ]
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
      "Công nghệ bán dẫn (CT cử nhân tài năng)"
    ]
  },
  {
    id: "fis",
    name: "Khoa Công nghệ Giáo dục",
    majors: [
      "Công nghệ giáo dục"
    ]
  }
]

// Sample student IDs for testing
export const SAMPLE_STUDENT_IDS = [
  "24180001", "24180002", "24150113", "24110116", "24150125"
]

// Mock student data based on CSV structure
export const MOCK_STUDENTS: Student[] = [
  {
    id: 1,
    mssv: "24180001", // From CSV
    ho_ten: "HUỲNH MINH KHÔI", // From CSV  
    gioi_tinh: "Nam", // From CSV
    ngay_sinh: "2006-07-02", // From CSV
    cccd: "08020600****", // From CSV (masked)
    email: "huynhminhkhoia1.c3hn2021@gmail.com", // From CSV
    dien_thoai: "039597****", // From CSV (masked)
    so_bao_danh: "49010875", // From CSV
    ma_hs: "PYZIAX", // From CSV
    ho_khau: "Huyện Đức Hòa, Long An", // From CSV
    ma_nganh: "7420201", // From CSV
    ten_nganh: "Công nghệ Sinh học", // From CSV
    truong_thpt: "THPT chuyên tỉnh Long An", // Mock data
    doat_giai: "Giải Nhì - Kỳ thi khoa học kỹ thuật cấp quốc gia - Lĩnh vực Hóa học - Năm 2024", // From CSV
    phuong_thuc: "XTT_BoGD", // From CSV
    diem_tt: 0, // From CSV

    // System functionality fields (mock)
    created_at: "2024-08-20T08:00:00Z",
    updated_at: "2024-08-20T08:00:00Z",
    nam_tot_nghiep: 2024,
    tinh_trang_hoc_phi: false,
    so_tien_hoc_phi: 12500000,
    phuong_thuc_nhap_hoc: "Xét tuyển thẳng theo quy định của Bộ Giáo dục & Đào tạo 2024",
    ho_so_can_thiet: ADMISSION_METHODS[0].documents,
    trang_thai_duyet: 'pending',
    khoa: "Khoa Sinh học",
    nganh: "Công nghệ Sinh học",

    // Display fields
    dia_chi_thuong_tru: "Huyện Đức Hòa, Long An",
    diem_toan: 8.5,
    diem_sinh_hoc: 9.2,
    diem_tieng_anh: null,
    diem_tong: 0
  },
  {
    id: 2,
    mssv: "24180002", // From CSV
    ho_ten: "LÊ HOÀNG TRUNG", // From CSV
    gioi_tinh: "Nam", // From CSV
    ngay_sinh: "2006-09-29", // From CSV
    cccd: "09120600****", // From CSV (masked)
    email: "trungkg2992006@gmail.com", // From CSV
    dien_thoai: "094806****", // From CSV (masked)
    so_bao_danh: "54003432", // From CSV
    ma_hs: "CYTPET", // From CSV
    ho_khau: "Thành phố Rạch Giá, Kiên Giang", // From CSV
    ma_nganh: "7420201", // From CSV
    ten_nganh: "Công nghệ Sinh học", // From CSV
    truong_thpt: "THPT chuyên Huỳnh Mẫn Đạt, Kiên Giang", // Mock data
    doat_giai: "Giải Ba - Kỳ thi chọn học sinh giỏi cấp quốc gia- Môn Sinh học - Năm 2024", // From CSV
    phuong_thuc: "XTT_BoGD", // From CSV
    diem_tt: 0, // From CSV

    // System functionality fields (mock)
    created_at: "2024-08-20T08:30:00Z",
    updated_at: "2024-08-20T08:30:00Z",
    nam_tot_nghiep: 2024,
    tinh_trang_hoc_phi: true,
    so_tien_hoc_phi: 12500000,
    phuong_thuc_nhap_hoc: "Xét tuyển thẳng theo quy định của Bộ Giáo dục & Đào tạo 2024",
    ho_so_can_thiet: ADMISSION_METHODS[0].documents,
    trang_thai_duyet: 'approved',
    nguoi_duyet: "admin@hcmus.edu.vn",
    ngay_duyet: "2024-08-21T10:30:00Z",
    khoa: "Khoa Sinh học",
    nganh: "Công nghệ Sinh học",

    // Display fields
    dia_chi_thuong_tru: "Thành phố Rạch Giá, Kiên Giang",
    diem_toan: 7.8,
    diem_sinh_hoc: 9.5,
    diem_tieng_anh: null,
    diem_tong: 0
  },
  {
    id: 3,
    mssv: "24150113", // From CSV
    ho_ten: "NGUYỄN TRƯƠNG THÁI HẰNG", // From CSV
    gioi_tinh: "Nữ", // From CSV
    ngay_sinh: "2006-07-22", // From CSV
    cccd: "08230600****", // From CSV (masked)
    email: "ntth220706@gmail.com", // From CSV
    dien_thoai: "036276****", // From CSV (masked)
    so_bao_danh: "53007937", // From CSV
    ma_hs: "YTTC7G", // From CSV
    ho_khau: "Phường 5, Thành phố Mỹ Tho, Tiền Giang", // From CSV
    ma_nganh: "7420101", // From CSV
    ten_nganh: "Sinh học", // From CSV
    truong_thpt: "THPT Nguyễn Đình Chiểu, Tiền Giang", // From CSV
    doat_giai: "", // From CSV
    phuong_thuc: "UTX_DHQG", // From CSV
    diem_tt: 8.92, // From CSV

    // System functionality fields (mock)
    created_at: "2024-08-20T09:00:00Z",
    updated_at: "2024-08-20T09:00:00Z",
    nam_tot_nghiep: 2024,
    tinh_trang_hoc_phi: false,
    so_tien_hoc_phi: 11500000,
    phuong_thuc_nhap_hoc: "ƯTXT Học sinh Giỏi các trường THPT theo quy định của ĐHQG-HCM 2024",
    ho_so_can_thiet: ADMISSION_METHODS[0].documents,
    trang_thai_duyet: 'pending',
    khoa: "Khoa Sinh học",
    nganh: "Sinh học",

    // Display fields
    dia_chi_thuong_tru: "Phường 5, Thành phố Mỹ Tho, Tiền Giang",
    diem_toan: 8.6,
    diem_sinh_hoc: 8.3,
    diem_tieng_anh: null,
    diem_tong: 8.92
  },
  {
    id: 4,
    mssv: "24110116", // From CSV
    ho_ten: "LÝ GIA KHANG", // From CSV
    gioi_tinh: "Nam", // From CSV
    ngay_sinh: "2006-03-25", // From CSV
    cccd: "07920603****", // From CSV (masked)
    email: "khang25032006@gmail.com", // From CSV
    dien_thoai: "037601****", // From CSV (masked)
    so_bao_danh: "02054042", // From CSV
    ma_hs: "TGPUVK", // From CSV
    ho_khau: "Phường Hiệp Tân, Quận Tân Phú, TP.HCM", // From CSV
    ma_nganh: "7460101_NN", // From CSV
    ten_nganh: "Nhóm ngành Toán học, Toán ứng dụng, Toán tin", // From CSV
    truong_thpt: "THPT Tạ Quang Bửu, Tp. Hồ Chí Minh", // From CSV
    doat_giai: "", // From CSV
    phuong_thuc: "XTT_DHQG", // From CSV
    diem_tt: 9.47, // From CSV

    // System functionality fields (mock)
    created_at: "2024-08-20T09:30:00Z",
    updated_at: "2024-08-20T09:30:00Z",
    nam_tot_nghiep: 2024,
    tinh_trang_hoc_phi: true,
    so_tien_hoc_phi: 11000000,
    phuong_thuc_nhap_hoc: "ƯTXTT Học sinh Giỏi nhất Trường THPT theo quy định của ĐHQG-HCM 2024",
    ho_so_can_thiet: ADMISSION_METHODS[0].documents,
    trang_thai_duyet: 'approved',
    nguoi_duyet: "admin@hcmus.edu.vn",
    ngay_duyet: "2024-08-21T14:15:00Z",
    khoa: "Khoa Toán - Tin học",
    nganh: "Toán học",

    // Display fields
    dia_chi_thuong_tru: "Phường Hiệp Tân, Quận Tân Phú, TP.HCM",
    diem_toan: 9.5,
    diem_sinh_hoc: null,
    diem_tieng_anh: null,
    diem_tong: 9.47
  },
  {
    id: 5,
    mssv: "24150125", // From CSV
    ho_ten: "HÀ NGUYỄN CHU THỊ VÂN ANH", // From CSV
    gioi_tinh: "Nữ", // From CSV
    ngay_sinh: "2006-09-17", // From CSV
    cccd: "07030600****", // From CSV (masked)
    email: "anhhnctv.d.2124@gmail.com", // From CSV
    dien_thoai: "083643****", // From CSV (masked)
    so_bao_danh: "44000067", // From CSV
    ma_hs: "", // From CSV (empty)
    ho_khau: "Huyện Bàu Bàng, Bình Dương", // From CSV
    ma_nganh: "7420101", // From CSV
    ten_nganh: "Sinh học", // From CSV
    truong_thpt: "THPT chuyên Hùng Vương, Bình Dương", // From CSV
    doat_giai: "", // From CSV
    phuong_thuc: "THPT", // From CSV
    diem_tt: 24.15, // From CSV

    // System functionality fields (mock)
    created_at: "2024-08-20T10:00:00Z",
    updated_at: "2024-08-20T10:00:00Z",
    nam_tot_nghiep: 2024,
    tinh_trang_hoc_phi: false,
    so_tien_hoc_phi: 11500000,
    phuong_thuc_nhap_hoc: "ĐKXT dựa trên kết quả thi THPT 2024",
    ho_so_can_thiet: ADMISSION_METHODS[1].documents,
    trang_thai_duyet: 'pending',
    khoa: "Khoa Sinh học",
    nganh: "Sinh học",

    // Display fields
    dia_chi_thuong_tru: "Huyện Bàu Bàng, Bình Dương",
    diem_toan: 7.8,
    diem_sinh_hoc: 7.75,
    diem_tieng_anh: 8.4,
    diem_tong: 24.15
  }
]

// Helper functions
export function getStudentById(id: string): Student | undefined {
  return MOCK_STUDENTS.find(student => student.mssv === id)
}

export function getAllStudents(): Student[] {
  return MOCK_STUDENTS
}

export function searchStudents(query: string): Student[] {
  if (!query) return MOCK_STUDENTS

  const lowercaseQuery = query.toLowerCase()

  return MOCK_STUDENTS.filter(student =>
    student.mssv.toLowerCase().includes(lowercaseQuery) ||
    student.ho_ten.toLowerCase().includes(lowercaseQuery) ||
    student.nganh.toLowerCase().includes(lowercaseQuery) ||
    student.khoa.toLowerCase().includes(lowercaseQuery)
  )
}
