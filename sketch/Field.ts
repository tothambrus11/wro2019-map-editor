enum FieldTypes {
    WAREHOUSE,
    ROAD,
    OBSTACLE
}

class Field {
    constructor(
        public fieldType: FieldTypes,
        public openSides: boolean[],
    ) {
    }
}
