export enum PlaceType {
    ONLINE,
    AT_TEACHER,
    AT_STUDENT,
}

export const placeTypeResolver: Record<keyof typeof PlaceType, any> = {
    ONLINE: 0,
    AT_TEACHER: 1,
    AT_STUDENT: 2,
};
