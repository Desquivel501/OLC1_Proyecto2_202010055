import { Retorno, Type, tipos, tipoR} from "./Retorno";
import { Ambito } from "../Misc/Ambito";

export abstract class Expresion{

    constructor(public linea: number, public columna: number){
    }

    public abstract execute(ambito:Ambito): Retorno;

    public tipoDominante(tipo1:Type, tipo2:Type){
        return tipos[tipo1][tipo2];
    }

    public tipoRelacional(tipo1:Type, tipo2:Type){
        return tipoR[tipo1][tipo2];
    }
}