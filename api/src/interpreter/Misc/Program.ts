import { SimboloTabla } from "./SimboloTabla";

export class Program {

    static consola: String = "";
    static AST: string = "";
    static NODO: number = 0;

    static listaErrores = []

    static tablaSimbolos = []
    
    static agregarTabla(nuevo:SimboloTabla){
        for(const val of this.tablaSimbolos){
            if(val.id == nuevo.id && val.entorno == nuevo.entorno){
                return
            }
        }   
        this.tablaSimbolos.push(nuevo)
    }
    static imprimirTabla(){

        if(this.tablaSimbolos.length > 1000){
            console.log("here-----------------")
            let dot = `digraph G { 
                node[shape = plaintext] 
                a[label=<
                <TABLE style="border-collapse: collapse; width: 100%; height: 126px;" border="1">
                <TR>
                <TD style="text-align: center;">Tabla muy grande para ser mostrada</TD>
                </TR>
                </TABLE>>]
                    
                }`
            return dot
        }

        let dot =  `digraph G {
node[shape = plaintext]
a[ label =<
<TABLE style="border-collapse: collapse; width: 100%; height: 126px;" border="1">
<TR>
<TD style="text-align: center;" bgcolor="#6082b6">Identificador</TD>
<TD style="text-align: center;" bgcolor="#6082b6">Tipo</TD>
<TD style="text-align: center;" bgcolor="#6082b6">Tipo</TD>
<TD style="text-align: center;" bgcolor="#6082b6">Entorno</TD>
<TD style="text-align: center;" bgcolor="#6082b6">Linea</TD>
<TD style="text-align: center;" bgcolor="#6082b6">Columna</TD>
</TR>`

        for(const val of this.tablaSimbolos){
            // console.log("{" + val.id + "," + val.tipo1 + "," + val.tipo2 + "," + val.entorno + "," + val.linea + "," + val.columna + "}")
            dot += "<TR>\n"
            dot += "<TD style=\"text-align: center;\">"+ val.id +"</TD>\n"
            dot += "<TD style=\"text-align: center;\">"+ val.tipo1 +"</TD>\n"
            dot += "<TD style=\"text-align: center;\">"+ val.tipo2 +"</TD>\n"
            dot += "<TD style=\"text-align: center;\">"+ val.entorno +"</TD>\n"
            dot += "<TD style=\"text-align: center;\">"+ val.linea +"</TD>\n"
            dot += "<TD style=\"text-align: center;\">"+ val.columna +"</TD>\n"
            dot += "</TR>\n"
        }
        dot += "</TABLE>\n"
        dot += ">]\n"
        dot += "}\n"
        return dot;
    }

    static imprimirErrores(){
        let dot =  `digraph G {
node[shape = plaintext]
a[ label =<
<TABLE style="border-collapse: collapse; width: 100%; height: 126px;" border="1">
<TR>
<TD style="text-align: center;" bgcolor="#d35400">Tipo</TD>
<TD style="text-align: center;" bgcolor="#d35400">Mensaje</TD>
<TD style="text-align: center;" bgcolor="#d35400">Linea</TD>
<TD style="text-align: center;" bgcolor="#d35400">Columna</TD>
</TR>`

        for(const val of this.listaErrores){
            // console.log("{" + val.id + "," + val.tipo1 + "," + val.tipo2 + "," + val.entorno + "," + val.linea + "," + val.columna + "}")
            dot += "<TR>\n"
            dot += "<TD style=\"text-align: center;\">"+ val.tipo +"</TD>\n"
            dot += "<TD style=\"text-align: center;\">"+ val.mensaje +"</TD>\n"
            dot += "<TD style=\"text-align: center;\">"+ val.line +"</TD>\n"
            dot += "<TD style=\"text-align: center;\">"+ val.column +"</TD>\n"
            dot += "</TR>\n"
        }
        dot += "</TABLE>\n"
        dot += ">]\n"
        dot += "}\n"
        return dot;
    }


    static noIf = 0;
    static noFor = 0;
    static noWhile = 0;
    static noDoWhile = 0;
    static noSwitch = 0;

    static getNodo():number{
        return this.NODO++;
    }

    static reset(){
        Program.consola = ""
        Program.noIf = 0
        Program.noFor = 0
        Program.noWhile = 0
        Program.noDoWhile = 0
        Program.noSwitch = 0
        Program.listaErrores = []
        Program.tablaSimbolos = []
        Program.AST = ""
        Program.NODO = 0
    }
}