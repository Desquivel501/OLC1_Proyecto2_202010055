import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Type } from "../Expresion/Retorno";
import { Error_ } from "../Error/Error";
import { Program } from "../Misc/Program";

export class ToCharArray extends Instruccion{
    constructor(private tipo: Type, private id:string, private value:Expresion, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {

        if(this.tipo != Type.CHAR){
            throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
        }

        const valorActual = this.value.execute(ambito);
        if(valorActual.type == Type.STRING){
            const cadena = valorActual.value;

            let array = Array.from(cadena)

            ambito.crearVector1(this.id, Type.CHAR, array.length, this.linea, this.columna)

            let i = 0
            for(const char of array){
                ambito.setVector1(this.id,char,Type.CHAR,i,this.linea,this.columna);
                i++;
            }
            
        }else{
            throw new Error_(this.linea, this.columna, "Semantico", "El valor de la funcion toCharArray() debe ser de tipo STRING");
        }
    }

    public graficar(padre:number){
        let declaracion = Program.getNodo()
        let tipo1 = Program.getNodo()
        let igual = Program.getNodo()
        let charArray = Program.getNodo()
        let id = Program.getNodo()

        Program.AST += "Nodo" + declaracion + '[label="declaracion vector"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"

        Program.AST += "Nodo" + tipo1 + '[label=" ' + Type[this.tipo] + ' "]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + tipo1+ "\n"

        Program.AST += "Nodo" + id + '[label=" '+this.id +'[]"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + id+ "\n"

        Program.AST += "Nodo" + igual + '[label="="]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + igual+ "\n"

        Program.AST += "Nodo" + charArray + '[label="toCharArray"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + charArray+ "\n"
       
        this.value.graficar(charArray);

    }
}