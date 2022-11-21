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
//không được nhập số
// function validate2(evt) {
//     var theEvent = evt || window.event;
//     // Handle paste
//     if (theEvent.type === 'paste') {
//         key = event.clipboardData.getData('text/plain');
//     } else {
//         // Handle key press
//         var key = theEvent.keyCode || theEvent.which;
//         key = String.fromCharCode(key);
//     }
//     var regex = /[a-z]/;
//     if (!regex.test(key)) {
//         theEvent.returnValue = false;
//         if (theEvent.preventDefault) theEvent.preventDefault();
//     }
// }

var employeeList = [];
function createEmployee() {
    //1. DOM lấy input
    var id = "item" + (new Date()).getMilliseconds() + Math.floor(Math.random() * 1000);
    var user = document.getElementById("tknv").value;
    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var dateWork = document.getElementById("datepicker").value;
    var salary = +document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var timeWork = +document.getElementById("gioLam").value;
    //2. tạo đối tượng nhân viên
    var employee = new Employee(
        id,
        user,
        fullName,
        email,
        pass,
        dateWork,
        salary,
        position,
        timeWork
    );
    checkUser();
    //4. thêm đối tượng sinh viên vào đối tượng
    employeeList.push(employee);
    checkName();
    checkEmail();
    checkPassWork();
    checkSalary();
    checkTimeWork();
    renderEmployee();
    saveEmployee();
    console.log(pass);
}
// kiểm tra trùng tài khoản
// function checkUser(){

// }
// kiểm tra ô tài khoản chỉ nhập vào 4 đến 6 ký tự và không để trống
function checkUser() {
    var length = document.getElementById("tknv").value.length;
    if (length <= 4 || length >= 6 || length === 0) {
        document.getElementById("tbTKNV").innerHTML = "Tài khoản 4 đến 6 ký tự";
        document.getElementById("tbTKNV").style.display = "inline";
        return;
    }
    else {
        document.getElementById("tbTKNV").style.display = "none";
    }
    for (var i = 0; i < employeeList.length; i++) {
        if (employeeList[i].user === document.getElementById("tknv").value) {
            document.getElementById("tbTKNV").innerHTML = "Tài khoản đã sử dụng";
            document.getElementById("tbTKNV").style.display = "inline";
            return;
        }
    }
}
// kiểm tra ô nhập họ tên không dược bỏ trống
function checkName() {
    var checkName = document.getElementById("name").value.length;
    if (checkName === 0) {
        document.getElementById("tbTen").innerHTML = "Họ tên không được bỏ trống";
        document.getElementById("tbTen").style.display = "inline";
        return;
    }
    else {
        document.getElementById("tbTen").style.display = "none";
    }
}
// kiểm tra email
function checkEmail() {
    // /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!reg.test(email.value)) {
        document.getElementById("tbEmail").innerHTML = "Nhập email không đúng";
        document.getElementById("tbEmail").style.display = "inline";
    }
    else {
        document.getElementById("tbEmail").style.display = "none";
    }
}
// kiểm tra mật khẩu
function checkPassWork() {
    var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    if (!reg.test(document.getElementById("password").value)) {
        document.getElementById("tbMatKhau").innerHTML = "mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
        document.getElementById("tbMatKhau").style.display = "inline";
    }
    else {
        document.getElementById("tbMatKhau").style.display = "none";
    }
}
// kiểm tra lương
function checkSalary() {
    var wage = 0;
    wage = +document.getElementById("luongCB").value;
    if (wage < 1000000 || wage > 20000000) {
        document.getElementById("tbLuongCB").innerHTML = "Lương cơ bản từ 1 triệu đến 20 triệu";
        document.getElementById("tbLuongCB").style.display = "inline";
    }
    else {
        document.getElementById("tbLuongCB").style.display = "none";
    }
}
// kiểm tra giờ làm việc
function checkTimeWork() {
    var timeWork = +document.getElementById("gioLam").value;
    if (timeWork < 80 || timeWork > 200) {
        document.getElementById("tbGiolam").innerHTML = "Số giờ làm trong tháng 80 - 200 giờ";
        document.getElementById("tbGiolam").style.display = "inline";
        return;
    }
    else {
        document.getElementById("tbGiolam").style.display = "none";
    }
}
// in danh sách ra màn hình
function renderEmployee() {
    var html = "";
    for (var i = 0; i < employeeList.length; i++) {
        html += `<tr>
            <td>${employeeList[i].user}</td>
            <td>${employeeList[i].fullName}</td>
            <td>${employeeList[i].email}</td>
            <td>${employeeList[i].dateWork}</td>
            <td>${employeeList[i].position}</td>
            <td>${employeeList[i].salary()}</td>
            <td>${employeeList[i].classIfication()}</td>
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
            oldEmployee.employeeId,
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
