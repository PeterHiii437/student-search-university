export interface Student {
  id: number
  mssv: string // Student ID
  ho_ten: string // Full name
  gioi_tinh: string // Gender
  ngay_sinh: string // Date of birth
  cccd: string // Citizen ID
  ho_khau: string // Household registration
  truong_thpt: string // High school
  diem_toan: number | null
  diem_sinh_hoc: number | null
  diem_tieng_anh: number | null
  diem_tong: number | null
  dieu_kien_trung_tuyen: string | null
  nganh_trung_tuyen: string | null
  ma_nganh: string | null
  ten_nganh: string | null
  doi_tuong_ut: string | null
  khu_vuc_ut: string | null
  sbd: string | null
  created_at: string
  updated_at: string

  // New fields
  nam_tot_nghiep: number // Graduation year
  tinh_trang_hoc_phi: boolean // Fee payment status
  phuong_thuc_nhap_hoc: string // Admission method
  ho_so_can_thiet: string[] // Required documents
  trang_thai_duyet: 'pending' | 'approved' | 'rejected' // Approval status
  nguoi_duyet?: string // Approver
  ngay_duyet?: string // Approval date
  khoa: string // Faculty
  nganh: string // Major
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
      "Bản chính học bạ THPT",
      "Lý lịch sinh viên (in trực tiếp từ trang Portal của Trường)",
      "Phiếu đăng ký nhận thông tin học tập sinh viên",
      "Giấy xác nhận xếp loại học lực và hạnh kiểm"
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
      "Bản sao Giấy chứng nhận kết quả thi THPT",
      "Lý lịch sinh viên (in trực tiếp từ trang Portal của Trường)",
      "Phiếu đăng ký nhận thông tin học tập sinh viên",
      "Chứng chỉ ngoại ngữ (nếu có)"
    ]
  },
  {
    id: 5,
    name: "Phương thức 5 - Xét tuyển năng khiếu",
    documents: [
      "Hai ảnh thẻ 4×6",
      "Bản chính Giấy báo nhập học",
      "Bản sao trích lục Giấy khai sinh",
      "Bản chính Giấy chứng nhận tốt nghiệp tạm thời năm 2024",
      "Bản sao học bạ THPT (mang theo bản chính để đối chiếu)",
      "Lý lịch sinh viên (in trực tiếp từ trang Portal của Trường)",
      "Phiếu đăng ký nhận thông tin học tập sinh viên",
      "Giấy chứng nhận năng khiếu đặc biệt",
      "Hồ sơ thành tích năng khiếu",
      "Bằng chứng về khả năng đặc biệt trong lĩnh vực chuyên môn"
    ]
  },
  {
    id: 6,
    name: "Phương thức 6 - Xét tuyển riêng",
    documents: [
      "Hai ảnh thẻ 4×6",
      "Bản chính Giấy báo nhập học",
      "Bản sao trích lục Giấy khai sinh",
      "Bản chính Giấy chứng nhận tốt nghiệp tạm thời năm 2024",
      "Bản sao học bạ THPT (mang theo bản chính để đối chiếu)",
      "Lý lịch sinh viên (in trực tiếp từ trang Portal của Trường)",
      "Phiếu đăng ký nhận thông tin học tập sinh viên",
      "Hồ sơ chứng minh điều kiện xét tuyển riêng",
      "Giấy chứng nhận kết quả kỳ thi riêng",
      "Các giấy tờ chứng minh thuộc diện ưu tiên đặc biệt"
    ]
  }
]

