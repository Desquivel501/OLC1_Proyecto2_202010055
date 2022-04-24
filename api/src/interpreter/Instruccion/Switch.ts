import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Case } from "./Case";
import { Program } from "../Misc/Program";

export class Switch extends Instruccion{
    constructor(private condicion, private Case: Case[], private Default: Instruccion, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        let found_break = false;
        const condicion = this.condicion.execute(ambito);
        if(this.Case != null){
            for(const cas of this.Case){
                const val_case = cas.condicion.execute(ambito)

                if(val_case.value == condicion.value){
                    const res = cas.cuerpo.execute(ambito);
                    if (res != null && res != undefined) {
                        if (res.type == 'Break') {
                            found_break = true;
                            break
                        }
                    }
                }

            }
        }
        if(this.Default != null && !found_break){
            this.Default.execute(ambito);
        }
    }

    public graficar(padre:number){
        let declaracion = Program.getNodo()
        let SWITCH = Program.getNodo()
        let expresion = Program.getNodo()
        let cases = Program.getNodo()
        let Default = Program.getNodo()

        Program.AST += "Nodo" + declaracion + '[label="switch"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"

        Program.AST += "Nodo" + SWITCH + '[label="switch"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + SWITCH+ "\n"

        Program.AST += "Nodo" + expresion + '[label="expresion"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + expresion+ "\n"

        this.condicion.graficar(expresion)
        
        Program.AST += "Nodo" + cases + '[label="cases"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + cases+ "\n"

        for(const val of this.Case){
            val.graficar(cases)
        }

        Program.AST += "Nodo" + Default + '[label="default"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + Default+ "\n"

        this.Default.graficar(Default)
    }
}