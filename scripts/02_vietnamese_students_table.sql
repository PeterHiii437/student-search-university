-- Tạo bảng sinh viên với định dạng Việt Nam
DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    mssv VARCHAR(20) UNIQUE NOT NULL, -- Mã số sinh viên
    ho_ten VARCHAR(255) NOT NULL, -- Họ và tên
    gioi_tinh VARCHAR(10) NOT NULL, -- Giới tính
    ngay_sinh DATE NOT NULL, -- Ngày sinh
    cccd VARCHAR(20) NOT NULL, -- Căn cước công dân
    ho_khau TEXT NOT NULL, -- Hộ khẩu
    truong_thpt TEXT NOT NULL, -- Trường THPT
    diem_toan DECIMAL(3,2), -- Điểm Toán
    diem_sinh_hoc DECIMAL(3,2), -- Điểm Sinh học
    diem_tieng_anh DECIMAL(3,2), -- Điểm Tiếng Anh
    diem_tong DECIMAL(4,2), -- Điểm tổng
    dieu_kien_trung_tuyen TEXT, -- Điều kiện trúng tuyển
    nganh_trung_tuyen VARCHAR(50), -- Ngành trúng tuyển
    ma_nganh VARCHAR(20), -- Mã ngành
    ten_nganh VARCHAR(255), -- Tên ngành
    doi_tuong_ut VARCHAR(50), -- Đối tượng ưu tiên
    khu_vuc_ut VARCHAR(10), -- Khu vực ưu tiên
    sbd VARCHAR(20), -- Số báo danh
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo index cho tìm kiếm nhanh
CREATE INDEX idx_students_mssv ON students(mssv);
CREATE INDEX idx_students_ho_ten ON students(ho_ten);

-- Thêm dữ liệu mẫu theo định dạng giấy báo trúng tuyển
INSERT INTO students (
    mssv, ho_ten, gioi_tinh, ngay_sinh, cccd, ho_khau, truong_thpt,
    diem_toan, diem_sinh_hoc, diem_tieng_anh, diem_tong,
    dieu_kien_trung_tuyen, nganh_trung_tuyen, ma_nganh, ten_nganh,
    doi_tuong_ut, khu_vuc_ut, sbd
) VALUES 
(
    '24150125',
    'Hà Nguyễn Chu Thị Vân Anh',
    'Nữ',
    '2006-09-17',
    '070306002940',
    'Huyện Bàu Bàng, Bình Dương',
    '44002-THPT chuyên Hùng Vương, Bình Dương',
    7.8,
    7.75,
    8.4,
    24.15,
    'ĐKXT dựa trên kết quả thi THPT 2024',
    'Đã trúng tuyển vào ngành',
    '7420101',
    'Sinh học',
    'Không',
    '2',
    '44000067'
),
(
    '24150126',
    'Nguyễn Văn Minh',
    'Nam',
    '2006-03-15',
    '070306002941',
    'Quận 1, TP. Hồ Chí Minh',
    '44001-THPT Lê Hồng Phong, TP. Hồ Chí Minh',
    8.2,
    8.0,
    7.9,
    24.1,
    'ĐKXT dựa trên kết quả thi THPT 2024',
    'Đã trúng tuyển vào ngành',
    '7480201',
    'Công nghệ thông tin',
    'Không',
    '1',
    '44000068'
),
(
    '24150127',
    'Trần Thị Hương',
    'Nữ',
    '2006-07-22',
    '070306002942',
    'Huyện Củ Chi, TP. Hồ Chí Minh',
    '44003-THPT Nguyễn Du, TP. Hồ Chí Minh',
    7.5,
    8.5,
    8.0,
    24.0,
    'ĐKXT dựa trên kết quả thi THPT 2024',
    'Đã trúng tuyển vào ngành',
    '7440201',
    'Hóa học',
    'Không',
    '3',
    '44000069'
),
(
    '24150128',
    'Lê Hoàng Nam',
    'Nam',
    '2006-11-08',
    '070306002943',
    'Quận Thủ Đức, TP. Hồ Chí Minh',
    '44004-THPT Trần Đại Nghĩa, TP. Hồ Chí Minh',
    8.5,
    7.2,
    8.3,
    24.0,
    'ĐKXT dựa trên kết quả thi THPT 2024',
    'Đã trúng tuyển vào ngành',
    '7460201',
    'Vật lý',
    'Không',
    '1',
    '44000070'
),
(
    '24150129',
    'Phạm Thị Lan',
    'Nữ',
    '2006-05-30',
    '070306002944',
    'Quận 7, TP. Hồ Chí Minh',
    '44005-THPT Bùi Thị Xuân, TP. Hồ Chí Minh',
    7.9,
    8.1,
    8.0,
    24.0,
    'ĐKXT dựa trên kết quả thi THPT 2024',
    'Đã trúng tuyển vào ngành',
    '7340201',
    'Toán học',
    'Không',
    '1',
    '44000071'
);
