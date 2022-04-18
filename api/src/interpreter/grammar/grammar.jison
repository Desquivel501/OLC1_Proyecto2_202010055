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




. 					                        { Program.consola += "Error Lexico - El carecter '" + yytext + "' no pertenece al lenguaje (Linea " + yylloc.first_line + "; Columna " + yylloc.first_column + ")" }
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
    | TK_BREAK TK_PTCOMA                                            {$$ = new Break(@1.first_line, @1.first_column)}
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
    | case                                                          { $$ = [$1]; }
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
    // : TK_FOR TK_PARIZQ TK_INT IDENTIFICADOR TK_IGUAL expresion TK_PTCOMA condicion TK_PTCOMA IDENTIFICADOR TK_IGUAL expresion TK_LLAVDER TK_LLAVIZQ instrucciones TK_LLAVDER
    // | TK_FOR TK_PARIZQ TK_INT IDENTIFICADOR TK_IGUAL expresion TK_PTCOMA condicion TK_PTCOMA unaria TK_LLAVDER TK_LLAVIZQ instrucciones TK_LLAVDER

    // | TK_FOR TK_PARIZQ IDENTIFICADOR TK_IGUAL expresion TK_PTCOMA condicion TK_PTCOMA IDENTIFICADOR TK_IGUAL expresion TK_LLAVDER TK_LLAVIZQ instrucciones TK_LLAVDER
    // | TK_FOR TK_PARIZQ IDENTIFICADOR TK_IGUAL expresion TK_PTCOMA condicion TK_PTCOMA unaria TK_LLAVDER TK_LLAVIZQ instrucciones TK_LLAVDER
    ;

actualizacion
    : IDENTIFICADOR TK_SUMA TK_SUMA                                 {$$ = new Aritmetica(new Acceso($1,@1.first_line, @1.first_column), new Acceso($1,@1.first_line, @1.first_column), TipoAritmetico.INCRE, @1.first_line,  @1.first_column)}
    | IDENTIFICADOR TK_RESTA TK_RESTA                               {$$ = new Aritmetica(new Acceso($1,@1.first_line, @1.first_column), new Acceso($1,@1.first_line, @1.first_column), TipoAritmetico.DECRE, @1.first_line,  @1.first_column)}
    | IDENTIFICADOR TK_IGUAL expresion                              {$$ = $3}
    ;


declaracion
    : TK_INT listaIdentificador TK_IGUAL expresion TK_PTCOMA         {$$ = new Declaracion(Type.NUMBER, $2, $4, true, @1.first_line, @1.first_column)}
    | TK_DOBLE  listaIdentificador TK_IGUAL expresion TK_PTCOMA      {$$ = new Declaracion(Type.DOBLE, $2, $4, true, @1.first_line, @1.first_column)}
    | TK_CHAR  listaIdentificador TK_IGUAL expresion TK_PTCOMA       {$$ = new Declaracion(Type.CHAR, $2, $4, true, @1.first_line, @1.first_column)}
    | TK_STRING listaIdentificador TK_IGUAL expresion TK_PTCOMA      {$$ = new Declaracion(Type.STRING, $2, $4, true, @1.first_line, @1.first_column)}
    | TK_BOOLEAN listaIdentificador TK_IGUAL expresion TK_PTCOMA     {$$ = new Declaracion(Type.BOOLEAN, $2, $4, true, @1.first_line, @1.first_column)}

    | TK_INT listaIdentificador TK_IGUAL ternario TK_PTCOMA         {$$ = new Declaracion(Type.NUMBER, $2, $4, true, @1.first_line, @1.first_column)}
    | TK_DOBLE  listaIdentificador TK_IGUAL ternario TK_PTCOMA      {$$ = new Declaracion(Type.DOBLE, $2, $4, true, @1.first_line, @1.first_column)}
    | TK_CHAR  listaIdentificador TK_IGUAL ternario TK_PTCOMA       {$$ = new Declaracion(Type.CHAR, $2, $4, true, @1.first_line, @1.first_column)}
    | TK_STRING listaIdentificador TK_IGUAL ternario TK_PTCOMA      {$$ = new Declaracion(Type.STRING, $2, $4, true, @1.first_line, @1.first_column)}
    | TK_BOOLEAN listaIdentificador TK_IGUAL ternario TK_PTCOMA     {$$ = new Declaracion(Type.BOOLEAN, $2, $4, true, @1.first_line, @1.first_column)}

    | TK_INT listaIdentificador TK_PTCOMA                            {$$ = new Declaracion(Type.NUMBER, $2, null, true, @1.first_line, @1.first_column)}
    | TK_DOBLE  listaIdentificador TK_PTCOMA                         {$$ = new Declaracion(Type.DOBLE, $2, null, true, @1.first_line, @1.first_column)}
    | TK_CHAR  listaIdentificador TK_PTCOMA                          {$$ = new Declaracion(Type.CHAR, $2, null, true, @1.first_line, @1.first_column)}
    | TK_STRING listaIdentificador TK_PTCOMA                         {$$ = new Declaracion(Type.STRING, $2, null, true, @1.first_line, @1.first_column)}
    | TK_BOOLEAN listaIdentificador TK_PTCOMA                        {$$ = new Declaracion(Type.BOOLEAN, $2, null, true, @1.first_line, @1.first_column)}
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

