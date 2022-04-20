%{
    const {Aritmetica, TipoAritmetico} = require("../Expresion/Aritmetica")
    const {Literal, TipoLiteral} = require("../Expresion/Literal")
    const {Relacional, TipoRelacional} = require("../Expresion/Relacional")
    const {Ternario} = require("../Expresion/Ternario")
    const {Casteo} = require("../Expresion/Casteo")
    const {Declaracion} = require("../Instruccion/Declaracion")
    const {Print} = require('../Instruccion/Print')
    const {Acceso} = require('../Expresion/Acceso')
    const {Type} = require('../Expresion/Retorno')
    const {If} = require("../Instruccion/If")
    const {Statement} = require("../Instruccion/Statement")
    const {Switch} = require("../Instruccion/Switch")
    const {Case} = require("../Instruccion/Case")
    const {Break} = require("../Instruccion/Break")
    const {While} = require("../Instruccion/While")
    const {Continue} = require("../Instruccion/Continue")
    const { Program }= require( "../Misc/Program")
    const {DoWhile} = require("../Instruccion/DoWhile")
    const {ToUpper} = require("../Instruccion/ToUpper")
    const {ToLower} = require("../Instruccion/ToLower")
    const {For} = require("../Instruccion/For")
    const {Parametro} = require("../Misc/Parametro")
    const {Return} = require("../Instruccion/Return")
    const {Funcion} = require("../Instruccion/Funcion")
    const {Llamada} = require("../Instruccion/Llamada")

    const {DeclararVector1, DeclararVector2} = require("../Instruccion/DeclararVector")
    const {ModVector1, ModVector2} = require("../Instruccion/ModVector")
    const {AccesoVector1, AccesoVector2} = require("../Expresion/AccesoVector")

%}

%lex
%options case-insensitive

%%

[\r\t\n\s]+                             // se ignoran espacios en blanco
"//".*                                  // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     // comentario multiple líneas

"Println"                                   return 'TK_PRINTLN'; 
"Print"                                     return 'TK_PRINT'; 
"true"                                      return 'TK_TRUE'; 
"false"                                     return 'TK_FALSE'; 
"int"                                       return 'TK_INT'; 
"string"                                    return 'TK_STRING'; 
"char"                                      return 'TK_CHAR'; 
"boolean"                                   return 'TK_BOOLEAN'; 
"doble"                                     return 'TK_DOBLE'; 
"if"                                        return 'TK_IF';
"else"                                      return 'TK_ELSE';
"switch"                                    return 'TK_SWITCH';
"case"                                      return 'TK_CASE';
"default"                                   return 'TK_DEFAULT';
"break"                                     return 'TK_BREAK';
"while"                                     return 'TK_WHILE';
"continue"                                  return 'TK_CONTINUE';
"do"                                        return 'TK_DO';
"for"                                       return 'TK_FOR';
"return"                                    return 'TK_RETURN';
"void"                                      return 'TK_VOID';
"new"                                       return 'TK_NEW';

"toLower"                                        return 'TK_LOWER';
"toUpper"                                        return 'TK_UPPER';




\"[^\"]*\"                                  { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }             
\'[^\']\'                                  { yytext = yytext.substr(1,yyleng-2); return 'CHAR'; }  

[0-9]+\.[0-9]+\b                            return 'DECIMAL';
[0-9]+\b                                    return 'ENTERO';

([a-zA-Z])[a-zA-Z0-9_]*                     return 'IDENTIFICADOR';

"("                                         return 'TK_PARIZQ';
")"                                         return 'TK_PARDER';
"{"                                         return 'TK_LLAVIZQ';
"}"                                         return 'TK_LLAVDER';
"["                                         return 'TK_CORIZQ';
"]"                                         return 'TK_CORDER';
";"                                         return 'TK_PTCOMA';
":"                                         return 'TK_DOSPTS'; 
","                                         return 'TK_COMA';

"+"                                         return 'TK_SUMA';
"-"                                         return 'TK_RESTA';
"*"                                         return 'TK_POR';
"/"                                         return 'TK_DIVIDIR';
"^"                                         return 'TK_POTENCIA';
"%"                                         return 'TK_MODULO';

"=="                                        return 'TK_DOBLEIG';
"<="                                        return 'TK_MENORIG';
">="                                        return 'TK_MAYORIG';
"<"                                         return 'TK_MENOR';
">"                                         return 'TK_MAYOR';
"="                                         return 'TK_IGUAL';
"!="                                        return 'TK_NOIG';
"!"                                         return 'TK_NOT';
"||"                                        return 'TK_OR'; 
"&&"                                        return 'TK_AND';

