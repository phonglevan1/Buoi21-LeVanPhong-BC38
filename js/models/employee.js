function Employee(id, user, fullName, email, password, dateWork, basicSalary, position, timeWork){
    this.employeeId = id;
    this.user = user;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.dateWork = dateWork;
    this.basicSalary = basicSalary;
    this.position = position;
    this.timeWork = timeWork;
    this.salary =  function(){
        var wage = 0;
        if(position === "Sếp"){
            return wage = basicSalary * 3;
        }
        else if(position === "Trưởng phòng"){
            return wage = basicSalary * 2;
        }
        else{
            return wage = basicSalary;
        }
    }
    this.classIfication = function (){
        var classification = 0;
        if(timeWork >= 192){
            return classification = "Xuất sắc";
        }
        else if(timeWork >= 176){
            return classification = "Giỏi";
        }
        else if(timeWork >= 160){
            return classification = "Khá";
        }
        else{
            return classification = "Trung bình";
        }
    }
}