// Mock faculties from HCMUS website
export const FACULTIES: Faculty[] = [
  {
    id: "fit",
    name: "Khoa Công nghệ Thông tin",
    majors: [
      "Công nghệ thông tin",
      "Khoa học máy tính",
      "Trí tuệ nhân tạo",
      "Công nghệ thông tin (CT tăng cường tiếng Anh)",
      "Khoa học máy tính (CT tiên tiến)",
      "Công nghệ thông tin (CT cử nhân tài năng)"
    ]
  },
  {
    id: "geology",
    name: "Khoa Địa chất",
    majors: [
      "Địa chất học",
      "Kỹ thuật địa chất",
      "Kinh tế đất đai"
    ]
  },
  {
    id: "fetel",
    name: "Khoa Điện tử - Viễn thông",
    majors: [
      "Kỹ thuật điện tử – viễn thông",
      "Thiết kế vi mạch",
      "Kỹ thuật điện tử – viễn thông (CT tăng cường tiếng Anh)"
    ]
  },
  {
    id: "chemistry",
    name: "Khoa Hóa học",
    majors: [
      "Hóa học",
      "Hóa học (CT tăng cường tiếng Anh)",
      "Công nghệ kỹ thuật hóa học (CT tăng cường tiếng Anh)",
      "Hóa học (CT cử nhân tài năng)"
    ]
  },
  {
    id: "mst",
    name: "Khoa Khoa học Vật liệu",
    majors: [
      "Khoa học vật liệu",
      "Công nghệ vật liệu",
      "Khoa học vật liệu (CT tăng cường tiếng Anh)"
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
  "24120001", "24120002", "24120003", "24120004", "24120005",
  "24120006", "24120007", "24120008", "24120009", "24120010",
  "24130001", "24130002", "24130003", "24140001", "24140002",
  "24150001", "24150002", "24160001", "24160002", "24170001"
]

// Mock student data
export const MOCK_STUDENTS: Student[] = [
  {
    id: 1,
    mssv: "24120001",
    ho_ten: "Nguyễn Văn An",
    gioi_tinh: "Nam",
    ngay_sinh: "2006-03-15",
    cccd: "001206012345",
    ho_khau: "123 Lê Lợi, Quận 1, TP.HCM",
    truong_thpt: "THPT Lê Hồng Phong",
    diem_toan: 8.5,
    diem_sinh_hoc: null,
    diem_tieng_anh: 7.8,
    diem_tong: 24.2,
    dieu_kien_trung_tuyen: "Đạt",
    nganh_trung_tuyen: "Công nghệ thông tin",
    ma_nganh: "7480201",
    ten_nganh: "Công nghệ thông tin",
    doi_tuong_ut: null,
    khu_vuc_ut: "KV1",
    sbd: "21120001",
    created_at: "2024-08-20T08:00:00Z",
    updated_at: "2024-08-20T08:00:00Z",
    nam_tot_nghiep: 2024,
    tinh_trang_hoc_phi: false,
    phuong_thuc_nhap_hoc: "Phương thức 2 - Xét tuyển dựa trên kết quả thi THPT",
    ho_so_can_thiet: ADMISSION_METHODS[1].documents,
    trang_thai_duyet: 'pending',
    khoa: "Khoa Công nghệ Thông tin",
    nganh: "Công nghệ thông tin"
  },
  {
    id: 2,
    mssv: "24120002",
    ho_ten: "Trần Thị Bình",
    gioi_tinh: "Nữ",
    ngay_sinh: "2006-05-20",
    cccd: "001206023456",
    ho_khau: "456 Nguyễn Thị Minh Khai, Quận 3, TP.HCM",
    truong_thpt: "THPT Trưng Vương",
    diem_toan: 9.0,
    diem_sinh_hoc: 8.5,
    diem_tieng_anh: null,
    diem_tong: 25.5,
    dieu_kien_trung_tuyen: "Đạt",
    nganh_trung_tuyen: "Khoa học máy tính",
    ma_nganh: "7480101",
    ten_nganh: "Khoa học máy tính",
    doi_tuong_ut: null,
    khu_vuc_ut: "KV1",
    sbd: "21120002",
    created_at: "2024-08-20T09:00:00Z",
    updated_at: "2024-08-20T09:00:00Z",
    nam_tot_nghiep: 2024,
    tinh_trang_hoc_phi: true,
    phuong_thuc_nhap_hoc: "Phương thức 1 - Xét tuyển thẳng và ưu tiên",
    ho_so_can_thiet: ADMISSION_METHODS[0].documents,
    trang_thai_duyet: 'approved',
    nguoi_duyet: "admin@gmail.com",
    ngay_duyet: "2024-08-21T10:00:00Z",
    khoa: "Khoa Công nghệ Thông tin",
    nganh: "Khoa học máy tính"
  },
  {
    id: 3,
    mssv: "24130001",
    ho_ten: "Lê Hoàng Cường",
    gioi_tinh: "Nam",
    ngay_sinh: "2006-01-10",
    cccd: "001206034567",
    ho_khau: "789 Võ Văn Tần, Quận 3, TP.HCM",
    truong_thpt: "THPT Gia Định",
    diem_toan: 8.8,
    diem_sinh_hoc: 8.2,
    diem_tieng_anh: 8.0,
    diem_tong: 25.0,
    dieu_kien_trung_tuyen: "Đạt",
    nganh_trung_tuyen: "Toán học",
    ma_nganh: "7460101",
    ten_nganh: "Toán học",
    doi_tuong_ut: "01",
    khu_vuc_ut: "KV2-NT",
    sbd: "21130001",
    created_at: "2024-08-20T10:00:00Z",
    updated_at: "2024-08-20T10:00:00Z",
    nam_tot_nghiep: 2024,
    tinh_trang_hoc_phi: false,
    phuong_thuc_nhap_hoc: "Phương thức 3 - Xét tuyển dựa trên học bạ THPT",
    ho_so_can_thiet: ADMISSION_METHODS[2].documents,
    trang_thai_duyet: 'pending',
    khoa: "Khoa Toán - Tin học",
    nganh: "Toán học"
  }
]

// Mock statistics data
export interface Statistics {
  dailyApplications: { [key: string]: number }
  approvedApplications: { [key: string]: number }
  facultyStats: {
    [facultyId: string]: {
      dailyApplications: number
      totalApproved: number
      pending: number
      rejected: number
    }
  }
}

export const MOCK_STATISTICS: Statistics = {
  dailyApplications: {
    "2024-08-20": 15,
    "2024-08-21": 23,
    "2024-08-22": 18,
    "2024-08-23": 31,
    "2024-08-24": 27
  },
  approvedApplications: {
    "2024-08-20": 8,
    "2024-08-21": 12,
    "2024-08-22": 15,
    "2024-08-23": 19,
    "2024-08-24": 22
  },
  facultyStats: {
    "fit": {
      dailyApplications: 8,
      totalApproved: 45,
      pending: 12,
      rejected: 3
    },
    "math": {
      dailyApplications: 5,
      totalApproved: 32,
      pending: 8,
      rejected: 2
    },
    "physics": {
      dailyApplications: 6,
      totalApproved: 28,
      pending: 10,
      rejected: 1
    },
    "chemistry": {
      dailyApplications: 4,
      totalApproved: 24,
      pending: 6,
      rejected: 2
    },
    "fbb": {
      dailyApplications: 3,
      totalApproved: 18,
      pending: 4,
      rejected: 1
    },
    "environment": {
      dailyApplications: 2,
      totalApproved: 15,
      pending: 3,
      rejected: 0
    },
    "geology": {
      dailyApplications: 1,
      totalApproved: 12,
      pending: 2,
      rejected: 1
    },
    "fetel": {
      dailyApplications: 2,
      totalApproved: 16,
      pending: 5,
      rejected: 1
    },
    "mst": {
      dailyApplications: 1,
      totalApproved: 10,
      pending: 2,
      rejected: 0
    },
    "fis": {
      dailyApplications: 1,
      totalApproved: 8,
      pending: 1,
      rejected: 0
    }
  }
}
