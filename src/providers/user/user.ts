import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

/**
 * Objeto JSON que maneja las cabeceras
 */
const httpHeaders = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable()
export class UserProvider {
  constructor(public http: HttpClient) {}

  /**
   * Metodo para manejar errores.
   * @param error Recibe como parametro el error que proviene de la peticion.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Maneja un error del lado del cliente o problemas de red
      console.error("An error occurred:", error.error.message);
    } else {
      // El Back-End devolvera un codigo de error
      // El body de respuesta puede manejar dichos errores
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Retorna un observable con un mensaje de error.
    return "Something bad happened; please try again later.";
  }

  /**
   * Metodo de enviar la peticion para registrar un usuario
   * @param body Recibe como parametro un Objeto JSON con la data que va a la BD
   * @returns Observable con la respuesta del servidor
   */
  signup(body) {
    console.log(body);
    // const url = `${this.url.getUrl()}/ShoppingCart/SignUp`;
    // return this.http
    //   .post(url, body, httpHeaders)
    //   .pipe(catchError(this.handleError));
  }

  /**
   * Metodo de enviar la peticion para iniciar sesion
   * @param body Recibe como parametro un Objeto JSON con la data que va a la BD
   * @returns Observable con la respuesta del servidor
   */
  login(body) {
    console.log(body);
    // const url = `${this.url.getUrl()}/ShoppingCart/Login`;
    // return this.http
    //   .post(url, body, httpHeaders)
    //   .pipe(catchError(this.handleError));
  }
}
