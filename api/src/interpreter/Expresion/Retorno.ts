export enum Type{
    INTEGER,
    DOBLE,
    BOOLEAN,
    CHAR,
    STRING, 
    VOID, 
    VECTOR,
    VECTOR_INTEGER,
    VECTOR_DOBLE,
    VECTOR_BOOLEAN,
    VECTOR_CHAR,
    VECTOR_STRING,
}

export type Retorno = {
    value: any,
    type: Type
}

export const tipos = [
    [
        Type.INTEGER, Type.DOBLE, Type.INTEGER, Type.INTEGER, Type.STRING
    ],
    [
        Type.DOBLE, Type.DOBLE, Type.DOBLE, Type.DOBLE, Type.STRING
    ],
    [
        Type.INTEGER, Type.DOBLE, -1 , -1, Type.STRING
    ],
    [
        Type.INTEGER, Type.DOBLE, -1 , Type.STRING, Type.STRING
    ],
    [
        Type.STRING, Type.STRING, Type.STRING, Type.STRING, Type.STRING
    ]
]

export const tipoR = [
    [
        1,1,0,1,0
    ],
    [
        1,1,0,1,0
    ],
    [
        0,0,1,0,0
    ],
    [
        1,1,0,1,0
    ],
    [
        0,0,0,0,1
    ]
]

export const casteo = [
    [
        1,1,0,1,0
    ],
    [
        1,1,0,0,1
    ],
    [
        0,0,0,0,0
    ],
    [
        1,1,0,1,0
    ],
    [
        0,0,0,0,0
    ]
]

export const defaults = [
    0,
    0.0,
    true,
    "0",
    ""
]