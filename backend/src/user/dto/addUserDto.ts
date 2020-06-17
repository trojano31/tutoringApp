export class AddUserDto {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    city: string;
    phoneNumber: string;

    constructor(email: string,
                firstName: string,
                lastName: string,
                password: string,
                city: string,
                phoneNumber: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.city = city;
        this.phoneNumber = phoneNumber;
    }
}
