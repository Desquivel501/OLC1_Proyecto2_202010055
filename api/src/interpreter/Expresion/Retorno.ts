export enum Type{
    NUMBER,
    DOBLE,
    BOOLEAN,
    CHAR,
    STRING
}

export type Retorno = {
    value: any,
    type: Type
}

export const tipos = [
    [
        Type.NUMBER, Type.DOBLE, Type.NUMBER, Type.NUMBER, Type.STRING
    ],
    [
        Type.DOBLE, Type.DOBLE, Type.DOBLE, Type.DOBLE, Type.STRING
    ],
    [
        Type.NUMBER, Type.DOBLE, -1 , -1, Type.STRING
    ],
    [
        Type.NUMBER, Type.DOBLE, -1 , Type.STRING, Type.STRING
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