"?"                                         return 'TK_INTE'; 




. 					                        { Program.consola += "Error Lexico - El carecter '" + yytext + "' no pertenece al lenguaje (Linea " + yylloc.first_line + "; Columna " + yylloc.first_column + ")\n" }
<<EOF>>                                     return 'EOF';

/lex

%left 'TK_OR'
%left 'TK_AND'
%left 'TK_MENOR' 'TK_MAYOR' 'TK_MENORIG' 'TK_MAYORIG' 'TK_DOBLEIG' 'TK_NOIG'
%left 'TK_MODULO'
%left 'TK_SUMA' 'TK_RESTA'
%left 'TK_POR' 'TK_DIVIDIR'
%nonassoc 'TK_POTENCIA'
%left CASTEO
%left TERNARIO
%left UMENOS
%right 'TK_NOT'


%start ini

%%

ini : instrucciones EOF{
    return $1
}
;

instrucciones
	: instrucciones instruccion 	{ $1.push($2); $$ = $1; }
	| instruccion					{ $$ = [$1]; }
    ;

instruccion
    : declaracion
    | asignacion
    | print
    | unaria
    | if
    | switch
    | while
    | for
    | do_while
    | funcion
    | metodo
    | TK_BREAK TK_PTCOMA                                            {$$ = new Break(@1.first_line, @1.first_column)}
    | return
    | llamada TK_PTCOMA
    | vector_1
    | mod_vector1
    | vector_2
    | mod_vector2
    ;   

if
    : TK_IF TK_PARIZQ expresion TK_PARDER statement else            {$$ = new If($3, $5, $6, @1.first_line, @1.first_column)}
    ;

else
    : TK_ELSE statement                                             {$$ = $2}
    | TK_ELSE if                                                    {$$ = $2}
    |                                                               {$$ = null}
    ;

statement
    : TK_LLAVIZQ instrucciones TK_LLAVDER                           {$$ = new Statement($2, @1.first_line, @1.first_column)}
    | TK_LLAVIZQ TK_LLAVDER                                         {$$ = new Statement([], @1.first_line, @1.first_column)}
    ;


switch
    : TK_SWITCH TK_PARIZQ expresion TK_PARDER TK_LLAVIZQ case_list default TK_LLAVDER   {$$ = new Switch($3, $6, $7, @1.first_line, @1.first_column)}
    | TK_SWITCH TK_PARIZQ expresion TK_PARDER TK_LLAVIZQ case_list TK_LLAVDER           {$$ = new Switch($3, $6, null, @1.first_line, @1.first_column)}
    | TK_SWITCH TK_PARIZQ expresion TK_PARDER TK_LLAVIZQ default TK_LLAVDER             {$$ = new Switch($3, null, $7, @1.first_line, @1.first_column)}
    ;

case_list
    : case_list case                                                 { $1.push($2); $$ = $1; }
    | case                                                           { $$ = [$1]; }
    ;

case
    : TK_CASE expresion TK_DOSPTS instrucciones                     {$$ = new Case($2, new Statement($4, @1.first_line, @1.first_column), @1.first_line, @1.first_column)} 
    | TK_CASE expresion TK_DOSPTS                                   {$$ = new Case($2, new Statement([], @1.first_line, @1.first_column), @1.first_line, @1.first_column)}                           
    ;

default
    : TK_DEFAULT TK_DOSPTS instrucciones                          {$$ = new Statement($3, @1.first_line, @1.first_column)}
    ;

while
    : TK_WHILE TK_PARIZQ condicion TK_PARDER TK_LLAVIZQ instrucciones TK_LLAVDER    {$$ = new While($3, new Statement($6, @1.first_line, @1.first_column), @1.first_line, @1.first_column)}
    | TK_WHILE TK_PARIZQ condicion TK_PARDER TK_LLAVIZQ TK_LLAVDER                  {$$ = new While($3, new Statement([], @1.first_line, @1.first_column), @1.first_line, @1.first_column)}
    ;

do_while
    : TK_DO TK_LLAVIZQ instrucciones TK_LLAVDER TK_WHILE TK_PARIZQ condicion TK_PARDER    {$$ = new While($7, new Statement($3, @1.first_line, @1.first_column), @1.first_line, @1.first_column)}
    | TK_DO TK_LLAVIZQ TK_LLAVDER TK_WHILE TK_PARIZQ condicion TK_PARDER                  {$$ = new While($7, new Statement([], @1.first_line, @1.first_column), @1.first_line, @1.first_column)}
    ;


