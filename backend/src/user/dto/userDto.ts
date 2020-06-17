import {CityDto} from './cityDto';

export class UserDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    city: CityDto;

    constructor(id: string,
                email: string,
                firstName: string,
                lastName: string,
                phone: string,
                city: CityDto) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.city = city;
    }
}
