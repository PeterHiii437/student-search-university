-- Create students table for storing admission information
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(20) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  admission_date DATE NOT NULL,
  program VARCHAR(200) NOT NULL,
  department VARCHAR(150) NOT NULL,
  academic_year VARCHAR(20) NOT NULL,
  status VARCHAR(50) DEFAULT 'Active',
  address TEXT,
  emergency_contact_name VARCHAR(200),
  emergency_contact_phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on student_id for faster searches
CREATE INDEX IF NOT EXISTS idx_students_student_id ON students(student_id);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);

-- Insert sample student data
INSERT INTO students (
  student_id, first_name, last_name, email, phone, date_of_birth,
  admission_date, program, department, academic_year, address,
  emergency_contact_name, emergency_contact_phone
) VALUES 
(
  'STU2024001', 'John', 'Smith', 'john.smith@university.edu', '+1-555-0101',
  '2002-03-15', '2024-09-01', 'Bachelor of Computer Science', 'Computer Science',
  '2024-2025', '123 Main St, City, State 12345',
  'Mary Smith', '+1-555-0102'
),
(
  'STU2024002', 'Emily', 'Johnson', 'emily.johnson@university.edu', '+1-555-0201',
  '2001-07-22', '2024-09-01', 'Bachelor of Business Administration', 'Business',
  '2024-2025', '456 Oak Ave, City, State 12346',
  'Robert Johnson', '+1-555-0202'
),
(
  'STU2024003', 'Michael', 'Davis', 'michael.davis@university.edu', '+1-555-0301',
  '2003-01-10', '2024-09-01', 'Bachelor of Engineering', 'Engineering',
  '2024-2025', '789 Pine Rd, City, State 12347',
  'Sarah Davis', '+1-555-0302'
),
(
  'STU2024004', 'Sarah', 'Wilson', 'sarah.wilson@university.edu', '+1-555-0401',
  '2002-11-05', '2024-09-01', 'Bachelor of Arts in Psychology', 'Psychology',
  '2024-2025', '321 Elm St, City, State 12348',
  'David Wilson', '+1-555-0402'
),
(
  'STU2024005', 'James', 'Brown', 'james.brown@university.edu', '+1-555-0501',
  '2001-09-18', '2024-09-01', 'Bachelor of Science in Biology', 'Biology',
  '2024-2025', '654 Maple Dr, City, State 12349',
  'Linda Brown', '+1-555-0502'
);