for
    : TK_FOR TK_PARIZQ dec_for condicion TK_PTCOMA actualizacion TK_PARDER statement         {$$ = new For($3, $4, $6, $8, @1.first_line, @1.first_column)}
    | TK_FOR TK_PARIZQ asignacion condicion TK_PTCOMA actualizacion TK_PARDER statement      {$$ = new For($3, $4, $6, $8, @1.first_line, @1.first_column)}
    ;

actualizacion
    : IDENTIFICADOR TK_SUMA TK_SUMA                                 {$$ = new Aritmetica(new Acceso($1,@1.first_line, @1.first_column), new Acceso($1,@1.first_line, @1.first_column), TipoAritmetico.INCRE, @1.first_line,  @1.first_column)}
    | IDENTIFICADOR TK_RESTA TK_RESTA                               {$$ = new Aritmetica(new Acceso($1,@1.first_line, @1.first_column), new Acceso($1,@1.first_line, @1.first_column), TipoAritmetico.DECRE, @1.first_line,  @1.first_column)}
    | IDENTIFICADOR TK_IGUAL expresion                              {$$ = $3}
    ;



declaracion
    : tipo listaIdentificador TK_IGUAL expresion TK_PTCOMA         {$$ = new Declaracion($1, $2, $4, true, @1.first_line, @1.first_column)}
    | tipo listaIdentificador TK_IGUAL ternario TK_PTCOMA          {$$ = new Declaracion($1, $2, $4, true, @1.first_line, @1.first_column)}
    | tipo listaIdentificador TK_PTCOMA                            {$$ = new Declaracion($1, $2, null, true, @1.first_line, @1.first_column)}
    ;     


asignacion
    : IDENTIFICADOR TK_IGUAL expresion TK_PTCOMA                     {$$ = new Declaracion(-1, [$1], $3, false,@1.first_line, @1.first_column)}
    ;   

dec_for
    : TK_INT IDENTIFICADOR TK_IGUAL expresion TK_PTCOMA         {$$ = new Declaracion(Type.NUMBER, [$2], $4, true, @1.first_line, @1.first_column)}
    ;


print
    : TK_PRINT TK_PARIZQ listaExpresion TK_PARDER TK_PTCOMA      {$$ = new Print($3,false, @1.first_line, @1.first_column)}
    | TK_PRINTLN TK_PARIZQ listaExpresion TK_PARDER TK_PTCOMA      {$$ = new Print($3,true, @1.first_line, @1.first_column)}
    ;

to_lower
    : TK_LOWER TK_PARIZQ expresion TK_PARDER               {$$ = new ToLower($3, @1.first_line, @1.first_column)}
    ;

to_upper
    : TK_UPPER TK_PARIZQ expresion TK_PARDER               {$$ = new ToUpper($3, @1.first_line, @1.first_column)}
    ;

listaExpresion
    : listaExpresion TK_COMA expresion            {$1.push($3); $$ = $1;}
    | expresion                                   {$$ = [$1]}   
    ;  

listaIdentificador
    : listaIdentificador TK_COMA IDENTIFICADOR    {$1.push($3); $$ = $1;}
    | IDENTIFICADOR                               {$$ = [$1]} 
    ;

