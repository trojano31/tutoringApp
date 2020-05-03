export enum LevelType {
    PRIMARY_SCHOOL,
    SECONDARY_SCHOOL,
    HIGH_SCHOOL,
    COLLEGE,
}

export const levelTypeResolver: Record<keyof typeof LevelType, any> = {
    PRIMARY_SCHOOL: 0,
    SECONDARY_SCHOOL: 1,
    HIGH_SCHOOL: 2,
    COLLEGE: 3,
};
