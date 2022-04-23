import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Program } from "../Misc/Program";
export class For extends Instruccion{
    constructor(private variable, private condicion, private actualizacion, private cuerpo: Instruccion , linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        const newAmbito = new Ambito(ambito);

        this.variable.execute(newAmbito);
        let variableID = this.variable.ids[0]
        let condicion = this.condicion.execute(newAmbito);

        if(condicion.type != Type.BOOLEAN){
            throw new Error_(this.linea, this.columna, "Semantico", "La condicion de un While debe ser de tipo BOOLEAN");
        }

        if(this.cuerpo != null){
            while(condicion.value){
                const res = this.cuerpo.execute(newAmbito);
                if (res != null && res != undefined) {
                    if (res.type == 'Break') {
                        break
                    }else if(res.type == "Continue"){
                        continue
                    }else if(res.type == "Return"){
                        return res;
                    }
                }

                const nuevoVal = this.actualizacion.execute(newAmbito)
                newAmbito.setVal(variableID, nuevoVal.value, nuevoVal.type, this.linea, this.columna)
                condicion = this.condicion.execute(newAmbito);
            }
        }

    }

    public graficar(padre:number){
        let declaracion = Program.NODO
        Program.NODO++

        let For = Program.NODO
        Program.NODO++
        
        let variable = Program.NODO;
        Program.NODO++

        Program.NODO++

        let condicion = Program.NODO;
        Program.NODO++

        let actualizacion = Program.NODO;
        Program.NODO++

        let cuerpo = Program.NODO;
        Program.NODO++

        Program.AST += "Nodo" + declaracion + '[label="for"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"

        Program.AST += "Nodo" + For + '[label="for"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + For+ "\n"

        Program.AST += "Nodo" + variable + '[label="variable"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + variable+ "\n"

        this.variable.graficar(variable)
        
        Program.AST += "Nodo" + condicion + '[label="condicion"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + condicion+ "\n"

        this.condicion.graficar(condicion)

        Program.AST += "Nodo" + actualizacion + '[label="actualizacion"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + actualizacion+ "\n"

        this.actualizacion.graficar(actualizacion)

        // Program.AST += "Nodo" + cuerpo + '[label="actualizacion"]'+ "\n"
        // Program.AST += "Nodo" + declaracion + " -> Nodo" + cuerpo+ "\n"

        this.cuerpo.graficar(declaracion)

    }
}