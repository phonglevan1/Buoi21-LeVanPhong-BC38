//không cho nhập chữ
function validate(evt) {
    var theEvent = evt || window.event;
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /^-?\d*[.,]?\d*$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}
var employeeList = [];
function createEmployee() {
    //kiểm tra trược khi thêm
    //1. DOM lấy input
    var user = document.getElementById("tknv").value;
    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var dateWork = document.getElementById("datepicker").value;
    var basicSalary = +document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var timeWork = +document.getElementById("gioLam").value;
    //2. tạo đối tượng nhân viên
    var employee = new Employee(
        user,
        fullName,
        email,
        pass,
        dateWork,
        basicSalary,
        position,
        timeWork
    );
    var length = document.getElementById("tknv").value.length;
    for (var i = 0; i < employeeList.length; i++) {
        if (employeeList[i].user === user || length < 4 || length > 6) {
            document.getElementById("tbTKNV").innerHTML = "tài khoản trùng hoặc sai(tài khoản 4 đến 6 ký số)";
            document.getElementById("tbTKNV").style.display = "inline";
            return;
        }
        else {
            document.getElementById("tbTKNV").style.display = "none";
        }

    }
    if (!validateForm()) return;
    employeeList.push(employee);
    renderEmployee();
    saveEmployee();
    //xóa form
    dellForm();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'thêm Thành Công',
        showConfirmButton: false,
        timer: 1500
    })
}

// in danh sách ra màn hình
function renderEmployee(data) {
    data = data || employeeList;
    var html = "";
    for (var i = 0; i < data.length; i++) {
        html += `<tr>
            <td>${data[i].user}</td>
            <td>${data[i].fullName}</td>
            <td>${data[i].email}</td>
            <td>${data[i].dateWork}</td>
            <td>${data[i].position}</td>
            <td>${data[i].salary()}</td>
            <td>${data[i].classIfication()}</td>
            <td>
                <button
                    onclick="deleteEmployee('${employeeList[i].user}')"
                    class = "btn btn-danger">Xóa</button>
                    <button 
                    data-toggle="modal"
                    data-target="#myModal"
                    onclick="getUpdateEmployee('${employeeList[i].user}')"
                    class = "btn btn-info">Sửa</button>
            </td>
        </tr>`
    }
    document.getElementById("tableDanhSach").innerHTML = html;
}

function getEmployeeList() {
    var employeeJON = localStorage.getItem("SL");
    // kiểm tra dưới local không có dữ liệu studenList = null =>return
    if (!employeeJON) return [];

    employeeListLocal = JSON.parse(employeeJON);
    return employeeListLocal;
}

function mapEmployeeList(local) {
    var result = [];
    for (var i = 0; i < local.length; i++) {
        var oldEmployee = local[i];
        var newEmployee = new Employee(
            oldEmployee.user,
            oldEmployee.fullName,
            oldEmployee.email,
            oldEmployee.pass,
            oldEmployee.dateWork,
            oldEmployee.basicSalary,
            oldEmployee.position,
            oldEmployee.timeWork
        );
        result.push(newEmployee);
    }
    return result;
}
function findByUser(user) {
    for (var i = 0; i < employeeList.length; i++) {
        if (employeeList[i].user === user) {
            return i;
        }
    }
    return -1;
}

//xóa
function deleteEmployee(user) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            var index = findByUser(user);
            if (index === -1) return alert("user không tìm thấy");

            employeeList.splice(index, 1);

            renderEmployee();

            saveEmployee();
        }
    })
        .catch(function (err) {
            console.log(err);
            Swal.fire({
                title: "Error!",
                timer: 2000,
                icon: "error",
            });
        })
}
// chọn nhân viên muons cập nhật và in ra màn hình
function getUpdateEmployee(user) {
    var index = findByUser(user);

    if (index === -1) return alert("User không tìm thấy");

    var employee = employeeList[index];
    document.getElementById("tknv").value = employee.user;
    document.getElementById("name").value = employee.fullName;
    document.getElementById("email").value = employee.email;
    document.getElementById("password").value = employee.pass;
    document.getElementById("datepicker").value = employee.dateWork;
    document.getElementById("luongCB").value = employee.basicSalary;
    document.getElementById("chucvu").value = employee.position;
    document.getElementById("gioLam").value = employee.timeWork;

    document.getElementById("tknv").disabled = true;
}
function updateEmployee() {
    validateForm();
    //1. DOM lấy input
    var user = document.getElementById("tknv").value;
    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var dateWork = document.getElementById("datepicker").value;
    var basicSalary = +document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var timeWork = +document.getElementById("gioLam").value;

    var index = findByUser(user);

    var employee = employeeList[index];

    employee.fullName = fullName;
    employee.email = email;
    employee.pass = pass;
    employee.dateWork = dateWork;
    employee.basicSalary = basicSalary;
    employee.position = position;
    employee.timeWork = timeWork;
    if (!validateForm()) return;

    renderEmployee();

    saveEmployee();

    dellForm();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Sửa Thành Công',
        showConfirmButton: false,
        timer: 1500
    })
}

