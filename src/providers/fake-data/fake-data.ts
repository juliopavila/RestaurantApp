import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class FakeDataProvider {
  constructor(public http: HttpClient) {}

  getIngridents(): any {
    const data = {
      ingredients: [
        {
          ingredent_exist: true,
          ingredent_name: "Chorizo",
          ingredent_id: 4
        },
        {
          ingredent_exist: true,
          ingredent_name: "Pollo",
          ingredent_id: 5
        },
        {
          ingredent_exist: true,
          ingredent_name: "Chocolate",
          ingredent_id: 7
        },
        {
          ingredent_exist: true,
          ingredent_name: "Vainilla",
          ingredent_id: 8
        },
        {
          ingredent_exist: false,
          ingredent_name: "Tomato",
          ingredent_id: 2
        },
        {
          ingredent_exist: true,
          ingredent_name: "Spaghetti",
          ingredent_id: 3
        },
        {
          ingredent_exist: true,
          ingredent_name: "Maiz",
          ingredent_id: 9
        },
        {
          ingredent_exist: true,
          ingredent_name: "Pimienta",
          ingredent_id: 10
        },
        {
          ingredent_exist: true,
          ingredent_name: "Sal Marina",
          ingredent_id: 11
        },
        {
          ingredent_exist: true,
          ingredent_name: "Oregano",
          ingredent_id: 12
        },
        {
          ingredent_exist: true,
          ingredent_name: "Parmesano",
          ingredent_id: 13
        },
        {
          ingredent_exist: true,
          ingredent_name: "Azucar",
          ingredent_id: 14
        },
        {
          ingredent_exist: true,
          ingredent_name: "Leche",
          ingredent_id: 15
        },
        {
          ingredent_exist: true,
          ingredent_name: "Lentejas",
          ingredent_id: 16
        },
        {
          ingredent_exist: true,
          ingredent_name: "Carne",
          ingredent_id: 6
        },
        {
          ingredent_exist: true,
          ingredent_name: "Queso",
          ingredent_id: 1
        },
        {
          ingredent_exist: true,
          ingredent_name: "Papa",
          ingredent_id: 17
        }
      ]
    };
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        console.log("Result obtainined... for example from a service");
        resolve({ ingredients: data.ingredients });
      }, 1000);
    });
  }

  getReports(): any {
    const data = {
      bill: [
        {
          bill_id: 1,
          bill_mount: "150",
          user_id: 2,
          bill_creatin_time: "2019-04-08T23:53:16.000Z",
          bill_facture_number: 20,
          bill_name_client: "Luis",
          bill_lastname_client: "Araujo",
          bill_pay: true
        },
        {
          bill_id: 2,
          bill_mount: "200",
          user_id: 2,
          bill_creatin_time: "2019-04-09T00:00:00.000Z",
          bill_facture_number: 21,
          bill_name_client: "Luis",
          bill_lastname_client: "Araujo",
          bill_pay: true
        },
        {
          bill_id: 3,
          bill_mount: "400",
          user_id: 4,
          bill_creatin_time: "2019-02-22T05:00:00.000Z",
          bill_facture_number: 25,
          bill_name_client: "Julio",
          bill_lastname_client: "Avila",
          bill_pay: true
        }
      ]
    };
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        resolve({ bill: data.bill });
      }, 1000);
    });
  }

  getTables(): any {
    const data = {
      desk: [
        {
          id: 0,
          name: "Julio",
          lastname: "Avila"
        },
        {
          id: 1,
          name: "Jose",
          lastname: "Avila"
        },
        {
          id: 2,
          name: "Andres",
          lastname: "Avila"
        },
        {
          id: 3,
          name: "Ramon",
          lastname: "Avila"
        },
        {
          id: 4,
          name: "Daniela",
          lastname: "Avila"
        },
        {
          id: 5,
          name: "Pedro",
          lastname: "Avila"
        }
      ]
    };
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        console.log("Result obtainined... for example from a service");
        resolve({ desk: data.desk });
      }, 1000);
    });
  }

  getPlates(): any {
    const data = {
      general_category: [
        {
          general_name: "Almuerzos",
          list_recipe: [
            {
              type_recipe_id: 1,
              type_recipe_description: "Pastas",
              recipe_id: 2,
              recipe_title: "Pasta sola"
            },
            {
              type_recipe_id: 1,
              type_recipe_description: "Pastas",
              recipe_id: 8,
              recipe_title: "Sppaggethi con atuncito"
            },
            {
              type_recipe_id: 1,
              type_recipe_description: "Pastas",
              recipe_id: 7,
              recipe_title: "Sppaggethi con Arroz"
            },
            {
              type_recipe_id: 2,
              type_recipe_description: "Parrillas",
              recipe_id: 5,
              recipe_title: "Parrilla mixta para una persona"
            },
            {
              type_recipe_id: 1,
              type_recipe_description: "Pastas",
              recipe_id: 1,
              recipe_title: "Spaghetti Bolognese"
            },
            {
              type_recipe_id: 1,
              type_recipe_description: "Pastas",
              recipe_id: 3,
              recipe_title: "Pasta con Carne"
            }
          ]
        },
        {
          general_name: "Postres",
          list_recipe: [
            {
              type_recipe_id: 3,
              type_recipe_description: "Tortas",
              recipe_id: 4,
              recipe_title: "Torta divina de chocolate"
            }
          ]
        }
      ]
    };
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        console.log("Result obtainined... for example from a service");
        resolve({ general_category: data.general_category });
      }, 1000);
    });
  }
}