expresion
    : TK_RESTA expresion %prec UMENOS             {$$ = new Aritmetica(new Literal("-1", TipoLiteral.NUMBER, @1.first_line,  @1.first_column), $2, TipoAritmetico.MULTIPLICACION, @1.first_line,  @1.first_column)}
    | expresion TK_SUMA expresion                 {$$ = new Aritmetica($1, $3, TipoAritmetico.SUMA, @1.first_line,  @1.first_column)}
    | expresion TK_RESTA expresion                {$$ = new Aritmetica($1, $3, TipoAritmetico.RESTA, @1.first_line,  @1.first_column)}
    | expresion TK_POR expresion                  {$$ = new Aritmetica($1, $3, TipoAritmetico.MULTIPLICACION, @1.first_line,  @1.first_column)}
    | expresion TK_DIVIDIR expresion              {$$ = new Aritmetica($1, $3, TipoAritmetico.DIVISION, @1.first_line,  @1.first_column)}
    | expresion TK_POTENCIA expresion             {$$ = new Aritmetica($1, $3, TipoAritmetico.POTENCIA, @1.first_line,  @1.first_column)}
    | expresion TK_MODULO expresion               {$$ = new Aritmetica($1, $3, TipoAritmetico.MODULO, @1.first_line,  @1.first_column)}
    | TK_PARIZQ expresion TK_PARDER               {$$ = $2}

    | expresion TK_SUMA TK_SUMA                   {$$ = new Aritmetica($1, $1, TipoAritmetico.INCRE, @1.first_line,  @1.first_column)}
    | expresion TK_RESTA TK_RESTA                 {$$ = new Aritmetica($1, $1, TipoAritmetico.DECRE, @1.first_line,  @1.first_column)}

    | condicion

    | ENTERO                                        {$$ = new Literal($1, TipoLiteral.NUMBER, @1.first_line,  @1.first_column)}
    | DECIMAL                                       {$$ = new Literal($1, TipoLiteral.DOBLE, @1.first_line,  @1.first_column)}
    | TK_TRUE                                       {$$ = new Literal($1, TipoLiteral.BOOLEAN, @1.first_line,  @1.first_column)}
    | TK_FALSE                                      {$$ = new Literal($1, TipoLiteral.BOOLEAN, @1.first_line,  @1.first_column)}
    | CADENA                                        {$$ = new Literal($1, TipoLiteral.STRING, @1.first_line,  @1.first_column)}
    | CHAR                                          {$$ = new Literal($1, TipoLiteral.CHAR, @1.first_line,  @1.first_column)}

    | IDENTIFICADOR                                  {$$= new Acceso($1,@1.first_line, @1.first_column)}

    | TK_PARIZQ TK_INT TK_PARDER expresion  %prec CASTEO            {$$ = new Casteo(Type.NUMBER,$4,@1.first_line, @1.first_column)}
    | TK_PARIZQ TK_DOBLE TK_PARDER expresion  %prec CASTEO          {$$ = new Casteo(Type.DOBLE,$4,@1.first_line, @1.first_column)}
    | TK_PARIZQ TK_CHAR TK_PARDER expresion   %prec CASTEO         {$$ = new Casteo(Type.CHAR,$4,@1.first_line, @1.first_column)}

    | to_lower
    | to_upper
    | llamada

    | acceso_vector1
    | acceso_vector2
    ;

condicion
    : expresion TK_MENOR expresion                {$$ = new Relacional($1, $3, TipoRelacional.MENOR, @1.first_line,  @1.first_column)}
    | expresion TK_MAYOR expresion                {$$ = new Relacional($1, $3, TipoRelacional.MAYOR, @1.first_line,  @1.first_column)}
    | expresion TK_MENORIG expresion              {$$ = new Relacional($1, $3, TipoRelacional.MENOR_IGUAL, @1.first_line,  @1.first_column)}
    | expresion TK_MAYORIG expresion              {$$ = new Relacional($1, $3, TipoRelacional.MAYOR_IGUAL, @1.first_line,  @1.first_column)}
    | expresion TK_DOBLEIG expresion              {$$ = new Relacional($1, $3, TipoRelacional.IGUAL_IGUAL, @1.first_line,  @1.first_column)}
    | expresion TK_NOIG expresion                 {$$ = new Relacional($1, $3, TipoRelacional.DIFERENTE, @1.first_line,  @1.first_column)}
    | TK_NOT expresion                             {$$ = new Relacional($2, $2, TipoRelacional.NOT, @1.first_line,  @1.first_column)}
    | expresion TK_OR expresion                   {$$ = new Relacional($1, $3, TipoRelacional.OR, @1.first_line,  @1.first_column)}
    | expresion TK_AND expresion                  {$$ = new Relacional($1, $3, TipoRelacional.AND, @1.first_line,  @1.first_column)}
    ;


ternario
    : expresion TK_INTE expresion TK_DOSPTS expresion  %prec TERNARIO {$$ = new Ternario($1, $3, $5, @1.first_line,  @1.first_column)}
    ;

unaria
    : IDENTIFICADOR TK_SUMA TK_SUMA TK_PTCOMA                 {$$ = new Declaracion(-1, [$1], new Aritmetica(new Acceso($1,@1.first_line, @1.first_column), null, TipoAritmetico.INCRE, @1.first_line,  @1.first_column), false, @1.first_line, @1.first_column)}
    | IDENTIFICADOR TK_RESTA TK_RESTA TK_PTCOMA               {$$ = new Declaracion(-1, [$1], new Aritmetica(new Acceso($1,@1.first_line, @1.first_column), null, TipoAritmetico.DECRE, @1.first_line,  @1.first_column), false, @1.first_line, @1.first_column)}
    ;


funcion
    : IDENTIFICADOR TK_PARIZQ parametros TK_PARDER TK_DOSPTS tipo statement          {$$ = new Funcion($1, $7, $3, $6, @1.first_line, @1.first_column)}  
    | IDENTIFICADOR TK_PARIZQ TK_PARDER TK_DOSPTS tipo statement                     {$$ = new Funcion($1, $6, [], $5, @1.first_line, @1.first_column)}               
    ;