function searchEmpoyee(e) {
    var keyWord = document.getElementById("searchName").value.toLowerCase().trim();
    var result = [];
    for (var i = 0; i < employeeList.length; i++) {
        if (employeeList[i].classIfication().toLowerCase().includes(keyWord)) {
            result.push(employeeList[i]);
        }
    }
    renderEmployee(result);
}

function dellForm() {
    // xóa form
    document.getElementById("myform").reset();

    document.getElementById("tknv").disabled = false;

    document.getElementById("tbEmail").style.display = "none";
    document.getElementById("tbTKNV").style.display = "none";
    document.getElementById("tbTen").style.display = "none";
    document.getElementById("tbMatKhau").style.display = "none";
    document.getElementById("tbLuongCB").style.display = "none";
    document.getElementById("tbChucVu").style.display = "none";
    document.getElementById("tbGiolam").style.display = "none";
}

// lưu danh sách nhân viên vào local
function saveEmployee() {
    // chuyển danh sách nhân viên thành JSON
    var employeeJSON = JSON.stringify(employeeList);
    localStorage.setItem("SL", employeeJSON);
}

window.onload = function () {
    var employeeFromLocal = getEmployeeList();
    employeeList = mapEmployeeList(employeeFromLocal);
    renderEmployee();
}

//-----VALIDATION-------
function validateForm() {
    var position = document.getElementById("chucvu").value;
    //check tài khoản

    // kiểm tra ô nhập họ tên không dược bỏ trống
    var checkName = document.getElementById("name").value.length;
    if (checkName === 0) {
        document.getElementById("tbTen").innerHTML = "Họ tên không được bỏ trống";
        document.getElementById("tbTen").style.display = "inline";
        return;
    }
    else {
        document.getElementById("tbTen").style.display = "none";
    }
    //check email
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!reg.test(document.getElementById("email").value)) {
        document.getElementById("tbEmail").innerHTML = "Nhập email không đúng";
        document.getElementById("tbEmail").style.display = "inline";
        return false;
    }
    else {
        document.getElementById("tbEmail").style.display = "none";
    }
    //check passWork
    var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    if (!reg.test(document.getElementById("password").value)) {
        document.getElementById("tbMatKhau").innerHTML = "mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
        document.getElementById("tbMatKhau").style.display = "inline";
        return false;
    }
    else {
        document.getElementById("tbMatKhau").style.display = "none";
        return true;
    }

    //check Salary
    var wage = 0;
    wage = +document.getElementById("luongCB").value;
    if (wage < 1000000 || wage > 20000000) {
        document.getElementById("tbLuongCB").innerHTML = "Lương cơ bản từ 1 triệu đến 20 triệu";
        document.getElementById("tbLuongCB").style.display = "inline";
        return;
    }
    else {
        document.getElementById("tbLuongCB").style.display = "none";
    }
    // kiểm tra chức vụ
    if (position === "Chọn chức vụ") {
        document.getElementById("tbChucVu").innerHTML = "Chọn chức vụ";
        document.getElementById("tbChucVu").style.display = "inline";
        return;
    }
    else {
        document.getElementById("tbChucVu").style.display = "none";
    }
    // kiểm tra giờ làm việc
    var timeWork = +document.getElementById("gioLam").value;
    if (timeWork < 80 || timeWork > 200) {
        document.getElementById("tbGiolam").innerHTML = "Số giờ làm trong tháng 80 - 200 giờ";
        document.getElementById("tbGiolam").style.display = "inline";
        return;
    }
    else {
        document.getElementById("tbGiolam").style.display = "none";
    }
    return -1;
}

