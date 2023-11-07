/*
Service for adding two numbers
URI: /add
VERB: POST
Body 
    Expects: JSON {"a": Some_Number1, "b": Some_Number2 }
    
Returns: {"accepted": true, "answer": Some_Number1 + Some_Number2} if data is valid
         {"accepted": false, "answer": 0, "msg": "some_error_message"} otherwise

URI: /compile
VERB: POST
Body
    Expects: JSON {"script": "Your_Script_Here"}

Returns: The script as a text stream if data is valid
         {"accepted": false, "script": "", "msg": "some_error_message"} otherwise

author: loriacarlos@gmail.com
since: 2022
*/
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_log)).

:- use_module(library(http/http_cors)).

% URL handlers.
:- http_handler('/add', add_handler, [method(post)]).
:- http_handler('/compile', compile_stream_handler, [method(post)]).
:- http_handler('/', home, []).

handle_request(Request, Predicate) :-
    http_read_json_dict(Request, Data),
    call(Predicate, Data, Solution),
    reply_json_dict(Solution).

add_handler(Request) :-
    handle_request(Request, solve_add).

% Manejador para la ruta "/compile" que devuelve el script como un flujo de texto.
compile_stream_handler(Request) :-
    http_read_json_dict(Request, Data),
    get_dict(script, Data, Script), % Obtiene el valor del campo "script".
    format('Content-type: text/plain~n~n'),
    process_script(Script).

% Función para procesar el script (aquí, simplemente se devuelve como un flujo de texto).
process_script(Script) :-
    format('~w', [Script]).

server(Port) :-
    http_server(http_dispatch, [port(Port)]).
