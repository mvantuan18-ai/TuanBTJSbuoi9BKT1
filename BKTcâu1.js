const HocSinh = function(hoTen, lopHoc, diemTB, hanhKiem, maHS = null) {
  this.maHS = maHS;
  this.hoTen = hoTen;
  this.lopHoc = lopHoc;
  this.diemTB = diemTB;
  this.hanhKiem = hanhKiem;
};

const SchoolSystem = function() {
  this.danhSach = [];
  this.soLuongHocSinh = 0;

  this.khoiTao = function(data = []) {
    this.danhSach = [...data];
    this.soLuongHocSinh = data.length;
  };

  this.themHocSinh = function(hocSinh) {
    const namHienTai = new Date().getFullYear();
    const soThuTu = String(this.soLuongHocSinh).padStart(3, "0");
    const maHS = `ma${namHienTai}${soThuTu}`;
    this.soLuongHocSinh++;
    const hocSinhMoi = { ...hocSinh, maHS };
    this.danhSach.push(hocSinhMoi);
    return maHS;
  };

  this.timHocSinh = function(maHS) {
    const regex = /^ma\d{4}\d{3}$/;
    if (!regex.test(maHS)) {
      return null;
    }
    return this.danhSach.find((hs) => hs.maHS === maHS) || null;
  };

  this.capNhatThongTin = function(maHS, duLieuMoi) {
    const index = this.danhSach.findIndex((hs) => hs.maHS === maHS);
    if (index === -1) {
      return false;
    }
    const { maHS: _, ...duLieuCapNhat } = duLieuMoi;
    this.danhSach[index] = {
      ...this.danhSach[index],
      ...duLieuCapNhat,
    };
    return true;
  };

  this.xoaHocSinh = function(maHS) {
    const index = this.danhSach.findIndex((hs) => hs.maHS === maHS);

    if (index === -1) {
      return false;
    }

    this.danhSach.splice(index, 1);
    return true;
  };

  this.layDanhSachTheoLop = function(tenLop) {
    return this.danhSach.filter((hs) => hs.lopHoc === tenLop);
  };

  this.thongKeHocLuc = function() {
    const thongKe = {
      "Xuất Sắc": 0,
      Giỏi: 0,
      Khá: 0,
      "Trung Bình": 0,
      Kém: 0,
    };

    this.danhSach.forEach((hs) => {
      const { diemTB } = hs;
      if (diemTB >= 9.0) {
        thongKe["Xuất Sắc"]++;
      } else if (diemTB >= 8.0) {
        thongKe["Giỏi"]++;
      } else if (diemTB >= 6.5) {
        thongKe["Khá"]++;
      } else if (diemTB >= 5.0) {
        thongKe["Trung Bình"]++;
      } else {
        thongKe["Kém"]++;
      }
    });

    return thongKe;
  };

  this.sapXepTheoDiem = function(kieuSapXep = "tang") {
    const danhSachSaoChep = [...this.danhSach];
    return danhSachSaoChep.sort((a, b) => {
      if (kieuSapXep === "tang") {
        return a.diemTB - b.diemTB;
      } else {
        return b.diemTB - a.diemTB;
      }
    });
  };
};

const duLieuBanDau = [
  new HocSinh("Nguyễn Văn A", "10A1", 8.5, "Tốt", "ma2024000"),
  new HocSinh("Trần Thị B", "10A1", 9.2, "Tốt", "ma2024001"),
  new HocSinh("Lê Văn C", "10A2", 7.0, "Khá", "ma2024002"),
  new HocSinh("Phạm Thị D", "10A2", 5.5, "Trung bình", "ma2024003"),
  new HocSinh("Hoàng Văn E", "10A1", 4.5, "Yếu", "ma2024004"),
];

const heThong = new SchoolSystem();
heThong.khoiTao(duLieuBanDau);
console.log("=== DANH SÁCH BAN ĐẦU ===");
console.log(heThong.danhSach);
console.log("\n=== THÊM HỌC SINH MỚI ===");
const maHSMoi = heThong.themHocSinh({
  hoTen: "Đỗ Văn F",
  lopHoc: "10A1",
  diemTB: 8.8,
  hanhKiem: "Tốt",

});

console.log("Mã học sinh mới:", maHSMoi);
console.log("\n=== TÌM HỌC SINH ===");
const hsTimThay = heThong.timHocSinh("ma2024001");
console.log("Học sinh tìm thấy:", hsTimThay);
console.log("\n=== CẬP NHẬT THÔNG TIN ===");
const ketQuaCapNhat = heThong.capNhatThongTin("ma2024001", {
  diemTB: 9.5,
  hanhKiem: "Xuất sắc",
});
console.log("Cập nhật thành công:", ketQuaCapNhat);
console.log("Thông tin sau cập nhật:", heThong.timHocSinh("ma2024001"));
console.log("\n=== DANH SÁCH LỚP 10A1 ===");
console.log(heThong.layDanhSachTheoLop("10A1"));
console.log("\n=== THỐNG KÊ HỌC LỰC ===");
console.log(heThong.thongKeHocLuc());
console.log("\n=== SẮP XẾP TĂNG DẦN ===");
console.log(heThong.sapXepTheoDiem("tang"));
console.log("\n=== SẮP XẾP GIẢM DẦN ===");
console.log(heThong.sapXepTheoDiem("giam"));
console.log("\n=== XÓA HỌC SINH ===");
const ketQuaXoa = heThong.xoaHocSinh("ma2024004");
console.log("Xóa thành công:", ketQuaXoa);
console.log("Danh sách sau khi xóa:", heThong.danhSach);