metodo
    : IDENTIFICADOR TK_PARIZQ parametros TK_PARDER TK_DOSPTS TK_VOID statement       {$$ = new Funcion($1, $7, $3, Type.VOID, @1.first_line, @1.first_column)}  
    | IDENTIFICADOR TK_PARIZQ TK_PARDER TK_DOSPTS TK_VOID statement                  {$$ = new Funcion($1, $6, [], $5, @1.first_line, @1.first_column)}   
    ;

parametros
    : parametros TK_COMA tipo IDENTIFICADOR                      {$1.push(new Parametro($3, $4)); $$ = $1;}
    | tipo IDENTIFICADOR                                         {$$ = [new Parametro($1, $2)]}
    ;

tipo 
    : TK_INT                {$$ = Type.NUMBER}
    | TK_STRING             {$$ = Type.STRING}
    | TK_DOBLE              {$$ = Type.DOBLE}
    | TK_BOOLEAN            {$$ = Type.BOOLEAN}
    | TK_CHAR               {$$ = Type.CHAR}
    ;

return
    : TK_RETURN expresion TK_PTCOMA                             {$$ = new Return($2, @1.first_line, @1.first_column)}         
    ;

llamada
    : IDENTIFICADOR  TK_PARIZQ listaExpresion TK_PARDER                 {$$ = new Llamada($1, $3, @1.first_line, @1.first_column)}  
    | IDENTIFICADOR  TK_PARIZQ TK_PARDER                                {$$ = new Llamada($1, [], @1.first_line, @1.first_column)}  
    ;         



vector_1
    : tipo IDENTIFICADOR TK_CORIZQ TK_CORDER TK_IGUAL TK_CORIZQ listaExpresion TK_CORDER TK_PTCOMA                   {$$ = new DeclararVector1($1, $1, $2, $7,new Literal("-999", TipoLiteral.NUMBER, @1.first_line,  @1.first_column) , @1.first_line, @1.first_column)}
    | tipo IDENTIFICADOR TK_CORIZQ TK_CORDER TK_IGUAL TK_NEW tipo TK_CORIZQ expresion TK_CORDER TK_PTCOMA            {$$ = new DeclararVector1($1, $7, $2, [], $9, @1.first_line, @1.first_column)}
    ;

acceso_vector1
    : IDENTIFICADOR TK_CORIZQ expresion TK_CORDER                                                                     {$$= new AccesoVector1($1,$3,@1.first_line, @1.first_column)}
    ;

mod_vector1
    : IDENTIFICADOR TK_CORIZQ expresion TK_CORDER TK_IGUAL expresion TK_PTCOMA                                        {$$= new ModVector1($1,$3,$6,@1.first_line, @1.first_column)}
    ;



vector_2
    : tipo IDENTIFICADOR TK_CORIZQ TK_CORDER TK_CORIZQ TK_CORDER TK_IGUAL TK_CORIZQ lista_vector TK_CORDER TK_PTCOMA                                   {$$ = new DeclararVector2($1, $1, $2, $9,new Literal("-999", TipoLiteral.NUMBER, @1.first_line,  @1.first_column), new Literal("-999", TipoLiteral.NUMBER, @1.first_line,  @1.first_column) , @1.first_line, @1.first_column)}
    | tipo IDENTIFICADOR TK_CORIZQ TK_CORDER TK_CORIZQ TK_CORDER TK_IGUAL TK_NEW tipo TK_CORIZQ expresion TK_CORDER TK_CORIZQ expresion TK_CORDER TK_PTCOMA         {$$ = new DeclararVector2($1, $9, $2, [], $11, $14, @1.first_line, @1.first_column)}
    ;

acceso_vector2
    : IDENTIFICADOR TK_CORIZQ expresion TK_CORDER TK_CORIZQ expresion TK_CORDER                                                 {$$= new AccesoVector2($1,$3,$6,@1.first_line, @1.first_column)}
    ;                                   

mod_vector2
    : IDENTIFICADOR TK_CORIZQ expresion TK_CORDER TK_CORIZQ expresion TK_CORDER TK_IGUAL expresion TK_PTCOMA                    {$$= new ModVector2($1,$3,$6,$9,@1.first_line, @1.first_column)}
    ;

lista_vector
    : lista_vector TK_COMA TK_CORIZQ listaExpresion TK_CORDER                                   {$1.push($4); $$ = $1;}
    | TK_CORIZQ listaExpresion TK_CORDER                                                        {$$ = [$2]}   
    ;