function Employee(user, fullName, email, password, dateWork, basicSalary, position, timeWork) {
    this.user = user;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.dateWork = dateWork;
    this.basicSalary = basicSalary;
    this.position = position;
    this.timeWork = timeWork;
    this.salary = function () {
        var wage = 0;
        if (this.position === "Sếp") {
            return wage = this.basicSalary * 3;
        }
        else if (this.position === "Trưởng phòng") {
            return wage = this.basicSalary * 2;
        }
        else {
            return wage = this.basicSalary;
        }
    }
    this.classIfication = function () {
        var classification = 0;
        if (this.timeWork >= 192) {
            return classification = "Xuất sắc";
        }
        else if (this.timeWork >= 176) {
            return classification = "Giỏi";
        }
        else if (this.timeWork >= 160) {
            return classification = "Khá";
        }
        else {
            return classification = "Trung bình";
        }
    }
}